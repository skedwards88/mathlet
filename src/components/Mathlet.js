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
  dispatchGameState,
  solutions,
  foundEquations,
  seed,
  playedIndexes,
  symbols,
}) {
  const isGameOver = false; // todo

  if (!sawWhatsNew) {
    return (
      <WhatsNew
        setDisplay={setDisplay}
        setSawWhatsNew={setSawWhatsNew}
      ></WhatsNew>
    );
  }

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
              seed={seed}
            ></Countdown>
          ) : (
            <></>
          )}
        </div>

        {/* todo this is temporary? */}
        <div id="settingSliderContainer">
          <div className="settingSliderValue">–</div>
          <input
            id="difficultyLevel"
            className="difficultyLevel"
            type="range"
            min="1"
            max="7"
            defaultValue={1}
            onTouchEnd={(event) => dispatchGameState({action: "newGame", difficultyLevel: parseInt(event.target.value)})}
          />
          <div className="settingSliderValue">+</div>
        </div>

        {/* todo this is temporary? */}
        <button id="newGame"
         onClick={() => dispatchGameState({action: "newGame"})}
        ></button>

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

      <Clues solutions={solutions} foundEquations={foundEquations}></Clues>
      {isGameOver ? (
        <GameOver />
      ) : (
        <CurrentEquation
          symbols={playedIndexes.map((index) => symbols[index])}
        ></CurrentEquation>
      )}
      <Board
        symbols={symbols}
        playedIndexes={playedIndexes}
        gameOver={false} // todo
        dispatchGameState={dispatchGameState}
      ></Board>

      {/* todo this is temporary? */}
      <small id="seed">{`game id ${seed}`}</small>
    </div>
  );
}
