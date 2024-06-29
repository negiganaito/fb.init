/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext } from "react";
import BizKitLeftNavExternalLinkItem_item from "BizKitLeftNavExternalLinkItem_item";
import BizKitExternalLinkImage from "path/to/BizKitExternalLinkImage.react";
import BizKitLeftNavSidebarBaseItem from "path/to/BizKitLeftNavSidebarBaseItem.react";
import BizKitLeftNavSidebarItemContext from "path/to/BizKitLeftNavSidebarItemContext";
import BizKitNavigationItemName from "path/to/BizKitNavigationItemName";
import BizKitNavigationToolVisitMutation from "path/to/BizKitNavigationToolVisitMutation";
import BizKitRouteContext from "path/to/BizKitRouteContext";
import BMToMBSConsoldationGating from "path/to/BMToMBSConsoldationGating";
import getJSEnumSafe from "path/to/getJSEnumSafe";
import useBizWebCurrentRouteName from "path/to/useBizWebCurrentRouteName";
import useBusinessCometLeftNavParams from "path/to/useBusinessCometLeftNavParams";
import useLogBizKitNavItem from "path/to/useLogBizKitNavItem";
import { useFragment } from "relay-hooks";

const BizKitLeftNavExternalLinkItem = ({ item }) => {
  const data = useFragment(BizKitLeftNavExternalLinkItem_item, item);

  const itemNameEnum = getJSEnumSafe(BizKitNavigationItemName, data.name);
  const sidebarItemContext = useContext(BizKitLeftNavSidebarItemContext);
  const position = sidebarItemContext.position;

  const logBizKitNavItem = useLogBizKitNavItem({
    name: itemNameEnum,
    location: "GLOBAL_NAV",
    position: position,
    external: true,
  });
  const { onClick } = logBizKitNavItem;

  const { businessID } = useBusinessCometLeftNavParams();
  const navigateToTool = BizKitNavigationToolVisitMutation(
    data.bm_tool_name,
    businessID
  );

  const routeContext = useContext(BizKitRouteContext);
  const routeName = routeContext.routeName;
  const currentRouteName = useBizWebCurrentRouteName();

  const isAttachmentRequired =
    itemNameEnum === "BUSINESS_MANAGER" ||
    routeName === "BUSINESS_HOME" ||
    (currentRouteName === "SETTINGS" &&
      BMToMBSConsoldationGating.getEnableBMSCIntegration());

  return (
    <BizKitLeftNavSidebarBaseItem
      // eslint-disable-next-line react/jsx-no-useless-fragment
      attachment={isAttachmentRequired ? <></> : <BizKitExternalLinkImage />}
      href={data.external_link || undefined}
      item={data}
      onPress={() => {
        onClick();
        navigateToTool();
      }}
      openInNewTab
    />
  );
};

BizKitLeftNavExternalLinkItem.displayName = `${BizKitLeftNavExternalLinkItem.name}`;

export default BizKitLeftNavExternalLinkItem;
