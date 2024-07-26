/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import FBLogger from "FBLogger";

import Random from "./Random";
import WebSessionDefaultTimeoutMs from "./WebSessionDefaultTimeoutMs";
import WebStorage from "./WebStorage";

const BASE = 36;
const SESSION_ID_LENGTH = 6;
const SESSION_ID_MAX_VALUE = Math.pow(BASE, SESSION_ID_LENGTH);

function validateExpiryTime(expiryTime) {
  return expiryTime === null || !Number.isFinite(expiryTime) || expiryTime <= 0
    ? null
    : expiryTime;
}

function parseExpiryTime(expiryTime) {
  if (expiryTime === null) return null;
  const parsedTime = parseInt(expiryTime, 10);
  if (`${parsedTime}` !== expiryTime) {
    FBLogger("web_session").warn(
      "Expected the web session expiry time to parse as an integer. Found `%s`.",
      String(expiryTime)
    );
    return null;
  }
  return validateExpiryTime(parsedTime);
}

function validateSessionId(sessionId) {
  if (sessionId === null) return null;
  if (sessionId.length !== SESSION_ID_LENGTH) {
    FBLogger("web_session").warn(
      "Expected the web session id to be a %d character string. It was %d character(s). Received `%s`.",
      SESSION_ID_LENGTH,
      sessionId.length,
      sessionId
    );
    return null;
  }
  if (!/^[a-z0-9]+$/.test(sessionId)) {
    FBLogger("web_session").warn(
      "Expected the web session ID to be a base-%d encoded string. Received `%s`.",
      BASE,
      sessionId
    );
    return null;
  }
  return sessionId;
}

function coerceSession(session) {
  if (session === null) return null;
  if (typeof session !== "string" && !(session instanceof String)) {
    FBLogger("web_session").warn(
      "A non-string value was passed to `coerceSession`. This should be impossible according to this method's Flow type. The value was `%s`.",
      session
    );
    return null;
  }
  const [sessionId, expiryTime] = session.split(":");
  const parsedExpiryTime = parseExpiryTime(expiryTime);
  const validatedSessionId = validateSessionId(sessionId);
  return parsedExpiryTime === null || validatedSessionId === null
    ? null
    : { expiryTime: parsedExpiryTime, id: validatedSessionId };
}

function generateSessionId() {
  let sessionId = Math.floor(Random.random() * SESSION_ID_MAX_VALUE).toString(
    BASE
  );
  return "0".repeat(SESSION_ID_LENGTH - sessionId.length) + sessionId;
}

let cachedPageId = null;

function getPageId() {
  if (cachedPageId === null) {
    cachedPageId = generateSessionId();
  }
  return cachedPageId;
}

function getLocalSession(currentTime = Date.now()) {
  const localStorage = WebStorage.getLocalStorageForRead();
  if (!localStorage) return null;
  try {
    const session = coerceSession(localStorage.getItem("Session"));
    return session && currentTime < session.expiryTime ? session : null;
  } catch {
    return null;
  }
}

function getTabId() {
  let tabId = WebStorage.getSessionStorageForRead()?.getItem("TabId");
  tabId = validateSessionId(tabId);
  if (tabId === null) {
    const sessionStorage = WebStorage.getSessionStorage();
    if (!sessionStorage) return null;
    const newTabId = generateSessionId();
    WebStorage.setItemGuarded(sessionStorage, "TabId", newTabId);
    return newTabId;
  }
  return tabId;
}

function extendSession(targetExpiryTime) {
  const now = Date.now();
  const expiryTime =
    targetExpiryTime !== null
      ? validateExpiryTime(targetExpiryTime)
      : now + WebSessionDefaultTimeoutMs;
  if (expiryTime === null || expiryTime <= now) {
    FBLogger("web_session").warn(
      "`WebSession.extend()` was passed an invalid target expiry time `%s`.",
      targetExpiryTime
    );
    return;
  }

  const currentSession = getLocalSession(now);
  if (currentSession && currentSession.expiryTime >= expiryTime) return;

  const localStorage = WebStorage.getLocalStorage();
  if (!localStorage) return;

  const sessionId = currentSession ? currentSession.id : generateSessionId();
  WebStorage.setItemGuarded(
    localStorage,
    "Session",
    `${sessionId}:${expiryTime}`
  );
}

function getSessionId() {
  return getLocalSession()?.id;
}

function getId() {
  const sessionId = getSessionId() ?? "";
  const tabId = getTabId() ?? "";
  const pageId = getPageId();
  return `${sessionId}:${tabId}:${pageId}`;
}

export {
  extendSession as extend,
  getId,
  getPageId as getPageId_DO_NOT_USE,
  getSessionId,
};
