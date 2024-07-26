__d(
  "isCometRouterUrl",
  [
    "ConstUriUtils",
    "Env",
    "isFacebookURI",
    "isLinkshimURI",
    "memoizeStringOnly",
    "uriIsRelativePath",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = function (a) {
        return (
          a === "/l.php" ||
          a.startsWith("/si/ajax/l/") ||
          a.startsWith("/l/") ||
          a.startsWith("l/")
        );
      },
      j = function (a) {
        var b = a.getDomain();
        return b == null ? !1 : c("isFacebookURI")(a) && b.startsWith("www");
      },
      k = /^(\/\w)/;
    a = c("memoizeStringOnly")(function (a) {
      if (a == null || a.startsWith("#") || !d("ConstUriUtils").isValidUri(a))
        return !1;
      var b = d("ConstUriUtils").getUri(a);
      if (b == null) return !1;
      if (!i(b.getPath()) && k.test(a)) return !0;
      if (c("isLinkshimURI")(b)) return !1;
      a = d("ConstUriUtils").getUri(window.location.href);
      a = a ? b.isSameOrigin(a) || c("uriIsRelativePath")(b) : !1;
      b =
        (Boolean((h || (h = c("Env"))).isCometSubdomain) && j(b)) ||
        (Boolean((h || (h = c("Env"))).isStoryGallery) && j(b)) ||
        (Boolean((h || (h = c("Env"))).isAdsPreviewTool) && j(b));
      return a || b;
    });
    g["default"] = a;
  },
  98
);
