// __d(
//   "AsyncTypedRequest",
//   ["AsyncRequest"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     a = (function (a) {
//       babelHelpers.inheritsLoose(b, a);
//       function b(b) {
//         b = a.call(this, b) || this;
//         b.setReplaceTransportMarkers();
//         return b;
//       }
//       var c = b.prototype;
//       c.promisePayload = function (b) {
//         return a.prototype.promisePayload.call(this, b);
//       };
//       c.setPayloadHandler = function (b) {
//         a.prototype.setPayloadHandler.call(this, b);
//         return this;
//       };
//       return b;
//     })(c("AsyncRequest"));
//     g["default"] = a;
//   },
//   98
// );

import AsyncRequest from "AsyncRequest";

class AsyncTypedRequest extends AsyncRequest {
  constructor(endpoint: string) {
    super(endpoint);
    this.setReplaceTransportMarkers();
  }

  promisePayload<T>(transformer?: (payload: any) => T): Promise<T> {
    return super.promisePayload(transformer);
  }

  setPayloadHandler(handler: (payload: any) => void): this {
    super.setPayloadHandler(handler);
    return this;
  }
}

export default AsyncTypedRequest;
