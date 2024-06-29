__d(
  "BizKitLogoContainer.react",
  [
    "fbt",
    "ix",
    "GeoFlexbox.react",
    "GeoMetaLockup.react",
    "Image.react",
    "react",
  ],
  function (a, b, c, d, e, f, g, h, i) {
    "use strict";
    var j,
      k = j || d("react"),
      l = {
        mbsLogo: {
          display: "x1lliihq",
          marginLeft: "x1iog12x",
          marginStart: null,
          marginEnd: null,
          $$css: !0,
        },
      },
      m = h._("Meta Business Suite");
    function a(a) {
      var b = a.isCollapsed;
      a = a.shouldShowBMLogo;
      var d = i("197350"),
        e = i("197348");
      a =
        a === !0
          ? k.jsx(c("GeoFlexbox.react"), {
              xstyle: l.mbsLogo,
              children: k.jsx(c("GeoMetaLockup.react"), { size: 12 }),
            })
          : k.jsx(c("Image.react"), {
              alt: m,
              className: "x1lliihq x1iog12x",
              height: 32,
              src: d,
              width: 160,
              "data-testid": void 0,
            });
      d = k.jsx(c("Image.react"), {
        alt: m,
        className: "x1lliihq x1iog12x",
        height: 20,
        src: e,
        width: 32,
        "data-testid": void 0,
      });
      return b ? d : a;
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  226
);

import React from "react";
import { fbt } from "fbt";
import { ix } from "ix";
import GeoFlexbox from "GeoFlexbox.react";
import GeoMetaLockup from "GeoMetaLockup.react";
import Image from "Image.react";

const styles = {
  mbsLogo: {
    display: "x1lliihq",
    marginLeft: "x1iog12x",
    marginStart: null,
    marginEnd: null,
    $$css: true,
  },
};

const metaBusinessSuiteAltText = fbt._("Meta Business Suite");

interface Props {
  isCollapsed: boolean;
  shouldShowBMLogo?: boolean;
}

const BizKitLogoContainer: React.FC<Props> = ({
  isCollapsed,
  shouldShowBMLogo,
}) => {
  const logoLargeSrc = ix("197350");
  const logoSmallSrc = ix("197348");

  const largeLogo =
    shouldShowBMLogo === true ? (
      <GeoFlexbox xstyle={styles.mbsLogo}>
        <GeoMetaLockup size={12} />
      </GeoFlexbox>
    ) : (
      <Image
        alt={metaBusinessSuiteAltText}
        className="x1lliihq x1iog12x"
        height={32}
        src={logoLargeSrc}
        width={160}
        data-testid={undefined}
      />
    );

  const smallLogo = (
    <Image
      alt={metaBusinessSuiteAltText}
      className="x1lliihq x1iog12x"
      height={20}
      src={logoSmallSrc}
      width={32}
      data-testid={undefined}
    />
  );

  return isCollapsed ? smallLogo : largeLogo;
};

BizKitLogoContainer.displayName = `${BizKitLogoContainer.name}`;

export default BizKitLogoContainer;
