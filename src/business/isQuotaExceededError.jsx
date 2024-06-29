// __d(
//   "isQuotaExceededError",
//   [],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     function g(b) {
//       return Boolean(
//         b instanceof a.DOMException &&
//           (b.code === 22 ||
//             b.code === 1014 ||
//             b.name === "QuotaExceededError" ||
//             b.name === "NS_ERROR_DOM_QUOTA_REACHED")
//       );
//     }
//     function b(a, b) {
//       return Boolean(g(b) && a && a.length !== 0);
//     }
//     f.isQuotaExceededError = g;
//     f.isStorageQuotaExceededError = b;
//   },
//   66
// );

function isQuotaExceededError(error: any): boolean {
  return Boolean(
    error instanceof DOMException &&
      (error.code === 22 ||
        error.code === 1014 ||
        error.name === "QuotaExceededError" ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED")
  );
}

function isStorageQuotaExceededError(
  storage: Storage | null,
  error: any
): boolean {
  return Boolean(
    isQuotaExceededError(error) && storage && storage.length !== 0
  );
}

export { isQuotaExceededError, isStorageQuotaExceededError };
