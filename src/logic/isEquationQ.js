import {evaluate, isInteger} from "mathjs";

export function isEquationQ(potentialEquation) {
  // Some of these cases technically do evaluate,
  // but we don't want to consider for the "actual" solution
  // (so use mathjs.evaluate instead for determining if a user's solution is valid)

  let value;
  try {
    value = evaluate(potentialEquation);
  } catch (error) {
    value = undefined;
  }

  // false if can't evaluate
  if (value === undefined) {
    return false;
  }

  // false if evaluates to a decimal
  if (!isInteger(value)) {
    return false;
  }

  // false if evaluates to a negative number
  if (value < 0) {
    return false;
  }

  // false if more than 4 digits
  if (value.toString().length > 4) {
    return false;
  }

  // false if 0 operators
  if (/^\d+$/.test(potentialEquation)) {
    return false;
  }

  // false if operator at start
  if (/^[^\d]/.test(potentialEquation)) {
    return false;
  }

  // false if operator at end
  if (/[^\d]$/.test(potentialEquation)) {
    return false;
  }

  // false if any operators next to each other
  if (/[^\d]{2,}/.test(potentialEquation)) {
    return false;
  }

  // false if more than 3 operators
  if ((potentialEquation.match(/[^\d]/g) || []).length > 3) {
    return false;
  }

  // false if any numbers larger than 2 digits
  if (/\d{3,}/.test(potentialEquation)) {
    return false;
  }

  return true;
}
