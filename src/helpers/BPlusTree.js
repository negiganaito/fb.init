/* eslint-disable complexity */
import unrecoverableViolation from "./unrecoverableViolation";

const COMPARISONS = {
  gt: [false, 0],
  gte: [true, 0],
  lt: [true, 1],
  lte: [false, 1],
};

class BPlusTree {
  constructor(comparator, order = 32) {
    this.root = { children: [], isLeaf: true, keys: [] };
    this.rightmostLeaf = this.root;
    this.leftmostLeaf = this.root;
    this.comparator = comparator;
    this.order = order;
  }

  static fromSorted(sorted, comparator, order) {
    const tree = new this(comparator, order);
    const iterator = sorted[Symbol.iterator]();
    let { done, value } = iterator.next();

    while (!done) {
      const path = [];
      let node = tree.leftmostLeaf;
      let index;

      while (!node.isLeaf) {
        path.push([node, -1]);
        index = node.keys.length;
        node = node.children[index];
      }

      let remainingSpace = (tree.order - 1) * 2 - node.keys.length;

      while (!done && remainingSpace > 0) {
        node.keys.push(value[0]);
        node.children.push(value[1]);
        remainingSpace--;
        ({ done, value } = iterator.next());
      }

      tree.splitIfNeeded(node, path, true);
    }

    return tree;
  }

  findLeaf(key, path) {
    let node = this.leftmostLeaf;
    let index = -1;

    while (!node.isLeaf) {
      path?.push([node, index]);
      index = this.binarySearch(node.keys, key, COMPARISONS.gt);
      if (index === -1) index = node.keys.length;
      node = node.children[index];
    }

    return [node, index];
  }

