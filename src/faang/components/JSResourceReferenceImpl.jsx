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
import ifRequireable from "../../business/helpers/ifRequireable";
import ifRequired from "../../business/helpers/ifRequired";
import { notify } from "../../business/helpers/JSResourceEvents";
import Promise from "../../business/helpers/Promise";
import { setDisplayName } from "../../business/helpers/PromiseAnnotate";

let bootLoader = null;
const pendingCallbacks = [];

function runPendingCallbacks(loader) {
  if (bootLoader) {
    loader(bootLoader);
    pendingCallbacks.length = 0;
  } else {
    pendingCallbacks.push(loader);
  }
}

const unknownCallerMessage = "JSResource: unknown caller";

class JSResourceReferenceImpl {
  static disableForSSR_DO_NOT_USE = true;

  getModuleId() {
    return this.moduleId;
  }

  getModuleIdAsRef() {
    return this.ref || this.moduleId;
  }

  load() {
    const moduleId = this.getModuleIdAsRef();
    notify(this.moduleId, this.ref, "LOADED");

    const promise = new Promise((resolve) => {
      runPendingCallbacks((loader) => {
        loader.loadModules(
          [moduleId],
          (modules) => {
            notify(this.moduleId, this.ref, "PROMISE_RESOLVED");
            resolve(modules);
          },
          this.ref || unknownCallerMessage
        );
      });
    });

    setDisplayName(promise, `Bootload(${moduleId})`);
    return promise;
  }

  preload() {
    const moduleId = this.getModuleIdAsRef();
    const callerMessage = this.ref || unknownCallerMessage;
    runPendingCallbacks((loader) => {
      loader.loadModules([moduleId], () => {}, `preload: ${callerMessage}`);
    });
  }

  equals(other) {
    return this === other || this.moduleId === other.moduleId;
  }

  getModuleIfRequireable() {
    notify(this.moduleId, this.ref, "ACCESSED");
    return ifRequireable(this.moduleId, (moduleId) => moduleId);
  }

  getModuleIfRequired() {
    notify(this.moduleId, this.ref, "ACCESSED");
    return ifRequired(this.moduleId, (moduleId) => moduleId);
  }

  static loadAll(resources, callback) {
    const modules = {};
    let hasRef = false;

    resources.forEach((resource) => {
      const ref = resource.ref;
      if (ref) {
        hasRef = true;
        modules[ref] = true;
      }
      notify(resource.moduleId, ref, "LOADED");
    });

    runPendingCallbacks((loader) => {
      loader.loadModules(
        resources.map((resource) => resource.getModuleId()),
        callback,
        hasRef ? Object.keys(modules).join(":") : unknownCallerMessage
      );
    });
  }
}

export default JSResourceReferenceImpl;
