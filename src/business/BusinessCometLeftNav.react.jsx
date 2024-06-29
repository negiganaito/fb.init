/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import BizWebLeftNavShared from "BizWebLeftNavShared.react";
import { BusinessCometLeftNavQuery } from "BusinessCometLeftNavQuery.graphql";
import getBizKitGetAssetTypes from "getBizKitGetAssetTypes";
import { usePreloadedQuery } from "RelayHooks";
import useMultiAssetLeftNavEffect from "useMultiAssetLeftNavEffect";
import useSetBizKitTailoringContext from "useSetBizKitTailoringContext";

const BusinessCometLeftNav = ({
  businessCometHelpTraySideBarChatButtonQueryReference,
  businessCometLeftNavQueryReference,
  scopeSelectorQueries,
}) => {
  const query = usePreloadedQuery(
    BusinessCometLeftNavQuery,
    businessCometLeftNavQueryReference
  );

  const supportedAssetTypes = getBizKitGetAssetTypes(
    query?.viewer?.bizkit_scoping?.navigation_root_route_item
      ?.supported_asset_types ?? []
  );

  useMultiAssetLeftNavEffect(query);
  useSetBizKitTailoringContext(query.viewer?.bizkit_scoping);

  return (
    <BizWebLeftNavShared
      businessCometHelpTraySideBarChatButtonQueryReference={
        businessCometHelpTraySideBarChatButtonQueryReference
      }
      scopeSelectorQueries={scopeSelectorQueries}
      supportedAssetTypesForCurrentRoute={supportedAssetTypes}
      viewer={query.viewer}
    />
  );
};

BusinessCometLeftNav.displayName = `${BusinessCometLeftNav.name}`;

export default BusinessCometLeftNav;
