/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { caml_is_extension, create } from "./bs_caml_exceptions";
import { some } from "./bs_caml_option";

const CamlJsError = create("Caml_js_exceptions.Error");

function internalToOCamlException(ex) {
  if (caml_is_extension(ex)) {
    return ex;
  } else {
    return { RE_EXN_ID: CamlJsError, _1: ex };
  }
}

function camlAsJsExn(ex) {
  if (ex.RE_EXN_ID === CamlJsError) {
    return some(ex._1);
  }
}

export { CamlJsError as $$Error, camlAsJsExn, internalToOCamlException };
