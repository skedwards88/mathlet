import seedrandom from "seedrandom";
import {evaluate} from "mathjs";

import {
  shuffleArray,
  pickRandomItemFromArray,
  pickRandomIntBetween,
} from "@skedwards88/word_logic";
import {findAllEquationIndexes} from "./findAllEquationIndexes";

const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function getPlayableBoard({gridSize, operators, numClues, seed}) {
  let foundPlayableBoard = false;
  let symbols = [];
  let solutions = [];

  // The board should be 1/4-1/3 operators
  const minOperators = Math.round((gridSize * gridSize) / 4);
  const maxOperators = Math.round((gridSize * gridSize) / 3);

  // Create a new seedable random number generator
  let pseudoRandomGenerator = seedrandom(seed);

  while (!foundPlayableBoard) {
    console.log(`START ROUND #######`);
    // Pick a random assortment of symbols
    const numOperators = pickRandomIntBetween(
      minOperators,
      maxOperators,
      pseudoRandomGenerator,
    );

    const numDigits = gridSize * gridSize - numOperators;

    const operatorPool = Array.from({length: numOperators}, () =>
      pickRandomItemFromArray(operators, pseudoRandomGenerator),
    );

    const digitPool = Array.from({length: numDigits}, () =>
      pickRandomItemFromArray(digits, pseudoRandomGenerator),
    );

    symbols = shuffleArray(
      [...operatorPool, ...digitPool],
      pseudoRandomGenerator,
    );

    // find all possible "reasonable" equations
    // (i.e. equations that match isEquationQ, not just mathjs.evaluate)
    const [allEquationIndexes, solutionsToAvoid] = findAllEquationIndexes({
      symbols,
      numColumns: gridSize,
      numRows: gridSize,
      minEquationLength: 3, // todo should these be passed in as param that depends on day?
      maxEquationLength: 7,
    });

    // make dict of solution: equation indexes
    let equationIndexesBySolution = {};
    for (const equationIndexes of allEquationIndexes) {
      const equation = equationIndexes.map((index) => symbols[index]).join("");
      const solution = evaluate(equation);
      if (!equationIndexesBySolution[solution]) {
        equationIndexesBySolution[solution] = [];
      }
      equationIndexesBySolution[solution].push(equationIndexes);
    }

    const allSolutions = shuffleArray(
      Object.keys(equationIndexesBySolution),
      pseudoRandomGenerator,
    );

    // Omit solutions that
    // - Can be made without an operator (stored in solutionsToAvoid earlier)
    // - Are more than 4 digits
    // - Are negative
    const trimmedSolutions = allSolutions.filter(
      (solution) =>
        solution > 0 &&
        solution.length < 5 &&
        !solutionsToAvoid.includes(solution),
    );

    // choose 5 solutions // todo can later prefer solutions that are shorter and/or that have fewer possibilities and/or are least similar equations to each other. can maybe also consider the colors they would make
    solutions = trimmedSolutions.slice(0, 5);
    for (const sol in equationIndexesBySolution) {
      console.log(
        `${sol} (${
          equationIndexesBySolution[sol].length
        }): ${equationIndexesBySolution[sol]
          .map((indexesSeq) =>
            indexesSeq.map((index) => symbols[index]).join(""),
          )
          .join("   ;   ")}`,
      );
    }

    // If we don't have enough solutions, try again
    if (solutions.length < numClues) {
      continue;
    }

    // stop looking
    foundPlayableBoard = true;
  }

  // convert the solutions from strings to ints
  solutions = solutions.map((solution) => parseInt(solution));

  // sort the solutions
  solutions = solutions.sort((a, b) => a - b);

  return [symbols, solutions];
}
