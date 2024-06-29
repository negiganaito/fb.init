// __d(
//   "DownscopingToastDismissedMutation",
//   [
//     "BizKitConstants",
//     "CometRelay",
//     "DownscopingToastDismissedMutation_updateMutation.graphql",
//     "FBLogger",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i =
//         h !== void 0
//           ? h
//           : (h = b("DownscopingToastDismissedMutation_updateMutation.graphql"));
//     function a(a, b, e, f) {
//       d("CometRelay").commitMutation(b, {
//         mutation: i,
//         onCompleted: function () {
//           e == null ? void 0 : e();
//         },
//         onError: function (a) {
//           c("FBLogger")(d("BizKitConstants").BIZKIT_PROJECT_NAME).mustfix(
//             "Failed to set downscoping toast dismissed " + a.message
//           ),
//             f == null ? void 0 : f(a.message);
//         },
//         variables: { input: { is_downscoping_toast_dismissed: a } },
//       });
//     }
//     g.setDownscopingToastDismissedMutation = a;
//   },
//   98
// );

// DownscopingToastDismissedMutation.ts

import { BizKitConstants } from "BizKitConstants";
import { commitMutation, Environment } from "CometRelay";
import { DownscopingToastDismissedMutation_updateMutation } from "DownscopingToastDismissedMutation_updateMutation.graphql";
import FBLogger from "FBLogger";

const mutation = DownscopingToastDismissedMutation_updateMutation;

function setDownscopingToastDismissedMutation(
  isDismissed: boolean,
  environment: Environment,
  onCompleted?: () => void,
  onError?: (errorMessage: string) => void
): void {
  commitMutation(environment, {
    mutation,
    onCompleted: () => {
      onCompleted?.();
    },
    onError: (error: Error) => {
      FBLogger(BizKitConstants.BIZKIT_PROJECT_NAME).mustfix(
        `Failed to set downscoping toast dismissed ${error.message}`
      );
      onError?.(error.message);
    },
    variables: { input: { is_downscoping_toast_dismissed: isDismissed } },
  });
}

export { setDownscopingToastDismissedMutation };
