/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import escapeRegex from "./escapeRegex";
import FbtHooks from "./FbtHooks";
import NumberFormatConsts from "./NumberFormatConsts";

const DEFAULT_GROUP_SIZE = 3;
const CURRENCY_SYMBOLS = [
  "\u0433\u0440\u043d.",
  "\u0434\u0435\u043d.",
  "\u043b\u0432.",
  "\u043c\u0430\u043d.",
  "\u0564\u0580.",
  "\u062c.\u0645.",
  "\u062f.\u0625.",
  "\u062f.\u0627.",
  "\u062f.\u0628.",
  "\u062f.\u062a.",
  "\u062f.\u062c.",
  "\u062f.\u0639.",
  "\u062f.\u0643.",
  "\u062f.\u0644.",
  "\u062f.\u0645.",
  "\u0631.\u0633.",
  "\u0631.\u0639.",
  "\u0631.\u0642.",
  "\u0631.\u064a.",
  "\u0644.\u0633.",
  "\u0644.\u0644.",
  "\u0783.",
  "B/.",
  "Bs.",
  "Fr.",
  "kr.",
  "L.",
  "p.",
  "S/.",
];

const regexCache = {};

const getCachedRegex = (pattern) => {
  if (!regexCache[pattern]) {
    regexCache[pattern] = new RegExp(pattern, "i");
  }
  return regexCache[pattern];
};

const currencyRegex = getCachedRegex(
  CURRENCY_SYMBOLS.reduce(
    (acc, symbol, index) =>
      acc + (index ? "|" : "") + `(${escapeRegex(symbol)})`,
    ""
  )
);

const formatNumberRaw = (
  number,
  fractionDigits,
  thousandSeparator = "",
  decimalSeparator = ".",
  minDigitsForThousandsSeparator = 0,
  groupInfo = {
    primaryGroupSize: DEFAULT_GROUP_SIZE,
    secondaryGroupSize: DEFAULT_GROUP_SIZE,
  },
  numberingSystemData
  // eslint-disable-next-line max-params
) => {
  const primaryGroupSize = groupInfo.primaryGroupSize || DEFAULT_GROUP_SIZE;
  const secondaryGroupSize = groupInfo.secondaryGroupSize || primaryGroupSize;
  const digits = numberingSystemData && numberingSystemData.digits;

  let formattedNumber;
  if (fractionDigits === null) {
    formattedNumber = number.toString();
  } else if (typeof number === "string") {
    formattedNumber = truncateLongNumber(number, fractionDigits);
  } else {
    formattedNumber = formatFloat(number, fractionDigits);
  }

  let [integerPart, fractionalPart] = formattedNumber.split(".");
  if (
    Math.abs(parseInt(integerPart, 10)).toString().length >=
    minDigitsForThousandsSeparator
  ) {
    const regex = getCachedRegex(`(\\d)(\\d{${primaryGroupSize}})($|\\D)`);
    const replacement = `$1${thousandSeparator}$2$3`;
    let formatted = integerPart.replace(regex, replacement);

    if (formatted !== integerPart) {
      integerPart = formatted;
      const secondaryRegex = getCachedRegex(
        `(\\d)(\\d{${secondaryGroupSize}})(${escapeRegex(thousandSeparator)})`
      );
      while (
        (formatted = integerPart.replace(secondaryRegex, replacement)) !==
        integerPart
      ) {
        integerPart = formatted;
      }
    }
  }

  if (digits) {
    integerPart = replaceDigits(integerPart, digits);
    fractionalPart = fractionalPart && replaceDigits(fractionalPart, digits);
  }

  let result = integerPart;
  if (fractionalPart) {
    result += decimalSeparator + fractionalPart;
  }

  return result;
};

const replaceDigits = (input, digitMapping) => {
  let result = "";
  for (let i = 0; i < input.length; ++i) {
    const mappedDigit = digitMapping[input.charCodeAt(i) - 48];
    result += mappedDigit !== undefined ? mappedDigit : input[i];
  }
  return result;
};

const formatNumber = (number, decimalPlaces) => {
  const localeData = NumberFormatConsts.get(FbtHooks.getViewerContext().locale);
  return formatNumberRaw(
    number,
    decimalPlaces,
    "",
    localeData.decimalSeparator,
    localeData.minDigitsForThousandsSeparator,
    localeData.standardDecimalPatternInfo,
    localeData.numberingSystemData
  );
};

const formatNumberWithThousandDelimiters = (number, decimalPlaces) => {
  const localeData = NumberFormatConsts.get(FbtHooks.getViewerContext().locale);
  return formatNumberRaw(
    number,
    decimalPlaces,
    localeData.numberDelimiter,
    localeData.decimalSeparator,
    localeData.minDigitsForThousandsSeparator,
    localeData.standardDecimalPatternInfo,
    localeData.numberingSystemData
  );
};

const getSignificantDigitCount = (number) => {
  return number && Math.floor(Math.log10(Math.abs(number)));
};

const formatNumberWithLimitedSigFig = (number, sigFigs) => {
  const digitCount = getSignificantDigitCount(number);
  let adjustedNumber = number;

  if (digitCount < sigFigs) {
    adjustedNumber = number * Math.pow(10, -digitCount + sigFigs);
  }

  const magnitude = Math.pow(
    10,
    getSignificantDigitCount(adjustedNumber) - sigFigs + 1
  );
  adjustedNumber = Math.round(adjustedNumber / magnitude) * magnitude;

  if (digitCount < sigFigs) {
    adjustedNumber /= Math.pow(10, -digitCount + sigFigs);
  }

  return formatNumberWithThousandDelimiters(
    adjustedNumber,
    sigFigs - digitCount - 1
  );
};

