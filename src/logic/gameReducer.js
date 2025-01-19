import {checkIfNeighbors} from "@skedwards88/word_logic";
import {gameInit} from "./gameInit";
import {evaluate} from "mathjs";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "startEquation") {
    return {
      ...currentGameState,
      equationInProgress: true,
      playedIndexes: [payload.symbolIndex],
    };
  } else if (payload.action === "addSymbol") {
    if (!currentGameState.equationInProgress) {
      return currentGameState;
    }
    // Don't add the symbol if it isn't neighboring the current sequence
    const isNeighboring = checkIfNeighbors({
      indexA:
        currentGameState.playedIndexes[
          currentGameState.playedIndexes.length - 1
        ],
      indexB: payload.symbolIndex,
      numColumns: Math.sqrt(currentGameState.symbols.length),
      numRows: Math.sqrt(currentGameState.symbols.length),
    });
    if (!isNeighboring) {
      return currentGameState;
    }

    const newPlayedIndexes = [
      ...currentGameState.playedIndexes,
      payload.symbolIndex,
    ];

    return {
      ...currentGameState,
      playedIndexes: newPlayedIndexes,
    };
  } else if (payload.action === "removeSymbol") {
    if (!currentGameState.equationInProgress) {
      return currentGameState;
    }
    // Don't remove a symbol if the player didn't go back to the symbol before the last symbol
    let newPlayedIndexes = [...currentGameState.playedIndexes];
    const lastIndexPlayed = newPlayedIndexes[newPlayedIndexes.length - 2];
    if (lastIndexPlayed !== payload.symbolIndex) {
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
  } else if (payload.action === "endEquation") {
    // Since we end the equation on board up or on app up (in case the user swipes off the board), we can end up calling this case twice.
    // Return early if we no longer have a equation in progress.
    if (!currentGameState.playedIndexes.length) {
      return currentGameState;
    }

    // check if the equation is valid
    const equation = currentGameState.playedIndexes
      .map((index) => currentGameState.symbols[index])
      .join("");
    let isValidEquation = false; //todo could maybe just use value instead of both value and isValidEquation
    let value;
    try {
      value = evaluate(equation);
      if (value != undefined) {
        isValidEquation = true;
      }
    } catch (error) {
      isValidEquation = false;
      value = undefined;
    }

    if (!isValidEquation) {
      return {
        ...currentGameState,
        playedIndexes: [],
        equationInProgress: false,
      };
    }

    // Check if the value matches a solution
    const matchingSolutionIndex = currentGameState.solutions.findIndex(
      (solution) => solution === value,
    );

    if (matchingSolutionIndex === -1) {
      return {
        ...currentGameState,
        playedIndexes: [],
        equationInProgress: false,
      };
    } else {
      let newFoundEquations = [...currentGameState.foundEquations];
      newFoundEquations[matchingSolutionIndex] = equation;
      // todo only do this if haven't already found a match for that index
      return {
        ...currentGameState,
        playedIndexes: [],
        equationInProgress: false,
        foundEquations: newFoundEquations,
        // ...(newStats && {stats: newStats}), todo
      };
    }
  } else if (payload.action === "clearStreakIfNeeded") {
    // todo
    return currentGameState;
  } else if (payload.action === "newGame") {
    return gameInit({difficultyLevel: payload.difficultyLevel});
  } else {
    console.log(`unknown action: ${payload.action}`);
    return {...currentGameState};
  }
}
