/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import curry from "curry";
import emptyFunction from "fbjs/lib/emptyFunction";
import performanceNow from "fbjs/lib/performanceNow";
import FileInputUploader from "FileInputUploader";
import loadImageFromBlob from "loadImageFromBlob";
import PhotosMimeType from "PhotosMimeType";
import PhotosUploadID from "PhotosUploadID";
import Promise from "Promise";
import ReactComposerMediaFilterUtils from "ReactComposerMediaFilterUtils";
import SphericalImage from "SphericalImage";

import AsyncUploadRequest from "../../helpers/AsyncUploadRequest";
import promiseDone from "../../helpers/promiseDone";
import { SphericalPhotoTypedConfig } from "../../helpers/SphericalPhotoTypedConfig";
import {
  shouldRecompress360,
  shouldResize360,
} from "../../helpers/SphericalPhotoUploadHelper";

// eslint-disable-next-line no-undef
const URLObject = URL || webkitURL || {};

export default class XComposerPhotoUploader {
  constructor(options) {
    this.options = options;
    this.uploadData = options.uploadData || {};
    this.uploadEndpoint = options.uploadEndpoint;
    this.retryLimit = options.retryLimit;
    this.concurrentLimit = options.concurrentLimit;
    this.resizer = options.resizer;
    this.onUploadEnqueued = options.onUploadEnqueued || emptyFunction;
    this.onUploadsEnqueued = options.onUploadsEnqueued || emptyFunction;
    this.onResizeStart = options.onResizeStart || emptyFunction;
    this.onResizeProgress = options.onResizeProgress || emptyFunction;
    this.onResizeSuccess = options.onResizeSuccess || emptyFunction;
    this.onResizeFailure = options.onResizeFailure || emptyFunction;
    this.onSphericalCheckFailure =
      options.onSphericalCheckFailure || emptyFunction;
    this.onSphericalCheckSuccess =
      options.onSphericalCheckSuccess || emptyFunction;
    this.onUploadIsSpherical = options.onUploadIsSpherical || emptyFunction;
    this.onUploadSent = options.onUploadSent || emptyFunction;
    this.onUploadStart = options.onUploadStart || emptyFunction;
    this.onUploadProgress = options.onUploadProgress || emptyFunction;
    this.onUploadSuccess = options.onUploadSuccess || emptyFunction;
    this.onUploadFailure = options.onUploadFailure || emptyFunction;
    this.uploadOptions = {};
  }

  setUploadEndpoint(endpoint) {
    this.uploadEndpoint = endpoint;
  }

  setOption(key, value) {
    this.uploadOptions[key] = value;
    return this;
  }

  getUploadData() {
    return this.uploadData;
  }

  setUploadData(data) {
    this.uploadData = data;
  }

  upload(inputElement, uploadData = {}) {
    uploadData = { ...this.uploadData, ...uploadData };
    let files = null;

    if (!this.isAsyncUploadSupported(inputElement)) {
      const uploadID = PhotosUploadID.getNewID();
      inputElement.uploadID = uploadID;
      uploadData.upload_id = uploadID;
      this.onUploadEnqueued({
        uploadID,
        fileName: inputElement.value.split("/").pop().split("\\").pop(),
        fileURL: URLObject.createObjectURL
          ? URLObject.createObjectURL(inputElement)
          : null,
      });
    } else {
      files = Array.from(inputElement.files).filter(
        (file) => !ReactComposerMediaFilterUtils.hasVideos([file.name])
      );
      if (files.length === 0) return;

      files.forEach((file) => {
        file.uploadID = file.uploadID || PhotosUploadID.getNewID();
        this.onUploadEnqueued({
          uploadID: file.uploadID,
          fileName: file.name,
          isSpherical: false,
          fileURL: URLObject.createObjectURL
            ? URLObject.createObjectURL(file)
            : null,
        });
      });
    }

    this.onUploadsEnqueued();

    const uploader = new FileInputUploader(inputElement)
      .setURI(this.uploadEndpoint)
      .setData(uploadData)
      .setAllowCrossOrigin(true)
      .setNetworkErrorRetryLimit(this.retryLimit)
      .setUploadInParallel(true);

    if (files && files.length > 0) {
      uploader.setFiles({ farr: files });
      if (this.resizer) {
        uploader.setPreprocessHandler(this.preprocessFileForResizer.bind(this));
      } else {
        uploader.setPreprocessHandler(
          this.preprocessFileWithoutResizer.bind(this)
        );
      }
      if (this.concurrentLimit) {
        uploader.setConcurrentLimit(this.concurrentLimit);
      }
    }

    uploader.subscribe("progress", (progress, file) =>
      this.onUploadProgress(this.getUploadID(file, inputElement), file)
    );
    uploader.subscribe("failure", (error, file) =>
      this.onUploadFailure(this.getUploadID(file, inputElement), file, files)
    );
    uploader.subscribe("start", (start, file) =>
      this.onUploadStart(this.getUploadID(file, inputElement), file)
    );
    uploader.subscribe("success", (success, file) =>
      this.onUploadSuccess(this.getUploadID(file, inputElement), file)
    );

    // eslint-disable-next-line no-useless-catch
    try {
      uploader.send();
      this.onUploadSent(inputElement);
    } catch (error) {
      throw error;
    }
  }

