/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable complexity */
import React, { useCallback, useContext, useMemo, useRef } from "react";
import stylex from "@stylexjs/stylex";
import recoverableViolation from "recoverableViolation";

import CometKeyCommandSettingsContext from "../context/CometKeyCommandSettingsContext";
import CometKeyCommandUtilsContext from "../context/CometKeyCommandUtilsContext";
import CometKeyCommandContext from "../faang/components/CometKeyCommandContext";
import logKeyCommand from "../faang/components/CometKeyCommandsTypedLoggerLite";
import useStable from "../hooks/useStable";

import areKeyCombinationsEqual from "./areKeyCombinationsEqual";
import createKeyCommand from "./createKeyCommand";
import gkx from "./gkx";
import isSingleCharKey from "./isSingleCharKey";

const styles = {
  wrapperFocusable: {
    ":focus_outline": "x1uvtmcs",
    ,
  },
};

const isInputElement = (element) => {
  if (element instanceof HTMLInputElement)
    return (
      element.type !== "hidden" && element.type !== "file" && !element.disabled
    );
  return element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
    ? !element.disabled
    : element instanceof HTMLElement && element.isContentEditable;
};

const isEnabledListbox = (element) =>
  element instanceof HTMLElement &&
  element.getAttribute("role") === "listbox" &&
  element.getAttribute("aria-disabled") !== "true";

const findCommandByGroupAndId = (map, groupID, commandID) => {
  for (const [key, value] of map) {
    if (value.groupID === groupID && value.commandID === commandID) {
      return map.get(key);
    }
  }
};

const shouldTriggerFromInput = (element, commandData) =>
  gkx("22803") &&
  commandData.triggerFromInputs === true &&
  isInputElement(element) &&
  commandData.command?.alt === true;

