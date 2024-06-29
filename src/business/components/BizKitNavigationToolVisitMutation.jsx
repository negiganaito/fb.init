__d(
  "BizKitNavigationToolVisitMutation",
  ["BizKitNavigationToolVisitMutation.graphql", "RelayHooks", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j = (i || d("react")).useCallback;
    function a(a, c) {
      var e = d("RelayHooks").useMutation(
          h !== void 0
            ? h
            : (h = b("BizKitNavigationToolVisitMutation.graphql"))
        ),
        f = e[0];
      return j(
        function () {
          f({ variables: { tool: a, business_id: c } });
        },
        [c, f, a]
      );
    }
    g["default"] = a;
  },
  98
);

import { useMutation } from "RelayHooks";
import BizKitNavigationToolVisitMutationGraphql from "BizKitNavigationToolVisitMutation.graphql";
import React, { useCallback } from "react";

type Variables = {
  tool: string;
  business_id: string;
};

function useBizKitNavigationToolVisitMutation(
  tool: string,
  business_id: string
) {
  const [commitMutation] = useMutation<Variables>(
    BizKitNavigationToolVisitMutationGraphql
  );

  return useCallback(() => {
    commitMutation({ variables: { tool, business_id } });
  }, [tool, business_id, commitMutation]);
}

export default useBizKitNavigationToolVisitMutation;
