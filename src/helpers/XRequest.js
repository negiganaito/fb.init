/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import invariant from "fbjs/lib/invariant";

class XRequest {
  constructor(path, params, context) {
    this.$1 = params;
    this.$2 = { ...context.getQueryData() };

    const pathSegments = path.split("/").filter((segment) => segment);
    const contextPathSegments = context
      .getPath()
      .split("/")
      .filter((segment) => segment);
    let placeholder;

    for (let i = 0; i < pathSegments.length; ++i) {
      const match = /^\{(\?)?(\*)?(\w+)\}$/.exec(pathSegments[i]);
      if (!match) {
        if (pathSegments[i] !== contextPathSegments[i]) {
          invariant(false, "Path mismatch");
        }
        continue;
      }

      const isOptional = !!match[1];
      const isWildcard = !!match[2];
      placeholder = match[3];

      if (isWildcard) {
        invariant(
          i === pathSegments.length - 1,
          "Wildcard should be the last segment"
        );
      }

      invariant(
        Object.prototype.hasOwnProperty.call(this.$1, placeholder),
        `Missing parameter: ${placeholder}`
      );

      if (this.$1[placeholder].required) {
        invariant(
          !isOptional,
          `Parameter ${placeholder} is required but marked as optional`
        );
      } else {
        invariant(
          isOptional || this.$1[placeholder].defaultValue !== null,
          `Parameter ${placeholder} is required`
        );
      }

      if (contextPathSegments[i]) {
        this.$2[placeholder] = isWildcard
          ? contextPathSegments.slice(i).join("/")
          : contextPathSegments[i];
      }
    }

    Object.keys(this.$1).forEach((param) => {
      if (this.$1[param].required) {
        invariant(
          Object.prototype.hasOwnProperty.call(this.$2, param),
          `Missing required parameter: ${param}`
        );
      }
    });
  }

  getExists(param) {
    return this.$2[param] !== undefined;
  }

  getBool(param) {
    return this.$processParam(param, "Bool");
  }

  getInt(param) {
    return this.$processParam(param, "Int");
  }

  getFloat(param) {
    return this.$processParam(param, "Float");
  }

  getFBID(param) {
    return this.$processParam(param, "FBID");
  }

  getString(param) {
    return this.$processParam(param, "String");
  }

  getEnum(param) {
    return this.$processParam(param, "Enum");
  }

  getOptionalInt(param) {
    return this.$processOptionalParam(param, "Int");
  }

  getOptionalFloat(param) {
    return this.$processOptionalParam(param, "Float");
  }

  getOptionalFBID(param) {
    return this.$processOptionalParam(param, "FBID");
  }

  getOptionalString(param) {
    return this.$processOptionalParam(param, "String");
  }

  getOptionalEnum(param) {
    return this.$processOptionalParam(param, "Enum");
  }

  getIntVector(param) {
    return this.$processParam(param, "IntVector");
  }

  getFloatVector(param) {
    return this.$processParam(param, "FloatVector");
  }

  getFBIDVector(param) {
    return this.$processParam(param, "FBIDVector");
  }

  getStringVector(param) {
    return this.$processParam(param, "StringVector");
  }

  getEnumVector(param) {
    return this.$processParam(param, "EnumVector");
  }

  getOptionalIntVector(param) {
    return this.$processOptionalParam(param, "IntVector");
  }

  getOptionalFloatVector(param) {
    return this.$processOptionalParam(param, "FloatVector");
  }

  getOptionalFBIDVector(param) {
    return this.$processOptionalParam(param, "FBIDVector");
  }

  getOptionalStringVector(param) {
    return this.$processOptionalParam(param, "StringVector");
  }

  getOptionalEnumVector(param) {
    return this.$processOptionalParam(param, "EnumVector");
  }

  getIntSet(param) {
    return this.$processParam(param, "IntSet");
  }

  getFBIDSet(param) {
    return this.$processParam(param, "FBIDSet");
  }

