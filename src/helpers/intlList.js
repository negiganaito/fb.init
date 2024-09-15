/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import invariant from "fbjs/lib/invariant";
import fbt from "fbt";

const CONJUNCTIONS = {
  AND: "AND",
  NONE: "NONE",
  OR: "OR",
};

const DELIMITERS = {
  BULLET: "BULLET",
  COMMA: "COMMA",
  SEMICOLON: "SEMICOLON",
};

const intlList = (
  items,
  conjunction = CONJUNCTIONS.AND,
  delimiter = DELIMITERS.COMMA
) => {
  const filteredItems = items.filter(Boolean);
  const length = filteredItems.length;

  if (length === 0) {
    return "";
  } else if (length === 1) {
    return filteredItems[0];
  }

  let list = filteredItems[0];
  for (let i = 1; i < length - 1; ++i) {
    switch (delimiter) {
      case DELIMITERS.SEMICOLON:
        list = fbt("__JHASH__2xRftcH2vsr__JHASH__", {
          "previous items": list,
          "following items": filteredItems[i],
        });
        break;
      case DELIMITERS.BULLET:
        list = fbt("__JHASH__A8Te3iyJoQY__JHASH__", {
          "previous items": list,
          "following items": filteredItems[i],
        });
        break;
      default:
        list = fbt("__JHASH__ymp6OXT1HEX__JHASH__", {
          "previous items": list,
          "following items": filteredItems[i],
        });
    }
  }

  return formatList(list, filteredItems[length - 1], conjunction, delimiter);
};

// eslint-disable-next-line max-params
function formatList(list, lastItem, conjunction, delimiter) {
  switch (conjunction) {
    case CONJUNCTIONS.AND:
      return fbt("__JHASH__qQ-J1F_2ppK__JHASH__", {
        "list of items": list,
        "last item": lastItem,
      });
    case CONJUNCTIONS.OR:
      return fbt("__JHASH__pqsshngVpqN__JHASH__", {
        "list of items": list,
        "last item": lastItem,
      });
    case CONJUNCTIONS.NONE:
      switch (delimiter) {
        case DELIMITERS.SEMICOLON:
          return fbt("__JHASH__KtjanthXGG0__JHASH__", {
            "previous items": list,
            "last item": lastItem,
          });
        case DELIMITERS.BULLET:
          return fbt("__JHASH__pWqMqQJ5cvg__JHASH__", {
            "list of items": list,
            "last item": lastItem,
          });
        default:
          return fbt("__JHASH__QEekv2-b_Os__JHASH__", {
            "list of items": list,
            "last item": lastItem,
          });
      }
    default:
      invariant(false, `Unknown conjunction: ${conjunction}`);
  }
}

intlList.DELIMITERS = DELIMITERS;
intlList.CONJUNCTIONS = CONJUNCTIONS;

export default intlList;
