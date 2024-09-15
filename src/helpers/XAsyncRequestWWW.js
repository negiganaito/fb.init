/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import AsyncRequest from "./AsyncRequest";

class XAsyncRequestWWW {
  constructor(uri) {
    this.$1 = new AsyncRequest(uri);
  }

  setAllowCrossPageTransition(allow) {
    this.$1.setAllowCrossPageTransition(allow);
    return this;
  }

  setURI(uri) {
    this.$1.setURI(uri);
    return this;
  }

  setTimeoutHandler(handler, timeout) {
    this.$1.setTimeoutHandler(handler, timeout);
    return this;
  }

  setOption(option, value) {
    this.$1.setOption(option, value);
    return this;
  }

  setMethod(method) {
    this.$1.setMethod(method);
    return this;
  }

  setAutoProcess(autoProcess) {
    this.$1.setOption("suppressEvaluation", autoProcess);
    return this;
  }

  setData(data) {
    this.$1.setData(data);
    return this;
  }

  setHandler(handler) {
    this.$1.setHandler(handler);
    return this;
  }

  setPayloadHandler(handler) {
    this.setHandler((response) => handler(response.payload));
    return this;
  }

  setErrorHandler(handler) {
    this.$1.setErrorHandler(handler);
    return this;
  }

  send() {
    this.$1.send();
    return this;
  }

  abort() {
    this.$1.abort();
  }

  setReadOnly(readOnly) {
    this.$1.setReadOnly(readOnly);
    return this;
  }

  setAllowCrossOrigin(allow) {
    this.$1.setAllowCrossOrigin(allow);
    return this;
  }

  setAllowCredentials(allow) {
    this.$1.setAllowCredentials(allow);
    return this;
  }
}

export default XAsyncRequestWWW;
