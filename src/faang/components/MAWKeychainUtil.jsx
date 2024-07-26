/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function getBufferWithRandomValuesFromLength(length) {
  // eslint-disable-next-line no-restricted-globals
  return self.crypto.getRandomValues(new Uint8Array(length));
}

function mergeBuffers(buffers) {
  const totalLength = buffers.reduce(
    (sum, buffer) => sum + buffer.byteLength,
    0
  );
  const mergedArray = new Uint8Array(totalLength);
  buffers.reduce((offset, buffer) => {
    mergedArray.set(new Uint8Array(buffer), offset);
    return offset + buffer.byteLength;
  }, 0);
  return mergedArray.buffer;
}

function makeAAD(byte1, byte2) {
  return new Uint8Array([byte1, byte2]).buffer;
}

function fromHexString(hexString) {
  const length = hexString.length;
  if (length > 0 && length % 2 === 0 && /^[\da-f]+$/gi.test(hexString)) {
    const byteArray = [];
    for (let i = 0; i < length / 2; ++i) {
      const byte = parseInt(hexString.substring(i * 2, i * 2 + 2), 16);
      byteArray.push(byte);
    }
    return new Uint8Array(byteArray);
  } else {
    return null;
  }
}

export {
  fromHexString,
  getBufferWithRandomValuesFromLength,
  makeAAD,
  mergeBuffers,
};
