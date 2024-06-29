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
import React from "react";
import joinClasses from "fbjs/lib/joinClasses";

class FlexLayout extends React.Component {
  static defaultProps = {
    align: "start",
    direction: "horizontal",
    justify: "start",
    wrap: "nowrap",
  };

  render() {
    const {
      align,
      children,
      containerRef,
      direction,
      justify,
      style,
      wrap,
      onMouseEnter,
      onMouseLeave,
    } = this.props;

    let className = null;
    Object.keys(this.props).forEach((key) => {
      if (key === "className" || key === "className_DO_NOT_USE") {
        className = this.props[key];
      }
    });

    return (
      <div
        {...FlexLayout.flexLayout(
          { align, direction, justify, wrap },
          className
        )}
        data-testid={undefined}
        ref={containerRef}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    );
  }

  // eslint-disable-next-line react/sort-comp
  static flexLayout(props, additionalClassName) {
    const {
      align = FlexLayout.defaultProps.align,
      direction = FlexLayout.defaultProps.direction,
      justify = FlexLayout.defaultProps.justify,
      wrap = FlexLayout.defaultProps.wrap,
    } = props;

    return {
      className: joinClasses(
        additionalClassName,
        "_3qn7" +
          (justify === "start" ? " _61-0" : "") +
          (justify === "center" ? " _61-1" : "") +
          (justify === "end" ? " _61-2" : "") +
          (justify === "all" ? " _61-3" : "") +
          (justify === "around" ? " _6twk" : "") +
          (justify === "evenly" ? " _6twl" : "") +
          (direction === "vertical" ? " _2fyh" : "") +
          (direction === "horizontal" ? " _2fyi" : "") +
          (direction === "vertical-reverse" ? " _6xqp" : "") +
          (direction === "horizontal-reverse" ? " _6xqq" : "") +
          (align === "start" ? " _3qnf" : "") +
          (align === "center" ? " _3qng" : "") +
          (align === "end" ? " _3qnu" : "") +
          (align === "stretch" ? " _1a9e" : "") +
          (align === "baseline" ? " _7is_" : "") +
          (wrap === "wrap" ? " _4tau" : "") +
          (wrap === "wrap-reverse" ? " _4tav" : "")
      ),
    };
  }
}

export default FlexLayout;
