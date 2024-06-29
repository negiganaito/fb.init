// __d(
//   "BizKitLeftNavEditDiscardConfirmationModal.react",
//   [
//     "fbt",
//     "GeoButton.react",
//     "GeoCancelButton.react",
//     "GeoModal.react",
//     "GeoModalFooter.react",
//     "GeoModalHeader.react",
//     "GeoSection.react",
//     "GeoText.react",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j = i || d("react");
//     function a(a) {
//       var b = a.onCancel;
//       a = a.onConfirm;
//       return j.jsx(c("GeoModal.react"), {
//         hideOnBlur: !1,
//         hideOnEscape: !1,
//         header: j.jsx(c("GeoModalHeader.react"), {
//           heading: h._("Discard changes?"),
//         }),
//         footer: j.jsx(c("GeoModalFooter.react"), {
//           primaryButton: j.jsx(c("GeoButton.react"), {
//             autoFocus: !0,
//             label: h._("Discard"),
//             onClick: a,
//             variant: "primary",
//           }),
//           secondaryButton: j.jsx(c("GeoCancelButton.react"), {
//             onClick: b,
//             label: h._("Keep editing"),
//           }),
//         }),
//         isShown: !0,
//         onHide: b,
//         width: 320,
//         children: j.jsx(c("GeoSection.react"), {
//           children: j.jsx(c("GeoText.react"), {
//             children: h._(
//               "If you discard now, any changes that you\u2019ve made won\u2019t be saved."
//             ),
//           }),
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   226
// );

import { fbt } from "fbt";
import GeoButton from "GeoButton.react";
import GeoCancelButton from "GeoCancelButton.react";
import GeoModal from "GeoModal.react";
import GeoModalFooter from "GeoModalFooter.react";
import GeoModalHeader from "GeoModalHeader.react";
import GeoSection from "GeoSection.react";
import GeoText from "GeoText.react";
import React from "react";

interface BizKitLeftNavEditDiscardConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const BizKitLeftNavEditDiscardConfirmationModal: React.FC<
  BizKitLeftNavEditDiscardConfirmationModalProps
> = ({ onCancel, onConfirm }) => {
  return (
    <GeoModal
      hideOnBlur={false}
      hideOnEscape={false}
      header={<GeoModalHeader heading={fbt._("Discard changes?")} />}
      footer={
        <GeoModalFooter
          primaryButton={
            <GeoButton
              autoFocus
              label={fbt._("Discard")}
              onClick={onConfirm}
              variant="primary"
            />
          }
          secondaryButton={
            <GeoCancelButton onClick={onCancel} label={fbt._("Keep editing")} />
          }
        />
      }
      isShown
      onHide={onCancel}
      width={320}
    >
      <GeoSection>
        <GeoText>
          {fbt._(
            "If you discard now, any changes that you’ve made won’t be saved."
          )}
        </GeoText>
      </GeoSection>
    </GeoModal>
  );
};

BizKitLeftNavEditDiscardConfirmationModal.displayName = `${BizKitLeftNavEditDiscardConfirmationModal.name} [from some-module-id]`;

export default BizKitLeftNavEditDiscardConfirmationModal;
