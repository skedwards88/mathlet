import React from "react";
import { getColorForSymbol } from "../logic/getColorForSymbol";
import {evaluate} from "mathjs";

export default function CurrentWord({letters}) {
  const blocks = letters.map((letter, index) => (
    <div key={index} className={`guessBox ${getColorForSymbol(letter)}`}>
      {letter.toUpperCase()}
    </div>
  ));

  let result = ""
  try {
    const value = evaluate(letters.join(""));
    value != undefined ? result = ` = ${value}` : null // todo can I make this line cleaner?
  } catch (error) {
    result = " = ?"
  }

  return <div id="currentWord">{blocks}<div>{result}</div></div>;
}
