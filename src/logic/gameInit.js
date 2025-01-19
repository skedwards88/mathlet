import {getPlayableBoard} from "./generateGame";

export function getSeed() {
  // Get a seed based on today's date 'YYYYMMDD'
  const currentDate = new Date();
  const seed = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

  return seed;
}

function getRandomSeed() {
  // Gets a seed based on the current time, which
  // should effectively give the impression of a
  // "random" game each time a new game is generated based on the seed
  const currentDate = new Date();
  return currentDate.getTime().toString();
}

//todo earlier days can also have smaller grid size

function getOperatorsForDay(day) {
  switch (day) {
    case 1: // Mon
      return ["+"]
    case 2: // Tues
      return ["+"]
    case 3: // Wed
      return ["+","-"]
    case 4: // Thurs
      return ["+","-"]
    case 5: // Fri
      return ["*"]
    case 6: // Sat
      return ["*","/"]
    case 7: // Sun
      return ["+","-","*","/"] // todo this isn't guaranteed to be hard if pick all +
    default:
      return ["+"]
  }
}

function getOperatorsForDifficulty(difficultyLevel) {
  const adjLevel = difficultyLevel === 7 ? 0 : difficultyLevel;
  return getOperatorsForDay(adjLevel)
}

export function gameInit({difficultyLevel=1}) {
  console.log(`init ${difficultyLevel}`);
  // const seed = getSeed(); // todo revert to getseed
  const seed = getRandomSeed();
  // const seed = "1737259321148";

  const savedState = JSON.parse(localStorage.getItem("dailyMathletState"));

  // If today's game is in progress, keep the progress
  if (
    savedState &&
    savedState.seed === seed &&
    savedState.symbols &&
    savedState.playedIndexes &&
    savedState.stats
  ) {
    // todo modify above
    // return savedState;
  }

  const gridSize = 3;
  const numClues = 5;

  const dayOfWeek = new Date().getDay();
  // const operatorsForDay = getOperatorsForDay(dayOfWeek);
  const operatorsForDay = getOperatorsForDifficulty(difficultyLevel); //todo revert to getOperatorsForDay

  const [symbols, solutions] = getPlayableBoard({
    gridSize: gridSize,
    numClues: numClues,
    operators: operatorsForDay,
    seed: seed,
  });

  // If there are already stats, use those // todo stats should just track how many clues solved per day of week?
  let stats;
  if (savedState && savedState.stats) {
    stats = savedState.stats;
  } else {
    stats = {
      // last puzzle index won (to calculate streak)
      lastDateWon: undefined,
      // consecutive games won
      streak: 0,
      // max consecutive games won
      maxStreak: 0,
      // of streak, games won without hints
      numHintlessInStreak: 0,
      // number of hints used during streak
      numHintsInStreak: 0,
      days: {
        // day: [total number of games won, total number of games won without hints]
        0: {won: 0, noHints: 0}, // Sunday
        1: {won: 0, noHints: 0},
        2: {won: 0, noHints: 0},
        3: {won: 0, noHints: 0},
        4: {won: 0, noHints: 0},
        5: {won: 0, noHints: 0},
        6: {won: 0, noHints: 0},
      },
    };
  }

  return {
    seed: seed,
    symbols: symbols,
    solutions, // can I keep it in int form earlier so I don't need this conversion?
    foundEquations: solutions.map(() => undefined),
    // foundEquations: ["+","1+2",undefined,"1+2+3+4","1234+3456"],
    playedIndexes: [],
    stats: stats,
  };
}
