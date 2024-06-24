/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useState } from "react";
import useStable from "useStable";

const useIsPristineValue = (value, initialPristineValue) => {
  const [isPristine, setIsPristine] = useState(initialPristineValue);
  const currentValue = useStable(() => value);
  if (isPristine && value !== currentValue) {
    setIsPristine(false);
  }
  return isPristine;
};

export default useIsPristineValue;
