import React from "react";
import Board from "./Board";
import Clues from "./Clues";
import CurrentWord from "./CurrentWord";
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

  return (
    <div
      className="App"
      id="mathlet"
      onPointerUp={(e) => {
        e.preventDefault();

        dispatchGameState({
          action: "endWord",
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
      {/* //todo componentize */}
      <div id="clues">
      <div className={`clue`}>{gameState.solutions[0]}</div>
      <div className={`clue`}>{gameState.solutions[1]}</div>
      <div className={`clue`}>{gameState.solutions[2]}</div>
      <div className={`clue`}>{gameState.solutions[3]}</div>
      <div className={`clue`}>{gameState.solutions[4]}</div>
      </div>
      {isGameOver ? (
        <GameOver
        />
      ) : (
        <CurrentWord
          letters={gameState.playedIndexes.map(
            (index) => gameState.letters[index],
          )}
        ></CurrentWord>
      )}
      {gameState.result ? (
        <div id="wordResult" className="fadeOut">
          {gameState.result}
        </div>
      ) : (
        <></>
      )}
      <Board
        letters={gameState.letters}
        playedIndexes={gameState.playedIndexes}
        gameOver={false} // todo
        dispatchGameState={dispatchGameState}
      ></Board>
    </div>
  );
}
