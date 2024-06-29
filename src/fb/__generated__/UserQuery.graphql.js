/**
 * @generated SignedSource<<95c8f413951d2215373b14dab5b75070>>
 * @relayHash 0faebbfc91fe9ebcfbaf9f18a57c9444
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

// @relayRequestID 0faebbfc91fe9ebcfbaf9f18a57c9444
// @dataDrivenDependency UserQuery.user.userProfile_renderer {"branches":{"UserProfileRenderer":{"component":"UserProfileRenderer","fragment":"UserProfileRenderer_renderer$normalization.graphql"}},"plural":false}

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
    "id": "0faebbfc91fe9ebcfbaf9f18a57c9444",
    "metadata": {},
    "name": "UserQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

node.hash = "d5ac04e0894156d5660c148cb4e49333";

module.exports = node;
