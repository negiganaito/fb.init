/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { asyncToGenerator as _asyncToGenerator } from "asyncToGeneratorRuntime";
import GetLsDatabaseForComet from "cr:6587"; // GetLsDatabaseForComet
import { CurrentUser } from "CurrentUser";
import { ExecutionEnvironment } from "ExecutionEnvironment";
import { FBLogger } from "FBLogger";
import { gkx } from "gkx";
import { InteractionTracing } from "InteractionTracing";
import { justknobx } from "justknobx";
import { LSPersistedDbGating } from "LSPersistedDbGating";
import { LSPlatformLsInitLog } from "LSPlatformLsInitLog";
import { MessengerBroadcastLogHistoryFactory } from "MessengerBroadcastLogHistoryFactory";
import { MessengerLogHistory } from "MessengerLogHistory";
import { MWIndexedDBDelete } from "MWIndexedDBDelete";
import { Promise } from "Promise";
import { QE2Logger } from "QE2Logger";
import { qpl } from "qpl";
import { QPLUserFlow } from "QPLUserFlow";
import { recoverableViolation } from "recoverableViolation";

if (LSPersistedDbGating.anyTablesPersisted) {
  MessengerLogHistory.setLogHistoryFactory(
    new MessengerBroadcastLogHistoryFactory()
  );
}

const lsDatabaseForComet = GetLsDatabaseForComet;
QE2Logger.logExposureForUser("lightspeed_web_persisted_db");

LSPlatformLsInitLog.start();

const initializeDatabase = _asyncToGenerator(function* () {
  if (
    gkx("2790") &&
    (ExecutionEnvironment.isInWorker || ExecutionEnvironment.isInSharedWorker)
  ) {
    FBLogger("messenger_browser_clients").mustfix(
      "DbSingleton was called in a worker"
    );
  }

  const loadDbEarlierEnabled = gkx("26383");

  LSPlatformLsInitLog.addPoint("get_ls_database_start", {
    bool: {
      is_pdb: LSPersistedDbGating.anyTablesPersisted,
      loadDbEarlierEnabled,
    },
  });

  InteractionTracing.getPendingInteractions().forEach((interaction) => {
    interaction.addMarkerPoint("get_ls_database_start", "AppTiming");
    interaction.addAnnotationBoolean(
      "loadDbEarlierEnabled",
      loadDbEarlierEnabled
    );
    interaction.addAnnotationBoolean(
      "is_pdb",
      LSPersistedDbGating.anyTablesPersisted
    );
  });

  const databaseForComet = yield lsDatabaseForComet.get();

  LSPlatformLsInitLog.addPoint("get_ls_database_end");

  InteractionTracing.getPendingInteractions().forEach((interaction) => {
    interaction.addMarkerPoint("get_ls_database_end", "AppTiming");
  });

  try {
    const versionToDelete = justknobx._("541");
    const shouldDeleteDb = !LSPersistedDbGating.anyTablesPersisted;

    if (shouldDeleteDb && versionToDelete > 0) {
      LSPlatformLsInitLog.addPoint("should_delete_index_db_start", {
        int: { versionToDelete },
      });
      MWIndexedDBDelete.deleteAllDBs(versionToDelete);
    }
  } catch (error) {
    recoverableViolation("[db clean up patch] Cant delete db", "maw_db");
  }

  LSPlatformLsInitLog.addPoint("db_created");

  if (CurrentUser.isWorkUser()) {
    QPLUserFlow.addPoint(qpl._(1036588047, "310"), "db_created");
  }

  return databaseForComet;
});

let dbPromise = ExecutionEnvironment.isInBrowser
  ? initializeDatabase().then((db) => {
      dbPromise = db;
      return db;
    })
  : new Promise(() => {
      FBLogger("messenger_browser_clients").warn(
        "ExecutionEnvironment.isInBrowser returned false, returning never ending promise"
      );
    });

const getLSDatabaseSingletonPromiseOrValue = () => dbPromise;

export {
  getLSDatabaseSingletonPromiseOrValue,
  dbPromise as LSDatabaseSingleton,
};
