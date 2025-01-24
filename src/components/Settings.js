import React from "react";
import {getRenderedOperator} from "../logic/getRenderedOperator";

export default function Settings({
  dispatchGameState,
  selectedOptions,
  setSelectedOptions,
}) {
  const handleCheckboxChange = (event) => {
    const {name, checked} = event.target;
    let newSelections = {...selectedOptions, [name]: checked};

    // Only if at least one option is still true
    if (Object.values(newSelections).includes(true)) {
      setSelectedOptions(newSelections);
      dispatchGameState({action: "newGame", selectedOptions: newSelections});
    }
  };

  return (
    <form id="operatorSettings">
      {Object.keys(selectedOptions).map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            name={option}
            checked={selectedOptions[option]}
            onChange={handleCheckboxChange}
          />
          {getRenderedOperator(option)}
        </label>
      ))}
    </form>
  );
}
