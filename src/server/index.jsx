/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import { ChunkExtractor } from "@loadable/server";
import compression from "compression";
import cors from "cors";
import express from "express";
import path from "path";

import { paths } from "../../scripts/utils";
import { App } from "../app";

import renderFullPage from "./renderFullPage";
import StaticContextProvider from "./static-context-provider";

const PORT = process.env.PORT || 3000;

const app = express();

app.enable("trust proxy");

app.use(cors());

app.use(compression());

if (process.env.NODE_ENV === "production") {
  app.get("/health", (req, res) => {
    res.json({ status: "UP" });
  });
}

if (
  process.env.NODE_ENV === "development" ||
  (!process.env.STATIC_FILES_URL && process.env.NODE_ENV === "production")
) {
  /**
   * This middleware is only used in development mode
   * In production mode we separate static files from the main Express.js frontend server
   * By separating them, you discharge tensions on this Express.js frontend server
   * It now depends what kind of router you are using, Nginx my favorite, Traefik. The best
   * thing to do is to create a domain alias static, and make a CNAME rediction to it, like
   * for example https://static.mywebsite.com/15.bundle-832a294529dcad5060bd.js
   * and now the static bundle file 15.bundle-832a294529dcad5060bd.js is served.
   */
  app.use(
    paths.publicPath,
    express.static(path.join(paths.clientBuild, paths.publicPath))
  );
}

app.use((req, res) => {
  const staticContext = { statusCode: 200 };

  const helmetContext = {};

  const extractor = new ChunkExtractor({
    statsFile: path.join(
      paths.clientBuild,
      paths.publicPath,
      "loadable-stats.json"
    ),
    entrypoints: ["bundle"],
  });

  const jsx = (helmetContext = { helmet: {} }) => (
    <StaticContextProvider staticContext={staticContext}>
      <StaticRouter location={req.url}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </StaticContextProvider>
  );

  const html = renderToString(extractor.collectChunks(jsx(helmetContext)));

  const { helmet } = helmetContext;

  res.status(staticContext.statusCode).send(renderFullPage(html, helmet));
});

app.listen(PORT, () => {
  console.log(
    `App SSR running ${
      process.env.NODE_ENV === "production"
        ? `port : ${PORT}`
        : `http://localhost:${PORT}`
    } 🌎`
  );
});
