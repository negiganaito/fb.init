/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useMemo } from "react";
import fbt from "fbt";

import fbicon from "../../helpers/fbicon";
import ix from "../../helpers/ix";

import BaseToast from "./BaseToast";
import CometCircleButton from "./CometCircleButton";
import CometPressable from "./CometPressable";
import FDSText from "./FDSText";

const styles = {
  pressable: {
    alignItems: "x6s0dn4",
    display: "x78zum5",
    flexDirection: "x1q0g3np",
    width: "xh8yej3",
    ,
  },
};

const CometToast = ({
  action,
  href,
  icon,
  impressionLoggingRef,
  message,
  onDismiss,
  supressCloseButton = false,
  target,
  testid = "Toast",
  truncateText = true,
  ...props
}) => {
  const linkProps = useMemo(
    () => (href !== null ? { target, url: href } : undefined),
    [href, target]
  );

  return (
    <BaseToast
      action={
        action
          ? {
              label: action.label,
              // eslint-disable-next-line react/no-unstable-nested-components
              labelRenderer: (label) => (
                <FDSText color="blueLink" numberOfLines={1} type="body3">
                  {label}
                </FDSText>
              ),
              onPress: action.onPress,
              testid: action.testid,
            }
          : undefined
      }
      addOnStart={icon}
      closeButton={
        !supressCloseButton && (
          <CometCircleButton
            icon={fbicon._(ix("478231"), 12)}
            label={fbt._("__JHASH__cCrSTii9yXy__JHASH__")}
            onPress={onDismiss}
            size={24}
          />
        )
      }
      linkWrapper={
        props.onPress !== null || linkProps !== null
          ? // eslint-disable-next-line react/no-unstable-nested-components
            (children) => (
              <CometPressable
                {...props}
                expanding={true}
                linkProps={linkProps}
                xstyle={styles.pressable}
              >
                {children}
              </CometPressable>
            )
          : undefined
      }
      // eslint-disable-next-line react/no-unstable-nested-components
      message={(toastMessageId) => (
        <FDSText
          color="primary"
          id={toastMessageId}
          numberOfLines={truncateText ? 4 : undefined}
          type="body3"
        >
          {message}
        </FDSText>
      )}
      onDismiss={onDismiss}
      toastRef={impressionLoggingRef}
    />
  );
};

CometToast.displayName = `${CometToast.name}`;

export default CometToast;
