import React from "react";
import {getColorForSymbol} from "../logic/getColorForSymbol";
import {evaluate} from "mathjs";

export default function CurrentEquation({symbols}) {
  const blocks = symbols.map((symbol, index) => (
    <div key={index} className={`guessBox ${getColorForSymbol(symbol)}`}>
      {symbol.toUpperCase()}
    </div>
  ));

  let result = "";
  try {
    const value = evaluate(symbols.join(""));
    value != undefined ? (result = ` = ${value}`) : null; // todo can I make this line cleaner?
  } catch (error) {
    result = " = ?";
  }

  return (
    <div id="currentEquation">
      {blocks}
      <div>{result}</div>
    </div>
  );
}