  uploadFiles(files) {
    files = Array.from(files);
    const uploadIDs = [];

    files.forEach((file) => {
      const uploadID = PhotosUploadID.getNewID();
      file.uploadID = file.uploadID || uploadID;
      this.onUploadEnqueued({
        fileName: file.name,
        fileURL: URLObject.createObjectURL
          ? URLObject.createObjectURL(file)
          : null,
        isSpherical: false,
        uploadID,
      });
      uploadIDs.push(uploadID);
    });

    const asyncFileUploadRequest = this.getAsyncFileUploadRequest(
      files,
      uploadIDs
    );
    asyncFileUploadRequest.send();
  }

  getAsyncFileUploadRequest(files, uploadIDs, uploadData) {
    const request = this.prepareAsyncUploadRequest(files, uploadData);

    request.subscribe("start", (start, upload) => {
      const uploadID = this.getUploadID({ upload }, {});
      this.onUploadStart(
        uploadID || this.getUploadIndex(files, uploadIDs, upload),
        { upload }
      );
    });

    request.subscribe("progress", (progress, upload) => {
      const uploadID = this.getUploadID({ upload }, {});
      this.onUploadProgress(
        uploadID || this.getUploadIndex(files, uploadIDs, upload),
        { upload, event: upload.getProgressEvent() }
      );
    });

    request.subscribe("success", (success, upload) => {
      const uploadID = this.getUploadID({ upload }, {});
      this.onUploadSuccess(
        uploadID || this.getUploadIndex(files, uploadIDs, upload),
        { upload, response: upload.getResponse() }
      );
    });

    request.subscribe("failure", (failure, upload) => {
      const uploadID = this.getUploadID({ upload }, {});
      return this.onUploadFailure(
        uploadID || this.getUploadIndex(files, uploadIDs, upload),
        { upload, response: upload.getResponse() },
        files
      );
    });

    return request;
  }

  getAsyncUploadRequest(files, uploadData) {
    const request = this.prepareAsyncUploadRequest(files, uploadData);

    request.subscribe("start", (start, file) =>
      this.onUploadStart(file.getFile().uploadID, { upload: file })
    );
    request.subscribe("progress", (progress, file) =>
      this.onUploadProgress(file.getFile().uploadID, {
        upload: file,
        event: file.getProgressEvent(),
      })
    );
    request.subscribe("success", (success, file) =>
      this.onUploadSuccess(file.getFile().uploadID, {
        upload: file,
        response: file.getResponse(),
      })
    );
    request.subscribe("failure", (failure, file) =>
      this.onUploadFailure(
        file.getFile().uploadID,
        { upload: file, response: file.getResponse() },
        files
      )
    );

    return request;
  }

  prepareAsyncUploadRequest(files, uploadData) {
    const request = new AsyncUploadRequest()
      .setData({ ...uploadData?.data, ...this.uploadData })
      .setFiles({ farr: files })
      .setAllowCrossOrigin(true)
      .setURI(this.uploadEndpoint);

    if (uploadData?.preventDefaultErrorHandler) {
      request.setPreventDefaultErrorHandler(true);
    }

    if (this.concurrentLimit) {
      request.setLimit(this.concurrentLimit);
    }

    if (this.resizer) {
      request.setPreprocessHandler(this.preprocessFileForResizer.bind(this));
    } else {
      request.setPreprocessHandler(
        this.preprocessFileWithoutResizer.bind(this)
      );
    }

    // eslint-disable-next-line guard-for-in
    for (const key in this.uploadOptions) {
      request.setOption(key, this.uploadOptions[key]);
    }

    return request;
  }

  getUploadIndex(files, uploadIDs, upload) {
    const file = upload.getFile();
    const index = files.indexOf(file);
    return uploadIDs[index];
  }

  getUploadID(uploadObj, fallback) {
    return uploadObj.upload
      ? uploadObj.upload.getFile().uploadID
      : fallback.uploadID;
  }

  preprocessFileWithoutResizer(file, callback) {
    promiseDone(
      (async () => await this.processFileWithoutResizer(file, callback))()
    );
  }

  async processFileWithoutResizer(file, callback) {
    const processedFile = await this.checkSphericalImage(file.getFile());
    const uploadID = file.getFile().uploadID;
    processedFile && processedFile.isSpherical()
      ? this.onUploadIsSpherical(
          processedFile.isSpherical(),
          processedFile,
          uploadID
        )
      : this.onUploadIsSpherical(false, null, "");

    callback(file);
  }

  preprocessFileForResizer(file, callback) {
    promiseDone(
      (async () => await this.processFileForResizer(file, callback))()
    );
  }

