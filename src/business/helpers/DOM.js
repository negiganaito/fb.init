/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
// import HTML from "fbjs/l";
// import createArrayFromMixed from "fbjs/lib/createArrayFromMixed";
// import isNode from "fbjs/lib/isNode";
// import isTextNode from "fbjs/lib/isTextNode";
// import FbtResultBase from "FbtResultBase";
// import isScalar from "isScalar";
// import TrustedTypesIEFixDOMPolicy from "TrustedTypesIEFixDOMPolicy";
// import UserAgent_DEPRECATED from "UserAgent_DEPRECATED";
import {
  contains,
  find,
  findPushSafe,
  getRootElement,
  getSelection,
  isInputNode,
  isNodeOfType,
  scry,
} from "./DOMQuery";
import Event from "./Event";

// import $ from "$";

function createElement(tagName, attributes, content) {
  const element = document.createElement(tagName);
  if (attributes) {
    DOM.setAttributes(element, attributes);
  }
  if (content !== null) {
    DOM.setContent(element, content);
  }
  return element;
}

const DOM = {
  find: find,
  findPushSafe: findPushSafe,
  scry: scry,
  getSelection: getSelection,
  contains: contains,
  getRootElement: getRootElement,
  isNodeOfType: isNodeOfType,
  isInputNode: isInputNode,
  create: createElement,
  setAttributes(element, attributes) {
    if (attributes.type) {
      element.type = attributes.type;
    }
    // eslint-disable-next-line guard-for-in
    for (const key in attributes) {
      const value = attributes[key];
      const isEventHandler = /^on/i.test(key);
      if (isEventHandler && typeof value !== "function") {
        console.log.warn(
          "Handlers passed to DOM.setAttributes must be functions. Handler passed for %s was %s",
          key,
          typeof value
        );
      }
      if (key === "type") {
        continue;
      } else if (key === "style") {
        if (typeof value === "string") {
          element.style.cssText = value;
        } else {
          Object.assign(element.style, value);
        }
      } else if (isEventHandler) {
        // Event.listen(element, key.substr(2), value);
      } else if (key in element) {
        element[key] = value;
      } else {
        element.setAttribute && element.setAttribute(key, value);
      }
    }
  },
  // prependContent(referenceElement, content) {
  //   if (!referenceElement) {
  //     throw fbError.TAAL.blameToPreviousFile(
  //       new Error("reference element is not a node")
  //     );
  //   }
  //   return insertContent(content, referenceElement, (node) => {
  //     if (referenceElement.firstChild) {
  //       referenceElement.insertBefore(node, referenceElement.firstChild);
  //     } else {
  //       referenceElement.appendChild(node);
  //     }
  //   });
  // },
  // insertAfter(referenceElement, content) {
  //   if (!referenceElement || !referenceElement.parentNode) {
  //     throw fbError.TAAL.blameToPreviousFile(
  //       new Error("reference element does not have a parent")
  //     );
  //   }
  //   const parent = referenceElement.parentNode;
  //   return insertContent(content, parent, (node) => {
  //     if (referenceElement.nextSibling) {
  //       parent.insertBefore(node, referenceElement.nextSibling);
  //     } else {
  //       parent.appendChild(node);
  //     }
  //   });
  // },
  // insertBefore(referenceElement, content) {
  //   if (!referenceElement || !referenceElement.parentNode) {
  //     throw fbError.TAAL.blameToPreviousFile(
  //       new Error("reference element does not have a parent")
  //     );
  //   }
  //   const parent = referenceElement.parentNode;
  //   return insertContent(content, parent, (node) => {
  //     parent.insertBefore(node, referenceElement);
  //   });
  // },
  setContent(referenceElement, content) {
    if (!referenceElement) {
      throw new Error("reference element is not a node");
    }
    while (referenceElement.firstChild) {
      removeNode(referenceElement.firstChild);
    }
    return DOM.appendContent(referenceElement, content);
  },
  // appendContent(referenceElement, content) {
  //   if (!referenceElement) {
  //     throw fbError.TAAL.blameToPreviousFile(
  //       new Error("reference element is not a node")
  //     );
  //   }
  //   return insertContent(content, referenceElement, (node) => {
  //     referenceElement.appendChild(node);
  //   });
  // },
  // replace(referenceElement, content) {
  //   if (!referenceElement || !referenceElement.parentNode) {
  //     throw fbError.TAAL.blameToPreviousFile(
  //       new Error("reference element does not have a parent")
  //     );
  //   }
  //   const parent = referenceElement.parentNode;
  //   return insertContent(content, parent, (node) => {
  //     parent.replaceChild(node, referenceElement);
  //   });
  // },
  // remove(element) {
  //   removeNode(typeof element === "string" ? $(element) : element);
  // },
  // empty(element) {
  //   element = typeof element === "string" ? $(element) : element;
  //   while (element.firstChild) {
  //     removeNode(element.firstChild);
  //   }
  // },
};

function removeNode(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}

// eslint-disable-next-line complexity
// function insertContent(content, container, insertFn) {
//   content = HTML.replaceJSONWrapper(content);
//   if (
//     content instanceof HTML &&
//     container.firstChild === null &&
//     content.toString().indexOf("<script") === -1
//   ) {
//     const ieVersion = UserAgent_DEPRECATED.ie();
//     if (
//       !ieVersion ||
//       (ieVersion > 7 &&
//         !isNodeOfType(container, [
//           "table",
//           "tbody",
//           "thead",
//           "tfoot",
//           "tr",
//           "select",
//           "fieldset",
//         ]))
//     ) {
//       const placeholder = ieVersion
//         ? '<em style="display:none;">&nbsp;</em>'
//         : "";
//       container.innerHTML = TrustedTypesIEFixDOMPolicy.createHTML(
//         placeholder + content
//       );
//       if (ieVersion) {
//         container.removeChild(container.firstChild);
//       }
//       return Array.from(container.childNodes);
//     }
//   } else if (isTextNode(container)) {
//     container.data = content;
//     return [content];
//   }
//   const fragment = document.createDocumentFragment();
//   const actions = [];
//   let nodes = [];

//   content = createArrayFromMixed(content);
//   if (content.length === 1 && content[0] instanceof FbtResultBase) {
//     content = content[0].getContents();
//   }

//   for (let i = 0; i < content.length; i++) {
//     let node = HTML.replaceJSONWrapper(content[i]);
//     if (node instanceof HTML) {
//       actions.push(node.getAction());
//       const htmlNodes = node.getNodes();
//       if (!actions.length && node.hasInlineJs()) {
//         FBLogger("staticresources").warn(
//           "DOM: adding HTML which contains inline JS"
//         );
//       }
//       for (let j = 0; j < htmlNodes.length; j++) {
//         nodes.push(htmlNodes[j]);
//         fragment.appendChild(htmlNodes[j]);
//       }
//     } else if (isScalar(node) || node instanceof FbtResultBase) {
//       const textNode = document.createTextNode(node);
//       nodes.push(textNode);
//       fragment.appendChild(textNode);
//     } else if (isNode(node)) {
//       nodes.push(node);
//       fragment.appendChild(node);
//     } else {
//       if (Array.isArray(node)) {
//         FBLogger("dom").warn("Nest arrays not supported");
//       } else if (node !== null) {
//         FBLogger("dom").warn("No way to set content %s", node);
//       }
//     }
//   }

//   insertFn(fragment);
//   actions.forEach((action) => action());
//   return nodes;
// }

export default DOM;
