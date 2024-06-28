/**
 * @generated SignedSource<<c805043e31c39fa5825fd79d3d8fc499>>
 * @relayHash 5d5e0454cae8061960a1401d0dc6b25b
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

// @relayRequestID 5d5e0454cae8061960a1401d0dc6b25b
// @dataDrivenDependency userQuery.user.userProfile {"branches":{"UserProfile":{"component":"user-profile.jsx","fragment":"userProfile_user$normalization.graphql"}},"plural":false}

var node = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserProfile",
        "kind": "LinkedField",
        "name": "userProfile",
        "plural": false,
        "selections": [
          {
            "args": null,
            "documentName": "userQuery",
            "fragmentName": "userProfile_user",
            "fragmentPropName": "user",
            "kind": "ModuleImport"
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "userQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "userQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "5d5e0454cae8061960a1401d0dc6b25b",
    "metadata": {},
    "name": "userQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

node.hash = "1f3e3b8cc7ab1437752c16bbeb8fcf50";

module.exports = node;
