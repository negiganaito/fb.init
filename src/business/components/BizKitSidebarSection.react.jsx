__d(
  "BizKitSidebarSection.react",
  ["cx", "AbstractSidebarSection.react", "react"],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i,
      j = i || d("react");
    function a(a) {
      var b = a.children;
      a = a.label;
      return j.jsx(c("AbstractSidebarSection.react"), {
        actions: null,
        className: "_ago8",
        label: a,
        labelIsHidden: !0,
        labelRenderer: k,
        children: b,
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    function k() {
      return null;
    }
    g["default"] = a;
  },
  98
);

import React from "react";
import AbstractSidebarSection from "path/to/AbstractSidebarSection.react";

interface BizKitSidebarSectionProps {
  children: React.ReactNode;
  label: string;
}

const BizKitSidebarSection: React.FC<BizKitSidebarSectionProps> = ({
  children,
  label,
}) => {
  return (
    <AbstractSidebarSection
      actions={null}
      className="_ago8"
      label={label}
      labelIsHidden={true}
      labelRenderer={LabelRenderer}
    >
      {children}
    </AbstractSidebarSection>
  );
};

BizKitSidebarSection.displayName = `${BizKitSidebarSection.name} [from ${module.id}]`;

const LabelRenderer: React.FC = () => {
  return null;
};

export default BizKitSidebarSection;
