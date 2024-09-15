/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import SphericalImageUtils from "SphericalImageUtils";

const ProjectionType = "ProjectionType";

class SphericalImage {
  constructor(props) {
    this.props = props;
  }

  static async createFromBlob(blob) {
    const metadata = await SphericalImageUtils.genPhotosphereMetadata(blob);
    return new this(metadata);
  }

  isSpherical() {
    return Boolean(this.props.photoSphereMetadata);
  }

  getImageMetadata() {
    return this.props.imageMetadata;
  }

  getPhotoSphereMetadata() {
    return this.props.photoSphereMetadata;
  }

  getSize() {
    return this.props.imageMetadata ? this.props.imageMetadata.getSize() : null;
  }

  getBufferLength() {
    return this.props.imageMetadata
      ? this.props.imageMetadata.getBufferLength()
      : null;
  }

  getProjectionType() {
    let projectionType = "";
    if (
      this.props.photoSphereMetadata &&
      this.props.photoSphereMetadata[ProjectionType]
    ) {
      projectionType = this.props.photoSphereMetadata[ProjectionType];
    }
    return projectionType;
  }
}

export default SphericalImage;
