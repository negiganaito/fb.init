/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useEffect, useRef, useState } from "react";

import BizKitSidebarItem from "./business/components/BizKitSidebarItem.react";
import Image from "./faang/components/Image.react";

// import AbstractSidebarBaseItem from "./business/components/AbstractSidebarBaseItem.react";
// import Link from "./faang/components/Link.react";
// import AbstractSidebarDefaultRouterLink from "./business/components/AbstractSidebarDefaultRouterLink.react";
// import BizKitSidebarItem from "./business/components/BizKitSidebarItem.react";
// import BusinessCometAccountSwitcherPrefetcher from "./business/components/BusinessCometAccountSwitcherPrefetcher.react";
function App() {
  console.log("test");
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const helpIcon = isOpen
    ? {
        sprited: 2,
        spi: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/dL5k5_1BzdG.png",
        _spi: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/dL5k5_1BzdG.png",
        w: 16,
        h: 16,
        p: "-137px -82px",
        sz: "161px 123px",
        loggingID: "179895",
      }
    : {
        sprited: 2,
        spi: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/dL5k5_1BzdG.png",
        _spi: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/dL5k5_1BzdG.png",
        w: 16,
        h: 16,
        p: "-103px -82px",
        sz: "161px 123px",
        loggingID: "179881",
      };

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);
  return (
    <BizKitSidebarItem
      badge={<Image src={helpIcon} />}
      icon={
        <Image
          src={{
            sprited: 2,
            spi: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/dL5k5_1BzdG.png",
            _spi: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/dL5k5_1BzdG.png",
            w: 20,
            h: 20,
            p: "0 -102px",
            sz: "161px 123px",
            loggingID: "179843",
          }}
        />
      }
      iconActive={
        <Image
          src={{
            sprited: 2,
            spi: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/dL5k5_1BzdG.png",
            _spi: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/dL5k5_1BzdG.png",
            w: 20,
            h: 20,
            p: "0 -102px",
            sz: "161px 123px",
            loggingID: "179843",
          }}
        />
      }
      isFirst={false}
      onActivate={() => setIsOpen(!isOpen)}
      label="Help"
      ref={buttonRef}
      value="Help"
    />
  );
}
export default App;
