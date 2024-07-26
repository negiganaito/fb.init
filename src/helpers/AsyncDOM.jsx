// __d(
//   "AsyncDOM",
//   ["CSS", "DOM", "FBLogger"],
//   function (a, b, c, d, e, f) {
//     a = {
//       invoke: function (a, c) {
//         for (var d = 0; d < a.length; ++d) {
//           var e = a[d],
//             f = e[0],
//             g = e[1],
//             h = e[2];
//           e = e[3];
//           h = (h && c) || null;
//           g && (h = b("DOM").scry(h || document.documentElement, g)[0]);
//           h ||
//             b("FBLogger")("async_dom").warn(
//               "Could not find relativeTo element for %s AsyncDOM operation based on selector: %s",
//               f,
//               g
//             );
//           switch (f) {
//             case "hide":
//               b("CSS").hide(h);
//               break;
//             case "show":
//               b("CSS").show(h);
//               break;
//             case "setContent":
//               b("DOM").setContent(h, e);
//               break;
//             case "appendContent":
//               b("DOM").appendContent(h, e);
//               break;
//             case "prependContent":
//               b("DOM").prependContent(h, e);
//               break;
//             case "insertAfter":
//               b("DOM").insertAfter(h, e);
//               break;
//             case "insertBefore":
//               b("DOM").insertBefore(h, e);
//               break;
//             case "remove":
//               b("DOM").remove(h);
//               break;
//             case "replace":
//               b("DOM").replace(h, e);
//               break;
//             default:
//               b("FBLogger")("async_dom").warn(
//                 "Received invalid command %s for AsyncDOM operation",
//                 f
//               );
//           }
//         }
//       },
//     };
//     e.exports = a;
//   },
//   null
// );

import CSS from "CSS";
import DOM from "DOM";
import FBLogger from "FBLogger";

const AsyncDOM = {
  invoke(commands, relativeTo) {
    commands.forEach(([command, selector, content, extra]) => {
      let targetElement = null;
      if (extra && relativeTo) {
        targetElement = DOM.scry(
          relativeTo || document.documentElement,
          selector
        )[0];
      }

      if (!targetElement) {
        FBLogger("async_dom").warn(
          `Could not find relativeTo element for ${command} AsyncDOM operation based on selector: ${selector}`
        );
        return;
      }

      switch (command) {
        case "hide":
          CSS.hide(targetElement);
          break;
        case "show":
          CSS.show(targetElement);
          break;
        case "setContent":
          DOM.setContent(targetElement, content);
          break;
        case "appendContent":
          DOM.appendContent(targetElement, content);
          break;
        case "prependContent":
          DOM.prependContent(targetElement, content);
          break;
        case "insertAfter":
          DOM.insertAfter(targetElement, content);
          break;
        case "insertBefore":
          DOM.insertBefore(targetElement, content);
          break;
        case "remove":
          DOM.remove(targetElement);
          break;
        case "replace":
          DOM.replace(targetElement, content);
          break;
        default:
          FBLogger("async_dom").warn(
            `Received invalid command ${command} for AsyncDOM operation`
          );
      }
    });
  },
};

export default AsyncDOM;
