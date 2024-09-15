/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useContext, useId } from "react";
import {
  BaseIsDecorativeContext,
  CometCompositeStructureContext,
  CometDensityAwarenessContext,
  CometDensityModeContext,
  CometFocusGroupContext,
  CometFocusTableContext,
  CometListCellStrictAddOnStart,
} from "some-library";

import { CometVisualCompletionAttributes } from "../../helpers/CometVisualCompletionAttributes";
import getItemRoleFromCompositeRole from "../../helpers/getItemRoleFromCompositeRole";
import stylex from "../../helpers/stylex";

import BaseHeadingContext from "./BaseHeadingContext";
import CometPressable from "./CometPressable";
import FDSText from "./FDSText";
import FDSTextPairing from "./FDSTextPairing";
import { getEndAddOn } from "./getListCellAddOn";

const styles = {
  addOn: {
    alignItems: "x6s0dn4",
    display: "x78zum5",
    flexDirection: "x1q0g3np",
    ,
  },
  addOnWithExpander: { marginEnd: "x1emribx",  },
  addOnWithIcon: { display: "x78zum5",  },
  addOnWithText: { marginStart: "xsgj6o6",  },
  bottomAddOn: {
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    marginEnd: "x12rz0ws",
    marginStart: "x16hk5td",
    ,
  },
  bottomAddOnOverrideRow: {
    flexDirection: "x1q0g3np",
    marginEnd: 0,
    marginStart: 0,
    paddingTop: "x1yrsyyn",
    ,
  },
  bottomAddOnWithFacepile: { marginStart: "x169t7cy",  },
  content: {
    alignItems: "x1qjc9v5",
    borderBottomStyle: "x1q0q8m5",
    borderBottomWidth: 0,
    borderEndStyle: "xu3j5b3",
    borderEndWidth: 0,
    borderStartStyle: "x26u7qi",
    borderStartWidth: 0,
    borderTopStyle: "x13fuv20",
    borderTopWidth: "x972fbf",
    boxSizing: "x9f619",
    display: "x78zum5",
    flexBasis: "x1r8uery",
    flexDirection: "xdt5ytf",
    flexGrow: "x1iyjqo2",
    flexShrink: "xs83m0k",
    justifyContent: "x1qughib",
    marginBottom: 0,
    marginEnd: 0,
    marginStart: 0,
    marginTop: 0,
    minHeight: "x2lwn1j",
    minWidth: "xeuugli",
    paddingTop: "xz9dl7a",
    paddingBottom: "xsag5q8",
    paddingEnd: 0,
    paddingStart: 0,
    position: "relative",
    zIndex: "x1ja2u2z",
    ,
  },
  contentDense: {
    paddingTop: "x1y1aw1k",
    paddingBottom: "xwib8y2",
    ,
  },
  contentWithMoreSpacing: {
    paddingTop: "xyamay9",
    paddingBottom: "x1l90r2v",
    ,
  },
  contentWithMoreSpacingDense: {
    paddingTop: "xz9dl7a",
    paddingBottom: "xsag5q8",
    ,
  },
  disabled: { cursor: "x1h6gzvc", pointerEvents: "x47corl",  },
  endAddOn: {
    marginBottom: "xod5an3",
    marginStart: "x16n37ib",
    marginTop: "x14vqqas",
    position: "relative",
    ,
  },
  endAddOnCenter: {
    marginBottom: "x1e56ztr",
    marginTop: "x1xmf6yo",
    ,
  },
  endAddOnSmall: {
    marginBottom: "x1e56ztr",
    marginStart: "x16n37ib",
    marginTop: "x1xmf6yo",
    position: "relative",
    ,
  },
  listCellMinHeight: { minHeight: "x1gg8mnh",  },
  pressable: {
    borderTopStartRadius: "x1lq5wgf",
    borderTopEndRadius: "xgqcy7u",
    borderBottomEndRadius: "x30kzoy",
    borderBottomStartRadius: "x9jhf4c",
    display: "x1lliihq",
    ,
  },
  responsiveButtons: {
    flexGrow: "x1iyjqo2",
    paddingBottom: "x10b6aqq",
    paddingTop: "x1yrsyyn",
    ,
  },
  responsiveContent: {
    alignItems: "x6s0dn4",
    flexDirection: "x1q0g3np",
    flexWrap: "x1a02dak",
    marginBottom: "x4cne27",
    marginTop: "xifccgj",
    ,
  },
  responsiveText: {
    boxSizing: "x9f619",
    flexBasis: "x4pfjvb",
    flexGrow: "x1iyjqo2",
    flexShrink: "xs83m0k",
    maxWidth: "x193iq5w",
    minWidth: "x1mkiy5m",
    paddingBottom: "x10b6aqq",
    paddingEnd: "x1pi30zi",
    paddingTop: "x1yrsyyn",
    ,
  },
  root: {
    alignItems: "x6s0dn4",
    borderBottomStyle: "x1q0q8m5",
    borderBottomWidth: 0,
    borderEndStyle: "xu3j5b3",
    borderEndWidth: 0,
    borderStartStyle: "x26u7qi",
    borderStartWidth: 0,
    borderTopStyle: "x13fuv20",
    borderTopWidth: "x972fbf",
    boxSizing: "x9f619",
    display: "x78zum5",
    flexDirection: "x1q0g3np",
    flexGrow: "x1iyjqo2",
    flexShrink: "xs83m0k",
    justifyContent: "x1qughib",
    marginBottom: 0,
    marginEnd: 0,
    marginStart: 0,
    marginTop: 0,
    minHeight: "x2lwn1j",
    minWidth: "xeuugli",
    paddingBottom: 0,
    paddingEnd: "x1sxyh0",
    paddingStart: "xurb0ha",
    paddingTop: 0,
    position: "relative",
    zIndex: "x1ja2u2z",
    ,
  },
  rootWithIncreasedHeight: { minHeight: "x1wiwyrm",  },
  selected: { backgroundColor: "x1av1boa",  },
  selectedWashBackground: { backgroundColor: "xljulmy",  },
  startAddOn: {
    alignSelf: "xqcrz7y",
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    marginTop: "x1xmf6yo",
    marginBottom: "x1e56ztr",
    marginEnd: "xq8finb",
    position: "relative",
    ,
  },
  startAddOnDense: {
    marginTop: "x1k70j0n",
    marginBottom: "xzueoph",
    ,
  },
  startAddOnDensityAware: {
    "@media (max-height: 700px)_marginEnd": "x1ywmky0",
    "@media (max-height: 700px)_marginLeft": null,
    "@media (max-height: 700px)_marginRight": null,
    "@media (max-height: 700px)_marginStart": "xnd27nj",
    "@media (max-height: 700px)_marginTop": "xv2ei83",
    "@media (max-height: 700px)_marginBottom": "x1og3r51",
    "@media (max-height: 700px)_transform": "xv3fwf9",
    ,
  },
  visualSwitch: { pointerEvents: "x47corl",  },
};

