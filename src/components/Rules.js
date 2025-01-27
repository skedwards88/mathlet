import React from "react";
import packageJson from "../../package.json";

export default function Rules({
  setDisplay,
  isFirstGame,
  setIsFirstGame,
  setSawWhatsNew,
}) {
  return (
    <div className="App rules">
      <h1 id="rulesHeader">Mathlet: How to play</h1>
      <p id="rulesText">{`Swipe to join connecting symbols into an equation that equals a clue.\n\nTap on a clue to get a hint.\n\n The game is easier on Monday and gets harder over the week. Can you win every day?`}</p>
      <button
        id="rulesClose"
        className="close"
        onClick={() => {
          if (isFirstGame) {
            setIsFirstGame(false);
            setSawWhatsNew(true);
          }
          setDisplay("game");
        }}
      >
        {isFirstGame ? "Start game" : "Close"}
      </button>
      <small id="rulesVersion">version {packageJson.version}</small>
    </div>
  );
}
