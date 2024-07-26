// __d(
//   "LayerHideSources",
//   [],
//   function (a, b, c, d, e, f) {
//     a = Object.freeze({
//       BLUR: "blur",
//       ESCAPE: "escape",
//       LAYER_CANCEL_BUTTON: "layerCancelButton",
//       LAYER_HIDE_BUTTON: "layerHideButton",
//       TRANSITION: "transition",
//     });
//     b = a;
//     f["default"] = b;
//   },
//   66
// );

// LayerHideSources.ts

const LayerHideSources = Object.freeze({
  BLUR: "blur",
  ESCAPE: "escape",
  LAYER_CANCEL_BUTTON: "layerCancelButton",
  LAYER_HIDE_BUTTON: "layerHideButton",
  TRANSITION: "transition",
} as const);

export default LayerHideSources;
