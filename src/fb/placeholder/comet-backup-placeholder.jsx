/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCometPlaceholderImpl } from "./use-comet-placeholder-impl";

export function CometBackupPlaceholder(props) {
  return useCometPlaceholderImpl({
    ...props, // eslint-disable-next-line camelcase
    unstable_avoidThisFallback: !0,
  });
}
