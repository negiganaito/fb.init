/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import Promise from "./Promise";
import WAErr from "./WAErr";

const MAX_TIMEOUT = 8388607;

const stringToArrayBuffer = (str) => {
  const buffer = new ArrayBuffer(str.length);
  const uint8Array = new Uint8Array(buffer);

  for (let i = 0; i < str.length; i++) {
    uint8Array[i] = str.charCodeAt(i);
  }

  return buffer;
};

const largeStringToArrayBuffer = (str, chunkSize = 500000) => {
  return new Promise((resolve, reject) => {
    const length = str.length;
    const buffer = new ArrayBuffer(length);
    const uint8Array = new Uint8Array(buffer);
    let index = 0;

    const processChunk = () => {
      const end = Math.min(index + chunkSize, length);

      while (index < end) {
        uint8Array[index] = str.charCodeAt(index);
        index++;
      }

      if (index === length) {
        resolve(buffer);
        return;
      }

      setTimeout(processChunk, 16);
    };

    setTimeout(processChunk, 0);
  });
};

const arrayBufferToString = (buffer) => {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
};

const arrayBufferMod = (buffer, divisor) => {
  if (divisor > MAX_TIMEOUT) {
    throw WAErr("Divisor is too big");
  }

  const uint8Array = new Uint8Array(buffer);
  let remainder = 0;

  for (const byte of uint8Array) {
    remainder = ((remainder << 8) + byte) % divisor;
  }

  return remainder;
};

const concatBuffers = (buffers) => {
  const totalLength = buffers.reduce(
    (sum, buffer) => sum + buffer.byteLength,
    0
  );
  const combinedArray = new Uint8Array(totalLength);

  buffers.reduce((offset, buffer) => {
    combinedArray.set(new Uint8Array(buffer), offset);
    return offset + buffer.byteLength;
  }, 0);

  return combinedArray.buffer;
};

const arrayBuffersEqualUNSAFE = (buffer1, buffer2) => {
  return uint8ArraysEqualUNSAFE(
    new Uint8Array(buffer1),
    new Uint8Array(buffer2)
  );
};

const uint8ArraysEqualUNSAFE = (array1, array2) => {
  if (array1.byteLength !== array2.byteLength) {
    return false;
  }

  for (let i = 0; i < array1.byteLength; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
};

export {
  arrayBufferMod,
  arrayBuffersEqualUNSAFE,
  arrayBufferToString,
  concatBuffers,
  largeStringToArrayBuffer,
  stringToArrayBuffer,
  uint8ArraysEqualUNSAFE,
};
