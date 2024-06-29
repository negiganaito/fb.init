/**
 * @generated SignedSource<<80faaa0433d9c0f6187d6990270c196b>>
 * @relayHash a531832d0f757832856343536a5a9ce8
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

// @relayRequestID a531832d0f757832856343536a5a9ce8
// @dataDrivenDependency UserQuery.user.userProfile_renderer {"branches":{"UserProfileRenderer":{"component":"user-profile.jsx","fragment":"UserProfileRenderer_renderer$normalization.graphql"}},"plural":false}

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
        "concreteType": "UserProfileRenderer",
        "kind": "LinkedField",
        "name": "userProfile_renderer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "documentName": "UserQuery",
            "fragmentName": "UserProfileRenderer_renderer",
            "fragmentPropName": "renderer",
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
    "name": "UserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "a531832d0f757832856343536a5a9ce8",
    "metadata": {},
    "name": "UserQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

node.hash = "f7b773e4e044e666c61c91c4221fcf81";

module.exports = node;
