// __d(
//   "DTSG",
//   ["invariant", "DTSGInitialData"],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i = d("DTSGInitialData").token || null;
//     function a() {
//       return i;
//     }
//     function b(a) {
//       i = a;
//     }
//     function c() {
//       h(0, 5809);
//     }
//     function e(a) {
//       h(0, 73819);
//     }
//     g.getToken = a;
//     g.setToken = b;
//     g.refresh = c;
//     g.setTokenConfig = e;
//   },
//   98
// );

import invariant from "invariant";
import { DTSGInitialData } from "DTSGInitialData";

let token: string | null = DTSGInitialData.token || null;

function getToken(): string | null {
  return token;
}

function setToken(newToken: string): void {
  token = newToken;
}

function refresh(): void {
  invariant(false, "refresh method not implemented", 5809);
}

function setTokenConfig(config: any): void {
  invariant(false, "setTokenConfig method not implemented", 73819);
}

export { getToken, setToken, refresh, setTokenConfig };
