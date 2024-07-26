/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable react/jsx-pascal-case */

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from "react";
import ReactDOM from "react-dom";
import stylex from "@stylexjs/stylex";
import BaseHeadingContextWrapper from "BaseHeadingContextWrapper.react";
import CometScreenReaderText from "CometScreenReaderText.react";
import emptyFunction from "emptyFunction";
import { fbt } from "fbt";
import FDSTimestamp from "FDSTimestamp.react";
import FocusInertRegion from "FocusInertRegion.react";
import { focusScopeQueries } from "focusScopeQueries";
import FocusWithinHandler from "FocusWithinHandler.react";
// import { gkx } from "gkx";
import { I64 } from "I64";
import KeyCommandHandler from "KeyCommandHandler.react";
import MDSTextPairing from "MDSTextPairing.react";
import MWEditMessageOverlay from "MWEditMessageOverlay.react";
import MWMessageCellFocusTable from "MWMessageCellFocusTable.react";
import MWMessageCellKeyCommands from "MWMessageCellKeyCommands.react";
import MWMessageTableFocusTable from "MWMessageTableFocusTable.react";
import MWPBaseMessageListRow from "MWPBaseMessageListRow.react";
import MWPMessageAuthor from "MWPMessageAuthor.react";
import { useMWV2MessageListIsRowModal } from "MWV2MessageListIsRowModalContext.react";
import { MWV2MessageRowActionsContextProvider } from "MWV2MessageRowActionsContext.react";
import { MWV2MessageRowIsRowFocusedContextProvider } from "MWV2MessageRowIsRowFocusedContext.react";
import { MWXPressable } from "MWXPressable.react";
import { useCometTheme } from "useCometTheme";
import { useMAWEditMessageData } from "useMAWEditMessageData";
import { useMWPEditMessageDeemphasizer } from "useMWPEditMessageDeemphasizer";
import { useServerTime } from "useServerTime";

import { FocusRegion, focusRegionById } from "./FocusRegion.react";

const styles = {
  cell: {
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    position: "x1n2onr6",
    $$css: true,
  },
  cellFocusVisible: { zIndex: "x1vjfegm", $$css: true },
  cellModal: {
    outline: "x1k66dxp",
    outlineOffset: "x1g40iwv",
    "@media (-webkit-min-device-pixel-ratio: 0)_outline": "x1bkw7pg",
    $$css: true,
  },
  enterModalButton: {
    backgroundColor: "x1h0vfkc",
    borderTopStartRadius: "x1lq5wgf",
    borderTopEndRadius: "xgqcy7u",
    borderBottomEndRadius: "x30kzoy",
    borderBottomStartRadius: "x9jhf4c",
    boxShadow: "x152obne",
    end: "xlr8s2x",
    left: null,
    right: null,
    paddingTop: "xz9dl7a",
    paddingEnd: "xn6708d",
    paddingBottom: "xsag5q8",
    paddingStart: "x1ye3gou",
    position: "x10l6tqk",
    top: "x1qiirwl",
    transform: "x105ttfm",
    zIndex: "x1vjfegm",
    $$css: true,
  },
  enterModalButtonVisible: { opacity: "x1hc1fzr", $$css: true },
  row: { position: "x1n2onr6", $$css: true },
  visuallyHidden: {
    clip: "xzpqnlu",
    clipPath: "x1hyvwdk",
    height: "xjm9jq1",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    position: "x10l6tqk",
    width: "x1i1rx1s",
    $$css: true,
  },
};

const handleKeyDown = (event) => {
  const { key } = event;
  if (
    [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "PageUp",
      "PageDown",
      "Home",
      "End",
    ].includes(key)
  ) {
    event.preventDefault();
  }
};

const gkx_22803 = true;
const defaultLabel = fbt._("__JHASH__U5V4JiyTDSI__JHASH__");
const editMessageLabel = fbt._("__JHASH__GoIrDg5lzef__JHASH__");
const visuallyHiddenText = fbt._("__JHASH__ctLNxPXr8we__JHASH__");

