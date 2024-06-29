/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createRef } from "react";
import ReactDOM from "react-dom";

import Arbiter from "../../business/helpers/Arbiter";
import ifRequired from "../../business/helpers/ifRequired";
import killswitch from "../../business/helpers/killswitch";
import SubscriptionsHandler from "../../business/helpers/SubscriptionsHandler";
import TooltipData from "../../business/helpers/TooltipData";

import createTooltipPortal from "./createTooltipPortal";
import OnUseEffectMount from "./OnUseEffectMount";
import OnUseEffectUnmount from "./OnUseEffectUnmount.react";

class Tooltip extends React.Component {
  constructor(...args) {
    super(...args);
    this.tooltipEl = createRef();
    this.subscriptions = new SubscriptionsHandler();
    this.state = { visible: false, wasEverVisible: false };
  }

  static getDerivedStateFromProps(props, state) {
    return !props.tooltip
      ? { visible: false, wasEverVisible: state.wasEverVisible }
      : state;
  }

  componentDidMount() {
    this.subscriptions.addSubscriptions(
      Arbiter.subscribe("tooltip/requesthide", (event, context) => {
        context = context.context;
        if (
          this.state.visible &&
          (!context || context === this.tooltipEl.current)
        ) {
          ifRequired("Tooltip", (TooltipModule) => {
            TooltipModule.suspend();
            ReactDOM.flushSync(() => {
              this.setState({ visible: false });
            });
          });
        }
      }),
      Arbiter.subscribe("tooltip/requestshow", (event, context) => {
        context = context.context;
        if (!this.state.visible && context === this.tooltipEl.current) {
          ifRequired("Tooltip", (TooltipModule) => {
            TooltipModule.suspend();
            ReactDOM.flushSync(() => {
              this.setState({ visible: true, wasEverVisible: true });
            });
          });
        }
      })
    );
    this.handleTooltipData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (Boolean(prevProps.tooltip) && !this.props.tooltip) {
      this.props.onVisibilityChange && this.props.onVisibilityChange(false);
    } else if (prevState.visible !== this.state.visible) {
      this.props.onVisibilityChange &&
        this.props.onVisibilityChange(this.state.visible);
      ifRequired("Tooltip", (TooltipModule) => {
        this.state.visible
          ? TooltipModule.commitShow(this.tooltipEl.current)
          : TooltipModule.commitHide(this.tooltipEl.current);
      });
    }
    this.handleTooltipData();
  }

  componentWillUnmount() {
    this.subscriptions.release();
    const el = this.tooltipEl.current;
    if (el !== null) TooltipData.remove(el);
  }

  handleTooltipData() {
    if (!this.shouldMountTooltip()) return;
    const el = this.tooltipEl.current;
    if (!this.props.tooltip) {
      TooltipData.remove(el);
    } else if (
      killswitch("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT") ||
      typeof this.props.tooltip !== "string"
    ) {
      const { alignH, position } = this.props;
      TooltipData.set(el, this.createTooltipContainer(), position, alignH);
    } else {
      TooltipData.remove(el, { onlyCleanupDataStore: true });
      TooltipData.refreshIfActive(this.tooltipEl.current);
    }
  }

  shouldMountTooltip() {
    const { delayMountUntilHover } = this.props;
    const { wasEverVisible } = this.state;
    return !delayMountUntilHover || wasEverVisible;
  }

  createTooltipContainer() {
    if (this.tooltipContainer === null) {
      this.tooltipContainer = document.createElement("div");
    }
    return this.tooltipContainer;
  }

  renderImpl() {
    const { tooltip, display = "inline", children, ...restProps } = this.props;
    const tag = display === "block" ? "div" : "span";
    const shouldMountTooltip = this.shouldMountTooltip();
    return React.createElement(
      tag,
      {
        ...restProps,
        ref: this.tooltipEl,
        "data-hover": "tooltip",
        "data-tooltip-content":
          typeof tooltip === "string" ? tooltip : undefined,
      },
      shouldMountTooltip && tooltip !== null
        ? createTooltipPortal(tooltip, this.createTooltipContainer())
        : null,
      children
    );
  }

  render() {
    return (
      <>
        <OnUseEffectMount callback={() => this.componentDidMount()} />
        <OnUseEffectUnmount callback={() => this.componentWillUnmount()} />
        {this.renderImpl()}
      </>
    );
  }
}

// eslint-disable-next-line react/static-property-placement
Tooltip.defaultProps = {
  delayMountUntilHover: !killswitch("TOOLTIP_DELAY_MOUNT_UNTIL_HOVER"),
  display: "inline",
};

export default Tooltip;
