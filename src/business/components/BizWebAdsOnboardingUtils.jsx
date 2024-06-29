// __d(
//   "BizWebAdsOnboardingUtils",
//   [
//     "ix",
//     "$InternalEnum",
//     "BizWebAdsOnboardingStrings",
//     "Image.react",
//     "fbicon",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j = i || d("react");
//     f = "mid_ads_flow_toast_learn_more";
//     var k = b("$InternalEnum").Mirrored([
//         "ADVANCED_TARGETING",
//         "DETAILED_INSIGHTS",
//         "OPTIMIZE_ADS",
//       ]),
//       l = j.createRef(),
//       m = j.createRef(),
//       n = j.createRef(),
//       o = j.createRef();
//     function a(a) {
//       switch (a) {
//         case k.ADVANCED_TARGETING:
//           return {
//             content: d("BizWebAdsOnboardingStrings")
//               .ADS_ADVANCED_TARGETING_VALUE_PROP,
//             icon: d("fbicon")._(h("485106"), 24),
//           };
//         case k.DETAILED_INSIGHTS:
//           return {
//             content: d("BizWebAdsOnboardingStrings")
//               .ADS_DETAILED_INSIGHTS_VALUE_PROP,
//             icon: d("fbicon")._(h("489805"), 24),
//           };
//         case k.OPTIMIZE_ADS:
//           return {
//             content: d("BizWebAdsOnboardingStrings")
//               .ADS_OPTIMIZE_ADS_VALUE_PROP,
//             icon: d("fbicon")._(h("303561"), 24),
//           };
//       }
//     }
//     var p = b("$InternalEnum").Mirrored([
//         "WITH_MODAL",
//         "WITHOUT_MODAL",
//         "MID_ADS_FLOW",
//       ]),
//       q = b("$InternalEnum").Mirrored([
//         "POSTS_AND_STORIES",
//         "AD_PERFORMANCE",
//         "WELCOME_TO_ADS",
//         "ADS_SUMMARY_CARD",
//       ]);
//     function e(a) {
//       switch (a) {
//         case q.POSTS_AND_STORIES:
//           return {
//             content: d("BizWebAdsOnboardingStrings")
//               .POSTS_AND_STORIES_TIP_DESCRIPTION,
//             contextRef: l,
//             heading: d("BizWebAdsOnboardingStrings")
//               .POSTS_AND_STORIES_TIP_TITLE,
//             image: j.jsx(c("Image.react"), { src: h("352655") }),
//           };
//         case q.AD_PERFORMANCE:
//           return {
//             content: d("BizWebAdsOnboardingStrings")
//               .AD_PERFORMANCE_TIP_DESCRIPTION,
//             contextRef: m,
//             heading: d("BizWebAdsOnboardingStrings").AD_PERFORMANCE_TIP_TITLE,
//             image: j.jsx(c("Image.react"), { src: h("284250") }),
//           };
//         case q.WELCOME_TO_ADS:
//           return {
//             content: d("BizWebAdsOnboardingStrings")
//               .WELCOME_TO_ADS_TIP_DESCRIPTION,
//             contextRef: n,
//             heading: d("BizWebAdsOnboardingStrings").WELCOME_TO_ADS_TIP_TITLE,
//             image: j.jsx(c("Image.react"), { src: h("372016") }),
//           };
//         case q.ADS_SUMMARY_CARD:
//           return {
//             content: d("BizWebAdsOnboardingStrings")
//               .ADS_SUMMARY_TIP_DESCRIPTION,
//             contextRef: o,
//             heading: d("BizWebAdsOnboardingStrings").ADS_SUMMARY_TIP_TITLE,
//             image: j.jsx("div", { style: { height: "10px" } }),
//             position: "below",
//           };
//       }
//     }
//     g.MID_ADS_FLOW_TOAST_LEARN_MORE = f;
//     g.AdsValueProps = k;
//     g.postsAndStoriesButtonRef = l;
//     g.adPerformanceButtonRef = m;
//     g.welcomeToAdsButtonRef = n;
//     g.adSummaryCardRef = o;
//     g.getValuePropInfo = a;
//     g.AdsGuidanceTourFlow = p;
//     g.AdsGuidanceTourSteps = q;
//     g.getGuidanceTourStepsInfo = e;
//   },
//   98
// );

