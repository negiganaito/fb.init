/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useRef } from "react";

import useGeoOnClickOutside from "../hooks/useGeoOnClickOutside";
import useGeoPrivateLayerBehavior from "../hooks/useGeoPrivateLayerBehavior";

const GeoBaseLayerBlurBehavior = ({ children, context = null, onBlur }) => {
  const contextRef = useRef(context);
  const layerRef = useRef(null);
  const LayerBehavior = useGeoPrivateLayerBehavior({ ref: layerRef });

  useGeoOnClickOutside(onBlur, [contextRef, layerRef]);

  return LayerBehavior(children);
};

GeoBaseLayerBlurBehavior.displayName = `${GeoBaseLayerBlurBehavior.name} [from ${module.id}]`;

export default GeoBaseLayerBlurBehavior;
