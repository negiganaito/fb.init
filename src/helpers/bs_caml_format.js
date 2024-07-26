/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

function charToDigit(char) {
  if (char >= 65) {
    if (char >= 97) {
      if (char >= 123) return -1;
      else return char - 87;
    } else if (char >= 91) return -1;
    else return char - 55;
  } else if (char > 57 || char < 48) return -1;
  else return char - 48;
}

function baseFromFormat(format) {
  switch (format) {
    case 0:
      return 8;
    case 1:
      return 16;
    case 2:
      return 10;
    case 3:
      return 2;
  }
}

function parseFormat(str) {
  let sign = 1;
  let base = 2;
  let index = 0;
  let charCode = str.charCodeAt(index);

  switch (charCode) {
    case 43:
      index++;
      break;
    case 45:
      sign = -1;
      index++;
      break;
  }

  if (str[index] === "0") {
    charCode = str.charCodeAt(index + 1);
    if (charCode >= 89) {
      if (charCode >= 111) {
        if (charCode < 121) {
          switch (charCode) {
            case 111:
              base = 0;
              index += 2;
              break;
            case 117:
              index += 2;
              break;
            case 120:
              base = 1;
              index += 2;
              break;
          }
        }
      } else if (charCode !== 66) {
        if (charCode >= 79) {
          switch (charCode) {
            case 79:
              base = 0;
              index += 2;
              break;
            case 85:
              index += 2;
              break;
            case 88:
              base = 1;
              index += 2;
              break;
          }
        }
      } else {
        base = 3;
        index += 2;
      }
    }
  }

  return [index, sign, base];
}

function intFromString(str) {
  const [index, sign, base] = parseFormat(str);
  const max = 4294967295;
  const baseVal = baseFromFormat(base);
  let currentIndex = index;
  let digit = charToDigit(str.charCodeAt(currentIndex));

  if (digit < 0 || digit >= baseVal)
    // eslint-disable-next-line no-throw-literal
    throw { RE_EXN_ID: "Failure", _1: "int_of_string", Error: new Error() };

  const computeValue = (current, index) => {
    while (true) {
      if (index === str.length) return current;
      let char = str.charCodeAt(index);
      if (char === 95) {
        index++;
        continue;
      }
      char = charToDigit(char);
      if (char < 0 || char >= baseVal)
        // eslint-disable-next-line no-throw-literal
        throw { RE_EXN_ID: "Failure", _1: "int_of_string", Error: new Error() };
      current = baseVal * current + char;
      if (current > max)
        // eslint-disable-next-line no-throw-literal
        throw { RE_EXN_ID: "Failure", _1: "int_of_string", Error: new Error() };
      index++;
    }
  };

  const result = sign * computeValue(digit, currentIndex + 1);
  if (baseVal === 10 && result !== (result | 0))
    // eslint-disable-next-line no-throw-literal
    throw { RE_EXN_ID: "Failure", _1: "int_of_string", Error: new Error() };
  return result | 0;
}

function int64FromString(str) {
  const bs_caml = require("bs_caml");
  const bs_caml_int64 = require("bs_caml_int64");
  const [index, sign, base] = parseFormat(str);
  const baseVal = bs_caml_int64.of_int32(baseFromFormat(base));
  let signVal = bs_caml_int64.of_int32(sign);
  let limits;

  switch (base) {
    case 0:
      limits = [536870911, 4294967295];
      break;
    case 1:
      limits = [268435455, 4294967295];
      break;
    case 2:
      limits = [429496729, 2576980377];
      break;
    case 3:
      limits = bs_caml_int64.max_int;
      break;
  }

  const length = str.length;
  let char = bs_caml_int64.of_int32(charToDigit(str.charCodeAt(index)));
  if (bs_caml.i64_lt(char, bs_caml_int64.zero) || bs_caml.i64_ge(char, baseVal))
    // eslint-disable-next-line no-throw-literal
    throw { RE_EXN_ID: "Failure", _1: "int64_of_string", Error: new Error() };

  const computeValue = (current, index) => {
    while (true) {
      if (index === length) return current;
      let char = str.charCodeAt(index);
      if (char === 95) {
        index++;
        continue;
      }
      char = bs_caml_int64.of_int32(charToDigit(char));
      if (
        bs_caml.i64_lt(char, bs_caml_int64.zero) ||
        bs_caml.i64_ge(char, baseVal) ||
        bs_caml.i64_gt(current, limits)
      )
        // eslint-disable-next-line no-throw-literal
        throw {
          RE_EXN_ID: "Failure",
          _1: "int64_of_string",
          Error: new Error(),
        };
      current = bs_caml_int64.add(bs_caml_int64.mul(baseVal, current), char);
      index++;
    }
  };

  const result = bs_caml_int64.mul(signVal, computeValue(char, index + 1));
  if (bs_caml.i64_eq(baseVal, [0, 10]) && bs_caml.i64_neq(result, result))
    // eslint-disable-next-line no-throw-literal
    throw { RE_EXN_ID: "Failure", _1: "int64_of_string", Error: new Error() };
  return result;
}

