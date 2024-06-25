// __d(
//   "GeoMediaItem.react",
//   [
//     "ix",
//     "DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE",
//     "GeoBaseText.react",
//     "GeoGlimmer.react",
//     "GeoPlatformIcon.react",
//     "GeoPrivateIcon.react",
//     "GeoPrivateMakeComponent",
//     "GeoPrivateMediaItemAddOn.react",
//     "GeoPrivateMediaItemContext",
//     "GeoPrivateMediaItemGroupContext",
//     "GeoPrivateMediaItemStatusAddOn.react",
//     "GeoPrivateMediaItemSurfaceContext",
//     "GeoPrivatePlatformIconUtils",
//     "fbicon",
//     "isFalsey",
//     "react",
//     "stylex",
//     "useGeoPrivateMediaLoadingStatus",
//     "useGeoTheme",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j,
//       k = j || (j = d("react")),
//       l = j.useContext,
//       m = {
//         root: {
//           display: "x1lliihq",
//           position: "x1n2onr6",
//           flexShrink: "x2lah0s",
//           $$css: !0,
//         },
//         glimmer: {
//           start: "x17qophe",
//           left: null,
//           right: null,
//           position: "x10l6tqk",
//           top: "x13vifvy",
//           zIndex: "x1vjfegm",
//           $$css: !0,
//         },
//       };
//     function n(a) {
//       var b = a.ratio;
//       a = a.size;
//       var d = c("useGeoTheme")(),
//         e = d.selectBorderRadius;
//       d = d.selectSize;
//       return [
//         m.root,
//         d({ size: a, ratio: b }),
//         e({ context: b === "circle" ? "rounded" : "content" }),
//       ];
//     }
//     function a(a) {
//       var b = a.containerRef,
//         d = a["data-testid"];
//       d = a.description;
//       var e = a.fit;
//       e = e === void 0 ? "none" : e;
//       var f = a.hasMediaBackground;
//       f = f === void 0 ? !0 : f;
//       var g = a.isDisabled;
//       g = g === void 0 ? !1 : g;
//       var h = a.isLoading;
//       h = h === void 0 ? !1 : h;
//       var j = a.media,
//         o = a.platform,
//         p = a.ratio;
//       p = p === void 0 ? "square" : p;
//       var r = a.size;
//       r = r === void 0 ? 32 : r;
//       var u = a.status;
//       a = a.xstyle;
//       var w = t(j),
//         x = l(c("GeoPrivateMediaItemGroupContext")),
//         y = x.ratio;
//       x = x.size;
//       var z = l(c("GeoPrivateMediaItemContext"));
//       z = z.isOverflowItem;
//       z = (z = z) != null ? z : !1;
//       y = (y = y) != null ? y : p;
//       x = (p = x) != null ? p : r;
//       p = c("useGeoPrivateMediaLoadingStatus")(j);
//       r = p.isLoading;
//       var A = p.onLoad;
//       p = p.ref;
//       h = h || (w && r);
//       r = n({ size: x, ratio: y });
//       return !h && j == null
//         ? null
//         : k.jsxs("div", {
//             className: (i || (i = c("stylex")))(r, a),
//             "data-testid": void 0,
//             ref: b,
//             children: [
//               k.jsxs(q, {
//                 size: x,
//                 children: [
//                   h
//                     ? k.jsx(c("GeoGlimmer.react"), {
//                         shape: y === "circle" ? "rounded" : "rectangle",
//                         xstyle: m.glimmer,
//                       })
//                     : null,
//                   j != null
//                     ? k.jsx(s, {
//                         description: d,
//                         fit: e,
//                         hasMediaBackground: f,
//                         isDisabled: g,
//                         isImage: w,
//                         isLoading: h,
//                         media: j,
//                         onLoad: A,
//                         ref: p,
//                         size: x,
//                       })
//                     : null,
//                 ],
//               }),
//               !z &&
//                 u != null &&
//                 k.jsx(c("GeoPrivateMediaItemStatusAddOn.react"), {
//                   ratio: y,
//                   size: x,
//                   status: u,
//                 }),
//               !z && o != null && k.jsx(v, { platform: o, ratio: y, size: x }),
//             ],
//           });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     var o = {
//         wrapper: {
//           borderTopStartRadius: "x1o1ewxj",
//           borderTopEndRadius: "x3x9cwd",
//           borderBottomEndRadius: "x1e5q0jg",
//           borderBottomStartRadius: "x13rtm0m",
//           height: "x5yr21d",
//           position: "x1n2onr6",
//           width: "xh8yej3",
//           $$css: !0,
//         },
//         denseStroke: {
//           paddingTop: "x4p5aij",
//           paddingEnd: "x19um543",
//           paddingBottom: "x1j85h84",
//           paddingStart: "x1m6msm",
//           $$css: !0,
//         },
//         sparseStroke: {
//           paddingTop: "x1nn3v0j",
//           paddingEnd: "xg83lxy",
//           paddingBottom: "x1120s5i",
//           paddingStart: "x1h0ha7o",
//           $$css: !0,
//         },
//       },
//       p = function (a) {
//         return a < 48 ? "dense" : "sparse";
//       };
//     function q(a) {
//       var b = a.children;
//       a = a.size;
//       var d = l(c("GeoPrivateMediaItemGroupContext"));
//       d = d.hasStroke;
//       var e = c("useGeoTheme")();
//       e = e.selectStaticBackgroundColor;
//       a = p(a) === "dense";
//       e = [
//         o.wrapper,
//         e({ surface: "content" }),
//         a && o.denseStroke,
//         !a && o.sparseStroke,
//       ];
//       return d
//         ? k.jsx("div", {
//             className: (i || (i = c("stylex")))(e),
//             children: k.jsx("div", {
//               className:
//                 "x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x5yr21d x1n2onr6 xh8yej3",
//               children: b,
//             }),
//           })
//         : k.jsx(k.Fragment, { children: b });
//     }
//     q.displayName = q.name + " [from " + f.id + "]";
//     var r = {
//         root: {
//           position: "x10l6tqk",
//           overflowX: "x6ikm8r",
//           overflowY: "x10wlt62",
//           top: "x13vifvy",
//           start: "x17qophe",
//           left: null,
//           right: null,
//           width: "xh8yej3",
//           height: "x5yr21d",
//           borderTopStartRadius: "x1o1ewxj",
//           borderTopEndRadius: "x3x9cwd",
//           borderBottomEndRadius: "x1e5q0jg",
//           borderBottomStartRadius: "x13rtm0m",
//           $$css: !0,
//         },
//         loading: { opacity: "xg01cxk", $$css: !0 },
//         backgroundTransparent: { backgroundColor: "xjbqb8w", $$css: !0 },
//         fitNone: {
//           ":not([stylex-hack]) > *_left": "xosibs0",
//           ":not([stylex-hack]) > *_start": null,
//           ":not([stylex-hack]) > *_end": null,
//           ":not([stylex-hack]) > *_position": "xt24udd",
//           ":not([stylex-hack]) > *_top": "xw53kvy",
//           ":not([stylex-hack]) > *_transform": "x1dka6rp",
//           $$css: !0,
//         },
//         fit: {
//           ":not([stylex-hack]) img_height": "xtd80it",
//           ":not([stylex-hack]) img_start": "x1jgp7su",
//           ":not([stylex-hack]) img_left": null,
//           ":not([stylex-hack]) img_right": null,
//           ":not([stylex-hack]) img_position": "x1q1rkhy",
//           ":not([stylex-hack]) img_top": "x18tuezv",
//           ":not([stylex-hack]) img_width": "x1xuqjiz",
//           $$css: !0,
//         },
//         fitCover: { ":not([stylex-hack]) img_objectFit": "xhl3afg", $$css: !0 },
//         fitContain: {
//           ":not([stylex-hack]) img_objectFit": "x1o3kp5p",
//           $$css: !0,
//         },
//         presentational: { pointerEvents: "x47corl", $$css: !0 },
//         disabled: { opacity: "xbyyjgo", $$css: !0 },
//       },
//       s = k.forwardRef(function (a, b) {
//         var d = a.description,
//           e = a.fit,
//           f = a.hasMediaBackground,
//           g = a.isDisabled,
//           h = a.isImage,
//           j = a.isLoading,
//           m = a.media,
//           n = a.onLoad;
//         a = a.size;
//         var o = l(c("GeoPrivateMediaItemContext")),
//           p = o.isOverflowItem,
//           q = o.variant;
//         o = o.overflowCount;
//         var s = l(c("GeoPrivateMediaItemSurfaceContext"));
//         p = (p = p) != null ? p : !1;
//         var t = c("useGeoTheme")();
//         t = t.selectStaticBackgroundColor;
//         var u =
//           !h &&
//           (m == null ? void 0 : m.type) !== "svg" &&
//           (m == null ? void 0 : m.type) !== "img";
//         g = [
//           r.root,
//           g && r.disabled,
//           j && r.loading,
//           (!h || e === "none") && r.fitNone,
//           h && e !== "none" && r.fit,
//           h && e === "cover" && r.fitCover,
//           h && e === "contain" && r.fitContain,
//           u && r.presentational,
//           !j && s !== "none" && t({ surface: "wash" }),
//           !h && f === !1 && r.backgroundTransparent,
//         ];
//         return k.jsxs("div", {
//           "aria-label": d,
//           className: (i || (i = c("stylex")))(g),
//           onLoad: n,
//           ref: b,
//           role: c("isFalsey")(d) && u ? "presentation" : "img",
//           children: [
//             m,
//             p && k.jsx(x, { overflowCount: o, size: a, variant: q }),
//           ],
//         });
//       });
//     function t(a) {
//       if (!k.isValidElement(a)) return !1;
//       a = c("DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE")(a);
//       if (a == null || a.props == null) return !1;
//       if (a.type === k.Fragment && a.props.children != null)
//         return k.Children.toArray(a.props.children).some(t);
//       else
//         return (
//           typeof a.props === "object" &&
//           a.props.src != null &&
//           (typeof a.props.src === "string" ||
//             (typeof a.props.src === "object" &&
//               a.props.src.valueOf != null &&
//               typeof a.props.src.valueOf() === "string"))
//         );
//     }
//     var u = { root: { position: "x10l6tqk", zIndex: "x1vjfegm", $$css: !0 } };
//     function v(a) {
//       var b = a.platform,
//         e = a.ratio;
//       a = a.size;
//       var f = d("GeoPrivateMediaItemAddOn.react").getAddonSize(a);
//       return k.jsx(
//         d("GeoPrivateMediaItemAddOn.react").GeoPrivateMediaItemAddOn,
//         {
//           mediaRatio: e,
//           mediaSize: a,
//           position: "below",
//           shape: d("GeoPrivatePlatformIconUtils").getIconShape(b),
//           xstyle: u.root,
//           children: k.jsx(c("GeoPlatformIcon.react"), { platform: b, size: f }),
//         }
//       );
//     }
//     v.displayName = v.name + " [from " + f.id + "]";
//     var w = {
//       overlay: {
//         position: "x10l6tqk",
//         height: "x5yr21d",
//         width: "xh8yej3",
//         top: "x13vifvy",
//         start: "x17qophe",
//         borderTopStartRadius: "x1o1ewxj",
//         borderTopEndRadius: "x3x9cwd",
//         borderBottomEndRadius: "x1e5q0jg",
//         borderBottomStartRadius: "x13rtm0m",
//         overflowX: "x6ikm8r",
//         overflowY: "x10wlt62",
//         display: "x78zum5",
//         alignItems: "x6s0dn4",
//         justifyContent: "xl56j7k",
//         $$css: !0,
//       },
//     };
//     function x(a) {
//       var b = a.overflowCount,
//         d = a.size;
//       a = a.variant;
//       a = a === void 0 ? "none" : a;
//       var e = c("useGeoTheme")();
//       e = e.selectStaticBackgroundColor;
//       return k.jsx("div", {
//         className: (i || (i = c("stylex")))([
//           e({ surface: "overlay" }),
//           w.overlay,
//         ]),
//         children: k.jsx(C, { overflowCount: b, size: d, variant: a }),
//       });
//     }
//     x.displayName = x.name + " [from " + f.id + "]";
//     function y(a) {
//       switch (a) {
//         case 16:
//           return d("fbicon")._(h("1253039"), 8);
//         case 24:
//           return d("fbicon")._(h("484385"), 12);
//         case 30:
//         case 32:
//         case 41:
//           return d("fbicon")._(h("484386"), 16);
//         default:
//           return d("fbicon")._(h("484388"), 24);
//       }
//     }
//     function z(a) {
//       switch (a) {
//         case 16:
//         case 24:
//         case 30:
//         case 32:
//           return "accent";
//         case 41:
//         case 48:
//           return "value";
//         default:
//           return "header1";
//       }
//     }
//     function A(a) {
//       switch (a) {
//         case 16:
//         case 24:
//           return 9;
//         case 30:
//         case 32:
//         case 41:
//         case 48:
//           return 99;
//         case 62:
//         case 64:
//           return 999;
//         case 94:
//         case 96:
//           return 9999;
//         default:
//           return 99;
//       }
//     }
//     function B(a, b) {
//       a = A(a);
//       return b != null && b > a ? a + "+" : "+" + String(b);
//     }
//     function C(a) {
//       var b = a.overflowCount,
//         d = a.size;
//       a = a.variant;
//       a = a === void 0 ? "ellipses" : a;
//       var e = y(d),
//         f = z(d);
//       return a === "ellipses"
//         ? k.jsx(c("GeoPrivateIcon.react"), { color: "inverted", icon: e })
//         : k.jsx(c("GeoBaseText.react"), {
//             color: "inverted",
//             size: f,
//             textAlign: "center",
//             children: B(d, b),
//           });
//     }
//     C.displayName = C.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoMediaItem", a);
//     g["default"] = b;
//   },
//   98
// );

