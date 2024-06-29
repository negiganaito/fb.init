/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import useDocumentTranslationStatusObserver from "../../hooks/useDocumentTranslationStatusObserver";
import DocumentTranslationStatusContext from "../contexts/DocumentTranslationStatusContext";

function DocumentTranslationStatusProvider({ children }) {
  const statusObserver = useDocumentTranslationStatusObserver();

  return (
    <DocumentTranslationStatusContext.Provider value={statusObserver}>
      {children}
    </DocumentTranslationStatusContext.Provider>
  );
}

DocumentTranslationStatusProvider.displayName = `DocumentTranslationStatusProvider`;

function useTranslationKeyForTextParent() {
  const context = useContext(DocumentTranslationStatusContext);
  return context ? uuidv4() : undefined;
}

export { DocumentTranslationStatusProvider, useTranslationKeyForTextParent };
