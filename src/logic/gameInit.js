import {getPlayableBoard} from "./generateGame";

export function getSeed() {
  // Get a seed based on today's date 'YYYYMMDD'
  const currentDate = new Date();
  const seed = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

  return 23; // todo revert this
}

//todo earlier days should also include addition only, then add in other operators
//todo earlier days can also have smaller grid size

export function gameInit() {
  const seed = getSeed();

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

  const [symbols, solutions] = getPlayableBoard({
    gridSize: gridSize,
    numClues: numClues,
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
    solutions: solutions.map((s) => parseInt(s)), // can I keep it in int form earlier so I don't need this conversion?
    foundEquations: solutions.map(() => undefined),
    playedIndexes: [],
    stats: stats,
  };
}
