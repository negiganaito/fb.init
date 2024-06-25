/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

class CircularBuffer {
  constructor(size) {
    if (size <= 0) {
      throw console.log(
        "Buffer size should be a positive integer",
        "comet_infra"
      );
    }
    this.size = size;
    this.writeIndex = 0;
    this.buffer = [];
    this.evictCallbacks = [];
  }

  write(element) {
    if (this.buffer.length < this.size) {
      this.buffer.push(element);
    } else {
      this.evictCallbacks.forEach((callback) =>
        callback(this.buffer[this.writeIndex])
      );
      this.buffer[this.writeIndex] = element;
      this.writeIndex = (this.writeIndex + 1) % this.size;
    }
    return this;
  }

  onEvict(callback) {
    this.evictCallbacks.push(callback);
    return this;
  }

  read() {
    return this.buffer
      .slice(this.writeIndex)
      .concat(this.buffer.slice(0, this.writeIndex));
  }

  expand(newSize) {
    if (newSize > this.size) {
      const currentBuffer = this.read();
      this.writeIndex = 0;
      this.buffer = currentBuffer;
      this.size = newSize;
    }
    return this;
  }

  dropFirst(n) {
    if (n <= this.size) {
      const currentBuffer = this.read();
      this.writeIndex = 0;
      currentBuffer.splice(0, n);
      this.buffer = currentBuffer;
    }
    return this;
  }

  clear() {
    this.writeIndex = 0;
    this.buffer = [];
    return this;
  }

  currentSize() {
    return this.buffer.length;
  }
}

export default CircularBuffer;