import React, { useContext, forwardRef } from "react";
import {
  DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE,
  GeoBaseText,
  GeoGlimmer,
  GeoPlatformIcon,
  GeoPrivateIcon,
  GeoPrivateMakeComponent,
  GeoPrivateMediaItemAddOn,
  GeoPrivateMediaItemContext,
  GeoPrivateMediaItemGroupContext,
  GeoPrivateMediaItemStatusAddOn,
  GeoPrivateMediaItemSurfaceContext,
  GeoPrivatePlatformIconUtils,
  fbicon,
  isFalsey,
  stylex,
  useGeoPrivateMediaLoadingStatus,
  useGeoTheme,
} from "path/to/your/modules";

interface GeoMediaItemProps {
  containerRef?: React.RefObject<HTMLDivElement>;
  "data-testid"?: string;
  description?: string;
  fit?: string;
  hasMediaBackground?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  media?: React.ReactNode;
  platform?: string;
  ratio?: string;
  size?: number;
  status?: string;
  xstyle?: any;
}

const styles = {
  root: {
    display: "x1lliihq",
    position: "x1n2onr6",
    flexShrink: "x2lah0s",
    $$css: true,
  },
  glimmer: {
    start: "x17qophe",
    left: null,
    right: null,
    position: "x10l6tqk",
    top: "x13vifvy",
    zIndex: "x1vjfegm",
    $$css: true,
  },
};

