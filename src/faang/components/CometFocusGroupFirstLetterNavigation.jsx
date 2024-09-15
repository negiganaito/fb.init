/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useEffect, useState } from "react";

import isStringNullOrEmpty from "../../helpers/isStringNullOrEmpty";

const getFirstLetter = (str) => str.slice(0, 1).toLowerCase();

export const useFirstLetterNavigationTag = (ref) => {
  const [firstLetter, setFirstLetter] = useState(undefined);

  useEffect(() => {
    const text = ref?.current?.innerText;
    if (!isStringNullOrEmpty(text)) {
      setFirstLetter(getFirstLetter(text));
    }
  }, [ref]);

  return firstLetter;
};

export const handleFirstLetterNavigation = (event) => {
  if (event.type === "PRINT_CHAR") {
    event.event.stopPropagation();
    const key = event.event.key.toLowerCase();
    const item = event.getItemByTag(key);
    if (item !== null) {
      event.focusItem(item);
    }
  }
};
