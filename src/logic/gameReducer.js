import cloneDeep from "lodash.clonedeep";
import {checkIfNeighbors} from "@skedwards88/word_logic";
import {gameInit} from "./gameInit";
import { isEquationQ } from "./isEquationQ";
import { evaluate } from "mathjs";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "startWord") {
    return {
      ...currentGameState,
      wordInProgress: true, // todo rename all word and letter vars
      playedIndexes: [payload.letterIndex],
    };
  } else if (payload.action === "addLetter") {
    if (!currentGameState.wordInProgress) {
      return currentGameState;
    }
    // Don't add the letter if it isn't neighboring the current sequence
    const isNeighboring = checkIfNeighbors({
      indexA:
        currentGameState.playedIndexes[
          currentGameState.playedIndexes.length - 1
        ],
      indexB: payload.letterIndex,
      numColumns: Math.sqrt(currentGameState.letters.length),
      numRows: Math.sqrt(currentGameState.letters.length),
    });
    if (!isNeighboring) {
      return currentGameState;
    }

    const newPlayedIndexes = [
      ...currentGameState.playedIndexes,
      payload.letterIndex,
    ];

    return {
      ...currentGameState,
      playedIndexes: newPlayedIndexes,
    };
  } else if (payload.action === "removeLetter") {
    if (!currentGameState.wordInProgress) {
      return currentGameState;
    }
    // Don't remove a letter if the player didn't go back to the letter before the last letter
    let newPlayedIndexes = [...currentGameState.playedIndexes];
    const lastIndexPlayed = newPlayedIndexes[newPlayedIndexes.length - 2];
    if (lastIndexPlayed !== payload.letterIndex) {
      return currentGameState;
    }

    newPlayedIndexes = currentGameState.playedIndexes.slice(
      0,
      newPlayedIndexes.length - 1,
    );

    return {
      ...currentGameState,
      playedIndexes: newPlayedIndexes,
    };
  } else if (payload.action === "endWord") {
    // Since we end the word on board up or on app up (in case the user swipes off the board), we can end up calling this case twice.
    // Return early if we no longer have a word in progress.
    if (!currentGameState.playedIndexes.length) {
      return currentGameState;
    }

    // check if the equation is valid
    const word = currentGameState.playedIndexes
      .map((index) => currentGameState.letters[index])
      .join("");
    let isValidEquation = false; //todo could maybe just use value instead of both value and isValidEquation
    let value;
    try {
      value = evaluate(word)
      if (value != undefined) {
        isValidEquation = true
      }
    } catch (error) {
      isValidEquation = false;
      value = undefined;
    }

    if (!isValidEquation) {
      return {
        ...currentGameState,
        playedIndexes: [],
        wordInProgress: false,
      };
    }

console.log(typeof(value));
console.log(typeof(currentGameState.solutions[0]));
    // Check if the value matches a solution
    const matchingSolutionIndex = currentGameState.solutions.findIndex(solution => solution === value)

console.log(`matchingSolutionIndex ${matchingSolutionIndex}`);

    if (matchingSolutionIndex === -1) {
      return {
        ...currentGameState,
        playedIndexes: [],
        wordInProgress: false,
      };
    } else {
      let newFoundEquations = cloneDeep(currentGameState.foundEquations);
      newFoundEquations[matchingSolutionIndex] = word;
      // todo only do this if haven't already found a match for that index
      return {
        ...currentGameState,
        playedIndexes: [],
        wordInProgress: false,
        foundEquations: newFoundEquations,
        // ...(newStats && {stats: newStats}), todo
      };
    }

  } else if (payload.action === "clearStreakIfNeeded") {
    // todo
    return currentGameState
  } else if (payload.action === "newGame") {
    return gameInit();
  } else {
    console.log(`unknown action: ${payload.action}`);
    return {...currentGameState};
  }
}