  binarySearch(keys, key, comparison) {
    let left = 0;
    let right = keys.length - 1;

    while (left <= right) {
      const mid = (left + right) >> 1;
      if (
        comparison[0]
          ? this.comparator(keys[mid], key) < 0
          : this.comparator(keys[mid], key) <= 0
      ) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    const result = [left, right][comparison[1]];
    return result === keys.length ? -1 : result;
  }

  insertKey(keys, key) {
    if (!keys.length) {
      keys.push(key);
      return [0, 0];
    }

    const index = this.binarySearch(keys, key, COMPARISONS.gte);

    if (index === -1) return [keys.push(key) - 1, 0];
    else if (this.comparator(keys[index], key) === 0) return [index, 1];

    keys.splice(index, 0, key);
    return [index, 0];
  }

  splitIfNeeded(node, path, isInsertion) {
    while (node.keys.length >= this.order) {
      const parentEntry = path.pop() || [
        (this.leftmostLeaf = { children: [node], isLeaf: false, keys: [] }),
      ];
      const parent = parentEntry[0];
      const midIndex = Math.floor(node.keys.length / 2);
      let newNode;

      if (node.isLeaf) {
        newNode = node.next = {
          children: node.children.slice(midIndex),
          isLeaf: true,
          keys: node.keys.slice(midIndex),
          next: node.next,
          prev: node,
        };
        newNode.next
          ? (newNode.next.prev = newNode)
          : (this.rightmostLeaf = newNode);
      } else {
        newNode = {
          children: node.children.slice(midIndex + 1),
          isLeaf: false,
          keys: node.keys.slice(midIndex + 1),
        };
      }

      if (isInsertion) {
        parent.keys.push(node.keys[midIndex]);
        parent.children.push(newNode);
      } else {
        const [insertIndex] = this.insertKey(parent.keys, node.keys[midIndex]);
        parent.children.splice(insertIndex + 1, 0, newNode);
      }

      node.keys.length = midIndex;
      node.children.length = midIndex + (node.isLeaf ? 0 : 1);
      node = parent;
    }
  }

  clear() {
    this.leftmostLeaf =
      this.root =
      this.rightmostLeaf =
        { children: [], isLeaf: true, keys: [] };
  }

  delete(key) {
    const minKeys = Math.floor(this.order / 2);
    const path = [];
    const [leaf, index] = this.findLeaf(key, path);
    const keyIndex = this.findKeyIndex(leaf.keys, key, COMPARISONS.gte);
    if (keyIndex === -1 || this.compare(leaf.keys[keyIndex], key) !== 0)
      return false;
    leaf.keys.splice(keyIndex, 1);
    leaf.children.splice(keyIndex, 1);
    let currentNode = leaf;
    let currentIndex = index;
    while (currentNode.keys.length < minKeys && path.length) {
      const parent = path.pop();
      const parentNode = parent[0];
      // const parentIndex = parent[1];
      const siblings = [
        [parentNode.children[currentIndex - 1], currentNode, currentIndex - 1],
        [currentNode, parentNode.children[currentIndex + 1], currentIndex],
      ].filter(([left, right]) => left && right);
      for (const [left, right, parentIndex] of siblings) {
        if (left.keys.length + right.keys.length >= minKeys * 2) {
          if (currentNode.isLeaf) {
            const mergedKeys = left.keys.concat(right.keys);
            const mergedChildren = left.children.concat(right.children);
            left.keys = mergedKeys.splice(0, minKeys);
            right.keys = mergedKeys;
            left.children = mergedChildren.splice(0, minKeys);
            right.children = mergedChildren;
            parentNode.keys[parentIndex] = right.keys[0];
          } else {
            const mergedKeys = left.keys.concat(
              [parentNode.keys[parentIndex]],
              right.keys
            );
            const mergedChildren = left.children.concat(right.children);
            left.keys = mergedKeys.splice(0, minKeys);
            right.keys = mergedKeys;
            left.children = mergedChildren.splice(0, minKeys + 1);
            right.children = mergedChildren;
            parentNode.keys[parentIndex] = mergedKeys.shift();
          }
          return true;
        }
      }
      // eslint-disable-next-line no-unreachable-loop
      for (const [left, right, parentIndex] of siblings) {
        left.keys = left.keys.concat(right.keys);
        if (currentNode.isLeaf) {
          left.children = left.children.concat(right.children);
          right.keys.length = 0;
          if (right.next) {
            right.next.prev = left;
          } else {
            this.leafHead = left;
          }
          left.next = right.next;
        } else {
          left.keys = left.keys.concat(
            parentNode.keys[parentIndex],
            right.keys
          );
          left.children = left.children.concat(right.children);
        }
        parentNode.keys.splice(parentIndex, 1);
        parentNode.children.splice(parentIndex + 1, 1);
        break;
      }
    }
    if (!this.leafTail.keys.length && this.leafTail.children.length) {
      const newRoot = this.leafTail;
      if (newRoot.isLeaf) {
        throw unrecoverableViolation("cannot be leaf", "maw_db");
      }
      this.leafTail = newRoot.children[0];
    }
    return true;
  }

  *entries(options = {}) {
    let { dir = "asc", ...rest } = options;

    if (rest.gt && rest.gte)
      throw unrecoverableViolation(
        "cannot specify both greater than and greater than or equal",
        "maw_db"
      );
    if (rest.lt && rest.lte)
      throw unrecoverableViolation(
        "cannot specify both less than and less than or equal",
        "maw_db"
      );

    if (dir === "asc") {
      let node = rest.gt
        ? this.findLeaf(rest.gt)[0]
        : rest.gte
        ? this.findLeaf(rest.gte)[0]
        : this.root;

      let index = rest.gt
        ? this.binarySearch(node.keys, rest.gt, COMPARISONS.gt)
        : rest.gte
        ? this.binarySearch(node.keys, rest.gte, COMPARISONS.gte)
        : 0;

      while (node) {
        const currentNode = node;
        while (index !== -1 && index < currentNode.keys.length) {
          const key = currentNode.keys[index];
          if (
            (rest.lt && this.comparator(key, rest.lt) >= 0) ||
            (rest.lte && this.comparator(key, rest.lte) > 0)
          )
            return;

          const nextKey = yield [
            currentNode.keys[index],
            currentNode.children[index],
          ];

          if (nextKey !== null) {
            if (this.comparator(nextKey, key) <= 0)
              throw unrecoverableViolation(
                "key must be greater than current key",
                "maw_db"
              );
            index = this.binarySearch(
              currentNode.keys,
              nextKey,
              COMPARISONS.gte
            );
            if (index === -1) {
              [node, index] = this.findLeaf(nextKey);
              index = this.binarySearch(node.keys, nextKey, COMPARISONS.gte);
            }
          } else {
            const keyChanged = currentNode.keys[index] !== key;
            if (keyChanged) {
              index = this.binarySearch(currentNode.keys, key, COMPARISONS.lte);
              // eslint-disable-next-line max-depth
              if (index === -1) {
                [node, index] = this.findLeaf(key);
                index = this.binarySearch(node.keys, key, COMPARISONS.lte);
              }
            }
            index++;
          }
        }
        node = currentNode.next;
        index = 0;
      }
    } else {
      let node = rest.lt
        ? this.findLeaf(rest.lt)[0]
        : rest.lte
        ? this.findLeaf(rest.lte)[0]
        : this.rightmostLeaf;

      let index = rest.lt
        ? this.binarySearch(node.keys, rest.lt, COMPARISONS.lt)
        : rest.lte
        ? this.binarySearch(node.keys, rest.lte, COMPARISONS.lte)
        : node.keys.length - 1;

      while (node) {
        const currentNode = node;
        while (index !== -1 && index >= 0) {
          const key = currentNode.keys[index];
          if (
            (rest.gt && this.comparator(key, rest.gt) <= 0) ||
            (rest.gte && this.comparator(key, rest.gte) < 0)
          )
            return;

          const nextKey = yield [
            currentNode.keys[index],
            currentNode.children[index],
          ];

          if (nextKey !== null) {
            if (this.comparator(nextKey, key) >= 0)
              throw unrecoverableViolation(
                "key must be less than current key",
                "maw_db"
              );
            index = this.binarySearch(
              currentNode.keys,
              nextKey,
              COMPARISONS.lte
            );
            if (index === -1) {
              [node, index] = this.findLeaf(nextKey);
              index = this.binarySearch(node.keys, nextKey, COMPARISONS.lte);
            }
          } else {
            const keyChanged = currentNode.keys[index] !== key;
            if (keyChanged) {
              index = this.binarySearch(currentNode.keys, key, COMPARISONS.gte);
              // eslint-disable-next-line max-depth
              if (index === -1) {
                [node, index] = this.findLeaf(key);
                index = this.binarySearch(node.keys, key, COMPARISONS.gte);
              }
            }
            index--;
          }
        }
        node = currentNode.prev;
        // eslint-disable-next-line no-constant-binary-expression
        index = node?.keys.length - 1 ?? -1;
      }
    }
  }

  get(key) {
    const [node] = this.findLeaf(key);
    const index = this.binarySearch(node.keys, key, COMPARISONS.gte);
    if (index === -1 || this.comparator(node.keys[index], key) !== 0) {
      throw unrecoverableViolation(`key not found: ${String(key)}`, "maw_db");
    }
    return node.children[index];
  }

  getWithDefault(key, defaultValue) {
    const [node] = this.findLeaf(key);
    const index = this.binarySearch(node.keys, key, COMPARISONS.gte);
    return index === -1 || this.comparator(node.keys[index], key) !== 0
      ? defaultValue
      : node.children[index];
  }

  has(key) {
    const [node] = this.findLeaf(key);
    return (
      node.keys.findIndex((nodeKey) => this.comparator(key, nodeKey) === 0) !==
      -1
    );
  }

  set(key, value) {
    const path = [];
    const [node] = this.findLeaf(key, path);
    const [index, existingIndex] = this.insertKey(node.keys, key);
    node.children.splice(index, existingIndex, value);
    this.splitIfNeeded(node, path, false);
    return this;
  }
}

export default BPlusTree;