const EnterModalButton = forwardRef(
  ({ ariaLabel, focusable, onPress, text, xstyle }, ref) => {
    const [theme, ThemeProvider] = useCometTheme("invert");
    return (
      <ThemeProvider>
        <MWXPressable
          aria-label={ariaLabel}
          focusable={focusable}
          onPress={onPress}
          ref={ref}
          xstyle={[theme, styles.enterModalButton, xstyle]}
        >
          <MDSTextPairing body={text} bodyColor="primary" level={4} />
        </MWXPressable>
      </ThemeProvider>
    );
  }
);

EnterModalButton.displayName = `${EnterModalButton.name} [from ${MWXPressable.id}]`;

const MWPMessageListRowWithKeyboardInteractions = ({
  children,
  domElementRef,
  focusCellOnRender = false,
  isDialogOpened,
  isFocused,
  isModal,
  message,
  messageDomID,
  outgoing,
  setFocused,
  setHovered,
  setIsDialogOpened,
  stopHoveringRef,
  theme,
}) => {
  const isRowModal = useMWV2MessageListIsRowModal();
  const cellRef = useRef(null);
  const regionId = useId();
  const memoizedFocusFunction = useCallback(() => {
    isRowModal(() => message.messageId);
    setTimeout(
      () => focusRegionById(regionId, focusScopeQueries.tabbableScopeQuery),
      0
    );
  }, [isRowModal, message.messageId, regionId]);

  const blurFunction = () => {
    isRowModal(() => "");
    const cell = cellRef.current;
    if (cell) return cell.focus();
  };

  const timestamp = FDSTimestamp.getTimestamp(
    useServerTime(),
    new Date(I64.to_float(message.timestampMs))
  );
  const [authorName] = MWPMessageAuthor.useAuthorName();
  const label = outgoing
    ? fbt._("__JHASH__g90cYI08lR4__JHASH__")
    : authorName
    ? authorName
    : fbt._("__JHASH__I4KHPAQ-RAf__JHASH__");
  const descriptionId = useId();
  const screenReaderText = (
    <CometScreenReaderText
      id={descriptionId}
      text={fbt._("__JHASH__BGN2Md9i0L4__JHASH__", [
        fbt._param("Stringified timestamp of the incoming message", timestamp),
        fbt._param("Name of the author of the incoming message", label),
      ])}
    />
  );
  const dialogId = useId();
  const focusRef = useRef(null);
  const isEditMessageDataPresent = useMAWEditMessageData() !== null;
  const deemphasizer = useMWPEditMessageDeemphasizer(message.messageId);
  const context = useMemo(
    () => ({ isDialogOpened, setFocused, setIsDialogOpened }),
    [setFocused, setIsDialogOpened, isDialogOpened]
  );
  const actionsContext = useMemo(
    () => ({
      forwardMessage: useRef(emptyFunction),
      openReactionsMenu: useRef(emptyFunction),
      removeMessage: useRef(emptyFunction),
      replyToMessage: useRef(emptyFunction),
    }),
    []
  );

  const handleFocusChange = (_isFocused) => {
    if (isFocused !== _isFocused) {
      setFocused(() => _isFocused);
      isRowModal(() =>
        _isFocused || (isDialogOpened && isModal) ? message.messageId : ""
      );
    }
  };

  const handleFocusVisibleChange = (_isFocusVisible) => {
    if (isFocused !== _isFocusVisible) {
      setFocused(() => _isFocusVisible);
      const ref = focusRef.current;
      if (_isFocusVisible && ref) {
        setTimeout(() => {
          try {
            return ref.scrollIntoView({ behavior: "smooth", block: "nearest" });
          } catch {
            return ref.scrollIntoView(false);
          }
        }, 0);
      }
    }
  };

  useEffect(() => {
    if (focusCellOnRender) {
      const cell = cellRef.current;
      cell?.focus();
      cell?.scrollIntoView();
    }
  }, [focusCellOnRender]);
  const [RowProvider, CellProvider] = MWMessageTableFocusTable;
  return (
    <BaseHeadingContextWrapper>
      <MWV2MessageRowIsRowFocusedContextProvider value={context}>
        <MWV2MessageRowActionsContextProvider value={actionsContext}>
          <MWPBaseMessageListRow
            domElementRef={domElementRef}
            message={message}
            role="row"
            setHovered={isEditMessageDataPresent ? emptyFunction : setHovered}
            stopHoveringRef={stopHoveringRef}
            theme={theme}
            xstyle={[styles.row, deemphasizer]}
          >
            <>
              <RowProvider>
                <FocusWithinHandler
                  onFocusChange={
                    isEditMessageDataPresent ? undefined : handleFocusChange
                  }
                  onFocusVisibleChange={
                    isEditMessageDataPresent
                      ? undefined
                      : handleFocusVisibleChange
                  }
                >
                  {(_focus, isFocusVisible) => {
                    const content = (
                      <CellProvider>
                        <div
                          className={stylex(
                            styles.cell,
                            isModal && styles.cellModal,
                            isFocusVisible && styles.cellFocusVisible
                          )}
                          data-release-focus-from="CLICK"
                          data-scope={MWMessageTableFocusTable.scopeID}
                          ref={cellRef}
                          role="gridcell"
                          tabIndex={isEditMessageDataPresent ? -1 : 0}
                        >
                          <FocusInertRegion
                            disabled={isModal}
                            focusQuery={focusScopeQueries.tabbableScopeQuery}
                          >
                            {isModal ? (
                              <>
                                <FocusRegion
                                  autoFocusQuery={
                                    focusScopeQueries.tabbableScopeQuery
                                  }
                                  autoRestoreFocus
                                  containFocusQuery={
                                    focusScopeQueries.tabbableScopeQuery
                                  }
                                  id={regionId}
                                  recoverFocusQuery={
                                    focusScopeQueries.tabbableScopeQuery
                                  }
                                >
                                  <KeyCommandHandler onKeyDown={handleKeyDown}>
                                    <div
                                      aria-describedby={messageDomID}
                                      aria-labelledby={descriptionId}
                                      id={dialogId}
                                      role="dialog"
                                    >
                                      {children}
                                      {isModal ? screenReaderText : null}
                                      <EnterModalButton
                                        ariaLabel={editMessageLabel}
                                        focusable
                                        onPress={blurFunction}
                                        text={fbt._(
                                          "__JHASH__PEyi9JodUw1__JHASH__"
                                        )}
                                        xstyle={styles.enterModalButtonVisible}
                                      />
                                    </div>
                                  </KeyCommandHandler>
                                </FocusRegion>
                                {ReactDOM.createPortal(
                                  <div aria-owns={dialogId} />,
                                  document.body
                                )}
                              </>
                            ) : (
                              children
                            )}
                          </FocusInertRegion>
                        </div>
                      </CellProvider>
                    );
                    return (
                      <>
                        <MWMessageCellFocusTable.keyCommands
                          onEnter={
                            isModal || isEditMessageDataPresent
                              ? undefined
                              : memoizedFocusFunction
                          }
                          onEscape={isModal ? blurFunction : undefined}
                          onSpace={
                            isModal || isEditMessageDataPresent
                              ? undefined
                              : memoizedFocusFunction
                          }
                        >
                          {gkx_22803 ? (
                            <MWMessageCellKeyCommands.keyCommands
                              message={message}
                            >
                              {content}
                            </MWMessageCellKeyCommands.keyCommands>
                          ) : (
                            content
                          )}
                        </MWMessageCellFocusTable.keyCommands>
                        <div role="gridcell">
                          <EnterModalButton
                            ariaLabel={
                              isModal
                                ? fbt._("__JHASH__C-7ahaHTUI7__JHASH__")
                                : defaultLabel
                            }
                            focusable={isModal}
                            onPress={memoizedFocusFunction}
                            ref={focusRef}
                            text={
                              isModal
                                ? fbt._("__JHASH__C-7ahaHTUI7__JHASH__")
                                : visuallyHiddenText
                            }
                            xstyle={
                              domElementRef && !isModal
                                ? styles.enterModalButtonVisible
                                : styles.visuallyHidden
                            }
                          />
                        </div>
                      </>
                    );
                  }}
                </FocusWithinHandler>
              </RowProvider>
              <MWEditMessageOverlay messageId={message.messageId} />
            </>
          </MWPBaseMessageListRow>
        </MWV2MessageRowActionsContextProvider>
      </MWV2MessageRowIsRowFocusedContextProvider>
    </BaseHeadingContextWrapper>
  );
};

MWPMessageListRowWithKeyboardInteractions.displayName = `${MWPMessageListRowWithKeyboardInteractions.name} [from ${MWXPressable.id}]`;

export default MWPMessageListRowWithKeyboardInteractions;
