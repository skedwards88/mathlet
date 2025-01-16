export function getColorForSymbol(symbol) {
  return /[0-9]/.test(symbol) ? "blue" : "yellow"
}
