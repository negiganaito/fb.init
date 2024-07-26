/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import useMergeRefs from "./useMergeRefs";
import { useApplyGeoDomIDsDirectly } from "../business/geo-ui/GeoDomID";

const useGeoPrivatePressableSSRSafeProps = ({
  forwardedRef,
  nativeID,
  accessibilityRelationship,
  ...props
}) => {
  const relationshipKeys = new Set(
    accessibilityRelationship ? Object.keys(accessibilityRelationship) : []
  );
  const relationship = accessibilityRelationship || {};

  const {
    activedescendant,
    controls,
    describedby,
    details,
    errormessage,
    labelledby,
    owns,
    ...otherRelationshipProps
  } = relationship;

  const domIDProps = useApplyGeoDomIDsDirectly({
    id: nativeID || undefined,
    "aria-activedescendant": activedescendant || undefined,
    "aria-controls": controls || undefined,
    "aria-describedby": describedby || undefined,
    "aria-details": details || undefined,
    "aria-errormessage": errormessage || undefined,
    "aria-labelledby": labelledby || undefined,
    "aria-owns": owns || undefined,
  });

  const { ref: domIDRef, ...ariaProps } = domIDProps;
  const mergedRef = useMergeRefs(forwardedRef, domIDRef);

  const filteredAriaProps = Object.keys(ariaProps).reduce((acc, key) => {
    if (relationshipKeys.has(key)) {
      acc[key] = ariaProps[key];
    }
    return acc;
  }, {});

  const finalAccessibilityRelationship = accessibilityRelationship
    ? { ...otherRelationshipProps, ...filteredAriaProps }
    : undefined;

  return {
    forwardedRef: mergedRef,
    nativeID: domIDProps.id,
    accessibilityRelationship: finalAccessibilityRelationship,
    ...props,
  };
};

export default useGeoPrivatePressableSSRSafeProps;
