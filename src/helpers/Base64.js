/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function encodeBlock(block) {
  block =
    (block.charCodeAt(0) << 16) |
    (block.charCodeAt(1) << 8) |
    block.charCodeAt(2);
  return String.fromCharCode(
    g.charCodeAt(block >>> 18),
    g.charCodeAt((block >>> 12) & 63),
    g.charCodeAt((block >>> 6) & 63),
    g.charCodeAt(block & 63)
  );
}

const i =
  ">___?456789:;<=_______\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";

function decodeBlock(block) {
  block =
    (i.charCodeAt(block.charCodeAt(0) - 43) << 18) |
    (i.charCodeAt(block.charCodeAt(1) - 43) << 12) |
    (i.charCodeAt(block.charCodeAt(2) - 43) << 6) |
    i.charCodeAt(block.charCodeAt(3) - 43);
  return String.fromCharCode(block >>> 16, (block >>> 8) & 255, block & 255);
}

const Base64 = {
  encode(string) {
    string = unescape(encodeURIComponent(string));
    const padding = (string.length + 2) % 3;
    string = (string + "\0\0".slice(padding)).replace(
      /[\s\S]{3}/g,
      encodeBlock
    );
    return string.slice(0, string.length + padding - 2) + "==".slice(padding);
  },
  decode(encoded) {
    encoded = encoded.replace(/[^A-Za-z0-9+\/]/g, "");
    const padding = (encoded.length + 3) & 3;
    encoded = (encoded + "AAA".slice(padding)).replace(/..../g, decodeBlock);
    encoded = encoded.slice(0, encoded.length + padding - 3);
    try {
      return decodeURIComponent(escape(encoded));
    } catch (error) {
      throw new Error("Not valid UTF-8");
    }
  },
  encodeObject(object) {
    return this.encode(JSON.stringify(object));
  },
  decodeObject(encoded) {
    return JSON.parse(this.decode(encoded));
  },
  encodeNums(nums) {
    return String.fromCharCode(
      ...nums.map((num) =>
        g.charCodeAt((num | -(num > 63 ? 1 : 0)) & -(num > 0 ? 1 : 0) & 63)
      )
    );
  },
};

export default Base64;
