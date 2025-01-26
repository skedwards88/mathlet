import React from "react";
import {getColorForSymbol} from "../logic/getColorForSymbol";

export default function Hint({symbols: hintSymbols, value}) {
  const blocks = hintSymbols.map((symbol, index) => (
    <div
      key={index}
      className={`guessBox ${
        symbol === "?" ? "gray" : getColorForSymbol(symbol)
      }`}
    >
      {symbol.toUpperCase()}
    </div>
  ));

  let result = "";
  try {
    value != undefined ? (result = ` = ${+value.toFixed(29)}`) : null; // todo can I make this line cleaner?
  } catch (error) {
    result = " = ?";
  }

  return (
    <div id="currentEquationAndEvaluation">
      <div id="currentEquation">{blocks}</div>
      <div>{result}</div>
    </div>
  );
}
