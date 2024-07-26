/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useMemo } from "react";

import { getUri } from "../business/helpers/ConstUriUtils";
import isRelativeURL from "../business/helpers/isRelativeURL";
import BaseLinkUriBaseContext from "../context/BaseLinkUriBaseContext";

function transformRelativeUri(baseUri, relativeUri) {
  if (isRelativeURL(relativeUri)) {
    const uri = getUri(relativeUri);
    if (uri !== null) {
      let newUri = baseUri
        ?.addQueryParams(uri.getQueryParams())
        ?.setPath(uri.getPath())
        ?.setFragment(uri.getFragment())
        ?.toString();
      if (newUri !== null) return newUri;
    }
  }
  return relativeUri;
}

function useTransformRelativeUri(relativeUri) {
  const baseUri = useContext(BaseLinkUriBaseContext);
  return useMemo(
    () =>
      baseUri === null || relativeUri === null
        ? relativeUri
        : transformRelativeUri(baseUri, relativeUri),
    [baseUri, relativeUri]
  );
}

export default useTransformRelativeUri;
