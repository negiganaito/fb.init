/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useId } from "react";

import MDSSvgIcon from "./MDSSvgIcon";

const MDSPinnedMessageIcon = (props) => {
  const filterId = useId();
  const gradientId1 = useId();
  const gradientId2 = useId();
  const gradientId3 = useId();

  return (
    <MDSSvgIcon {...props}>
      <g filter={`url(#${filterId})`}>
        <rect
          fill={`url(#${gradientId1})`}
          height="2"
          width="8"
          x="17"
          y="26"
        />
      </g>
      <path
        d="M23.9989 27.5928L23.9988 27.5383L24.0367 27.585C24.1817 27.7518 24.7409 28.2715 25.8875 27.9427C26.9382 27.6414 26.5281 26.8227 26.371 26.5705C26.3138 26.4819 26.2525 26.3965 26.1873 26.3135L16.8703 14.3899C16.2845 15.045 15.5884 15.6539 14.8084 16.0737L23.9989 27.5928Z"
        fill={`url(#${gradientId2})`}
      />
      <path
        d="M11.5653 17.1305C15.7434 17.1305 19.1305 13.7434 19.1305 9.56526C19.1305 5.38708 15.7434 2 11.5653 2C7.38708 2 4 5.38708 4 9.56526C4 13.7434 7.38708 17.1305 11.5653 17.1305Z"
        fill="#FF0D0D"
      />
      <path
        d="M9.19306 12.5345C6.38338 10.2164 5.72669 6.37369 7.72578 3.95078C9.72486 1.52787 13.6231 1.44245 16.432 3.76062C19.2417 6.07879 19.8984 9.92145 17.8993 12.3444C15.9002 14.7673 12.0019 14.8519 9.19306 12.5345Z"
        fill={`url(#${gradientId3})`}
      />
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="2.8"
          id={filterId}
          width="8.8"
          x="16.6"
          y="25.6"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_28_51"
            stdDeviation="0.2"
          />
        </filter>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={gradientId1}
          x1="25"
          x2="17.6667"
          y1="27"
          y2="27"
        >
          <stop stopColor="#969495" />
          <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={gradientId2}
          x1="20.4956"
          x2="21.941"
          y1="22.4135"
          y2="21.2698"
        >
          <stop stopColor="#666666" />
          <stop offset="1" stopColor="#CACCCD" />
        </linearGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(12.8132 8.1471) rotate(129.523) scale(5.68739 6.59482)"
          gradientUnits="userSpaceOnUse"
          id={gradientId3}
          r="1"
        >
          <stop stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </MDSSvgIcon>
  );
};

export default MDSPinnedMessageIcon;
