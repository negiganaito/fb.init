/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import AsyncUploadBase from "./AsyncUploadBase";

class AsyncUploadRequest extends AsyncUploadBase {
  constructor(...args) {
    super(...args);
    this._files = null;
    this._uploads = [];
    this._fileLessUpload = null;
    this._shouldAlwaysReturnResponse = false;
  }

  setFiles(files) {
    this._files = AsyncUploadBase.parseFiles(files);
    return this;
  }

  setAlwaysReturnResponse(shouldAlwaysReturnResponse) {
    this._shouldAlwaysReturnResponse = shouldAlwaysReturnResponse;
  }

  abort() {
    this._uploads.forEach((upload) => this._abort(upload));
  }

  send() {
    if (this._inFlight) return;

    this._inFlight = true;
    this._uploads = [];

    // eslint-disable-next-line guard-for-in
    for (const key in this._files) {
      this._files[key].forEach((file) => {
        this._uploads.push(this._createFileUpload(key, file));
      });
    }

    this._waiting = [...this._uploads];
    this._pending = [];

    if (this._uploads.length > 0) {
      this._processQueue();
    } else {
      this._fileLessUpload = this._createFileUpload(null, null);
      this._processUpload(this._fileLessUpload);
    }
  }

  _processQueue() {
    super._processQueue();

    if (!this._pending.length && !this._waiting.length) {
      const uploads = this._uploads;
      const completePayload = this._shouldAlwaysReturnResponse
        ? this._fileLessUpload !== null
          ? { response: this._fileLessUpload.getResponse(), uploads }
          : { response: uploads[0].getResponse(), uploads }
        : uploads;

      this.inform("complete", completePayload);
    }
  }

  static isSupported() {
    return AsyncUploadBase.isSupported();
  }
}

export default AsyncUploadRequest;
