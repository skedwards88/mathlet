import React from "react";
import {getColorForSymbol} from "../logic/getColorForSymbol";
import {evaluate} from "mathjs";
import {getRenderedOperator} from "../logic/getRenderedOperator";

export default function CurrentEquation({symbols}) {
  const blocks = symbols.map((symbol, index) => (
    <div key={index} className={`guessBox ${getColorForSymbol(symbol)}`}>
      {getRenderedOperator(symbol)}
    </div>
  ));

  let result = "";
  try {
    const value = evaluate(symbols.join(""));
    value != undefined ? (result = ` = ${+value.toFixed(2)}`) : null; // todo can I make this line cleaner?
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
