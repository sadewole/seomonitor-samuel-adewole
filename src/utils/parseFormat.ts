export function parseFixed(str: string | number, val: number): number {
  str = str.toString();
  str = str.slice(0, str.indexOf('.') + val + 1);
  return Number(str);
}

// check if number is a floating point number
export function isFloat(num: number | string): boolean {
  return Number(num) % 1 !== 0;
}

export function formattedValue(str: string | number, val: number): number {
  return isFloat(str) ? parseFixed(str, val) : Number(str);
}
