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

// import { useFragment } from "react-relay";
// import { BizKitAccountSwitcherPrefetcherShared_viewer } from "BizKitAccountSwitcherPrefetcherShared_viewer";
import useBizWebCurrentRouteName from "../../business/hooks/useBizWebCurrentRouteName";
import BizKitOverlayContext from "../contexts/BizKitOverlayContext";
import GeoToastReact from "../geo-ui/GeoToast.react";
import { convertGraphQLAccountToAccountInfo } from "../helpers/convertGraphQLAccountToAccountInfo";
import useGeoToaster from "../hooks/useGeoToaster";

const BizKitAccountSwitcherPrefetcherShared = ({ viewer }) => {
  const { setCurrentAccountInfo } = useContext(BizKitOverlayContext);
  const currentRouteName = useBizWebCurrentRouteName();
  // const data = useFragment(
  //   BizKitAccountSwitcherPrefetcherShared_viewer,
  //   viewer
  // );

  const data = {
    name: "Nguyễn Hữu Trương",
    profile_url:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/393453836_7394337813916554_797607708546273674_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=b0f13b&_nc_ohc=ZxjXqSaqV_MQ7kNvgFVYre6&_nc_ht=scontent.fsgn2-9.fna&oh=00_AYDODNOtwvBPmsmQWoB3yQBoVTA5UvpcBlfNzo0BQObOYw&oe=6680983C",
    user_type: "FB_USER",
    contact_point: null,
    active_session: true,
    uid: "100000212262904",
    cuid: "AYi3ca5rufSYMNPGuJAhVrWzQJ_aTcaYj4f5dHCuIDMkse3R-bEGofQMoDYOUGEhIHb-8BELiaQ9pZqfAZfqNj3l7Rk8Ps9NzGePJgi6bAVD9g",
  };

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
    console.log(accountInfo);

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