  getFBIDKeyset(param) {
    return this.$processParam(param, "FBIDKeyset");
  }

  getStringSet(param) {
    return this.$processParam(param, "StringSet");
  }

  getEnumKeyset(param) {
    return this.$processParam(param, "EnumKeyset");
  }

  getOptionalIntSet(param) {
    return this.$processOptionalParam(param, "IntSet");
  }

  getOptionalFBIDSet(param) {
    return this.$processOptionalParam(param, "FBIDSet");
  }

  getOptionalFBIDKeyset(param) {
    return this.$processOptionalParam(param, "FBIDKeyset");
  }

  getOptionalStringSet(param) {
    return this.$processOptionalParam(param, "StringSet");
  }

  getEnumToBoolMap(param) {
    return this.$processParam(param, "EnumToBoolMap");
  }

  getEnumToEnumMap(param) {
    return this.$processParam(param, "EnumToEnumMap");
  }

  getEnumToFloatMap(param) {
    return this.$processParam(param, "EnumToFloatMap");
  }

  getEnumToIntMap(param) {
    return this.$processParam(param, "EnumToIntMap");
  }

  getEnumToStringMap(param) {
    return this.$processParam(param, "EnumToStringMap");
  }

  getIntToBoolMap(param) {
    return this.$processParam(param, "IntToBoolMap");
  }

  getIntToEnumMap(param) {
    return this.$processParam(param, "IntToEnumMap");
  }

  getIntToFloatMap(param) {
    return this.$processParam(param, "IntToFloatMap");
  }

  getIntToIntMap(param) {
    return this.$processParam(param, "IntToIntMap");
  }

  getIntToStringMap(param) {
    return this.$processParam(param, "IntToStringMap");
  }

  getStringToBoolMap(param) {
    return this.$processParam(param, "StringToBoolMap");
  }

  getStringToEnumMap(param) {
    return this.$processParam(param, "StringToEnumMap");
  }

  getStringToFloatMap(param) {
    return this.$processParam(param, "StringToFloatMap");
  }

  getStringToIntMap(param) {
    return this.$processParam(param, "StringToIntMap");
  }

  getStringToStringMap(param) {
    return this.$processParam(param, "StringToStringMap");
  }

  getOptionalEnumToBoolMap(param) {
    return this.$processOptionalParam(param, "EnumToBoolMap");
  }

  getOptionalEnumToEnumMap(param) {
    return this.$processOptionalParam(param, "EnumToEnumMap");
  }

  getOptionalEnumToFloatMap(param) {
    return this.$processOptionalParam(param, "EnumToFloatMap");
  }

  getOptionalEnumToIntMap(param) {
    return this.$processOptionalParam(param, "EnumToIntMap");
  }

  getOptionalEnumToStringMap(param) {
    return this.$processOptionalParam(param, "EnumToStringMap");
  }

  getOptionalIntToBoolMap(param) {
    return this.$processOptionalParam(param, "IntToBoolMap");
  }

  getOptionalIntToEnumMap(param) {
    return this.$processOptionalParam(param, "IntToEnumMap");
  }

  getOptionalIntToFloatMap(param) {
    return this.$processOptionalParam(param, "IntToFloatMap");
  }

  getOptionalIntToIntMap(param) {
    return this.$processOptionalParam(param, "IntToIntMap");
  }

  getOptionalIntToStringMap(param) {
    return this.$processOptionalParam(param, "IntToStringMap");
  }

  getOptionalStringToBoolMap(param) {
    return this.$processOptionalParam(param, "StringToBoolMap");
  }

  getOptionalStringToEnumMap(param) {
    return this.$processOptionalParam(param, "StringToEnumMap");
  }

  getOptionalStringToFloatMap(param) {
    return this.$processOptionalParam(param, "StringToFloatMap");
  }

  getOptionalStringToIntMap(param) {
    return this.$processOptionalParam(param, "StringToIntMap");
  }

  getOptionalStringToStringMap(param) {
    return this.$processOptionalParam(param, "StringToStringMap");
  }

