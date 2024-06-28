/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import express, { json } from "express";
import { GraphQLSchema, graphql } from "graphql";

import queryMap from "../queryMap.json" assert { type: "json" };

import { QueryType, rootValue } from "./query.mjs";
import { dataDrivenDependencies } from "./js-dependency.mjs";

// const QUERY_MAP_FILE = path.resolve(
//   getConfig().serverRuntimeConfig.projectRoot,
//   "./queryMap.json"
// );

export const schema = new GraphQLSchema({
  query: QueryType,
});

const app = express();

app.use(json());

const handleCors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
};

app.use(handleCors);

const graphqlHandler = async (req, res) => {
  const requestParams = req.body;

  let response = { data: null };
  if (req.method === "POST" && requestParams) {
    const mappedQueries = queryMap;

    dataDrivenDependencies.reset();
    response = await graphql({
      schema,
      rootValue,
      source:
        requestParams && requestParams.id
          ? mappedQueries[requestParams.id]
          : requestParams.query,
      variableValues: requestParams.variables,
    });
  }

  if (response.errors) {
    console.error("GraphQL Server Errors", response.errors);
  }

  response.extensions = {
    modules: dataDrivenDependencies.getModules(),
  };

  res.status(200).json(response);
};

app.post("/graphql", graphqlHandler);

const port = 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});
