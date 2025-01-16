import cloneDeep from "lodash.clonedeep";
import {checkIfNeighbors} from "@skedwards88/word_logic";
import {gameInit} from "./gameInit";
import { isEquationQ } from "./isEquationQ";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "startWord") {
    return {
      ...currentGameState,
      wordInProgress: true, // todo rename all word and letter vars
      playedIndexes: [payload.letterIndex],
      result: "",
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
    const isEquation = isEquationQ(word)
    if (!isEquation) {
      return {
        ...currentGameState,
        playedIndexes: [],
        wordInProgress: false,
      };
    }

    return {
      ...currentGameState,
      playedIndexes: [],
      wordInProgress: false,
      result: "",
      // ...(newStats && {stats: newStats}), todo
    };
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
