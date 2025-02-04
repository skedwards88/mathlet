import React from "react";
import {getColorForSymbol} from "../logic/getColorForSymbol";

function getGreenColor(colors) {
  let blueParts = 0;
  let yellowParts = 0;

  for (const color of colors) {
    if (color === "yellow") {
      yellowParts++;
    }
    if (color === "blue") {
      blueParts++;
    }
  }

  if (yellowParts === 0 && blueParts === 0) {
    return;
  }

  // Normalize the ratio of yellow to total parts
  const totalParts = yellowParts + blueParts;
  const yellowRatio = yellowParts / totalParts;

  const limeGreen = {red: 191, green: 255, blue: 0}; // Yellow green
  const bluishGreen = {red: 0, green: 200, blue: 170}; // Blue green

  // Interpolate between lime green and bluish green
  const red = Math.round(
    limeGreen.red * yellowRatio + bluishGreen.red * (1 - yellowRatio),
  );
  const green = Math.round(
    limeGreen.green * yellowRatio + bluishGreen.green * (1 - yellowRatio),
  );
  const blue = Math.round(
    limeGreen.blue * yellowRatio + bluishGreen.blue * (1 - yellowRatio),
  );

  return `rgb(${red}, ${green}, ${blue})`;
}

function Clue({solution, foundEquation, index, dispatchGameState}) {
  let color;
  if (foundEquation) {
    const colors = foundEquation
      .split("")
      .map((symbol) => getColorForSymbol(symbol));
    color = getGreenColor(colors);
  }

  return (
    <div
      className={"clue"}
      style={color ? {color: `${color}`} : {}}
      {...(!foundEquation && {
        onClick: () =>
          dispatchGameState({action: "getHint", requestedHintIndex: index}),
      })}
    >
      {solution}
    </div>
  );
}

export default function Clues({solutions, foundEquations, dispatchGameState}) {
  const clueDisplays = solutions.map((clue, index) => (
    <Clue
      solution={solutions[index]}
      index={index}
      foundEquation={foundEquations[index]}
      key={index}
      clueIndex={index}
      dispatchGameState={dispatchGameState}
    ></Clue>
  ));

  return <div id="clues">{clueDisplays}</div>;
}

//todo remove
// const Clues = React.memo(({ solutions, foundEquations }) => {
//   // Memoize the array of clue displays
//   const clueDisplays = React.useMemo(
//     () =>
//       solutions.map((solution, index) => (
//         <Clue
//           solution={solution}
//           foundEquation={foundEquations[index]}
//           key={index}
//           clueIndex={index}
//         />
//       )),
//     [solutions, foundEquations] // Dependencies: only recompute if these change
//   );

//   return <div id="clues">{clueDisplays}</div>;
// });

// export default Clues;
