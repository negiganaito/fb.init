/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext, useEffect } from "react";
import { stylex } from "@stylexjs/stylex";
import { BizCoreNavCustomizationModalExitFlowFalcoEvent } from "BizCoreNavCustomizationModalExitFlowFalcoEvent";
import { BizCoreTabItemClickFalcoEvent } from "BizCoreTabItemClickFalcoEvent";
import BizKitLeftNavEditDiscardConfirmationModal from "BizKitLeftNavEditDiscardConfirmationModal.react";
import BizKitLeftNavEditModalEntrypoint from "BizKitLeftNavEditModal.entrypoint";
import { BizKitNavigationCustomizationContext } from "BizKitNavigationCustomizationContext";
import { fbt } from "fbt";
import GeoButton from "GeoButton.react";
import { useBizKitBaseLoggingData } from "useBizKitBaseLoggingData";
import { useBizKitSelectedAssets } from "useBizKitSelectedAssets";
import { useBoolean } from "useBoolean";
import { useGeoEntryPointModal } from "useGeoEntryPointModal";
import { useGlobalScope } from "useGlobalScope";
import { WebPixelRatio } from "WebPixelRatio";

interface BizKitLeftNavEditItemProps {
  editButtonRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  position: number;
}

const styles = {
  container: {
    opacity: "x1hc1fzr",
    transitionProperty: "x19991ni",
    transitionDuration: "x13dflua",
    marginTop: "x14vqqas",
    marginBottom: "xod5an3",
  },
  containerHidden: { opacity: "xg01cxk" },
};

const BizKitLeftNavEditItem: React.FC<BizKitLeftNavEditItemProps> = ({
  editButtonRef,
  isVisible,
  position,
}) => {
  const {
    value: isConfirmationVisible,
    setTrue: showConfirmation,
    setFalse: hideConfirmation,
  } = useBoolean(false);
  const { shouldShowCustomizeYourMenuAnytimeTip, setShowLeftNavEditModal } =
    useContext(BizKitNavigationCustomizationContext);
  const globalScope = useGlobalScope();
  const { assetID, assetType } = useBizKitSelectedAssets();
  const loggingData = useBizKitBaseLoggingData();

  const { showModal, hideModal, modal, isLoading } = useGeoEntryPointModal(
    BizKitLeftNavEditModalEntrypoint,
    {
      onBeforeHide: (source) => {
        if (source === "blur") {
          showConfirmation();
          return false;
        }
        BizCoreNavCustomizationModalExitFlowFalcoEvent.log(() => ({
          event_data: { hide_source: source },
          client_timestamp_ms: Date.now(),
          ...loggingData,
        }));
        return true;
      },
    },
    {
      globalScopeID: globalScope.id,
      localScopeID: assetID ?? "",
      localScopeType: assetType ?? "PAGE",
      scale: WebPixelRatio.get(),
    }
  );

  useEffect(() => {
    setShowLeftNavEditModal(() => showModal);
  }, [setShowLeftNavEditModal, showModal]);

  return (
    <div
      className={stylex(
        styles.container,
        !isVisible &&
          !shouldShowCustomizeYourMenuAnytimeTip &&
          styles.containerHidden
      )}
      data-testid={undefined}
    >
      <div className="x178xt8z x13fuv20 xkbhlo x1ptxcow x1e56ztr" />
      <GeoButton
        containerRef={editButtonRef}
        variant="flat"
        label={fbt._("Edit")}
        isLoading={isLoading}
        onClick={() => {
          if (assetID != null && assetType != null) {
            showModal();
            BizCoreTabItemClickFalcoEvent.log(() => ({
              event_data: {
                position: position.toString(),
                badge_type: "no_badging",
                target_tab: "edit_nav",
                location: "GLOBAL_NAV",
              },
              client_timestamp_ms: Date.now(),
              ...loggingData,
            }));
          }
        }}
        data-testid={undefined}
      />
      {modal}
      {isConfirmationVisible && (
        <BizKitLeftNavEditDiscardConfirmationModal
          onCancel={hideConfirmation}
          onConfirm={() => {
            hideConfirmation();
            hideModal();
            BizCoreNavCustomizationModalExitFlowFalcoEvent.log(() => ({
              event_data: { hide_source: "escape" },
              client_timestamp_ms: Date.now(),
              ...loggingData,
            }));
          }}
        />
      )}
    </div>
  );
};

BizKitLeftNavEditItem.displayName = `${BizKitLeftNavEditItem.name} [from some-module-id]`;

export default BizKitLeftNavEditItem;
