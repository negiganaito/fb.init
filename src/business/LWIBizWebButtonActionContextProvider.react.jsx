__d(
  "LWIBizWebButtonActionContextProvider.react",
  [
    "BizWebAdCenterLoggerContextProvider.react",
    "CometTransientDialogProvider.react",
    "LWIBizWebButtonActionContextProviderBase.react",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      var b = a.children;
      a = a.isForMoreButton;
      return a === !0
        ? i.jsx(c("BizWebAdCenterLoggerContextProvider.react"), {
            children: i.jsx(
              c("LWIBizWebButtonActionContextProviderBase.react"),
              { children: b }
            ),
          })
        : i.jsx(c("BizWebAdCenterLoggerContextProvider.react"), {
            children: i.jsx(c("CometTransientDialogProvider.react"), {
              children: i.jsx(
                c("LWIBizWebButtonActionContextProviderBase.react"),
                { children: b }
              ),
            }),
          });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import React from "react";
import BizWebAdCenterLoggerContextProvider from "BizWebAdCenterLoggerContextProvider.react";
import CometTransientDialogProvider from "CometTransientDialogProvider.react";
import LWIBizWebButtonActionContextProviderBase from "LWIBizWebButtonActionContextProviderBase.react";

interface Props {
  children: React.ReactNode;
  isForMoreButton?: boolean;
}

const LWIBizWebButtonActionContextProvider: React.FC<Props> = ({
  children,
  isForMoreButton,
}) => {
  return isForMoreButton ? (
    <BizWebAdCenterLoggerContextProvider>
      <LWIBizWebButtonActionContextProviderBase>
        {children}
      </LWIBizWebButtonActionContextProviderBase>
    </BizWebAdCenterLoggerContextProvider>
  ) : (
    <BizWebAdCenterLoggerContextProvider>
      <CometTransientDialogProvider>
        <LWIBizWebButtonActionContextProviderBase>
          {children}
        </LWIBizWebButtonActionContextProviderBase>
      </CometTransientDialogProvider>
    </BizWebAdCenterLoggerContextProvider>
  );
};

LWIBizWebButtonActionContextProvider.displayName = `${LWIBizWebButtonActionContextProvider.name} [from ${__filename}]`;

export default LWIBizWebButtonActionContextProvider;