// eslint-disable-next-line complexity
function parseFormatOptions(str) {
  if (str.length > 31)
    // eslint-disable-next-line no-throw-literal
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "format_int: format too long",
      Error: new Error(),
    };

  const format = {
    justify: "+",
    signstyle: "-",
    filter: " ",
    alternate: false,
    base: 2,
    signedconv: false,
    width: 0,
    uppercase: false,
    sign: 1,
    prec: -1,
    conv: "f",
  };
  let index = 0;

  while (true) {
    if (index >= str.length) return format;
    const char = str.charCodeAt(index);
    let action = 0;

    if (char >= 69) {
      if (char >= 88) {
        if (char >= 121) action = 1;
        else {
          switch (char) {
            case 88:
              format.base = 1;
              format.uppercase = true;
              index++;
              continue;
            case 101:
            case 102:
            case 103:
              action = 5;
              break;
            case 100:
            case 105:
              action = 4;
              break;
            case 111:
              format.base = 0;
              index++;
              continue;
            case 117:
              format.base = 2;
              index++;
              continue;
          }
        }
      } else if (char >= 72) action = 1;
      else {
        format.signedconv = true;
        format.uppercase = true;
        format.conv = String.fromCharCode(char).toLowerCase();
        index++;
        continue;
      }
    } else {
      switch (char) {
        case 35:
          format.alternate = true;
          index++;
          continue;
        case 32:
        case 43:
          action = 2;
          break;
        case 45:
          format.justify = "-";
          index++;
          continue;
        case 46:
          format.prec = 0;
          // eslint-disable-next-line no-case-declarations
          let precIndex = index + 1;
          while (/[0-9]/.test(str.charAt(precIndex))) {
            format.prec = format.prec * 10 + (str.charCodeAt(precIndex) - 48);
            precIndex++;
          }
          index = precIndex;
          continue;
        case 48:
          format.filter = "0";
          index++;
          continue;
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          action = 3;
          break;
        default:
          action = 1;
      }
    }

    switch (action) {
      case 1:
        index++;
        continue;
      case 2:
        format.signstyle = String.fromCharCode(char);
        index++;
        continue;
      case 3:
        format.width = 0;
        // eslint-disable-next-line no-case-declarations
        let widthIndex = index;
        while (/[0-9]/.test(str.charAt(widthIndex))) {
          format.width = format.width * 10 + (str.charCodeAt(widthIndex) - 48);
          widthIndex++;
        }
        index = widthIndex;
        continue;
      case 4:
        format.signedconv = true;
        format.base = 2;
        index++;
        continue;
      case 5:
        format.signedconv = true;
        format.conv = String.fromCharCode(char);
        index++;
        continue;
    }
  }
}

// eslint-disable-next-line complexity
function formatNumber(options, numberStr) {
  const {
    justify,
    signstyle,
    filter,
    alternate,
    base,
    signedconv,
    width,
    uppercase,
  } = options;
  let sign = options.sign;
  let len = numberStr.length;

  if (signedconv && (sign < 0 || signstyle !== "-")) len += 1;
  if (alternate) {
    if (base === 0) len += 1;
    else if (base === 1) len += 2;
  }

  let result = "";

  if (justify === "+" && filter === " ") {
    for (let i = len; i < width; i++) result += filter;
  }
  if (signedconv) {
    if (sign < 0) result += "-";
    else if (signstyle !== "-") result += signstyle;
  }
  if (alternate && base === 0) result += "0";
  if (alternate && base === 1) result += "0x";
  if (justify === "+" && filter === "0") {
    for (let i = len; i < width; i++) result += filter;
  }

  result += uppercase ? numberStr.toUpperCase() : numberStr;

  if (justify === "-") {
    for (let i = len; i < width; i++) result += " ";
  }

  return result;
}