function getClassNames({ ratio, size }: { ratio: string; size: number }) {
  const theme = useGeoTheme();
  const selectBorderRadius = theme.selectBorderRadius;
  const selectSize = theme.selectSize;
  return [
    styles.root,
    selectSize({ size, ratio }),
    selectBorderRadius({ context: ratio === "circle" ? "rounded" : "content" }),
  ];
}

const GeoMediaItem: React.FC<GeoMediaItemProps> = (props) => {
  const {
    containerRef,
    "data-testid": dataTestId,
    description,
    fit = "none",
    hasMediaBackground = true,
    isDisabled = false,
    isLoading = false,
    media,
    platform,
    ratio = "square",
    size = 32,
    status,
    xstyle,
  } = props;

  const isImage = isElementImage(media);
  const groupContext = useContext(GeoPrivateMediaItemGroupContext);
  const mediaItemContext = useContext(GeoPrivateMediaItemContext);
  const {
    isLoading: mediaIsLoading,
    onLoad,
    ref: mediaRef,
  } = useGeoPrivateMediaLoadingStatus(media);

  const effectiveIsLoading = isLoading || (media && mediaIsLoading);
  const classNames = getClassNames({
    size: groupContext.size ?? size,
    ratio: groupContext.ratio ?? ratio,
  });

  if (!effectiveIsLoading && !media) return null;

  return (
    <div
      className={stylex(classNames, xstyle)}
      data-testid={dataTestId}
      ref={containerRef}
    >
      <Wrapper size={groupContext.size ?? size}>
        {effectiveIsLoading ? (
          <GeoGlimmer
            shape={groupContext.ratio === "circle" ? "rounded" : "rectangle"}
            xstyle={styles.glimmer}
          />
        ) : null}
        {media ? (
          <MediaContent
            description={description}
            fit={fit}
            hasMediaBackground={hasMediaBackground}
            isDisabled={isDisabled}
            isImage={isImage}
            isLoading={effectiveIsLoading}
            media={media}
            onLoad={onLoad}
            ref={mediaRef}
            size={groupContext.size ?? size}
          />
        ) : null}
      </Wrapper>
      {!mediaItemContext.isOverflowItem && status ? (
        <GeoPrivateMediaItemStatusAddOn
          ratio={groupContext.ratio ?? ratio}
          size={groupContext.size ?? size}
          status={status}
        />
      ) : null}
      {!mediaItemContext.isOverflowItem && platform ? (
        <PlatformIcon
          platform={platform}
          ratio={groupContext.ratio ?? ratio}
          size={groupContext.size ?? size}
        />
      ) : null}
    </div>
  );
};

