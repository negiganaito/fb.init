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
import { showCAAFBMSGR } from "CAAWebGating";
import CAALoggedOutDialogWrapper from "cr:5524";
import CAALoggedOutDialogLegacy from "cr:5525";

const useCAALoggedOutDialogWrapper = ({
  authDomainDataKey,
  dialogSource,
  next,
  leftChild,
  legal_reporting_cta_type,
  legal_reporting_uri,
  onClose,
  title,
}) => {
  const isCAAFBMSGR = showCAAFBMSGR() === true;

  const WrapperComponent = isCAAFBMSGR
    ? CAALoggedOutDialogWrapper
    : CAALoggedOutDialogLegacy;

  return (
    <WrapperComponent
      authDomainDataKey={authDomainDataKey}
      dialogSource={dialogSource}
      next={next}
      leftChild={leftChild}
      legal_reporting_cta_type={legal_reporting_cta_type}
      legal_reporting_uri={legal_reporting_uri}
      onClose={onClose}
      title={title}
    />
  );
};

export default useCAALoggedOutDialogWrapper;
