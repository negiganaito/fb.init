// __d(
//   "getAsyncHeaders",
//   ["BDHeaderConfig", "LSD", "ZeroCategoryHeader", "isFacebookURI"],
//   function (a, b, c, d, e, f, g) {
//     function a(a) {
//       var b = {},
//         d = c("isFacebookURI")(a);
//       d &&
//         c("ZeroCategoryHeader").value &&
//         (b[c("ZeroCategoryHeader").header] = c("ZeroCategoryHeader").value);
//       d = h(a);
//       d && (b["X-FB-LSD"] = d);
//       d = i(a);
//       d && (b["X-ASBD-ID"] = d);
//       return b;
//     }
//     function h(a) {
//       return j(a) ? null : c("LSD").token;
//     }
//     function i(a) {
//       return j(a) ? null : d("BDHeaderConfig").ASBD_ID;
//     }
//     function j(a) {
//       return (
//         !a.toString().startsWith("/") &&
//         a.getOrigin() !== document.location.origin
//       );
//     }
//     g["default"] = a;
//   },
//   98
// );

import BDHeaderConfig from "BDHeaderConfig";
import LSD from "LSD";
import ZeroCategoryHeader from "ZeroCategoryHeader";
import isFacebookURI from "isFacebookURI";

function getAsyncHeaders(url) {
  const headers = {};

  // Check if the URL is a Facebook URI
  const isFacebook = isFacebookURI(url);

  // Add ZeroCategoryHeader if it's a Facebook URI and ZeroCategoryHeader.value is defined
  if (isFacebook && ZeroCategoryHeader.value) {
    headers[ZeroCategoryHeader.header] = ZeroCategoryHeader.value;
  }

  // Add X-FB-LSD header if LSD token is available
  const lsdToken = getLSDToken(url);
  if (lsdToken) {
    headers["X-FB-LSD"] = lsdToken;
  }

  // Add X-ASBD-ID header if ASBD_ID is available
  const asbdId = getASBDID(url);
  if (asbdId) {
    headers["X-ASBD-ID"] = asbdId;
  }

  return headers;
}

function getLSDToken(url) {
  return isExternal(url) ? null : LSD.token;
}

function getASBDID(url) {
  return isExternal(url) ? null : BDHeaderConfig.ASBD_ID;
}

function isExternal(url) {
  return (
    !url.toString().startsWith("/") && url.origin !== document.location.origin
  );
}

export default getAsyncHeaders;