  getEnumToNullableEnumMap(param) {
    return this.$processParam(param, "EnumToNullableEnumMap");
  }

  getEnumToNullableFloatMap(param) {
    return this.$processParam(param, "EnumToNullableFloatMap");
  }

  getEnumToNullableIntMap(param) {
    return this.$processParam(param, "EnumToNullableIntMap");
  }

  getEnumToNullableStringMap(param) {
    return this.$processParam(param, "EnumToNullableStringMap");
  }

  getIntToNullableEnumMap(param) {
    return this.$processParam(param, "IntToNullableEnumMap");
  }

  getIntToNullableFloatMap(param) {
    return this.$processParam(param, "IntToNullableFloatMap");
  }

  getIntToNullableIntMap(param) {
    return this.$processParam(param, "IntToNullableIntMap");
  }

  getIntToNullableStringMap(param) {
    return this.$processParam(param, "IntToNullableStringMap");
  }

  getStringToNullableEnumMap(param) {
    return this.$processParam(param, "StringToNullableEnumMap");
  }

  getStringToNullableFloatMap(param) {
    return this.$processParam(param, "StringToNullableFloatMap");
  }

  getStringToNullableIntMap(param) {
    return this.$processParam(param, "StringToNullableIntMap");
  }

  getStringToNullableStringMap(param) {
    return this.$processParam(param, "StringToNullableStringMap");
  }

  getOptionalEnumToNullableEnumMap(param) {
    return this.$processOptionalParam(param, "EnumToNullableEnumMap");
  }

  getOptionalEnumToNullableFloatMap(param) {
    return this.$processOptionalParam(param, "EnumToNullableFloatMap");
  }

  getOptionalEnumToNullableIntMap(param) {
    return this.$processOptionalParam(param, "EnumToNullableIntMap");
  }

  getOptionalEnumToNullableStringMap(param) {
    return this.$processOptionalParam(param, "EnumToNullableStringMap");
  }

  getOptionalIntToNullableEnumMap(param) {
    return this.$processOptionalParam(param, "IntToNullableEnumMap");
  }

  getOptionalIntToNullableFloatMap(param) {
    return this.$processOptionalParam(param, "IntToNullableFloatMap");
  }

  getOptionalIntToNullableIntMap(param) {
    return this.$processOptionalParam(param, "IntToNullableIntMap");
  }

  getOptionalIntToNullableStringMap(param) {
    return this.$processOptionalParam(param, "IntToNullableStringMap");
  }

  getOptionalStringToNullableEnumMap(param) {
    return this.$processOptionalParam(param, "StringToNullableEnumMap");
  }

  getOptionalStringToNullableFloatMap(param) {
    return this.$processOptionalParam(param, "StringToNullableFloatMap");
  }

  getOptionalStringToNullableIntMap(param) {
    return this.$processOptionalParam(param, "StringToNullableIntMap");
  }

  getOptionalStringToNullableStringMap(param) {
    return this.$processOptionalParam(param, "StringToNullableStringMap");
  }

  $processParam(param, type) {
    this.$validateParam(param, type);
    const paramData = this.$1[param];

    if (
      !Object.prototype.hasOwnProperty.call(this.$2, param) &&
      paramData.defaultValue !== null
    ) {
      invariant(!paramData.required, "Missing required parameter");
      return this.$convertValue(
        type,
        paramData.defaultValue,
        paramData.enumType
      );
    }

    invariant(
      paramData.required || type === "Bool" || paramData.defaultValue !== null,
      `Missing or invalid parameter: ${param} of type ${type}`
    );
    return this.$convertValue(type, this.$2[param], paramData.enumType);
  }

  $processOptionalParam(param, type) {
    this.$validateParam(param, type);
    const paramData = this.$1[param];
    invariant(
      !paramData.required,
      `Optional parameter ${param} should not be required`
    );
    invariant(
      !paramData.defaultValue,
      `Optional parameter ${param} should not have a default value`
    );

    if (Object.prototype.hasOwnProperty.call(this.$2, param)) {
      return this.$convertValue(type, this.$2[param], paramData.enumType);
    }
    return null;
  }

