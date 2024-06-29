/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import shallowArrayEqual from "../business/helpers/shallowArrayEqual";
import useCustomEqualityMemo from "../business/hooks/useCustomEqualityMemo";

function useShallowArrayEqualMemo(value) {
  return useCustomEqualityMemo(value, shallowArrayEqual);
}

export default useShallowArrayEqualMemo;