const formatFloat = (number, fractionDigits = 0) => {
  const factor = Math.pow(10, fractionDigits);
  let formattedNumber = (Math.round(number * factor) / factor).toString();

  if (!fractionDigits) return formattedNumber;
  if (formattedNumber.indexOf("e-") !== -1) return formattedNumber;

  let decimalPointIndex = formattedNumber.indexOf(".");
  let zeroPaddingCount;
  if (decimalPointIndex === -1) {
    formattedNumber += ".";
    zeroPaddingCount = fractionDigits;
  } else {
    zeroPaddingCount =
      fractionDigits - (formattedNumber.length - decimalPointIndex - 1);
  }

  for (let i = 0; i < zeroPaddingCount; i++) {
    formattedNumber += "0";
  }

  return formattedNumber;
};

const padZeros = (numberString, count) => {
  let result = numberString;
  for (let i = 0; i < count; i++) {
    result += "0";
  }
  return result;
};

const truncateLongNumber = (numberString, fractionDigits) => {
  let decimalPointIndex = numberString.indexOf(".");
  let integerPart =
    decimalPointIndex === -1
      ? numberString
      : numberString.slice(0, decimalPointIndex);
  let fractionalPart =
    decimalPointIndex === -1 ? "" : numberString.slice(decimalPointIndex + 1);

  return fractionDigits !== null
    ? integerPart +
        "." +
        padZeros(
          fractionalPart.slice(0, fractionDigits),
          fractionDigits - fractionalPart.length
        )
    : integerPart;
};

const parseNumberRaw = (numberStr, decimalSeparator, numberDelimiter) => {
  const digitsMap = getDigitsMap();
  let cleanedStr = numberStr;

  if (digitsMap) {
    cleanedStr = numberStr
      .split("")
      .map((char) => digitsMap[char] || char)
      .join("")
      .trim();
  }

  cleanedStr = cleanedStr
    .replace(/^[^\d]*\-/, "\x02")
    .replace(currencyRegex, "");

  const escapedDecimalSeparator = escapeRegex(decimalSeparator);
  const escapedNumberDelimiter = escapeRegex(numberDelimiter);

  const numberPattern = getCachedRegex(
    `^[^\\d]*\\d.*${escapedDecimalSeparator}.*\\d[^\\d]*$`
  );
  if (!numberPattern.test(cleanedStr)) {
    const alternativePattern = getCachedRegex(
      `(^[^\\d]*)${escapedDecimalSeparator}(\\d*[^\\d]*$)`
    );
    if (alternativePattern.test(cleanedStr)) {
      cleanedStr = cleanedStr.replace(alternativePattern, "$1\x01$2");
      return convertToNumber(cleanedStr);
    }
    const noDelimiterPattern = getCachedRegex(
      `^[^\\d]*[\\d ${escapedNumberDelimiter}]*[^\\d]*$`
    );
    if (!noDelimiterPattern.test(cleanedStr)) {
      return convertToNumber(cleanedStr);
    }
    return convertToNumber(cleanedStr);
  }

  const fractionPattern = getCachedRegex(
    `(^[^\\d]*[\\d ${escapedNumberDelimiter}]*)${escapedDecimalSeparator}(\\d*[^\\d]*$)`
  );
  if (fractionPattern.test(cleanedStr)) {
    cleanedStr = cleanedStr.replace(fractionPattern, "$1\x01$2");
  }

  return convertToNumber(cleanedStr);
};

const convertToNumber = (str) => {
  const numericString = str
    .replace(/[^0-9\u0001\u0002]/g, "")
    .replace("\x01", ".")
    .replace("\x02", "-");
  const number = Number(numericString);
  return numericString === "" || isNaN(number) ? null : number;
};

const getDigitsMap = () => {
  const localeData = NumberFormatConsts(FbtHooks.getViewerContext().locale);
  const digits = localeData.numberingSystemData?.digits;
  if (!digits) return null;

  const map = {};
  for (let i = 0; i < digits.length; i++) {
    map[digits.charAt(i)] = i.toString();
  }
  return map;
};

const parseNumber = (numberStr) => {
  const localeData = NumberFormatConsts.get(FbtHooks.getViewerContext().locale);
  return parseNumberRaw(
    numberStr,
    localeData.decimalSeparator || ".",
    localeData.numberDelimiter
  );
};

const getFloatString = (integerPart, decimalPart, separator) => {
  const integerString = getIntegerString(integerPart);
  return decimalPart.length === 0
    ? integerString
    : integerString + separator + decimalPart;
};

const getIntegerString = (numberStr, separator = ",") => {
  const regex = /(\d+)(\d{3})/;
  let formattedStr = numberStr;
  while (regex.test(formattedStr)) {
    formattedStr = formattedStr.replace(regex, `$1${separator}$2`);
  }
  return formattedStr;
};

const intlNumUtils = {
  formatNumber,
  formatNumberRaw,
  formatNumberWithThousandDelimiters,
  formatNumberWithLimitedSigFig,
  parseNumber,
  parseNumberRaw,
  truncateLongNumber,
  getFloatString,
  getIntegerString,
};

export default intlNumUtils;
