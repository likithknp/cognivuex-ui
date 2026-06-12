const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export const normalizeReport = (payload) =>
  payload?.report ?? payload?.data?.report ?? payload?.data ?? payload;

export const findValueByKeys = (source, keys, seen = new WeakSet()) => {
  if (source === null || source === undefined) return undefined;
  if (seen.has(source)) return undefined;
  seen.add(source);

  if (Array.isArray(source)) {
    for (const item of source) {
      const result = findValueByKeys(item, keys, seen);
      if (result !== undefined && result !== null) return result;
    }
    return undefined;
  }

  if (!isObject(source)) return undefined;

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const value = source[key];
      if (value !== undefined && value !== null) return value;
    }
  }

  for (const value of Object.values(source)) {
    const result = findValueByKeys(value, keys, seen);
    if (result !== undefined && result !== null) return result;
  }

  return undefined;
};
