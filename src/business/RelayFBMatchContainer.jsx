__d(
  "RelayFBMatchContainer",
  ["RelayFBModuleLoader", "react", "react-relay/relay-hooks/MatchContainer"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      var b = a.fallback,
        e = a.match;
      a = a.props;
      return i.jsx(c("react-relay/relay-hooks/MatchContainer"), {
        fallback: b,
        loader: d("RelayFBModuleLoader").read,
        match: e,
        props: a,
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import React from "react";
import RelayFBModuleLoader from "path/to/RelayFBModuleLoader";
import { MatchContainer } from "react-relay/relay-hooks";

interface RelayFBMatchContainerProps {
  fallback: React.ReactNode;
  match: any; // Replace with the correct type if available
  props: any; // Replace with the correct type if available
}

const RelayFBMatchContainer: React.FC<RelayFBMatchContainerProps> = ({
  fallback,
  match,
  props,
}) => {
  return (
    <MatchContainer
      fallback={fallback}
      loader={RelayFBModuleLoader.read}
      match={match}
      props={props}
    />
  );
};

RelayFBMatchContainer.displayName = `${RelayFBMatchContainer.name} [from ${module.id}]`;

export default RelayFBMatchContainer;
