// __d(
//   "BizKitNavFooterDropDownMenu.react",
//   [
//     "ix",
//     "BizInboxOffsiteEmailTourRefs",
//     "BizKitHelpTraySideBarButton.react",
//     "BizKitNavFooterMenu.react",
//     "BizKitSidebarItem.react",
//     "BizKitStrings",
//     "Image.react",
//     "RelayFBEnvironment",
//     "RelayHooks",
//     "mbsHelpTrayIsEligibleForSupportButton",
//     "react",
//     "useHoverState",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j = i || (i = d("react"));
//     b = i;
//     var k = b.useEffect,
//       l = b.useRef,
//       m = b.useState,
//       n = h("179843"),
//       o = n,
//       p = h("179895"),
//       q = h("179881");
//     function a(a) {
//       a = a.businessCometHelpTraySideBarChatButtonQueryReference;
//       var b = m(!1),
//         e = b[0],
//         f = b[1];
//       b = c("useHoverState")();
//       var g = b.onMouseEnter;
//       b = b.onMouseLeave;
//       var h = l(null),
//         i = e ? p : q;
//       k(function () {
//         return function () {
//           f(!1);
//         };
//       }, []);
//       i = j.jsx(c("Image.react"), { src: i });
//       var r = n,
//         s = o,
//         t = d("BizKitStrings").HELP;
//       return j.jsxs(j.Fragment, {
//         children: [
//           j.jsx("div", {
//             ref: d("BizInboxOffsiteEmailTourRefs")
//               .bizKitNavFooterDropDownMenuRef,
//             className: "x6ikm8r x10wlt62 xh8yej3",
//             onMouseEnter: g,
//             onMouseLeave: b,
//             "data-testid": void 0,
//             children:
//               d(
//                 "mbsHelpTrayIsEligibleForSupportButton"
//               ).mbsHelpTrayIsEligibleForSupportButton() &&
//               c("BizKitHelpTraySideBarButton.react")
//                 ? j.jsx(d("RelayHooks").RelayEnvironmentProvider, {
//                     environment: c("RelayFBEnvironment"),
//                     children: j.jsx(c("BizKitHelpTraySideBarButton.react"), {
//                       businessCometHelpTraySideBarChatButtonQueryReference: a,
//                       buttonRef: h,
//                       onclick: function () {
//                         f(!e);
//                       },
//                       isOpen: e,
//                     }),
//                   })
//                 : j.jsx(c("BizKitSidebarItem.react"), {
//                     badge: i,
//                     icon: j.jsx(c("Image.react"), { src: r }),
//                     iconActive: j.jsx(c("Image.react"), { src: s }),
//                     isFirst: !1,
//                     onActivate: function () {
//                       f(!e);
//                     },
//                     label: t,
//                     ref: h,
//                     value: d("BizKitStrings").HELP,
//                   }),
//           }),
//           h.current &&
//             j.jsx(c("BizKitNavFooterMenu.react"), {
//               menuRef: h.current,
//               isOpen: e,
//               setIsOpen: f,
//             }),
//         ],
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useEffect, useRef, useState } from "react";
import BizInboxOffsiteEmailTourRefs from "BizInboxOffsiteEmailTourRefs";
import BizKitHelpTraySideBarButton from "BizKitHelpTraySideBarButton.react";
import BizKitNavFooterMenu from "BizKitNavFooterMenu.react";
import BizKitSidebarItem from "BizKitSidebarItem.react";
import { HELP as HELP_LABEL } from "BizKitStrings";
import Image from "Image.react";
import { RelayEnvironmentProvider } from "RelayHooks";
import RelayFBEnvironment from "RelayFBEnvironment";
import { mbsHelpTrayIsEligibleForSupportButton } from "mbsHelpTrayIsEligibleForSupportButton";
import { useHoverState } from "useHoverState";
import ix_179843 from "179843";
import ix_179895 from "179895";
import ix_179881 from "179881";

interface BizKitNavFooterDropDownMenuProps {
  businessCometHelpTraySideBarChatButtonQueryReference: any;
}

const BizKitNavFooterDropDownMenu: React.FC<
  BizKitNavFooterDropDownMenuProps
> = ({ businessCometHelpTraySideBarChatButtonQueryReference }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onMouseEnter, onMouseLeave } = useHoverState();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const helpIcon = isOpen ? ix_179895 : ix_179881;

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  const renderButton = () => {
    if (
      mbsHelpTrayIsEligibleForSupportButton() &&
      BizKitHelpTraySideBarButton
    ) {
      return (
        <RelayEnvironmentProvider environment={RelayFBEnvironment}>
          <BizKitHelpTraySideBarButton
            businessCometHelpTraySideBarChatButtonQueryReference={
              businessCometHelpTraySideBarChatButtonQueryReference
            }
            buttonRef={buttonRef}
            onclick={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
          />
        </RelayEnvironmentProvider>
      );
    }
    return (
      <BizKitSidebarItem
        badge={<Image src={helpIcon} />}
        icon={<Image src={ix_179843} />}
        iconActive={<Image src={ix_179843} />}
        isFirst={false}
        onActivate={() => setIsOpen(!isOpen)}
        label={HELP_LABEL}
        ref={buttonRef}
        value={HELP_LABEL}
      />
    );
  };

  return (
    <>
      <div
        ref={BizInboxOffsiteEmailTourRefs.bizKitNavFooterDropDownMenuRef}
        className="x6ikm8r x10wlt62 xh8yej3"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-testid={undefined}
      >
        {renderButton()}
      </div>
      {buttonRef.current && (
        <BizKitNavFooterMenu
          menuRef={buttonRef.current}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

BizKitNavFooterDropDownMenu.displayName = `${BizKitNavFooterDropDownMenu.name}`;

export default BizKitNavFooterDropDownMenu;
