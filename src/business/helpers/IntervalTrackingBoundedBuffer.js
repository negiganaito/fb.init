/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import CircularBuffer from "./CircularBuffer";

const DEFAULT_SIZE = 5000;

class IntervalTrackingBoundedBuffer {
  constructor(size = DEFAULT_SIZE) {
    if (size <= 0) {
      throw new Error("Size for a buffer must be greater than zero.");
    }

    this.bufferSize = size;
    this.buffer = new CircularBuffer(size);
    this.buffer.onEvict(() => {
      this.evictionCount++;
    });

    this.activeIntervals = [];
    this.nextId = 1;
    this.writeCount = 0;
    this.evictionCount = 0;
  }

  open() {
    const id = this.nextId++;
    const startIdx = this.writeCount;
    let overflowSize = null;
    let closed = false;

    const interval = {
      id,
      startIdx,
      hasOverflown: () => interval.getOverflowSize() > 0,
      getOverflowSize: () =>
        overflowSize !== null
          ? overflowSize
          : Math.max(this.evictionCount - startIdx, 0),
      close: () => {
        if (closed) return [];
        closed = true;
        overflowSize = this.evictionCount - startIdx;
        return this.cleanup(id);
      },
    };

    this.activeIntervals.push(interval);
    return interval;
  }

  pushElement(element) {
    if (this.activeIntervals.length > 0) {
      this.buffer.write(element);
      this.writeCount++;
    }
    return this;
  }

  isActive() {
    return this.activeIntervals.length > 0;
  }

  cleanup(id) {
    let minStartIdx = null;
    let minIdx = null;
    let removeIdx = null;
    let startIdxToRemove = null;

    for (let i = 0; i < this.activeIntervals.length; i++) {
      const interval = this.activeIntervals[i];
      const { startIdx } = interval;
      if (interval.id === id) {
        removeIdx = i;
        startIdxToRemove = startIdx;
      } else {
        if (minStartIdx === null || startIdx < minStartIdx) {
          minStartIdx = startIdx;
        }
      }
      if (minIdx === null || startIdx < minIdx) {
        minIdx = startIdx;
      }
    }

    if (removeIdx === null || minIdx === null || startIdxToRemove === null) {
      console.log("messed up state inside IntervalTrackingBoundedBuffer");
      return [];
    }

    this.activeIntervals.splice(removeIdx, 1);
    const readStartIdx = this.getReadStartIdx(startIdxToRemove);
    const elements = this.buffer.read().slice(readStartIdx);
    const elementsToDrop =
      this.getReadStartIdx(
        minStartIdx === null ? this.writeCount : minStartIdx
      ) - readStartIdx;
    if (elementsToDrop > 0) {
      this.buffer.dropFirst(elementsToDrop);
      this.evictionCount += elementsToDrop;
    }
    return elements;
  }

  getReadStartIdx(startIdx) {
    return Math.max(startIdx - this.evictionCount, 0);
  }
}

export default IntervalTrackingBoundedBuffer;
