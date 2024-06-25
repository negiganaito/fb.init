__d(
  "GeoLayerUtils",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    function a(a) {
      switch (a) {
        case "left":
          return "start";
        case "center":
          return "middle";
        case "right":
          return "end";
      }
      throw new Error("Unknown align");
    }
    function b(a) {
      switch (a) {
        case "below":
          return "below";
        case "above":
          return "above";
        case "left":
          return "start";
        case "right":
          return "end";
      }
      throw new Error("Unknown position");
    }
    f.mapAlign = a;
    f.mapPosition = b;
  },
  66
);

export function mapAlign(align: string): string {
  switch (align) {
    case "left":
      return "start";
    case "center":
      return "middle";
    case "right":
      return "end";
    default:
      throw new Error("Unknown align");
  }
}

export function mapPosition(position: string): string {
  switch (position) {
    case "below":
      return "below";
    case "above":
      return "above";
    case "left":
      return "start";
    case "right":
      return "end";
    default:
      throw new Error("Unknown position");
  }
}
