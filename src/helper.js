export function isEmpty(val) {
  return val == null || !(Object.keys(val) || val).length;
}