const alignSelfStyles = {
  center: { alignSelf: "xamitd3",  },
  top: { alignSelf: "xqcrz7y",  },
};

// eslint-disable-next-line complexity
const CometListCellStrict_DEPRECATED = forwardRef((props, ref) => {
  const {
    addOnBottom,
    addOnEnd,
    addOnEndDisabled,
    addOnEndRef,
    // addOnEndTestId,
    addOnEndVerticalAlign = "top",
    addOnStart,
    addOnStartCssSelectionId,
    addOnStartDisabled,
    addOnStartOverrideVerticalStyle,
    // addOnStartTestId,
    addOnStartVerticalAlign = "top",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-pressed": ariaPressed,
    body,
    bodyColor = "secondary",
    bodyLineLimit,
    contentHorizontalPadding,
    dataAttributes,
    describedby,
    disabled = false,
    emphasized = false,
    focusable,
    hasBottomDivider,
    headline,
    headlineAddOn,
    headlineColor = "primary",
    headlineLineLimit,
    id,
    isSemanticHeading,
    level = 3,
    linkProps,
    meta,
    metaColor = "tertiary",
    metaLineLimit,
    metaLocation,
    onFocusChange,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    paddingHorizontal,
    role,
    selected = false,
    selectedBackground,
    semanticHeadingLevel,
    size = "default",
    // testid,
    testOnly_pressed,
  } = props;

  const densityMode = useContext(CometDensityModeContext);
  const densityAwareness = useContext(CometDensityAwarenessContext);
  const uniqueId = useId();

  const isSingleLine =
    (headline !== null &&
      body === null &&
      meta === null &&
      headlineLineLimit !== null &&
      headlineLineLimit === 1) ||
    (headline === null &&
      body !== null &&
      meta === null &&
      bodyLineLimit !== null &&
      bodyLineLimit === 1) ||
    (headline === null &&
      body === null &&
      meta !== null &&
      metaLineLimit !== null &&
      metaLineLimit === 1);

  const isMultiLine =
    (headline !== null &&
      body === null &&
      meta === null &&
      headlineLineLimit !== null &&
      headlineLineLimit > 1) ||
    (headline === null &&
      body !== null &&
      meta === null &&
      bodyLineLimit !== null &&
      bodyLineLimit > 1) ||
    (headline === null &&
      body === null &&
      meta !== null &&
      metaLineLimit !== null &&
      metaLineLimit > 1);

  const isButton =
    addOnEnd !== null &&
    (addOnEnd.type === "primary-button" ||
      addOnEnd.type === "secondary-button" ||
      addOnEnd.type === "body");
  const isExpander = addOnEnd !== null && addOnEnd.type === "expander";
  const endAddOnVerticalAlign =
    isButton || isExpander ? "center" : addOnEndVerticalAlign;
  const startAddOnVerticalAlign = isSingleLine
    ? "center"
    : addOnStartVerticalAlign;

  const isResponsive = addOnBottom !== null && addOnBottom.type === "buttons";
  const isContentWithMoreSpacing =
    addOnStart === null &&
    (isMultiLine || (isSingleLine && (isButton || isExpander)));

  const dataAttributesProps =
    dataAttributes !== null
      ? Object.keys(dataAttributes).reduce((acc, key) => {
          acc[`data-${key}`] = dataAttributes[key];
          return acc;
        }, {})
      : null;

  const content = (
    <div
      className={stylex(
        styles.root,
        isExpander && size !== "small" && styles.rootWithIncreasedHeight,
        size !== "small" && styles.listCellMinHeight
      )}
      style={
        contentHorizontalPadding === null
          ? undefined
          : {
              paddingLeft: contentHorizontalPadding,
              paddingRight: contentHorizontalPadding,
            }
      }
    >
      {addOnStart !== null && (
        <div
          className={stylex(
            styles.startAddOn,
            addOnStartOverrideVerticalStyle,
            alignSelfStyles[startAddOnVerticalAlign],
            densityMode && styles.startAddOnDense,
            densityAwareness === true && styles.startAddOnDensityAware
          )}
          data-testid={undefined}
          id={addOnStartCssSelectionId}
        >
          <BaseIsDecorativeContext.Provider value={true}>
            <CometListCellStrictAddOnStart
              addOnStart={addOnStart}
              disabled={
                addOnStartDisabled !== null ? addOnStartDisabled : disabled
              }
            />
          </BaseIsDecorativeContext.Provider>
        </div>
      )}
      <div className="x6s0dn4 xkh2ocl x1q0q8m5 x1qhh985 xu3j5b3 xcfux6l x26u7qi xm0m39n x13fuv20 x972fbf x9f619 x78zum5 x1q0g3np x1iyjqo2 xs83m0k x1qughib xat24cr x11i5rnm x1mh8g0r xdj266r x2lwn1j xeuugli x18d9i69 x4uap5 xkhd6sd xexx8yu relative x1ja2u2z">
        <div
          className={stylex(
            styles.content,
            densityMode && styles.contentDense,
            isContentWithMoreSpacing && styles.contentWithMoreSpacing,
            isContentWithMoreSpacing &&
              densityMode &&
              styles.contentWithMoreSpacingDense,
            isResponsive && styles.responsiveContent
          )}
        >
          <div className={stylex(isResponsive && styles.responsiveText)}>
            <BaseIsDecorativeContext.Provider value={true}>
              <BaseHeadingContext.Provider
                value={semanticHeadingLevel !== null ? semanticHeadingLevel : 3}
              >
                <FDSTextPairing
                  body={body}
                  bodyColor={disabled ? "disabled" : bodyColor}
                  bodyLineLimit={bodyLineLimit}
                  headline={headline}
                  headlineAddOn={headlineAddOn}
                  headlineColor={disabled ? "disabled" : headlineColor}
                  headlineId={uniqueId}
                  headlineLineLimit={headlineLineLimit}
                  isSemanticHeading={
                    isSemanticHeading === true || semanticHeadingLevel !== null
                  }
                  level={level}
                  meta={meta}
                  metaColor={disabled ? "disabled" : metaColor}
                  metaLineLimit={metaLineLimit}
                  metaLocation={metaLocation}
                  reduceEmphasis={emphasized === false}
                />
              </BaseHeadingContext.Provider>
            </BaseIsDecorativeContext.Provider>
          </div>
          {addOnBottom !== null && (
            <div
              className={stylex(
                styles.bottomAddOn,
                addOnBottom.type === "facepile" &&
                  styles.bottomAddOnWithFacepile,
                addOnBottom.type === "override-row" &&
                  styles.bottomAddOnOverrideRow,
                isResponsive && styles.responsiveButtons
              )}
            >
              <div className="x193iq5w">
                <AddOnBottomComponent addOnBottom={addOnBottom} />
              </div>
            </div>
          )}
        </div>
        {addOnEnd !== null && (
          <div
            className={stylex(
              size !== "small" && styles.endAddOn,
              size === "small" && styles.endAddOnSmall,
              (isButton || isExpander) && styles.endAddOnCenter,
              alignSelfStyles[endAddOnVerticalAlign]
            )}
            data-testid={undefined}
            ref={addOnEndRef}
          >
            <BaseIsDecorativeContext.Provider value={true}>
              <EndAddOnComponent
                addOn={addOnEnd}
                disabled={
                  addOnEndDisabled !== null ? addOnEndDisabled : disabled
                }
                level={level}
                textID={uniqueId}
              />
            </BaseIsDecorativeContext.Provider>
          </div>
        )}
        {(hasBottomDivider !== null ? hasBottomDivider : false) && (
          <div className="x14nfmen x1ey2m1c xjm9jq1 xds687c x17qophe x10l6tqk" />
        )}
      </div>
    </div>
  );

  const expanderChildren =
    addOnEnd !== null &&
    addOnEnd.type === "expander" &&
    addOnEnd.open === true &&
    addOnEnd.children !== null
      ? addOnEnd.children
      : null;

  let ariaChecked;
  let ariaRole;
  if (addOnEnd !== null) {
    switch (addOnEnd.type) {
      case "checkbox":
        ariaChecked = addOnEnd.on;
        ariaRole = "checkbox";
        break;
      case "radio":
        ariaChecked = addOnEnd.on;
        ariaRole = "radio";
        break;
      case "switch":
        ariaChecked = addOnEnd.value;
        ariaRole = "switch";
        break;
    }
  }

  const isExpanderOpen =
    addOnEnd !== null &&
    addOnEnd.type === "expander" &&
    addOnEnd.open === true &&
    addOnEnd.children !== null;

  const { FocusItem } = useContext(CometFocusGroupContext);
  const { FocusCell, FocusRow } = useContext(CometFocusTableContext);
  const { role: compositeRole } = useContext(CometCompositeStructureContext);
  const itemRole =
    role !== null ? role : getItemRoleFromCompositeRole(compositeRole);
  const WrapperComponent =
    itemRole === "row" && FocusRow
      ? FocusRow
      : FocusItem !== null
      ? FocusItem
      : React.Fragment;
  const InnerComponent =
    itemRole === "row" && FocusCell ? FocusCell : React.Fragment;

  return (
    <WrapperComponent>
      <div
        {...CometVisualCompletionAttributes.IGNORE_DYNAMIC}
        aria-selected={itemRole === "option" ? selected : undefined}
        role={itemRole !== null ? itemRole : undefined}
        style={{
          paddingLeft: paddingHorizontal !== null ? paddingHorizontal : 8,
          paddingRight: paddingHorizontal !== null ? paddingHorizontal : 8,
        }}
        {...dataAttributesProps}
      >
        <InnerComponent>
          {onPress !== null || linkProps !== null ? (
            <CometPressable
              aria-checked={ariaChecked}
              aria-current={selected ? "page" : undefined}
              aria-describedby={describedby !== null ? describedby : undefined}
              aria-expanded={
                addOnEnd !== null && addOnEnd.type === "expander"
                  ? isExpanderOpen
                  : undefined
              }
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-pressed={ariaPressed}
              disabled={disabled}
              display="block"
              focusable={focusable}
              id={id}
              linkProps={linkProps}
              onFocusChange={onFocusChange}
              onHoverIn={onHoverIn}
              onHoverOut={onHoverOut}
              onPress={onPress}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              overlayDisabled={selected && selectedBackground !== "none"}
              overlayFocusRingPosition="inset"
              ref={ref}
              role={ariaRole}
              testOnly_pressed={testOnly_pressed}
              testid={undefined}
              xstyle={[
                styles.pressable,
                selected && selectedBackground !== "none" && styles.selected,
                selected &&
                  selectedBackground === "wash" &&
                  styles.selectedWashBackground,
                disabled && styles.disabled,
              ]}
            >
              {content}
            </CometPressable>
          ) : (
            <div
              aria-disabled={disabled}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              className={stylex(
                styles.pressable,
                selected && styles.selected,
                selected &&
                  selectedBackground === "wash" &&
                  styles.selectedWashBackground,
                disabled && styles.disabled
              )}
              data-testid={undefined}
              id={id}
              ref={ref}
            >
              {content}
            </div>
          )}
        </InnerComponent>
      </div>
      {expanderChildren}
    </WrapperComponent>
  );
});

