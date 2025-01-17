import React from "react";
import Board from "./Board";
import Clues from "./Clues";
import CurrentEquation from "./CurrentEquation";
import GameOver from "./GameOver";
import {Countdown} from "./Countdown";
import WhatsNew from "./WhatsNew";

async function handleInstall(installPromptEvent, setInstallPromptEvent) {
  console.log("handling install");
  console.log(installPromptEvent);
  installPromptEvent.prompt();
  const result = await installPromptEvent.userChoice;
  console.log(result);
  setInstallPromptEvent(null);

  try {
    window.gtag("event", "install", {});
  } catch (error) {
    console.log("tracking error", error);
  }
}

export default function Mathlet({
  setDisplay,
  installPromptEvent,
  showInstallButton,
  setInstallPromptEvent,
  setSawWhatsNew,
  sawWhatsNew,
  gameState,
  dispatchGameState,
}) {
  React.useEffect(() => {
    window.localStorage.setItem("dailyMathletState", JSON.stringify(gameState));
  }, [gameState]);

  const isGameOver = false // todo

  if (!sawWhatsNew) {
    return (
      <WhatsNew
        setDisplay={setDisplay}
        setSawWhatsNew={setSawWhatsNew}
      ></WhatsNew>
    );
  }

  console.log(JSON.stringify(gameState.foundEquations));
  return (
    <div
      className="App"
      id="mathlet"
      onPointerUp={(e) => {
        e.preventDefault();

        dispatchGameState({
          action: "endEquation",
        });
      }}
    >
      <div id="controls">
        <div id="nextGame">
          {isGameOver ? (
            <Countdown
              dispatchGameState={dispatchGameState}
              seed={gameState.seed}
            ></Countdown>
          ) : <></>}
        </div>
        <button id="rules" onClick={() => setDisplay("rules")}></button>
        <button
          id="stats"
          onClick={() => {
            dispatchGameState({action: "clearStreakIfNeeded"});
            setDisplay("stats");
          }}
        ></button>
        <button id="heart" onClick={() => setDisplay("heart")}></button>
        {showInstallButton && installPromptEvent ? (
          <button
            id="install"
            onClick={() =>
              handleInstall(installPromptEvent, setInstallPromptEvent)
            }
          ></button>
        ) : (
          <></>
        )}
      </div>
      <Clues
      solutions={gameState.solutions}
      foundEquations={gameState.foundEquations}
      ></Clues>
      {isGameOver ? (
        <GameOver
        />
      ) : (
        <CurrentEquation
          symbols={gameState.playedIndexes.map(
            (index) => gameState.symbols[index],
          )}
        ></CurrentEquation>
      )}
      <Board
        symbols={gameState.symbols}
        playedIndexes={gameState.playedIndexes}
        gameOver={false} // todo
        dispatchGameState={dispatchGameState}
      ></Board>
    </div>
  );
}