  $validateParam(param, type) {
    invariant(
      Object.prototype.hasOwnProperty.call(this.$1, param),
      `Missing parameter: ${param}`
    );
    invariant(
      this.$1[param].type === type,
      `Invalid parameter type: ${param} should be ${type}, but got ${this.$1[param].type}`
    );
  }

  // eslint-disable-next-line complexity
  $convertValue(type, value, enumType) {
    let convertedValue;

    switch (type) {
      case "Bool":
        convertedValue = (value && value !== "false" && value !== "0") || false;
        break;
      case "Int":
        convertedValue = value.toString();
        invariant(/-?\d+/.test(convertedValue), `Invalid integer: ${value}`);
        break;
      case "Float":
        convertedValue = parseFloat(value, 10);
        invariant(!isNaN(convertedValue), `Invalid float: ${value}`);
        break;
      case "FBID":
        convertedValue = value.toString();
        for (let i = 0; i < convertedValue.length; ++i) {
          const charCode = convertedValue.charCodeAt(i);
          invariant(charCode >= 48 && charCode <= 57, `Invalid FBID: ${value}`);
        }
        break;
      case "String":
        convertedValue = value.toString();
        break;
      case "Enum":
        if (enumType === 0) {
          convertedValue = this.$convertValue("Int", value, null);
        } else if (enumType === 1) {
          convertedValue = this.$convertValue("String", value, null);
        } else if (enumType === 2) {
          convertedValue = value;
        } else {
          invariant(false, `Invalid enum type: ${enumType}`);
        }
        break;
      default:
        // eslint-disable-next-line no-case-declarations
        const nullableMatch = /^Nullable(\w+)$/.exec(type);
        if (nullableMatch) {
          convertedValue =
            value === null
              ? null
              : this.$convertValue(nullableMatch[1], value, enumType);
        } else {
          const vectorMatch = /^(\w+)Vector$/.exec(type);
          if (vectorMatch) {
            if (!Array.isArray(value)) {
              convertedValue = value.toString();
              convertedValue =
                convertedValue === "" ? [] : convertedValue.split(",");
            } else {
              convertedValue = value;
            }
            const itemType = vectorMatch[1];
            invariant(typeof itemType === "string", "Invalid vector item type");
            convertedValue = convertedValue.map((item) =>
              this.$convertValue(itemType, item, enumType && enumType.member)
            );
          } else {
            const setKeysetMatch = /^(\w+)(Set|Keyset)$/.exec(type);
            if (setKeysetMatch) {
              if (!Array.isArray(value)) {
                convertedValue = value.toString();
                convertedValue =
                  convertedValue === "" ? [] : convertedValue.split(",");
              } else {
                convertedValue = value;
              }
              const setType = setKeysetMatch[1];
              invariant(typeof setType === "string", "Invalid set item type");
              convertedValue = Object.keys(
                convertedValue.reduce((acc, item) => {
                  acc[item] = item;
                  return acc;
                }, {})
              ).map((item) =>
                this.$convertValue(setType, item, enumType && enumType.member)
              );
            } else {
              const mapMatch = /^(\w+)To(\w+)Map$/.exec(type);
              if (mapMatch) {
                convertedValue = {};
                const keyType = mapMatch[1];
                const valueType = mapMatch[2];
                invariant(
                  typeof keyType === "string" && typeof valueType === "string",
                  "Invalid map key or value type"
                );
                Object.keys(value).forEach((key) => {
                  convertedValue[
                    this.$convertValue(keyType, key, enumType && enumType.key)
                  ] = this.$convertValue(
                    valueType,
                    value[key],
                    enumType && enumType.value
                  );
                });
              } else {
                invariant(false, `Invalid type: ${type}`);
              }
            }
          }
        }
        break;
    }
    return convertedValue;
  }
}

export default XRequest;
