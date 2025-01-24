import React from "react";
import {getColorForSymbol} from "../logic/getColorForSymbol";
import { getRenderedOperator } from "../logic/getRenderedOperator";

function Symbol({symbol, symbolAvailability, index, dispatchGameState}) {
  const myRef = React.useRef();

  React.useLayoutEffect(() => {
    const myDiv = myRef.current;
    const currentClasses = myDiv.className
      .split(" ")
      .filter((entry) => entry !== "unavailable");

    const newClass = symbolAvailability
      ? currentClasses.join(" ")
      : [...currentClasses, "unavailable"].join(" ");

    myDiv.className = newClass;
  }, [symbolAvailability]);

  function handlePointerDown(e, index) {
    e.preventDefault();
    e.target.releasePointerCapture(e.pointerId);
    dispatchGameState({
      action: "startEquation",
      symbolIndex: index,
    });
  }

  function handlePointerEnter(e, index, symbolAvailability) {
    e.preventDefault();
    if (!symbolAvailability) {
      dispatchGameState({
        action: "removeSymbol",
        symbolIndex: index,
      });
    } else {
      // Add the symbol to the list of symbols
      dispatchGameState({
        action: "addSymbol",
        symbolIndex: index,
      });
    }
  }

  function handlePointerUp(e) {
    e.preventDefault();

    dispatchGameState({
      action: "endEquation",
    });
  }

  const color = getColorForSymbol(symbol);
  return (
    <div
      className={`symbol ${color}`}
      ref={myRef}
      key={index.toString() + symbol}
      onPointerDown={(e) => handlePointerDown(e, index)}
      onPointerEnter={(e) => handlePointerEnter(e, index, symbolAvailability)}
      onPointerUp={(e) => handlePointerUp(e)}
      draggable={false}
    >
      {getRenderedOperator(symbol)}
    </div>
  );
}

export default function Board({
  symbols,
  playedIndexes,
  gameOver,
  dispatchGameState,
}) {
  const board = symbols.map((symbol, index) => (
    <Symbol
      symbol={symbol}
      symbolAvailability={gameOver ? false : !playedIndexes.includes(index)}
      index={index}
      draggable={false}
      dispatchGameState={dispatchGameState}
      key={index + symbol}
    ></Symbol>
  ));

  const numColumns = Math.sqrt(symbols.length);

  return (
    <div id="board" className={`rows${numColumns}`}>
      {board}{" "}
    </div>
  );
}
