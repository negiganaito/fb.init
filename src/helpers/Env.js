/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const Env = {
  ajaxpipe_token: null,
  compat_iframe_token: null,
  iframeKey: "",
  iframeTarget: "",
  iframeToken: "",
  isCQuick: false,
  jssp_header_sent: false,
  jssp_targeting_enabled: false,
  loadHyperion: false,
  start: Date.now(),
  nocatch: false,
  useTrustedTypes: false,
  isTrustedTypesReportOnly: false,
  enableDefaultTrustedTypesPolicy: false,
  ig_server_override: "",
  barcelona_server_override: "",
  ig_mqtt_wss_endpoint: "",
  ig_mqtt_polling_endpoint: "",
};

if (window.Env) {
  Object.assign(Env, window.Env);
}

window.Env = Env;

export default Env;
