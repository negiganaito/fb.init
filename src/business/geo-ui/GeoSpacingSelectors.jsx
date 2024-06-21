/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { GeoPrivateDefaultSpacingGeneratedStyles } from "./GeoPrivateDefaultSpacingGeneratedStyles";

// eslint-disable-next-line complexity
const selectSpacing = ({
  bounds,
  context,
  relation,
  positions = ["vertical", "horizontal"],
  offsets = [],
  target,
}) => {
  const mapStyles = (styles, positions) =>
    positions.map((position) => styles[position]);

  const getInternalSpacingStyles = (relation, positions) => {
    const stylesMap =
      relation === "page"
        ? GeoPrivateDefaultSpacingGeneratedStyles.containerInternalPageSpacingStyles
        : GeoPrivateDefaultSpacingGeneratedStyles.containerInternalComponentSpacingStyles;
    return mapStyles(stylesMap, positions);
  };

  const getExternalSpacingStyles = (relation, positions) => {
    let stylesMap;
    switch (relation) {
      case "related":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.containerExternalRelatedSpacingStyles;
        break;
      case "unrelated":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.containerExternalUnrelatedSpacingStyles;
        break;
      case "section":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.containerExternalSectionSpacingStyles;
        break;
      default:
        return [];
    }
    return mapStyles(stylesMap, positions);
  };

  const getComponentSpacingStyles = (target, positions, offsets) => {
    const mapComponentStyles = (styles, positions) =>
      positions.map((position) => styles[position]);
    const mapOffsetStyles = (styles, offsets) =>
      offsets.map((offset) => styles[offset]);

    let styles = [];
    let offsetStyles = [];
    switch (target) {
      case "fine":
        styles = mapComponentStyles(
          GeoPrivateDefaultSpacingGeneratedStyles.componentFineSpacingStyles,
          positions
        );
        offsetStyles = mapOffsetStyles(
          GeoPrivateDefaultSpacingGeneratedStyles.componentFineSpacingOffsetStyles,
          offsets
        );
        break;
      case "coarse":
        styles = mapComponentStyles(
          GeoPrivateDefaultSpacingGeneratedStyles.componentCoarseSpacingStyles,
          positions
        );
        offsetStyles = mapOffsetStyles(
          GeoPrivateDefaultSpacingGeneratedStyles.componentCoarseSpacingOffsetStyles,
          offsets
        );
        break;
      default:
        styles = mapComponentStyles(
          GeoPrivateDefaultSpacingGeneratedStyles.componentNormalSpacingStyles,
          positions
        );
        offsetStyles = mapOffsetStyles(
          GeoPrivateDefaultSpacingGeneratedStyles.componentNormalSpacingOffsetStyles,
          offsets
        );
        break;
    }
    return [...styles, ...offsetStyles];
  };

  const getExternalComponentSpacingStyles = (relation, positions) => {
    const stylesMap =
      relation === "related"
        ? GeoPrivateDefaultSpacingGeneratedStyles.componentExternalRelatedSpacingStyles
        : GeoPrivateDefaultSpacingGeneratedStyles.componentExternalUnrelatedSpacingStyles;
    return mapStyles(stylesMap, positions);
  };

  const getContentSpacingStyles = (relation, positions) => {
    let stylesMap;
    switch (relation) {
      case "heading":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.contentExternalHeadingSpacingStyles;
        break;
      case "paragraph":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.contentExternalParagraphSpacingStyles;
        break;
      case "section":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.contentExternalSectionSpacingStyles;
        break;
      default:
        return [];
    }
    return mapStyles(stylesMap, positions);
  };

  const getControlSpacingStyles = (target, positions) => {
    const stylesMap =
      target === "fine"
        ? GeoPrivateDefaultSpacingGeneratedStyles.controlFineSpacingStyles
        : target === "coarse"
        ? GeoPrivateDefaultSpacingGeneratedStyles.controlCoarseSpacingStyles
        : GeoPrivateDefaultSpacingGeneratedStyles.controlNormalSpacingStyles;
    return mapStyles(stylesMap, positions);
  };

  const getInputSpacingStyles = (positions) =>
    mapStyles(
      GeoPrivateDefaultSpacingGeneratedStyles.inputSpacingStyles,
      positions
    );

  switch (context) {
    case "container":
      if (
        bounds === "internal" &&
        (relation === "page" || relation === "component")
      )
        return getInternalSpacingStyles(relation, positions);
      if (
        bounds === "external" &&
        (relation === "related" ||
          relation === "unrelated" ||
          relation === "section")
      )
        return getExternalSpacingStyles(relation, positions);
      break;
    case "component":
      if (bounds === "internal")
        return getComponentSpacingStyles(target, positions, offsets);
      if (
        bounds === "external" &&
        (relation === "related" || relation === "unrelated")
      )
        return getExternalComponentSpacingStyles(relation, positions);
      break;
    case "content":
      if (
        relation === "heading" ||
        relation === "paragraph" ||
        relation === "section"
      )
        return getContentSpacingStyles(relation, positions);
      break;
    case "control":
      if (bounds === "internal")
        return getControlSpacingStyles(target, positions);
      break;
    case "input":
      if (bounds === "internal") return getInputSpacingStyles(positions);
      break;
  }
  return null;
};

const selectLayoutSpacing = ({ context, relation, direction }) => {
  const mapStyles = (styles, positions) =>
    positions.map((position) => styles[position]);

  const getContainerSpacingStyles = (relation, positions) => {
    let stylesMap;
    switch (relation) {
      case "related":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.layoutContainerExternalRelatedSpacingStyles;
        break;
      case "unrelated":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.layoutContainerExternalUnrelatedSpacingStyles;
        break;
      case "section":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.layoutContainerExternalSectionSpacingStyles;
        break;
      default:
        return [];
    }
    return mapStyles(stylesMap, positions);
  };

  const getComponentSpacingStyles = (relation, positions) => {
    const stylesMap =
      relation === "related"
        ? GeoPrivateDefaultSpacingGeneratedStyles.layoutComponentExternalRelatedSpacingStyles
        : GeoPrivateDefaultSpacingGeneratedStyles.layoutComponentExternalUnrelatedSpacingStyles;
    return mapStyles(stylesMap, positions);
  };

  const getContentSpacingStyles = (relation, positions) => {
    let stylesMap;
    switch (relation) {
      case "heading":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.layoutContentExternalHeadingSpacingStyles;
        break;
      case "paragraph":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.layoutContentExternalParagraphSpacingStyles;
        break;
      case "section":
        stylesMap =
          GeoPrivateDefaultSpacingGeneratedStyles.layoutContentExternalSectionSpacingStyles;
        break;
      default:
        return [];
    }
    return mapStyles(stylesMap, positions);
  };

  const directions = {
    "vertical-reverse": "bottom",
    vertical: "top",
    "horizontal-reverse": "start",
    horizontal: "end",
  };

  const positions = [directions[direction] || "end"];

  switch (context) {
    case "container":
      if (
        relation === "related" ||
        relation === "unrelated" ||
        relation === "section"
      )
        return getContainerSpacingStyles(relation, positions);
      break;
    case "component":
      if (relation === "related" || relation === "unrelated")
        return getComponentSpacingStyles(relation, positions);
      break;
    case "content":
      if (
        relation === "heading" ||
        relation === "paragraph" ||
        relation === "section"
      )
        return getContentSpacingStyles(relation, positions);
      break;
  }
  return null;
};

export { selectLayoutSpacing, selectSpacing };
