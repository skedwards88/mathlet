import {getSurroundingIndexes} from "@skedwards88/word_logic";
import {isEquationQ} from "./isEquationQ";

export function findAllEquationIndexes({
  symbols,
  numColumns,
  numRows,
  minEquationLength,
  maxEquationLength,
}) {
  let foundEquationIndexes = [];
  let foundSolutionsToAvoid = [];

  for (let startingIndex = 0; startingIndex < symbols.length; startingIndex++) {
    const [foundEquationIndexesForIndex, foundSolutionsToAvoidForIndex] =
      extendEquation({
        currentIndexes: [startingIndex],
        allFoundEquationIndexes: [],
        solutionsToAvoid: [symbols[startingIndex]],
        symbols,
        minEquationLength,
        maxEquationLength,
        numColumns,
        numRows,
      });

    foundEquationIndexes = [
      ...foundEquationIndexes,
      ...foundEquationIndexesForIndex,
    ];
    foundSolutionsToAvoid = [
      ...foundSolutionsToAvoid,
      ...foundSolutionsToAvoidForIndex,
    ];
  }

  return [foundEquationIndexes, foundSolutionsToAvoid];
}

function extendEquation({
  currentIndexes, // all indexes in the current equation thus far
  allFoundEquationIndexes, // accumulates over the recursion
  solutionsToAvoid, // accumulates over the recursion; is numbers present in the grid (so we can later avoid things like 27=27)
  symbols, // constant for all iterations. The symbols in the grid.
  minEquationLength, // constant for all iterations
  maxEquationLength, // constant for all iterations
  numColumns, // constant for all iterations
  numRows, // constant for all iterations
}) {
  const currentIndex = currentIndexes[currentIndexes.length - 1];
  const surroundingIndexes = getSurroundingIndexes({
    index: currentIndex,
    numColumns,
    numRows,
  });

  for (const surroundingIndex of surroundingIndexes) {
    if (currentIndexes.includes(surroundingIndex)) {
      continue;
    }
    const extendedIndexes = [...currentIndexes, surroundingIndex];
    const newPotentialEquation = extendedIndexes
      .map((index) => symbols[index])
      .join("");

    // if no operators
    if (/^\d+$/.test(newPotentialEquation)) {
      solutionsToAvoid.push(newPotentialEquation);
    }

    if (
      newPotentialEquation.length >= minEquationLength &&
      newPotentialEquation.length <= maxEquationLength &&
      isEquationQ(newPotentialEquation)
    ) {
      allFoundEquationIndexes.push(extendedIndexes);
    }

    if (extendedIndexes.length < maxEquationLength) {
      extendEquation({
        currentIndexes: extendedIndexes,
        allFoundEquationIndexes,
        solutionsToAvoid,
        symbols,
        minEquationLength,
        maxEquationLength,
        numColumns,
        numRows,
      });
    }
  }

  return [allFoundEquationIndexes, solutionsToAvoid];
}
