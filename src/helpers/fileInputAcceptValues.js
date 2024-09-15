/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const CUSTOM_THUMBNAIL = [".png", ".jpg", ".jpeg"];
const PHOTO = ["image/*", "image/heif", "image/heic"];
const VIDEO = [
  "video/*",
  "video/mp4",
  "video/x-m4v",
  "video/x-matroska",
  ".mkv",
];
const PHOTO_AND_VIDEO = [...PHOTO, ...VIDEO];

export { CUSTOM_THUMBNAIL, PHOTO, PHOTO_AND_VIDEO, VIDEO };
