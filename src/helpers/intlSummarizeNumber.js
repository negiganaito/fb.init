/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import FbtNumberType from "./FbtNumberType";
import { IntlCompactDecimalNumberFormatConfig } from "./IntlCompactDecimalNumberFormatConfig";
import intlNumUtils from "./intlNumUtils";
import { IntlVariations } from "./IntlVariations";

const THRESHOLD = 3;
const MAX_DIGITS = 14;

const ROUNDING_METHODS = {
  ROUND: "ROUND",
  TRUNCATE: "TRUNCATE",
};

const FORMATS = {
  SHORT: "SHORT",
  LONG: "LONG",
};

const intlSummarizeNumber = (
  number,
  decimalPlaces,
  format = FORMATS.SHORT,
  roundingMethod = ROUNDING_METHODS.ROUND
  // eslint-disable-next-line max-params
) => {
  const patterns =
    IntlCompactDecimalNumberFormatConfig[
      format === FORMATS.SHORT ? "short_patterns" : "long_patterns"
    ];
  const digitCount =
    number === 0 ? 0 : Math.floor(Math.log10(Math.abs(number)));
  const effectiveDigitCount = Math.min(digitCount, MAX_DIGITS);
  const [mainValue, fractionalDigits, shouldRoundUp] = getMainValueAndFraction(
    number,
    effectiveDigitCount,
    decimalPlaces,
    roundingMethod,
    patterns
  );

  let valueToDisplay = mainValue;
  if (shouldRoundUp && roundingMethod === ROUNDING_METHODS.ROUND) {
    const [newMainValue] = getMainValueAndFraction(
      number,
      effectiveDigitCount + 1,
      decimalPlaces,
      roundingMethod,
      patterns
    );
    valueToDisplay = newMainValue;
  }

  const variation =
    FbtNumberType.getVariation(valueToDisplay) || IntlVariations.NUMBER_OTHER;
  const patternKey = effectiveDigitCount.toString();
  const pattern = patterns?.[patternKey]?.[variation.toString()];

  if (
    !pattern ||
    effectiveDigitCount < THRESHOLD ||
    (!pattern.positive_prefix_pattern && !pattern.positive_suffix_pattern)
  ) {
    return intlNumUtils.formatNumberWithThousandDelimiters(
      number,
      decimalPlaces || 0
    );
  }

  const positivePattern = pattern.positive_prefix_pattern || "";
  const suffixPattern = pattern.positive_suffix_pattern || "";
  const formattedValue = intlNumUtils.formatNumberWithThousandDelimiters(
    mainValue,
    fractionalDigits
  );
  const finalValue =
    valueToDisplay === 1 && pattern.min_integer_digits === 0
      ? positivePattern + suffixPattern
      : positivePattern + formattedValue + suffixPattern;

  return finalValue;
};

const getMainValueAndFraction = (
  number,
  digitCount,
  decimalPlaces,
  roundingMethod,
  patterns
  // eslint-disable-next-line max-params
) => {
  const patternKey = digitCount.toString();
  const pattern =
    patterns?.[patternKey]?.[IntlVariations.NUMBER_OTHER.toString()];
  const minIntegerDigits = pattern?.min_integer_digits || digitCount + 1;
  const effectiveDigitCount = digitCount - minIntegerDigits + 1;
  const scaledNumber = Math.abs(number) / Math.pow(10, effectiveDigitCount);

  const useFixedDecimals = decimalPlaces !== null;
  const fractionDigits = useFixedDecimals
    ? decimalPlaces
    : pattern?.min_fraction_digits ?? (digitCount > 2 ? 1 : 0);

  const formattedValue =
    roundingMethod === ROUNDING_METHODS.TRUNCATE
      ? intlNumUtils.truncateLongNumber(scaledNumber.toString(), fractionDigits)
      : scaledNumber.toFixed(fractionDigits);

  const mainValue = parseFloat(formattedValue) * (number < 0 ? -1 : 1);
  const needsMoreDigits =
    formattedValue.length >
      minIntegerDigits +
        (fractionDigits > 0 ? fractionDigits + 1 : 0) +
        (scaledNumber >= 0 ? 0 : 1) && digitCount < MAX_DIGITS;

  return [
    mainValue,
    mainValue % 1 === 0 && !useFixedDecimals ? 0 : fractionDigits,
    needsMoreDigits,
  ];
};

export default intlSummarizeNumber;
