/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import source from './fbt/output/vi_VN.json';

const _translationsDictionary = source;

export default class FbtI18nNativeAssets {
  static getString = (hashKey) => {
    // if (englishIsActive) {
    //   return null;
    // }
    return _translationsDictionary[hashKey];
  };
}