import { Mirrored } from "$InternalEnum";
import {
  ADS_ADVANCED_TARGETING_VALUE_PROP,
  ADS_DETAILED_INSIGHTS_VALUE_PROP,
  ADS_OPTIMIZE_ADS_VALUE_PROP,
  POSTS_AND_STORIES_TIP_DESCRIPTION,
  POSTS_AND_STORIES_TIP_TITLE,
  AD_PERFORMANCE_TIP_DESCRIPTION,
  AD_PERFORMANCE_TIP_TITLE,
  WELCOME_TO_ADS_TIP_DESCRIPTION,
  WELCOME_TO_ADS_TIP_TITLE,
  ADS_SUMMARY_TIP_DESCRIPTION,
  ADS_SUMMARY_TIP_TITLE,
} from "BizWebAdsOnboardingStrings";
import Image from "Image.react";
import { _ as fbicon } from "fbicon";
import React, { createRef } from "react";

const MID_ADS_FLOW_TOAST_LEARN_MORE = "mid_ads_flow_toast_learn_more";

enum AdsValueProps {
  ADVANCED_TARGETING = "ADVANCED_TARGETING",
  DETAILED_INSIGHTS = "DETAILED_INSIGHTS",
  OPTIMIZE_ADS = "OPTIMIZE_ADS",
}

const postsAndStoriesButtonRef = createRef<HTMLDivElement>();
const adPerformanceButtonRef = createRef<HTMLDivElement>();
const welcomeToAdsButtonRef = createRef<HTMLDivElement>();
const adSummaryCardRef = createRef<HTMLDivElement>();

interface ValuePropInfo {
  content: string;
  icon: JSX.Element;
}

function getValuePropInfo(valueProp: AdsValueProps): ValuePropInfo | undefined {
  switch (valueProp) {
    case AdsValueProps.ADVANCED_TARGETING:
      return {
        content: ADS_ADVANCED_TARGETING_VALUE_PROP,
        icon: fbicon("485106", 24),
      };
    case AdsValueProps.DETAILED_INSIGHTS:
      return {
        content: ADS_DETAILED_INSIGHTS_VALUE_PROP,
        icon: fbicon("489805", 24),
      };
    case AdsValueProps.OPTIMIZE_ADS:
      return {
        content: ADS_OPTIMIZE_ADS_VALUE_PROP,
        icon: fbicon("303561", 24),
      };
  }
}

enum AdsGuidanceTourFlow {
  WITH_MODAL = "WITH_MODAL",
  WITHOUT_MODAL = "WITHOUT_MODAL",
  MID_ADS_FLOW = "MID_ADS_FLOW",
}

enum AdsGuidanceTourSteps {
  POSTS_AND_STORIES = "POSTS_AND_STORIES",
  AD_PERFORMANCE = "AD_PERFORMANCE",
  WELCOME_TO_ADS = "WELCOME_TO_ADS",
  ADS_SUMMARY_CARD = "ADS_SUMMARY_CARD",
}

interface GuidanceTourStepInfo {
  content: string;
  contextRef: React.RefObject<HTMLDivElement>;
  heading: string;
  image: JSX.Element;
  position?: string;
}

function getGuidanceTourStepsInfo(
  step: AdsGuidanceTourSteps
): GuidanceTourStepInfo | undefined {
  switch (step) {
    case AdsGuidanceTourSteps.POSTS_AND_STORIES:
      return {
        content: POSTS_AND_STORIES_TIP_DESCRIPTION,
        contextRef: postsAndStoriesButtonRef,
        heading: POSTS_AND_STORIES_TIP_TITLE,
        image: <Image src="352655" />,
      };
    case AdsGuidanceTourSteps.AD_PERFORMANCE:
      return {
        content: AD_PERFORMANCE_TIP_DESCRIPTION,
        contextRef: adPerformanceButtonRef,
        heading: AD_PERFORMANCE_TIP_TITLE,
        image: <Image src="284250" />,
      };
    case AdsGuidanceTourSteps.WELCOME_TO_ADS:
      return {
        content: WELCOME_TO_ADS_TIP_DESCRIPTION,
        contextRef: welcomeToAdsButtonRef,
        heading: WELCOME_TO_ADS_TIP_TITLE,
        image: <Image src="372016" />,
      };
    case AdsGuidanceTourSteps.ADS_SUMMARY_CARD:
      return {
        content: ADS_SUMMARY_TIP_DESCRIPTION,
        contextRef: adSummaryCardRef,
        heading: ADS_SUMMARY_TIP_TITLE,
        image: <div style={{ height: "10px" }} />,
        position: "below",
      };
  }
}

export {
  MID_ADS_FLOW_TOAST_LEARN_MORE,
  AdsValueProps,
  postsAndStoriesButtonRef,
  adPerformanceButtonRef,
  welcomeToAdsButtonRef,
  adSummaryCardRef,
  getValuePropInfo,
  AdsGuidanceTourFlow,
  AdsGuidanceTourSteps,
  getGuidanceTourStepsInfo,
};
