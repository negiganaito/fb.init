__d(
  "BusinessUnifiedScopingSelector.react",
  [
    "BusinessUnifiedScopingSelectorButtonContainer.react",
    "BusinessUnifiedScopingSelectorContext",
    "BusinessUnifiedScopingSelectorQuery.graphql",
    "BusinessUnifiedScopingSelectorUtils",
    "MetaBusinessScopeTypeEnumUtils.facebook",
    "RelayHooks",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j = i || (i = d("react"));
    e = i;
    var k = e.useMemo,
      l = e.useRef,
      m = e.useState,
      n =
        h !== void 0
          ? h
          : (h = b("BusinessUnifiedScopingSelectorQuery.graphql"));
    function a(a) {
      var b = a.businessToolName,
        e = a.isCollapsed,
        f = a.onCollapsedChange,
        g = a.onlyShowFirstLevelScopes;
      a = a.queryRef;
      var h = d("BusinessUnifiedScopingSelectorUtils").getRuntimeSite(),
        i = d("RelayHooks").usePreloadedQuery(n, a),
        o =
          (a =
            (a = i.viewer) == null
              ? void 0
              : (a = a.meta_business_scoping) == null
              ? void 0
              : a.current_scope) != null
            ? a
            : (a = i.viewer) == null
            ? void 0
            : (a = a.meta_business_scoping) == null
            ? void 0
            : a.user_section,
        p =
          (a = i.viewer) == null
            ? void 0
            : (a = a.meta_business_scoping) == null
            ? void 0
            : a.current_first_level_scope;
      a = m(!1);
      var q = a[0],
        r = a[1];
      a = m(!1);
      var s = a[0],
        t = a[1];
      a = m(null);
      var u = a[0],
        v = a[1],
        w =
          g === !0
            ? 1
            : (a = i.viewer) == null
            ? void 0
            : (g = a.meta_business_scoping) == null
            ? void 0
            : g.lowest_business_scope_level,
        x =
          (g =
            (a = i.viewer) == null
              ? void 0
              : (g = a.meta_business_scoping) == null
              ? void 0
              : (a = g.current_first_level_scope) == null
              ? void 0
              : a.scope_id) != null
            ? g
            : (a = i.viewer) == null
            ? void 0
            : (g = a.meta_business_scoping) == null
            ? void 0
            : (a = g.user_section) == null
            ? void 0
            : a.scope_id,
        y = w === 1 ? null : o == null ? void 0 : o.scope_id,
        z = l(new Map()),
        A = l(new Map()),
        B = l(null);
      g = k(
        function () {
          var a;
          return {
            businessToolName: b,
            currentFirstLevelScope: {
              imageUri:
                p == null
                  ? void 0
                  : (a = p.scope_profile_picture) == null
                  ? void 0
                  : a.uri,
              scopeId: p == null ? void 0 : p.scope_id,
              scopeType: d("MetaBusinessScopeTypeEnumUtils.facebook").toJSEnum(
                p == null ? void 0 : p.scope_type
              ),
            },
            currentScope: {
              imageUri:
                o == null
                  ? void 0
                  : (a = o.scope_profile_picture) == null
                  ? void 0
                  : a.uri,
              scopeId: o == null ? void 0 : o.scope_id,
              scopeName: o == null ? void 0 : o.scope_name,
              scopeType: d("MetaBusinessScopeTypeEnumUtils.facebook").toJSEnum(
                o == null ? void 0 : o.scope_type
              ),
            },
            debouncedSearchString: u,
            isCollapsed: e,
            isShowAllPersonalZeroLevelScopes: s,
            isShowPopoverContentForAllZeroLevelScopes: q,
            loadAllZeroScopesQuery: B,
            loggingData: {
              business_tool: b,
              current_scope_id:
                (a = o == null ? void 0 : o.scope_id) != null ? a : "",
              current_scope_type: d(
                "MetaBusinessScopeTypeEnumUtils.facebook"
              ).toJSEnum(o == null ? void 0 : o.scope_type),
              first_level_scope_id: x,
              zero_level_scope_id: y,
            },
            lowestBusinessScopeLevel: w,
            mapBusinessScopeIdAndSearchStringToChildrenScopesShownNumber: A,
            mapSearchStringToBusinessScopesShownNumber: z,
            onCollapsedChange: f,
            runtimeSite: h,
            setDebouncedSearchString: v,
            setIsShowAllPersonalZeroLevelScopes: t,
            setIsShowPopoverContentForAllZeroLevelScopes: r,
            topBusinessScopeLevel:
              (a = i.viewer) == null
                ? void 0
                : (a = a.meta_business_scoping) == null
                ? void 0
                : a.top_business_scope_level,
          };
        },
        [b, p, o, u, e, s, q, x, y, w, f, h, i]
      );
      return j.jsx(c("BusinessUnifiedScopingSelectorContext").Provider, {
        value: g,
        children: j.jsx(
          c("BusinessUnifiedScopingSelectorButtonContainer.react"),
          { firstLevelScopeId: x, zeroLevelScopeId: y }
        ),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import React, { useMemo, useRef, useState } from "react";
import BusinessUnifiedScopingSelectorButtonContainer from "BusinessUnifiedScopingSelectorButtonContainer.react";
import { BusinessUnifiedScopingSelectorContext } from "BusinessUnifiedScopingSelectorContext";
import { BusinessUnifiedScopingSelectorQuery } from "BusinessUnifiedScopingSelectorQuery.graphql";
import { getRuntimeSite } from "BusinessUnifiedScopingSelectorUtils";
import { MetaBusinessScopeTypeEnumUtils } from "MetaBusinessScopeTypeEnumUtils.facebook";
import { usePreloadedQuery } from "RelayHooks";
import { PreloadedQuery } from "relay-runtime";

interface Props {
  businessToolName: string;
  isCollapsed: boolean;
  onCollapsedChange?: (isCollapsed: boolean) => void;
  onlyShowFirstLevelScopes?: boolean;
  queryRef: PreloadedQuery<any>;
}

const BusinessUnifiedScopingSelector: React.FC<Props> = ({
  businessToolName,
  isCollapsed,
  onCollapsedChange,
  onlyShowFirstLevelScopes,
  queryRef,
}) => {
  const runtimeSite = getRuntimeSite();
  const data = usePreloadedQuery(BusinessUnifiedScopingSelectorQuery, queryRef);

  const currentScope =
    data.viewer?.meta_business_scoping?.current_scope ??
    data.viewer?.meta_business_scoping?.user_section;
  const currentFirstLevelScope =
    data.viewer?.meta_business_scoping?.current_first_level_scope;

  const [
    isShowPopoverContentForAllZeroLevelScopes,
    setIsShowPopoverContentForAllZeroLevelScopes,
  ] = useState(false);
  const [
    isShowAllPersonalZeroLevelScopes,
    setIsShowAllPersonalZeroLevelScopes,
  ] = useState(false);
  const [debouncedSearchString, setDebouncedSearchString] = useState<
    string | null
  >(null);

  const lowestBusinessScopeLevel = onlyShowFirstLevelScopes
    ? 1
    : data.viewer?.meta_business_scoping?.lowest_business_scope_level;
  const firstLevelScopeId =
    data.viewer?.meta_business_scoping?.current_first_level_scope?.scope_id ??
    data.viewer?.meta_business_scoping?.user_section?.scope_id;
  const zeroLevelScopeId =
    lowestBusinessScopeLevel === 1 ? null : currentScope?.scope_id;

  const mapSearchStringToBusinessScopesShownNumber = useRef<
    Map<string, number>
  >(new Map());
  const mapBusinessScopeIdAndSearchStringToChildrenScopesShownNumber = useRef<
    Map<string, number>
  >(new Map());
  const loadAllZeroScopesQuery = useRef<any>(null);

  const contextValue = useMemo(() => {
    const currentScopeImageUri = currentScope?.scope_profile_picture?.uri;
    const currentScopeId = currentScope?.scope_id;
    const currentScopeName = currentScope?.scope_name;
    const currentScopeType = MetaBusinessScopeTypeEnumUtils.toJSEnum(
      currentScope?.scope_type
    );

    const currentFirstLevelScopeImageUri =
      currentFirstLevelScope?.scope_profile_picture?.uri;
    const currentFirstLevelScopeId = currentFirstLevelScope?.scope_id;
    const currentFirstLevelScopeType = MetaBusinessScopeTypeEnumUtils.toJSEnum(
      currentFirstLevelScope?.scope_type
    );

    return {
      businessToolName,
      currentFirstLevelScope: {
        imageUri: currentFirstLevelScopeImageUri,
        scopeId: currentFirstLevelScopeId,
        scopeType: currentFirstLevelScopeType,
      },
      currentScope: {
        imageUri: currentScopeImageUri,
        scopeId: currentScopeId,
        scopeName: currentScopeName,
        scopeType: currentScopeType,
      },
      debouncedSearchString,
      isCollapsed,
      isShowAllPersonalZeroLevelScopes,
      isShowPopoverContentForAllZeroLevelScopes,
      loadAllZeroScopesQuery,
      loggingData: {
        business_tool: businessToolName,
        current_scope_id: currentScopeId ?? "",
        current_scope_type: currentScopeType,
        first_level_scope_id: firstLevelScopeId,
        zero_level_scope_id: zeroLevelScopeId,
      },
      lowestBusinessScopeLevel,
      mapBusinessScopeIdAndSearchStringToChildrenScopesShownNumber,
      mapSearchStringToBusinessScopesShownNumber,
      onCollapsedChange,
      runtimeSite,
      setDebouncedSearchString,
      setIsShowAllPersonalZeroLevelScopes,
      setIsShowPopoverContentForAllZeroLevelScopes,
      topBusinessScopeLevel:
        data.viewer?.meta_business_scoping?.top_business_scope_level,
    };
  }, [
    businessToolName,
    currentFirstLevelScope,
    currentScope,
    debouncedSearchString,
    isCollapsed,
    isShowAllPersonalZeroLevelScopes,
    isShowPopoverContentForAllZeroLevelScopes,
    firstLevelScopeId,
    zeroLevelScopeId,
    lowestBusinessScopeLevel,
    onCollapsedChange,
    runtimeSite,
    data.viewer,
  ]);

  return (
    <BusinessUnifiedScopingSelectorContext.Provider value={contextValue}>
      <BusinessUnifiedScopingSelectorButtonContainer
        firstLevelScopeId={firstLevelScopeId}
        zeroLevelScopeId={zeroLevelScopeId}
      />
    </BusinessUnifiedScopingSelectorContext.Provider>
  );
};

BusinessUnifiedScopingSelector.displayName = `${BusinessUnifiedScopingSelector.name}`;

export default BusinessUnifiedScopingSelector;
