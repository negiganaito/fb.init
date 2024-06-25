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
import React, { useContext, useEffect, useRef } from "react";
import { useFragment } from "react-relay";
import { BizKitAccountSwitcherPrefetcherShared_viewer } from "BizKitAccountSwitcherPrefetcherShared_viewer";
import { useBizWebCurrentRouteName } from "useBizWebCurrentRouteName";
import { useGeoToaster } from "useGeoToaster";

import BizKitOverlayContext from "../contexts/BizKitOverlayContext";
import GeoToastReact from "../geo-ui/GeoToast.react";
import { convertGraphQLAccountToAccountInfo } from "../helpers/convertGraphQLAccountToAccountInfo";

const BizKitAccountSwitcherPrefetcherShared = ({ viewer }) => {
  const { setCurrentAccountInfo } = useContext(BizKitOverlayContext);
  const currentRouteName = useBizWebCurrentRouteName();
  const data = useFragment(
    BizKitAccountSwitcherPrefetcherShared_viewer,
    viewer
  );

  const {
    active_session,
    contact_point,
    cuid,
    name,
    profile_url,
    uid,
    user_type,
  } = data?.current_user_info ?? {};

  const { add } = useGeoToaster();
  const hasLoggedInOnce = useRef(false);

  useEffect(() => {
    const accountInfo = convertGraphQLAccountToAccountInfo({
      active_session,
      contact_point,
      cuid,
      is_curr_user: true,
      name,
      profile_url,
      uid,
      user_type,
    });

    if (accountInfo) {
      setCurrentAccountInfo(accountInfo);

      if (
        !hasLoggedInOnce.current &&
        data.is_eligible_for_account_switcher_m2 &&
        currentRouteName === "HOME"
      ) {
        hasLoggedInOnce.current = true;
        // logAccountSwitcherImpression("TOAST", baseLoggingData);
        add(
          <GeoToastReact
            description="You can view and manage business assets you access with this profile."
            hasIcon
            heading={`You’re now logged in with ${accountInfo.name}`}
            status="success"
          />
        );
      }
    }
  }, [
    active_session,
    contact_point,
    cuid,
    data.is_eligible_for_account_switcher_m2,
    name,
    profile_url,
    uid,
    user_type,
    setCurrentAccountInfo,
    currentRouteName,
    add,
  ]);

  return null;
};

BizKitAccountSwitcherPrefetcherShared.displayName = `BizKitAccountSwitcherPrefetcherShared`;

export default BizKitAccountSwitcherPrefetcherShared;
