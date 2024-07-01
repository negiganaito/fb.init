/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { writeFileSync } from "fs";
import { printSchema } from "graphql";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

import { schema } from "./app.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = resolve(__dirname, "../data/schema.graphql");

writeFileSync(schemaPath, printSchema(schema));

console.log(`Finished updating schema ${schemaPath}`);
