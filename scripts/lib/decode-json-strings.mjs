export function decodeUnicodeLiterals(value) {
  const text = String(value ?? "").trim();
  if (!text || !/\\u[0-9a-fA-F]{4}/.test(text)) return text;
  return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

export function deepDecodeStrings(value) {
  if (typeof value === "string") return decodeUnicodeLiterals(value);
  if (Array.isArray(value)) return value.map(deepDecodeStrings);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, deepDecodeStrings(item)])
    );
  }
  return value;
}
