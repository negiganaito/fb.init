/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export const BASE_CODE_START = 58;
export const BASE_CODE_END = 126;
export const BASE_CODE_SIZE = 69;
export const PREFIX_CODE_START = 42;
export const PREFIX_CODE_END = 47;
export const PREFIX_CODE_SIZE = 6;
export const ENCODE_NUMBER_MAX = 100;
export const ENCODED_STRING_WITH_TWO_SYMBOLS_PREFIX_CODE = 33;
export const ENCODED_STRING_WITH_THREE_SYMBOLS_PREFIX_CODE = 38;
export const TOTAL_IDS_SUPPORTED_BY_LEGACY_ENCODING =
  (PREFIX_CODE_SIZE + 1) * BASE_CODE_SIZE;
export const TN_URL_PARAM = "__tn__";
