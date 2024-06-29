/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export const BootloaderConfig = {
  deferBootloads: false,
  jsRetries: [200, 500],
  jsRetryAbortNum: 2,
  jsRetryAbortTime: 5,
  silentDups: true,
  timeout: 60000,
  tieredLoadingFromTier: 100,
  hypStep4: true,
  phdOn: false,
  btCutoffIndex: 2718,
  fastPathForAlreadyRequired: true,
  earlyRequireLazy: false,
  enableTimeoutLoggingForNonComet: true,
  deferLongTailManifest: true,
  lazySoT: false,
  translationRetries: [200, 500],
  translationRetryAbortNum: 3,
  translationRetryAbortTime: 50,
};