CometListCellStrict_DEPRECATED.displayName = `${CometListCellStrict_DEPRECATED.name} [from ${module.id}]`;

const AddOnBottomComponent = ({ addOnBottom }) => {
  switch (addOnBottom.type) {
    case "facepile":
      return addOnBottom.facepile;
    default:
      return addOnBottom.component;
  }
};

AddOnBottomComponent.displayName = `${AddOnBottomComponent.name} [from ${module.id}]`;

const EndAddOnComponent = ({ addOn, disabled, level, textID }) => {
  const endAddOn = getEndAddOn(addOn, disabled, level, textID);
  const disclosureText =
    addOn.type === "disclosure" && addOn.text !== null ? addOn.text : null;

  return (
    <div
      className={stylex(
        styles.addOn,
        addOn.type === "switch" && styles.visualSwitch
      )}
    >
      {disclosureText !== null && (
        <div className="x2lah0s">
          <FDSText
            color={disabled ? "disabled" : "secondary"}
            numberOfLines={1}
            type={level === 3 ? "body2" : "body3"}
          >
            {disclosureText}
          </FDSText>
        </div>
      )}
      <div
        className={stylex(
          addOn.type === "expander" && styles.addOnWithExpander,
          disclosureText !== null && styles.addOnWithText,
          addOn.type === "icon" && styles.addOnWithIcon
        )}
      >
        {endAddOn}
      </div>
    </div>
  );
};

EndAddOnComponent.displayName = `${EndAddOnComponent.name} [from ${module.id}]`;

export default CometListCellStrict_DEPRECATED;
