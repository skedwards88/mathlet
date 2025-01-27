import React from "react";
import {getColorForSymbol} from "../logic/getColorForSymbol";
import {getRenderedOperator} from "../logic/getRenderedOperator";

export default function Hint({symbols: hintSymbols, value}) {
  const blocks = hintSymbols.map((symbol, index) => (
    <div
      key={index}
      className={`guessBox ${
        symbol === "?" ? "gray" : getColorForSymbol(symbol)
      }`}
    >
      {getRenderedOperator(symbol)}
    </div>
  ));

  const result = ` = ${value}`;

  return (
    <div id="currentEquationAndEvaluation">
      <div id="currentEquation">{blocks}</div>
      <div>{result}</div>
    </div>
  );
}
