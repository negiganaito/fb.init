/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import validateBaseInput from "validateBaseInput";

import useIsPristineValue from "./useIsPristineValue";

const useBaseInputValidators = (params) => {
  const { isInitialValuePristine = true, validator, value } = params;
  const isPristine = useIsPristineValue(value, isInitialValuePristine);

  return React.useMemo(() => {
    return validateBaseInput(isPristine, value, validator);
  }, [isPristine, validator, value]);
};

export default useBaseInputValidators;
