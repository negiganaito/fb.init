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
import { useMemo } from "react";
import CurrentUser from "CurrentUser";
import { getBizAppTabName } from "getBizAppTabName";
import useBizKitIgAccount from "useBizKitIgAccount";
import useBizKitIGBusinessAsset from "useBizKitIGBusinessAsset";
import useBizKitPageNullable from "useBizKitPageNullable";
import useBizWebCurrentTabName from "useBizWebCurrentTabName";
import useBizWebGetRouteParams from "useBizWebGetRouteParams";
import USID from "USID";

function getTabName(tabName) {
  if (tabName === null) return "unknown";
  return getBizAppTabName(tabName);
}

function useBizKitBaseLoggingData() {
  const pageId = useBizKitPageNullable();
  const igAccount = useBizKitIgAccount();
  const igBusinessAsset = useBizKitIGBusinessAsset();
  const currentTabName = useBizWebCurrentTabName();
  const tab = getTabName(currentTabName);
  const routeParams = useBizWebGetRouteParams() || {};
  const navRef = routeParams.nav_ref;

  return useMemo(() => {
    const referrer = navRef
      ? `${document.referrer}, from: ${navRef}`
      : document.referrer;

    return {
      event_location: "unknown",
      ig_account_id: igBusinessAsset ?? igAccount,
      logged_in_user_id: CurrentUser.getAccountID(),
      logged_in_user_type: "facebook",
      page_id: pageId,
      referrer,
      tab,
      ...USID.get().contextData(),
    };
  }, [tab, pageId, igAccount, navRef, igBusinessAsset]);
}

export default useBizKitBaseLoggingData;
