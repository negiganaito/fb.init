/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useId, useMemo } from "react";

import BaseInlinePressable from "./BaseInlinePressable";
import BaseToastContentWrapper from "./BaseToastContentWrapper";
import BaseViewReact from "./BaseView.react";
import { tabbableScopeQuery } from "./focusScopeQueries";
import XPlatReactFocusRegion from "./XPlatReactFocusRegion";

const styles = {
  item: {
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    paddingBottom: "x19yoh24",
    paddingStart: "xrxijuk",
    paddingLeft: null,
    paddingRight: null,
    paddingEnd: "xpowjs8",
    paddingTop: "x6enp1t",
    ,
  },
  itemText: {
    flexGrow: "x1iyjqo2",
    ,
  },
  link: {
    wordBreak: "xdnwjd9",
    ,
  },
  root: {
    alignItems: "x6s0dn4",
    backgroundColor: "x1wkzo03",
    borderTopColor: "xlnzwam",
    borderEndColor: "x12rs7x4",
    borderBottomColor: "xm9qwu6",
    borderStartColor: "xup3dfi",
    borderTopStartRadius: "x1192kqh",
    borderTopEndRadius: "xjfsc2c",
    borderBottomEndRadius: "xg8fqjl",
    borderBottomStartRadius: "x1kdh5me",
    borderTopStyle: "xhf2mca",
    borderEndStyle: "xrf2tuc",
    borderBottomStyle: "x13y0ya8",
    borderStartStyle: "x1pyzo2z",
    borderTopWidth: "xmqxc35",
    borderEndWidth: "x7gbks2",
    borderBottomWidth: "x21fg80",
    borderStartWidth: "x1q3d8fi",
    boxShadow: "xi1c1fh",
    display: "x78zum5",
    flexShrink: "x2lah0s",
    maxWidth: "x1cs6qxi",
    minWidth: "x1hqenl9",
    paddingTop: "x192rfv7",
    paddingBottom: "x13jxccy",
    paddingStart: "xuv3zuj",
    paddingLeft: null,
    paddingRight: null,
    paddingEnd: "xd3owfx",
    ,
  },
  rootFullWidth: {
    width: "xh8yej3",
    ,
  },
};

const BaseToast = ({
  action,
  addOnStart,
  closeButton,
  linkWrapper,
  message,
  onDismiss,
  size = "full-width",
  toastRef,
  useInvertedDisplayMode = true,
  ...props
}) => {
  const toastMessageId = useId();
  const alertProps = useMemo(
    () => (action !== null ? {} : { "aria-atomic": true, role: "alert" }),
    [action]
  );

  let content = (
    <>
      {addOnStart && (
        <BaseViewReact xstyle={styles.item}>{addOnStart}</BaseViewReact>
      )}
      <BaseViewReact xstyle={[styles.item, styles.itemText]} {...alertProps}>
        {message({ toastMessageId })}
      </BaseViewReact>
      {action && (
        <XPlatReactFocusRegion autoFocusQuery={tabbableScopeQuery}>
          <BaseViewReact xstyle={styles.item}>
            {action.element ??
              (action.labelRenderer && (
                <BaseInlinePressable
                  onPress={(e) => {
                    onDismiss();
                    action.onPress(e);
                  }}
                  xstyle={styles.link}
                >
                  {action.labelRenderer(action.label)}
                </BaseInlinePressable>
              ))}
          </BaseViewReact>
        </XPlatReactFocusRegion>
      )}
      {closeButton && (
        <BaseViewReact xstyle={styles.item}>{closeButton}</BaseViewReact>
      )}
    </>
  );

  if (linkWrapper) {
    content = linkWrapper(content);
  }

  return (
    <BaseToastContentWrapper
      ref={toastRef}
      useInvertedDisplayMode={useInvertedDisplayMode}
      xstyle={[styles.root, size === "full-width" && styles.rootFullWidth]}
    >
      {content}
    </BaseToastContentWrapper>
  );
};

BaseToast.displayName = `${BaseToast.name}`;

export default BaseToast;
