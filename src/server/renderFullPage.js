/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const renderFullPage = (html, helmet) => `<!DOCTYPE html>
<html ${helmet?.htmlAttributes?.toString()} class="_9dls" id="facebook" lang="vi" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    
    ${helmet?.title?.toString()}
    ${helmet?.meta?.toString()}
    ${helmet?.link?.toString()}
  </head>
  <body class="_6s5d _71pn body-custom system-fonts--body segoe">
    <noscript>Sorry, your browser does not support JavaScript!</noscript>
    <div>
      <div class="x9f619 x1n2onr6 x1ja2u2z">
        <div class="x9f619 x1n2onr6 x1ja2u2z">
          <div id="root">${html}</div>
        </div>
      </div>
    </div>
  </body>
</html>`;

export default renderFullPage;
