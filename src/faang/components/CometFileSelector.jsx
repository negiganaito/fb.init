/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useEffect, useRef } from "react";
import Promise from "Promise";

import promiseDone from "../../helpers/promiseDone";
import recoverableViolation from "../../helpers/recoverableViolation";

const normalizeAccept = (accept) =>
  accept
    .map((type) => {
      if (type.indexOf("/") !== -1 || type[0] === ".") return type;
      recoverableViolation(
        `Accept parameter "${type}" for CometFileSelector is being interpreted as a file extension since it has no slash (/), but file extensions must start with a period (.)`,
        "profile_comet"
      );
      return `.${type}`;
    })
    .join(",");

const CometFileSelector = ({
  accept,
  children,
  multiple = false,
  onFilesSelected,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const handleClick = (event) => {
        event.stopPropagation();
      };
      inputElement.addEventListener("click", handleClick);
      return () => {
        inputElement.removeEventListener("click", handleClick);
      };
    }
  }, []);

  const handleClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleChange = useCallback(
    (event) => {
      const result = onFilesSelected(event.currentTarget.files);
      if (result instanceof Promise) {
        promiseDone(result);
      }
      event.currentTarget.value = "";
    },
    [onFilesSelected]
  );

  return (
    <>
      <input
        accept={accept ? normalizeAccept(accept) : undefined}
        className="x1s85apg"
        multiple={multiple}
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />
      {children(handleClick)}
    </>
  );
};

CometFileSelector.displayName = `${CometFileSelector.name} [from ${module.id}]`;

export default CometFileSelector;