const createKeyCommandWrapper = (shouldSetActiveOnFocus, ContextProvider) => {
  const KeyCommandWrapper = ({
    children,
    debugName,
    elementType,
    isWrapperFocusable,
    xstyle,
    ...rest
  }) => {
    const parentContext = useContext(CometKeyCommandContext);
    const utilsContext = useContext(CometKeyCommandUtilsContext);
    const settingsContext = useContext(CometKeyCommandSettingsContext);
    const setActiveWrapper = utilsContext?.setActiveWrapper;

    const showSingleCharacterKeyCommandWrapperDialogRef = useRef(
      (key, description) => {
        recoverableViolation(
          "Tried to call showSingleCharacterKeyCommandWrapperDialogRef, but it was never set",
          "comet_ax"
        );
      }
    );

    const showModifiedKeyCommandWrapperDialogRef = useRef(
      (command, description) => {
        recoverableViolation(
          "Tried to call showModifiedKeyCommandWrapperDialogRef, but it was never set",
          "comet_ax"
        );
      }
    );

    const commandMap = useStable(() => new Map());

    const getCommand = useCallback(
      (keyCombo) => {
        let command = commandMap.get(keyCombo);
        if (command?.groupID !== null && command?.commandID !== null) {
          const customCommand = settingsContext.getCustomKeyCombination(
            command.groupID,
            command.commandID
          );
          if (
            customCommand === null ||
            areKeyCombinationsEqual(customCommand, command?.command)
          ) {
            return command;
          } else {
            command = null;
          }
        }
        const customCommand = settingsContext
          .getCustomCommandsMap()
          .get(keyCombo);
        if (
          customCommand?.groupID !== null &&
          customCommand?.commandID !== null
        ) {
          const existingCommand = findCommandByGroupAndId(
            commandMap,
            customCommand.groupID,
            customCommand.commandID
          );
          if (existingCommand !== null) {
            command = existingCommand;
          }
        }
        return command;
      },
      [settingsContext, commandMap]
    );

    const contextValue = useMemo(
      () => ({
        addCommands: (commands, override) => {
          commands.forEach((command) => {
            if (command.command !== null) {
              const keyCommand = createKeyCommand(command.command);
              const exists = commandMap.has(keyCommand);
              const shouldAdd = exists && override === true;
              if (shouldAdd || !exists || override === undefined) {
                commandMap.set(keyCommand, command);
                utilsContext?.notifyCommandUpdate();
              }
            }
          });
          return () => {
            commands.forEach((command) => {
              const keyCommand = createKeyCommand(command.command);
              const existingCommand = commandMap.get(keyCommand);
              if (existingCommand === command) {
                commandMap.delete(keyCommand);
              }
            });
            utilsContext?.notifyCommandUpdate();
          };
        },
        applyCommand: (keyCombo, event) => {
          const command = getCommand(keyCombo);
          if (command === null) return false;

          const singleCharRegex = /^[a-z0-9]$/;
          if (
            gkx("22803") &&
            command.command?.alt === true &&
            settingsContext.getModifiedKeyboardShortcutsPreference() === 1
          ) {
            return true;
          }

          if (
            (!command.triggerFromInputs && isInputElement(event.target)) ||
            (isEnabledListbox(event.target) && singleCharRegex.test(keyCombo))
          ) {
            return false;
          }

          if (
            event.type === "keyup" &&
            command.triggerOnKeyUp !== true &&
            command.triggerOnKeyUpAndKeyDown !== true
          ) {
            return false;
          }

          if (event.type === "keydown" && command.triggerOnKeyUp === true) {
            return false;
          }

          if (command.shouldPreventDefault !== false) {
            if (
              shouldTriggerFromInput(event.target, command) &&
              settingsContext.getModifiedKeyboardShortcutsPreference() === 3
            ) {
              return true;
            }
            command.handler && event.preventDefault();
          }

          if (command.triggerOnRepeats === false && event.repeat === true) {
            return false;
          }

          if (command.handler !== null) {
            if (
              command.command !== null &&
              shouldTriggerFromInput(event.target, command) &&
              settingsContext.getModifiedKeyboardShortcutsPreference() === 4
            ) {
              showModifiedKeyCommandWrapperDialogRef.current(
                command.command,
                command.singleCharDescription
              );
              return true;
            }

            const areSingleKeysDisabled =
              settingsContext.getAreSingleKeysDisabled();
            const isSingleChar = isSingleCharKey(keyCombo);

            if (areSingleKeysDisabled === true && isSingleChar) {
              return true;
            }

            if (areSingleKeysDisabled === null && isSingleChar) {
              showSingleCharacterKeyCommandWrapperDialogRef.current(
                keyCombo,
                command.singleCharDescription
              );
              return true;
            }

            command.handler();
            logKeyCommand({
              key_combo: keyCombo,
              key_context: debugName,
              key_description: command.description,
            });
            return command.shouldStopPropagation !== false;
          }
          return false;
        },
        debugName,
        getCommandMap: () => commandMap,
        getParent: () => parentContext,
        removeCommand: (keyCombo) => {
          commandMap.delete(keyCombo);
          utilsContext?.notifyCommandUpdate();
        },
        setShowModifiedKeyCommandWrapperDialogRef: (ref) => {
          showModifiedKeyCommandWrapperDialogRef.current = ref;
          return () => {
            showModifiedKeyCommandWrapperDialogRef.current = () => {
              recoverableViolation(
                "Tried to call showModifiedKeyCommandWrapperDialogRef, but it was never set",
                "comet_ax"
              );
            };
          };
        },
        setShowSingleCharacterKeyCommandWrapperDialogRef: (ref) => {
          showSingleCharacterKeyCommandWrapperDialogRef.current = ref;
          return () => {
            showSingleCharacterKeyCommandWrapperDialogRef.current = () => {
              recoverableViolation(
                "Tried to call showSingleCharacterKeyCommandWrapperDialogRef, but it was never set",
                "comet_ax"
              );
            };
          };
        },
      }),
      [
        settingsContext,
        utilsContext,
        commandMap,
        parentContext,
        debugName,
        getCommand,
      ]
    );

    const handleFocus = useCallback(() => {
      if (!setActiveWrapper) {
        recoverableViolation(
          `setActiveWrapper is undefined in ${debugName ?? "unknown"}`,
          "comet_ax"
        );
        return;
      }
      setActiveWrapper(contextValue);
    }, [setActiveWrapper, contextValue, debugName]);

    let renderedChildren;
    if (shouldSetActiveOnFocus || elementType !== undefined) {
      const ElementType = elementType ?? "div";
      renderedChildren = (
        <ElementType
          {...stylex.props(
            isWrapperFocusable ? styles.wrapperFocusable : undefined,
            xstyle
          )}
          data-testid={undefined}
          onFocusCapture={shouldSetActiveOnFocus ? handleFocus : undefined}
          tabIndex={isWrapperFocusable ? -1 : undefined}
        >
          {children}
        </ElementType>
      );
    } else {
      renderedChildren = children;
    }

    if (ContextProvider) {
      renderedChildren = (
        <ContextProvider value={contextValue}>
          {renderedChildren}
        </ContextProvider>
      );
    }

    return (
      <CometKeyCommandContext.Provider value={contextValue}>
        {renderedChildren}
      </CometKeyCommandContext.Provider>
    );
  };

  KeyCommandWrapper.displayName = `KeyCommandWrapper [from ${__filename}]`;

  return KeyCommandWrapper;
};

export default createKeyCommandWrapper;
