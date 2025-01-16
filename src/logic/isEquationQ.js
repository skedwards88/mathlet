export function isEquationQ(potentialEquation) {
  // false if 0 operators
  if (/^\d+$/.test(potentialEquation)) {
    return false
  }
  // false if operator at start
  if (/^[^\d]/.test(potentialEquation)) {
return false
  }
  // false if operator at end
  if (/[^\d]$/.test(potentialEquation)) {
    return false
  }
  // false if any operators next to each other
  if (/[^\d]{2,}/.test(potentialEquation)) {
    return false
  }

  // false if more than 3 operators
  if ((potentialEquation.match(/[^\d]/g) || []).length > 3) {
    return false
  }

  // false if any numbers larger than 2
  if (/\d{3,}/.test(potentialEquation)) {
    return false
  }

  return true;
}