  async checkSphericalImage(blob) {
    const startTime = performanceNow();
    try {
      const sphericalImage = await SphericalImage.createFromBlob(blob);
      this.onSphericalCheckSuccess(
        blob,
        performanceNow() - startTime,
        sphericalImage
      );
      return sphericalImage;
    } catch (error) {
      this.onSphericalCheckFailure(blob, performanceNow() - startTime);
      return null;
    }
  }

  resizeBlob(blob) {
    return this.resizeImage(this.resizer.resizeBlob.bind(this.resizer), blob);
  }

  resize360Blob(blob, limit = SphericalPhotoTypedConfig.upload_size_limit) {
    return this.resizeImage(
      this.resizer.resize360Blob.bind(this.resizer),
      blob,
      limit
    );
  }

  getImageDimensions(blob) {
    return loadImageFromBlob(blob).then((image) => ({
      width: image.width,
      height: image.height,
    }));
  }

  resizeImage(resizeFunc, blob, limit) {
    const resizeProgress = curry(this.onResizeProgress, blob.uploadID);
    const resizeStart = curry(this.onResizeStart, blob);
    const startResizing = () => this.getImageDimensions(blob).then(resizeStart);

    return new Promise((resolve, reject) => {
      startResizing();
      resizeFunc(
        blob,
        (
          error,
          resizedBlob,
          isResized,
          originalWidth,
          originalHeight,
          outputWidth,
          outputHeight
          // eslint-disable-next-line max-params
        ) => {
          if (error) reject(error);
          else if (isResized) {
            resolve({
              blob: resizedBlob,
              originalWidth,
              originalHeight,
              outputWidth,
              outputHeight,
            });
          } else {
            resolve({ originalWidth, originalHeight });
          }
        },
        resizeProgress,
        limit
      );
    });
  }

  async processFileForResizer(file, callback) {
    const blob = file.getFile();
    const isEligible = this.resizer.isEligible(blob?.size, blob?.type);

    if (!blob || !PhotosMimeType.isJpeg(blob.type) || !isEligible) {
      this.onUploadIsSpherical(false, null, "");

      if (blob) {
        promiseDone(
          this.getImageDimensions(blob).then((dimensions) => {
            file
              .getAdditionalData()
              .set("js_resized", false)
              .set("original_file_size", blob.size)
              .set("original_width", dimensions?.width)
              .set("original_height", dimensions?.height)
              .set("upload_width", dimensions?.width)
              .set("upload_height", dimensions?.height);
          }, emptyFunction)
        );
      }

      callback(file);
      return;
    }

    const startTime = performanceNow();
    let resizedBlob = null;
    let processedFile = null;

    try {
      processedFile = await this.checkSphericalImage(blob);

      if (processedFile && processedFile.isSpherical()) {
        this.onUploadIsSpherical(true, processedFile, blob.uploadID);
        const size = processedFile.getSize();
        const uploadSizeLimit = SphericalPhotoTypedConfig.upload_size_limit;
        const projectionType = processedFile.getProjectionType();
        let shouldRecompress = false;

        shouldRecompress = shouldRecompress360(
          projectionType,
          processedFile.getBufferLength(),
          SphericalPhotoTypedConfig.upload_bytes_limit
        );

        let shouldResize = shouldResize360(
          projectionType,
          size,
          uploadSizeLimit
        );
        if (size && (shouldResize || shouldRecompress)) {
          if (!shouldResize) {
            resizedBlob = await this.resize360Blob(
              blob,
              Math.max(size.x, size.y) - 1
            );
          } else {
            resizedBlob = await this.resize360Blob(blob);
          }
        }
      } else {
        this.onUploadIsSpherical(false, null, "");
        resizedBlob = await this.resizeBlob(blob);
      }

      if (resizedBlob && resizedBlob.blob !== null) {
        const resizedFile = resizedBlob.blob;
        resizedFile.uploadID = blob.uploadID;
        resizedFile.name = blob.name;
        file.setFile(resizedFile);
      }

      const fileNotResized = resizedBlob === null;
      file.getFile().filename = blob.name;

      file
        .getAdditionalData()
        .set("js_resized", !fileNotResized)
        .set("original_file_size", blob.size)
        .set("original_width", resizedBlob?.originalWidth)
        .set("original_height", resizedBlob?.originalHeight)
        .set("upload_width", resizedBlob?.outputWidth)
        .set("upload_height", resizedBlob?.outputHeight);

      this.onResizeSuccess(
        blob,
        resizedBlob || blob,
        fileNotResized,
        performanceNow() - startTime,
        file.getAdditionalData().get("original_width"),
        file.getAdditionalData().get("original_height"),
        file.getAdditionalData().get("upload_width"),
        file.getAdditionalData().get("upload_height")
      );
    } catch (error) {
      const duration = performanceNow() - startTime;
      this.onResizeFailure(blob, resizedBlob || blob, error, duration);
    }

    callback(file);
  }

  isAsyncUploadSupported(inputElement) {
    return !!inputElement.files && AsyncUploadRequest.isSupported();
  }
}
