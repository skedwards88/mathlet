import seedrandom from "seedrandom";
import {evaluate} from "mathjs";

import {shuffleArray, pickRandomItemFromArray} from "@skedwards88/word_logic";
import {findAllEquationIndexes} from "./findAllEquationIndexes";

const possibleSymbols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "+", "*", "+", "+"]; // todo do beter than just overloading number of operators

function getSymbols(gridSize, pseudoRandomGenerator) {
  return Array.from(
    {length: gridSize * gridSize},
   () =>  pickRandomItemFromArray(possibleSymbols, pseudoRandomGenerator),
  );
}

export function getPlayableBoard({gridSize, numClues, seed}) {
  let foundPlayableBoard = false;
  let symbols = [];
  let solutions = [];

  // Create a new seedable random number generator
  let pseudoRandomGenerator = seedrandom(seed);

  while (!foundPlayableBoard) {
    // Pick a random assortment of symbols
    symbols = getSymbols(gridSize, pseudoRandomGenerator);

    // find all possible words
    const allEquationIndexes = findAllEquationIndexes({
      symbols,
      numColumns: gridSize,
      numRows: gridSize,
      minEquationLength: 3,
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

    const allSolutions = shuffleArray(Object.keys(equationIndexesBySolution), pseudoRandomGenerator);

    // choose 5 solutions // todo can later prefer solutions that are shorter and/or that have fewer possibilities and/or are least similar equations to each other. can maybe also consider the colors they would make
    solutions = allSolutions.slice(0, 5);
    console.log(equationIndexesBySolution);

    // todo retry if less solutions than desired

    // If we don't have enough solutions, try again
    if (solutions.length < numClues) {
      continue;
    }

    // stop looking
    foundPlayableBoard = true;
  }
  return [symbols, solutions];
}