function formatInt(format, num) {
  if (format === "%d") return String(num);

  const options = parseFormatOptions(format);
  num =
    num < 0
      ? options.signedconv
        ? ((options.sign = -1), -num >>> 0)
        : num >>> 0
      : num;
  let numberStr = num.toString(baseFromFormat(options.base));

  if (options.prec >= 0) {
    options.filter = " ";
    const padding = options.prec - numberStr.length;
    if (padding > 0) numberStr = "0".repeat(padding) + numberStr;
  }

  return formatNumber(options, numberStr);
}

function int64ToString(num) {
  const bs_caml = require("bs_caml");
  const bs_caml_int64 = require("bs_caml_int64");

  if (!bs_caml.i64_lt(num, bs_caml_int64.zero))
    return bs_caml_int64.to_string(num);

  const ten = [0, 10];
  num = bs_caml_int64.discard_sign(num);
  const [quot, rem] = bs_caml_int64.div_mod(num, ten);
  const [quot2, rem2] = bs_caml_int64.div_mod(
    bs_caml_int64.add([0, 8], rem),
    ten
  );
  const result = bs_caml_int64.add(
    bs_caml_int64.add([214748364, 3435973836], quot),
    quot2
  );

  return (
    bs_caml_int64.to_string(result) + "0123456789"[bs_caml_int64.to_int32(rem2)]
  );
}

function int64ToOctalString(num) {
  const bs_caml = require("bs_caml");
  const bs_caml_int64 = require("bs_caml_int64");

  let result = "";
  const eight = [0, 8];
  const octalDigits = "01234567";

  if (bs_caml.i64_lt(num, bs_caml_int64.zero)) {
    let absNum = bs_caml_int64.discard_sign(num);
    let [quot, rem] = bs_caml_int64.div_mod(absNum, eight);
    let shiftedQuot = bs_caml_int64.add([268435456, 0], quot);
    result = octalDigits[bs_caml_int64.to_int32(rem)] + result;
    while (bs_caml.i64_neq(shiftedQuot, bs_caml_int64.zero)) {
      [quot, rem] = bs_caml_int64.div_mod(shiftedQuot, eight);
      shiftedQuot = quot;
      result = octalDigits[bs_caml_int64.to_int32(rem)] + result;
    }
  } else {
    let [quot, rem] = bs_caml_int64.div_mod(num, eight);
    result = octalDigits[bs_caml_int64.to_int32(rem)] + result;
    while (bs_caml.i64_neq(quot, bs_caml_int64.zero)) {
      [quot, rem] = bs_caml_int64.div_mod(quot, eight);
      result = octalDigits[bs_caml_int64.to_int32(rem)] + result;
    }
  }

  return result;
}

function formatInt64(format, num) {
  const bs_caml = require("bs_caml");
  const bs_caml_int64 = require("bs_caml_int64");

  if (format === "%d") return bs_caml_int64.to_string(num);

  const options = parseFormatOptions(format);
  num =
    options.signedconv && bs_caml.i64_lt(num, bs_caml_int64.zero)
      ? ((options.sign = -1), bs_caml_int64.neg(num))
      : num;

  let numberStr;
  switch (options.base) {
    case 0:
      numberStr = int64ToOctalString(num);
      break;
    case 1:
      numberStr = bs_caml_int64.to_hex(num);
      break;
    case 2:
      numberStr = int64ToString(num);
      break;
  }

  if (options.prec >= 0) {
    options.filter = " ";
    const padding = options.prec - numberStr.length;
    numberStr = padding > 0 ? "0".repeat(padding) + numberStr : numberStr;
  }

  return formatNumber(options, numberStr);
}

