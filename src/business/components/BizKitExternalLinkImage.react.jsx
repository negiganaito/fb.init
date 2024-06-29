// __d(
//   "BizKitExternalLinkImage.react",
//   ["ix", "Image.react", "react"],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j = i || d("react");
//     function a() {
//       return j.jsx(c("Image.react"), {
//         className: "x1lliihq x1n2onr6 xs7f9wi",
//         height: 16,
//         width: 16,
//         src: h("1133707"),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import { ix } from "ix";
import Image from "Image.react";
import React from "react";

const BizKitExternalLinkImage: React.FC = () => {
  return (
    <Image
      className="x1lliihq x1n2onr6 xs7f9wi"
      height={16}
      width={16}
      src={ix("1133707")}
    />
  );
};

BizKitExternalLinkImage.displayName = "BizKitExternalLinkImage [from 98]";

export default BizKitExternalLinkImage;
