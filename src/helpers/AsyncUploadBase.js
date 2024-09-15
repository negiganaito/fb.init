/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ArbiterMixin from "ArbiterMixin";
import AsyncRequest from "AsyncRequest";
import AsyncResponse from "AsyncResponse";
import BrowserSupport from "BrowserSupport";
import forEachObject from "fbjs/lib/forEachObject";
import removeFromArray from "fbjs/lib/removeFromArray";
import Form from "Form";
import mixin from "mixin";

class AsyncUploadBase extends mixin(ArbiterMixin) {
  constructor(uri) {
    super();
    this._allowCrossOrigin = false;
    this._allowCrossPageTransition = false;
    this._customHeader = {};
    this._inFlight = false;
    this._limit = 10;
    this._option = {};
    this._preventDefaultErrorHandler = false;
    this._suspended = false;

    if (uri) {
      this.setURI(uri);
    }

    this.setNetworkErrorRetryLimit(0);
  }

  static parseFiles(files) {
    const parsedFiles = {};

    forEachObject(files, (value, key) => {
      if (Array.isArray(value)) {
        parsedFiles[key] = value;
      } else {
        parsedFiles[key] = [];
        if (value instanceof window.FileList) {
          for (let i = 0; i < value.length; i++) {
            parsedFiles[key].push(value.item(i));
          }
        } else if (
          value instanceof window.File ||
          value instanceof window.Blob
        ) {
          parsedFiles[key].push(value);
        }
      }
    });

    return parsedFiles;
  }

  static isSupported() {
    return BrowserSupport.hasFileAPI();
  }

  setAllowCrossOrigin(allowCrossOrigin) {
    this._allowCrossOrigin = !!allowCrossOrigin;
    return this;
  }

  setAllowCrossPageTransition(allowCrossPageTransition) {
    this._allowCrossPageTransition = !!allowCrossPageTransition;
    return this;
  }

  setCustomHttpHeader(header, value) {
    this._customHeader[header] = value;
    return this;
  }

  setData(data) {
    this._data = data;
    return this;
  }

  setOption(option, value) {
    this._option[option] = value;
    return this;
  }

  setPreventDefaultErrorHandler(preventDefault) {
    this._preventDefaultErrorHandler = preventDefault;
    return this;
  }

  setLimit(limit) {
    this._limit = limit;
    return this;
  }

  setNetworkErrorRetryLimit(retryLimit) {
    this._retryLimit = retryLimit;
    return this;
  }

  setPreprocessHandler(handler) {
    this._preprocessHandler = handler;
    return this;
  }

  setRelativeTo(relativeTo) {
    this._relativeTo = relativeTo;
    return this;
  }

  setStatusElement(statusElement) {
    this._statusElement = statusElement;
    return this;
  }

  setURI(uri) {
    this._uri = uri;
    return this;
  }

  suspend() {
    this._suspended = true;
    return this;
  }

  resume() {
    this._suspended = false;
    this._processQueue();
    return this;
  }

  isUploading() {
    return this._inFlight;
  }

  _createFileUpload(name, file, data) {
    return new FileUpload(name, file, data);
  }

  _processQueue() {
    if (this._suspended) return;

    while (this._pending.length < this._limit) {
      if (!this._waiting.length) break;

      const upload = this._waiting.shift();
      const preprocessHandler = this._preprocessHandler;

      if (preprocessHandler) {
        preprocessHandler(upload, this._processUpload.bind(this));
      } else {
        this._processUpload(upload);
      }

      this._pending.push(upload);
    }
  }

