__d(
  "getBizInboxPageFromBizInboxRoute",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      switch (a) {
        case "INBOX":
          return "BIZWEB_INBOX";
        case "POSTS":
          return "BIZWEB_POSTS";
        default:
          return "BUSINESS_SUITE_HOME";
      }
    }
    f.getBizInboxPageFromBizInboxRoute = a;
  },
  66
);

export function getBizInboxPageFromBizInboxRoute(route: string): string {
  switch (route) {
    case "INBOX":
      return "BIZWEB_INBOX";
    case "POSTS":
      return "BIZWEB_POSTS";
    default:
      return "BUSINESS_SUITE_HOME";
  }
}
