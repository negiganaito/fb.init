/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
// import { WAErr } from "WAErr";
// import { WALogger } from "WALogger";
import { getCrypto } from "./WACryptoDependencies";

const BASE64_PLUS = 43;
const BASE64_SLASH = 47;
const BASE64_EQUAL = 61;
const BASE64_URL_SAFE_PLUS = 45;
const BASE64_URL_SAFE_SLASH = 95;
const MAX_CHUNK_SIZE = 3000;
const BASE64_DATA_URL_SCHEME = "data:image/jpeg;base64,";

const isBase64 = (str) => {
  return (
    typeof str === "string" &&
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str)
  );
};

const encodeB64 = (input) => {
  return base64Encode(input, BASE64_PLUS, BASE64_SLASH, true);
};

const encodeB64UrlSafe = (input, pad = false) => {
  return base64Encode(input, BASE64_URL_SAFE_PLUS, BASE64_URL_SAFE_SLASH, pad);
};

// eslint-disable-next-line max-params
const base64Encode = (input, plus, slash, pad) => {
  const data =
    Array.isArray(input) || input instanceof ArrayBuffer
      ? new Uint8Array(input)
      : input;
  if (data.length <= MAX_CHUNK_SIZE) {
    return encodeChunk(data, plus, slash, pad);
  } else {
    const chunks = [];
    for (let i = 0; i < data.length; i += MAX_CHUNK_SIZE) {
      chunks.push(
        encodeChunk(data.subarray(i, i + MAX_CHUNK_SIZE), plus, slash, pad)
      );
    }
    return chunks.join("");
  }
};

// eslint-disable-next-line max-params
const encodeChunk = (data, plus, slash, pad) => {
  const encodedLength = Math.ceil((data.length * 4) / 3);
  const paddedLength = 4 * Math.ceil(data.length / 3);
  const result = new Array(paddedLength);

  let j = 0;
  for (let i = 0; i < paddedLength; i += 4, j += 3) {
    const triple = (data[j] << 16) | (data[j + 1] << 8) | data[j + 2];
    result[i] = triple >> 18;
    result[i + 1] = (triple >> 12) & 63;
    result[i + 2] = (triple >> 6) & 63;
    result[i + 3] = triple & 63;
  }

  for (let i = 0; i < encodedLength; i++) {
    if (result[i] < 26) result[i] += 65;
    else if (result[i] < 52) result[i] += 71;
    else if (result[i] < 62) result[i] += 4;
    else if (result[i] === 62) result[i] = plus;
    else result[i] = slash;
  }

  for (let i = encodedLength; i < paddedLength; i++) {
    result[i] = BASE64_EQUAL;
  }

  const output = String.fromCharCode(...result);
  return pad ? output : output.substring(0, encodedLength);
};

// eslint-disable-next-line max-params
const decodeBase64 = (input, plus, slash, padChar) => {
  let length = input.length;
  const lookup = new Int32Array(length + (length % 4));

  for (let i = 0; i < length; i++) {
    const charCode = input.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) lookup[i] = charCode - 65;
    else if (charCode >= 97 && charCode <= 122) lookup[i] = charCode - 71;
    else if (charCode >= 48 && charCode <= 57) lookup[i] = charCode + 4;
    else if (charCode === plus) lookup[i] = 62;
    else if (charCode === slash) lookup[i] = 63;
    else if (charCode === padChar) {
      length = i;
      break;
    } else {
      console.error(
        `Found unexpected character code while decoding B64 at index ${i}, length ${length}: ${charCode}`
      );
      return null;
    }
  }

  const outputLength = Math.floor((length * 3) / 4);
  const result = new Uint8Array(outputLength);

  for (let i = 0, j = 0; i < length; i += 4, j += 3) {
    const quadruple =
      (lookup[i] << 18) |
      (lookup[i + 1] << 12) |
      (lookup[i + 2] << 6) |
      lookup[i + 3];
    result[j] = quadruple >> 16;
    result[j + 1] = (quadruple >> 8) & 255;
    result[j + 2] = quadruple & 255;
  }

  return result;
};

const decodeB64 = (input) => {
  const result = decodeBase64(input, BASE64_PLUS, BASE64_SLASH, BASE64_EQUAL);
  if (result) return result.buffer;
  else throw Error("Base64.decode given invalid string");
};

const decodeB64UrlSafe = (input, pad = false) => {
  const result = decodeBase64(
    input,
    BASE64_URL_SAFE_PLUS,
    BASE64_URL_SAFE_SLASH,
    pad ? BASE64_EQUAL : -1
  );
  if (result) return result.buffer;
  else throw Error("Base64.decode given invalid string");
};

const decodeB64ToJsArray = (input) => {
  const data =
    input instanceof ArrayBuffer
      ? new Uint8Array(input)
      : decodeBase64(input, BASE64_PLUS, BASE64_SLASH, BASE64_EQUAL);
  return data ? Array.from(data) : null;
};

const sizeWhenB64Decoded = (input) => {
  return Math.floor((input.length * 3) / 4);
};

const randomBase64 = (length) => {
  const data = new Uint8Array(length);
  getCrypto().getRandomValues(data);
  return encodeB64(data);
};

export {
  BASE64_DATA_URL_SCHEME,
  decodeB64,
  decodeB64ToJsArray,
  decodeB64UrlSafe,
  encodeB64,
  encodeB64UrlSafe,
  isBase64,
  randomBase64,
  sizeWhenB64Decoded,
};
