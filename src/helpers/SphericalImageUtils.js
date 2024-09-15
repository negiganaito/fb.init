/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import ImageMetadata from "ImageMetadata";
import Promise from "Promise";
import XAsyncRequest from "XAsyncRequest";

import promiseDone from "./promiseDone";
import XSphericalPhotoSphereMetadataAsyncController from "./XSphericalPhotoSphereMetadataAsyncController";

const MAX_SIZE = 2048;

class SphericalImageUtils {
  static genArrayBufferFromBlob(blob) {
    return new Promise((resolve, reject) => {
      if (global.FileReader) {
        const reader = new FileReader();
        reader.onabort = reject;
        reader.onerror = reject;
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsArrayBuffer(blob);
      } else {
        reject(new Error("global.FileReader doesn't exist"));
      }
    });
  }

  static shouldCheckInServer(imageMetadata) {
    if (
      (!imageMetadata.hasExif() && !imageMetadata.hasXMP()) ||
      !imageMetadata.hasSize()
    ) {
      return false;
    }

    const xmpString = imageMetadata.getXMPString();
    if (this.getMayContainSphericalMetadata(xmpString)) {
      return true;
    }

    const size = imageMetadata.getSize();
    const { x, y } = size;

    if (Math.max(x, y) < MAX_SIZE || (x / y < 2 && y / x < 2)) {
      return false;
    }

    const exif = imageMetadata.hasExif() ? imageMetadata.getExif() : {};
    return xmpString !== "" || (exif.Make && exif.Model);
  }

  static genPhotosphereMetadata(blob) {
    return new Promise((resolve, reject) => {
      promiseDone(
        this.genArrayBufferFromBlob(blob),
        (arrayBuffer) => {
          try {
            const imageMetadata = new ImageMetadata(arrayBuffer);
            if (this.shouldCheckInServer(imageMetadata)) {
              promiseDone(
                this.genPhotosphereMetadataFromServer(
                  imageMetadata.hasSize()
                    ? imageMetadata.getSize()
                    : { x: 0, y: 0 },
                  imageMetadata.getXMPString(),
                  imageMetadata.hasExif() ? imageMetadata.getExif() : {}
                ),
                (serverResponse) => {
                  const { payload } = serverResponse;
                  resolve({ photoSphereMetadata: payload, imageMetadata });
                },
                reject
              );
            } else {
              resolve({});
            }
          } catch (error) {
            error.__manual = true;
            reject(error);
          }
        },
        reject
      );
    });
  }

  static genPhotosphereMetadataFromServer(size, xmpString, exifData) {
    return new Promise((resolve, reject) => {
      new XAsyncRequest(
        XSphericalPhotoSphereMetadataAsyncController.getURIBuilder().getURI()
      )
        .setMethod("POST")
        .setData({
          exif_string: this.getExifString(exifData),
          height: size.y,
          width: size.x,
          xmp: xmpString,
        })
        .setHandler(resolve)
        .setErrorHandler(reject)
        .send();
    });
  }

  static getExifString(exif) {
    return JSON.stringify(exif, (key, value) => {
      if (key === "FocalLength" && value.numerator && value.denominator) {
        return `${value.numerator}/${value.denominator}`;
      }
      return value;
    });
  }

  static getMayContainSphericalMetadata(xmpString) {
    return xmpString !== "" && xmpString.indexOf("GPano:") > -1;
  }
}

export default SphericalImageUtils;