// eslint-disable-next-line complexity
function formatFloat(format, num) {
  const options = parseFormatOptions(format);
  const precision = options.prec < 0 ? 6 : options.prec;
  const absNum = num < 0 ? ((options.sign = -1), -num) : num;
  let resultStr = "";

  if (isNaN(absNum)) {
    resultStr = "nan";
    options.filter = " ";
  } else if (isFinite(absNum)) {
    switch (options.conv) {
      case "e":
        resultStr = absNum.toExponential(precision);
        if (resultStr[resultStr.length - 3] === "e") {
          resultStr = resultStr.slice(0, -1) + "0" + resultStr.slice(-1);
        }
        break;
      case "f":
        resultStr = absNum.toFixed(precision);
        break;
      case "g":
        // eslint-disable-next-line no-case-declarations
        const digits = precision !== 0 ? precision : 1;
        // eslint-disable-next-line no-case-declarations
        let expStr = absNum.toExponential(digits - 1);
        // eslint-disable-next-line no-case-declarations
        const expIndex = expStr.indexOf("e");
        // eslint-disable-next-line no-case-declarations
        const exp = Number(expStr.slice(expIndex + 1));
        if (exp < -4 || absNum >= 1e21 || absNum.toFixed().length > digits) {
          let idx = expIndex - 1;
          while (expStr[idx] === "0") idx--;
          if (expStr[idx] === ".") idx--;
          expStr = expStr.slice(0, idx + 1) + expStr.slice(expIndex);
          if (expStr[expStr.length - 3] === "e") {
            expStr = expStr.slice(0, -1) + "0" + expStr.slice(-1);
          }
        } else {
          let prec = digits;
          if (exp < 0) {
            prec -= exp + 1;
            resultStr = absNum.toFixed(prec);
          } else {
            while ((resultStr = absNum.toFixed(prec)).length > digits + 1) {
              prec--;
            }
          }
          if (prec !== 0) {
            let idx = resultStr.length - 1;
            while (resultStr[idx] === "0") idx--;
            if (resultStr[idx] === ".") idx--;
            resultStr = resultStr.slice(0, idx + 1);
          }
        }
        resultStr = expStr;
        break;
      default:
    }
  } else {
    resultStr = "inf";
    options.filter = " ";
  }

  return formatNumber(options, resultStr);
}

// eslint-disable-next-line complexity
const hexStringOfFloat = (num, precision, conv) => {
  if (!isFinite(num))
    return isNaN(num) ? "nan" : num > 0 ? "infinity" : "-infinity";

  const neg = num === 0 && 1 / num === -Infinity ? 1 : num >= 0 ? 0 : 1;
  if (neg) num = -num;
  let exp = 0;

  if (!(num === 0)) {
    if (num < 1) {
      while (num < 1 && exp > -1022) {
        num *= 2;
        exp--;
      }
    } else {
      while (num >= 2) {
        num /= 2;
        exp++;
      }
    }
  }

  const expSign = exp < 0 ? "" : "+";
  let result = "";

  if (neg) result += "-";
  else if (conv === 43) result += "+";
  else if (conv === 32) result += " ";

  if (precision >= 0 && precision < 13) {
    const roundFactor = Math.pow(2, precision * 4);
    num = Math.round(num * roundFactor) / roundFactor;
  }

  let hexStr = num.toString(16);
  if (precision >= 0) {
    const dotIndex = hexStr.indexOf(".");
    if (dotIndex < 0) hexStr += "." + "0".repeat(precision);
    else {
      const totalLength = dotIndex + 1 + precision;
      hexStr =
        hexStr.length < totalLength
          ? hexStr + "0".repeat(totalLength - hexStr.length)
          : hexStr.substr(0, totalLength);
    }
  }

  return result + "0x" + hexStr + "p" + expSign + exp.toString(10);
};

const floatFromString = (str) => {
  const match = /^ *([+-]?)0x([0-9a-f]+)\.?([0-9a-f]*)p([+-]?[0-9]+)/i.exec(
    str
  );

  if (match) {
    const [_, sign, integerPart, fractionalPart, exponent] = match;
    console.log("🚀 ~ floatFromString ~ _:", _);
    const fractionalDigits = fractionalPart.replace(/0+$/, "").length;
    const hexValue = parseInt(sign + integerPart + fractionalPart, 16);
    // eslint-disable-next-line radix
    const exponentValue = parseInt(exponent) - 4 * fractionalDigits;
    return hexValue * Math.pow(2, exponentValue);
  }

  return parseFloat(str.replace(/_/g, ""));
};

function parseFloatFromString(str) {
  return floatFromString(str);
}

const caml_format_int = formatInt;
const caml_format_float = formatFloat;
const caml_hexstring_of_float = hexStringOfFloat;
const caml_int_of_string = intFromString;
const caml_int64_of_string = int64FromString;
const caml_int64_format = formatInt64;
const caml_float_of_string = parseFloatFromString;

export {
  caml_float_of_string,
  caml_format_float,
  caml_format_int,
  caml_hexstring_of_float,
  caml_int_of_string,
  caml_int64_format,
  caml_int64_of_string,
};
