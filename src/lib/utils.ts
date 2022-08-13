export function removeDigits(x: number, n: number) {
  return (x - (x % Math.pow(10, n))) / Math.pow(10, n);
}