GeoMediaItem.displayName = `${GeoMediaItem.name}`;

const wrapperStyles = {
  wrapper: {
    borderTopStartRadius: "x1o1ewxj",
    borderTopEndRadius: "x3x9cwd",
    borderBottomEndRadius: "x1e5q0jg",
    borderBottomStartRadius: "x13rtm0m",
    height: "x5yr21d",
    position: "x1n2onr6",
    width: "xh8yej3",
    $$css: true,
  },
  denseStroke: {
    paddingTop: "x4p5aij",
    paddingEnd: "x19um543",
    paddingBottom: "x1j85h84",
    paddingStart: "x1m6msm",
    $$css: true,
  },
  sparseStroke: {
    paddingTop: "x1nn3v0j",
    paddingEnd: "xg83lxy",
    paddingBottom: "x1120s5i",
    paddingStart: "x1h0ha7o",
    $$css: true,
  },
};

function getWrapperStyle(size: number): string {
  return size < 48 ? "dense" : "sparse";
}

interface WrapperProps {
  size: number;
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ size, children }) => {
  const groupContext = useContext(GeoPrivateMediaItemGroupContext);
  const theme = useGeoTheme();
  const selectStaticBackgroundColor = theme.selectStaticBackgroundColor;
  const isDense = getWrapperStyle(size) === "dense";
  const styles = [
    wrapperStyles.wrapper,
    selectStaticBackgroundColor({ surface: "content" }),
    isDense ? wrapperStyles.denseStroke : wrapperStyles.sparseStroke,
  ];

  return groupContext.hasStroke ? (
    <div className={stylex(styles)}>
      <div className="x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x5yr21d x1n2onr6 xh8yej3">
        {children}
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

Wrapper.displayName = `${Wrapper.name}`;

const mediaContentStyles = {
  root: {
    position: "x10l6tqk",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    top: "x13vifvy",
    start: "x17qophe",
    left: null,
    right: null,
    width: "xh8yej3",
    height: "x5yr21d",
    borderTopStartRadius: "x1o1ewxj",
    borderTopEndRadius: "x3x9cwd",
    borderBottomEndRadius: "x1e5q0jg",
    borderBottomStartRadius: "x13rtm0m",
    $$css: true,
  },
  loading: { opacity: "xg01cxk", $$css: true },
  backgroundTransparent: { backgroundColor: "xjbqb8w", $$css: true },
  fitNone: {
    ":not([stylex-hack]) > *_left": "xosibs0",
    ":not([stylex-hack]) > *_start": null,
    ":not([stylex-hack]) > *_end": null,
    ":not([stylex-hack]) > *_position": "xt24udd",
    ":not([stylex-hack]) > *_top": "xw53kvy",
    ":not([stylex-hack]) > *_transform": "x1dka6rp",
    $$css: true,
  },
  fit: {
    ":not([stylex-hack]) img_height": "xtd80it",
    ":not([stylex-hack]) img_start": "x1jgp7su",
    ":not([stylex-hack]) img_left": null,
    ":not([stylex-hack]) img_right": null,
    ":not([stylex-hack]) img_position": "x1q1rkhy",
    ":not([stylex-hack]) img_top": "x18tuezv",
    ":not([stylex-hack]) img_width": "x1xuqjiz",
    $$css: true,
  },
  fitCover: { ":not([stylex-hack]) img_objectFit": "xhl3afg", $$css: true },
  fitContain: { ":not([stylex-hack]) img_objectFit": "x1o3kp5p", $$css: true },
  presentational: { pointerEvents: "x47corl", $$css: true },
  disabled: { opacity: "xbyyjgo", $$css: true },
};

interface MediaContentProps {
  description?: string;
  fit?: string;
  hasMediaBackground?: boolean;
  isDisabled?: boolean;
  isImage?: boolean;
  isLoading?: boolean;
  media?: React.ReactNode;
  onLoad?: () => void;
  size?: number;
}

const MediaContent = forwardRef<HTMLDivElement, MediaContentProps>(
  (
    {
      description,
      fit,
      hasMediaBackground,
      isDisabled,
      isImage,
      isLoading,
      media,
      onLoad,
      size,
    },
    ref
  ) => {
    const mediaItemContext = useContext(GeoPrivateMediaItemContext);
    const surfaceContext = useContext(GeoPrivateMediaItemSurfaceContext);
    const theme = useGeoTheme();
    const selectStaticBackgroundColor = theme.selectStaticBackgroundColor;
    const isPresentational =
      !isImage && media?.type !== "svg" && media?.type !== "img";
    const classNames = [
      mediaContentStyles.root,
      isDisabled && mediaContentStyles.disabled,
      isLoading && mediaContentStyles.loading,
      (!isImage || fit === "none") && mediaContentStyles.fitNone,
      isImage && fit !== "none" && mediaContentStyles.fit,
      isImage && fit === "cover" && mediaContentStyles.fitCover,
      isImage && fit === "contain" && mediaContentStyles.fitContain,
      isPresentational && mediaContentStyles.presentational,
      !isLoading &&
        surfaceContext !== "none" &&
        selectStaticBackgroundColor({ surface: "wash" }),
      !isImage &&
        hasMediaBackground === false &&
        mediaContentStyles.backgroundTransparent,
    ];

    return (
      <div
        aria-label={description}
        className={stylex(classNames)}
        onLoad={onLoad}
        ref={ref}
        role={
          isFalsey(description) && isPresentational ? "presentation" : "img"
        }
      >
        {media}
        {mediaItemContext.isOverflowItem && (
          <OverflowIcon
            overflowCount={mediaItemContext.overflowCount}
            size={size}
            variant={mediaItemContext.variant}
          />
        )}
      </div>
    );
  }
);

function isElementImage(element: React.ReactNode): boolean {
  if (!React.isValidElement(element)) return false;
  const internalElement =
    DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE(element);
  if (!internalElement || !internalElement.props) return false;
  if (
    internalElement.type === React.Fragment &&
    internalElement.props.children
  ) {
    return React.Children.toArray(internalElement.props.children).some(
      isElementImage
    );
  } else {
    return (
      typeof internalElement.props === "object" &&
      internalElement.props.src &&
      (typeof internalElement.props.src === "string" ||
        (typeof internalElement.props.src === "object" &&
          typeof internalElement.props.src.valueOf === "string"))
    );
  }
}

const addonStyles = {
  root: { position: "x10l6tqk", zIndex: "x1vjfegm", $$css: true },
};

interface PlatformIconProps {
  platform: string;
  ratio: string;
  size: number;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  ratio,
  size,
}) => {
  const addonSize = GeoPrivateMediaItemAddOn.getAddonSize(size);
  return (
    <GeoPrivateMediaItemAddOn
      mediaRatio={ratio}
      mediaSize={size}
      position="below"
      shape={GeoPrivatePlatformIconUtils.getIconShape(platform)}
      xstyle={addonStyles.root}
    >
      <GeoPlatformIcon platform={platform} size={addonSize} />
    </GeoPrivateMediaItemAddOn>
  );
};

PlatformIcon.displayName = `${PlatformIcon.name}`;

const overflowStyles = {
  overlay: {
    position: "x10l6tqk",
    height: "x5yr21d",
    width: "xh8yej3",
    top: "x13vifvy",
    start: "x17qophe",
    borderTopStartRadius: "x1o1ewxj",
    borderTopEndRadius: "x3x9cwd",
    borderBottomEndRadius: "x1e5q0jg",
    borderBottomStartRadius: "x13rtm0m",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    display: "x78zum5",
    alignItems: "x6s0dn4",
    justifyContent: "xl56j7k",
    $$css: true,
  },
};

interface OverflowIconProps {
  overflowCount?: number;
  size: number;
  variant?: string;
}

const OverflowIcon: React.FC<OverflowIconProps> = ({
  overflowCount,
  size,
  variant = "ellipses",
}) => {
  const theme = useGeoTheme();
  const selectStaticBackgroundColor = theme.selectStaticBackgroundColor;
  const icon = getIconBySize(size);
  const textSize = getTextSizeBySize(size);

  return (
    <div
      className={stylex([
        selectStaticBackgroundColor({ surface: "overlay" }),
        overflowStyles.overlay,
      ])}
    >
      {variant === "ellipses" ? (
        <GeoPrivateIcon color="inverted" icon={icon} />
      ) : (
        <GeoBaseText color="inverted" size={textSize} textAlign="center">
          {getOverflowText(size, overflowCount)}
        </GeoBaseText>
      )}
    </div>
  );
};

OverflowIcon.displayName = `${OverflowIcon.name}`;

function getIconBySize(size: number): string {
  switch (size) {
    case 16:
      return fbicon("1253039", 8);
    case 24:
      return fbicon("484385", 12);
    case 30:
    case 32:
    case 41:
      return fbicon("484386", 16);
    default:
      return fbicon("484388", 24);
  }
}

function getTextSizeBySize(size: number): string {
  switch (size) {
    case 16:
    case 24:
    case 30:
    case 32:
      return "accent";
    case 41:
    case 48:
      return "value";
    default:
      return "header1";
  }
}

function getMaxOverflowCount(size: number): number {
  switch (size) {
    case 16:
    case 24:
      return 9;
    case 30:
    case 32:
    case 41:
    case 48:
      return 99;
    case 62:
    case 64:
      return 999;
    case 94:
    case 96:
      return 9999;
    default:
      return 99;
  }
}

function getOverflowText(size: number, overflowCount?: number): string {
  const maxCount = getMaxOverflowCount(size);
  return overflowCount != null && overflowCount > maxCount
    ? `${maxCount}+`
    : `+${overflowCount ?? 0}`;
}

const GeoMediaItemComponent = GeoPrivateMakeComponent.makeGeoComponent(
  "GeoMediaItem",
  GeoMediaItem
);

export default GeoMediaItemComponent;
