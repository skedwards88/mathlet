export function getRenderedOperator(operator) {
  switch (operator) {
    case "/":
      return "÷"

    case "*":
      return "×"

    default:
      return operator;
  }
}
