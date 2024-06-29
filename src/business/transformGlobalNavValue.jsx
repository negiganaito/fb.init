// __d(
//   "transformGlobalNavValue",
//   [],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     function a(a) {
//       var b = [["INBOX", "INBOX_SETTINGS"]];
//       for (var c = 0; c < b.length; c++) {
//         var d = b[c];
//         if (d.includes(a)) return d.join("|");
//       }
//       if (
//         a === "MIX_BREAKDOWN_SUBPAGE" ||
//         a === "MIX_TRACK" ||
//         a === "MIX_ARTIST"
//       )
//         return "INSIGHTS";
//       return a === "MARKETING_MESSAGE_COMPOSER" ||
//         a === "MARKETING_MESSAGE_GET_STARTED" ||
//         a === "MARKETING_MESSAGE_ONBOARDING"
//         ? "MARKETING_MESSAGES"
//         : a;
//     }
//     f.transformGlobalNavValue = a;
//   },
//   66
// );

// transformGlobalNavValue.ts

type NavValue = string;

function transformGlobalNavValue(navValue: NavValue): NavValue {
  const groupedNavValues = [["INBOX", "INBOX_SETTINGS"]];

  for (const group of groupedNavValues) {
    if (group.includes(navValue)) {
      return group.join("|");
    }
  }

  if (
    navValue === "MIX_BREAKDOWN_SUBPAGE" ||
    navValue === "MIX_TRACK" ||
    navValue === "MIX_ARTIST"
  ) {
    return "INSIGHTS";
  }

  if (
    navValue === "MARKETING_MESSAGE_COMPOSER" ||
    navValue === "MARKETING_MESSAGE_GET_STARTED" ||
    navValue === "MARKETING_MESSAGE_ONBOARDING"
  ) {
    return "MARKETING_MESSAGES";
  }

  return navValue;
}

export { transformGlobalNavValue };