  _processUpload(upload) {
    const formData = Form.createFormData(upload.getData() || this._data);

    if (upload.getFile()) {
      formData.append(upload.getName(), upload.getFile());

      const uploadID = upload.getFile().uploadID;
      if (uploadID) {
        formData.append("upload_id", uploadID);
      }

      upload
        .getAdditionalData()
        .forEach((value, key) => formData.append(key, value));
    }

    const request = new AsyncRequest()
      .setAllowCrossOrigin(this._allowCrossOrigin)
      .setAllowCrossPageTransition(this._allowCrossPageTransition)
      .setURI(this._uri)
      .setRawData(formData)
      .setStatusElement(this._statusElement)
      .setHandler(this._success.bind(this, upload))
      .setErrorHandler(this._failure.bind(this, upload))
      .setUploadProgressHandler(this._progress.bind(this, upload))
      .setInitialHandler(this._initial.bind(this, upload));

    // eslint-disable-next-line guard-for-in
    for (const option in this._option) {
      request.setOption(option, this._option[option]);
    }

    // eslint-disable-next-line guard-for-in
    for (const header in this._customHeader) {
      request.setRequestHeader(header, this._customHeader[header]);
    }

    if (this._relativeTo) {
      request.setRelativeTo(this._relativeTo);
    }

    request.send();
    upload.setAsyncRequest(request);
    this._inFlight = true;

    if (!upload.getRetryCount()) {
      this.inform("start", upload);
    }
  }

  _abort(upload) {
    if (this._pending.indexOf(upload) !== -1) {
      removeFromArray(this._pending, upload);
      this._processQueue();
    }

    removeFromArray(this._waiting, upload);
    upload.abort();
  }

  _initial(upload) {
    if (upload.isAborted()) return;
    this.inform("initial", upload);
  }

  _success(upload, response) {
    if (upload.isAborted()) {
      this.inform("success_after_abort", response);
      return;
    }

    this._complete(upload);
    this.inform("success", upload.handleSuccess(response));
    this._processQueue();
  }

  _retryUpload(upload) {
    upload.increaseRetryCount();
    this._processUpload(upload);
  }

  _failure(upload, error) {
    if (upload.isAborted()) return;

    if (
      error.error === 1004 &&
      upload.getRetryCount() < (this._retryLimit || 0)
    ) {
      this._retryUpload(upload);
      return;
    }

    this._complete(upload);
    if (this.inform("failure", upload.handleFailure(error)) !== false) {
      if (!this._preventDefaultErrorHandler) {
        AsyncResponse.defaultErrorHandler(error);
      }
    }

    this._processQueue();
  }

  _progress(upload, progressEvent) {
    if (upload.isAborted()) return;
    this.inform("progress", upload.handleProgress(progressEvent));
  }

  _complete(upload) {
    removeFromArray(this._pending, upload);
    if (!this._pending.length) {
      this._inFlight = false;
    }
  }
}

class FileUpload {
  constructor(name, file, data) {
    this._name = name;
    this._file = file;
    this._data = data;
    this._additionalData = new Map();
    this._success = null;
    this._response = null;
    this._progressEvent = null;
    this._request = null;
    this._numRetries = 0;
    this._aborted = false;
  }

  getName() {
    return this._name;
  }

  getFile() {
    return this._file;
  }

  setFile(file) {
    this._file = file;
  }

  getData() {
    return this._data;
  }

  getAdditionalData() {
    return this._additionalData;
  }

  isComplete() {
    return this._success !== null;
  }

  isSuccess() {
    return this._success === true;
  }

  getResponse() {
    return this._response;
  }

  getProgressEvent() {
    return this._progressEvent;
  }

  setAsyncRequest(request) {
    this._request = request;
    return this;
  }

  increaseRetryCount() {
    this._numRetries++;
    return this;
  }

  getRetryCount() {
    return this._numRetries;
  }

  isWaiting() {
    return !this._request;
  }

  isAborted() {
    return this._aborted;
  }

  abort() {
    this._request = null;
    this._aborted = true;
  }

  handleSuccess(response) {
    this._success = true;
    this._response = response;
    this._progressEvent = null;
    return this;
  }

  handleFailure(response) {
    this._success = false;
    this._response = response;
    this._progressEvent = null;
    return this;
  }

  handleProgress(progressEvent) {
    this._progressEvent = progressEvent;
    return this;
  }
}

export default AsyncUploadBase;
