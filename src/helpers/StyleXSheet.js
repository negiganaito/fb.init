/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { ExecutionEnvironment } from "./ExecutionEnvironment";
import Locale from "./Locale";

const LIGHT_MODE_CLASS_NAME = "__fb-light-mode";
const DARK_MODE_CLASS_NAME = "__fb-dark-mode";

function generateCSSRules(selector, variables) {
  const rules = [];
  rules.push(`${selector} {`);
  // eslint-disable-next-line guard-for-in
  for (const key in variables) {
    const value = variables[key];
    rules.push(`  --${key}: ${value};`);
  }
  rules.push("}");
  return rules.join("\n");
}

function createStyleTag() {
  const styleTag = document.createElement("style");
  styleTag.setAttribute("type", "text/css");
  styleTag.setAttribute("data-styled", "true");
  console.log(document.getElementsByTagName("head")[0]);
  const head = document.head || document.getElementsByTagName("head")[0];
  console.log(head, "Head element not found.");
  head.appendChild(styleTag);
  return styleTag;
}

function supportsCSSVariables() {
  return (
    window.CSS !== null &&
    window.CSS.supports !== null &&
    window.CSS.supports("--fake-var:0")
  );
}

const variableRegex = /var\(--(.*?)\)/g;

class StyleXSheet {
  tag = null;
  injected = false;
  ruleForPriority = new Map();
  rules = [];
  rootTheme;
  rootDarkTheme;
  isSlow;
  supportsVariables;
  isRTL;
  externalRules = new Set();

  constructor(options) {
    this.rootTheme = options.rootTheme;
    this.rootDarkTheme = options.rootDarkTheme;
    this.isSlow =
      options.isSlow ??
      // eslint-disable-next-line no-restricted-globals
      (typeof location === "object" && typeof location.search === "string"
        ? // eslint-disable-next-line no-restricted-globals
          location.search.includes("stylex-slow")
        : false);
    this.supportsVariables =
      options.supportsVariables ?? supportsCSSVariables();
    this.isRTL = Locale.isRTL();
  }

  getVariableMatch() {
    return variableRegex;
  }

  isHeadless() {
    return this.tag === null || !ExecutionEnvironment.canUseDOM;
  }

  getTag() {
    console.log(this.tag !== null, "Style tag not found.");
    return this.tag;
  }

  getCSS() {
    return this.rules.join("\n");
  }

  getRulePosition(rule) {
    return this.rules.indexOf(rule);
  }

  getRuleCount() {
    return this.rules.length;
  }

  inject() {
    if (this.injected) return;
    this.injected = true;
    if (!ExecutionEnvironment.canUseDOM) {
      this.injectTheme();
      return;
    }
    this.tag = createStyleTag();
    this.injectTheme();
  }

  injectTheme() {
    const isEnable = true; // gkx("21106")
    if (isEnable) return;
    if (this.rootTheme !== null) {
      this.insert(
        generateCSSRules(`:root, .${LIGHT_MODE_CLASS_NAME}`, this.rootTheme),
        0
      );
    }
    if (this.rootDarkTheme !== null) {
      this.insert(
        generateCSSRules(
          `.${DARK_MODE_CLASS_NAME}:root, .${DARK_MODE_CLASS_NAME}`,
          this.rootDarkTheme
        ),
        0
      );
    }
  }

  __injectCustomThemeForTesting(selector, theme) {
    if (theme !== null) {
      this.insert(generateCSSRules(selector, theme), 0);
    }
  }

  delete(rule) {
    const index = this.rules.indexOf(rule);
    console.log(index >= 0, `Rule not found: ${rule}`);
    this.rules.splice(index, 1);
    if (this.isHeadless()) return;
    const tag = this.getTag();
    if (!tag) return;
    if (this.isSlow) {
      tag.removeChild(tag.childNodes[index + 1]);
    } else {
      const sheet = tag.sheet;
      if (sheet !== null) {
        console.log(sheet, "Style sheet not found.");
        sheet.deleteRule(index);
      }
    }
  }

  normalizeRule(rule) {
    if (!this.supportsVariables || this.rootTheme === null) {
      return rule;
    }
    return rule.replace(variableRegex, (_, variable) => {
      return this.rootTheme[variable];
    });
  }

  getInsertPositionForPriority(priority) {
    const existingRule = this.ruleForPriority.get(priority);
    if (existingRule !== null) {
      return this.rules.indexOf(existingRule) + 1;
    }
    const higherPriorities = Array.from(this.ruleForPriority.keys())
      .sort((a, b) => b - a)
      .filter((p) => p > priority);
    if (higherPriorities.length === 0) {
      return this.getRuleCount();
    }
    const highestPriority = higherPriorities.pop();
    return this.rules.indexOf(this.ruleForPriority.get(highestPriority));
  }

  insert(rule, priority, originalRule) {
    if (!this.injected) {
      this.inject();
    }
    const normalizedRule =
      this.isRTL && originalRule !== null ? originalRule : rule;
    if (
      this.externalRules.has(
        normalizedRule.slice(0, normalizedRule.indexOf("{")).trim()
      )
    ) {
      return;
    }
    if (this.rules.includes(normalizedRule)) {
      return;
    }
    const normalized = this.normalizeRule(normalizedRule);
    if (
      this.externalRules.has(
        normalized.slice(0, normalized.indexOf("{")).trim()
      )
    ) {
      return;
    }
    const insertPosition = this.getInsertPositionForPriority(priority);
    this.rules.splice(insertPosition, 0, normalized);
    this.ruleForPriority.set(priority, normalized);
    if (this.isHeadless()) {
      return;
    }
    const tag = this.getTag();
    if (!tag) return;
    if (this.isSlow) {
      const textNode = document.createTextNode(normalized);
      tag.insertBefore(textNode, tag.childNodes[insertPosition]);
    } else {
      const sheet = tag.sheet;
      if (sheet !== null) {
        try {
          sheet.insertRule(normalized, insertPosition);
        } catch (error) {
          // Ignore rule insertion errors
        }
      }
    }
  }
}

export default StyleXSheet;
export { DARK_MODE_CLASS_NAME, LIGHT_MODE_CLASS_NAME };
