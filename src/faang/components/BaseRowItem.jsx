/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext } from "react";

import BaseRowContext from "../../context/BaseRowContext";

import BaseViewReact from "./BaseView.react";

const styles = {
  expanding: {
    flexBasis: "x1r8uery",
    flexGrow: "x1iyjqo2",
    flexShrink: "xs83m0k",
    ,
  },
  expandingWithWrap: {
    flexBasis: "x1l7klhg",
    ,
  },
  item: {
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    flexShrink: "x2lah0s",
    maxWidth: "x193iq5w",
    minWidth: "xeuugli",
    ,
  },
  item_DEPRECATED: {
    maxWidth: "x193iq5w",
    minWidth: "xeuugli",
    ,
  },
};

const columnStyles = {
  0: { flexBasis: "xdl72j9",  },
  1: { flexBasis: "x1l7klhg",  },
  2: { flexBasis: "x4pfjvb",  },
  3: { flexBasis: "x1j0tr4d",  },
  4: { flexBasis: "xhnlq4v",  },
  5: { flexBasis: "x15foiic",  },
  6: { flexBasis: "x10r0anl",  },
  7: { flexBasis: "xarxvua",  },
  8: { flexBasis: "xvuwby9",  },
  9: { flexBasis: "xoy383a",  },
  10: { flexBasis: "x3cfelu",  },
};

const verticalAlignStyles = {
  bottom: { alignSelf: "xpvyfi4",  },
  center: { alignSelf: "xamitd3",  },
  stretch: { alignSelf: "xkh2ocl",  },
  top: { alignSelf: "xqcrz7y",  },
};

const BaseRowItem = (
  {
    expanding = false,
    useDeprecatedStyles = false,
    verticalAlign,
    xstyle,
    ...props
  },
  ref
) => {
  const { columns, wrap } = useContext(BaseRowContext);

  return (
    <BaseViewReact
      {...props}
      ref={ref}
      xstyle={[
        useDeprecatedStyles ? styles.item_DEPRECATED : styles.item,
        expanding && styles.expanding,
        expanding && wrap !== "none" && styles.expandingWithWrap,
        columns > 0 && columnStyles[columns],
        verticalAlign !== null && verticalAlignStyles[verticalAlign],
        xstyle,
      ]}
    />
  );
};

BaseRowItem.displayName = `BaseRowItem [from BaseRowItem.react]`;

export default BaseRowItem;
