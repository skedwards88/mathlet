import React from "react";
import Mathlet from "./Mathlet";
import Heart from "./Heart";
import Rules from "./Rules";
import Stats from "./Stats";
import {gameInit} from "../logic/gameInit";
import {gameReducer} from "../logic/gameReducer";

function handleBeforeInstallPrompt(
  event,
  setInstallPromptEvent,
  setShowInstallButton,
) {
  console.log("handleBeforeInstallPrompt");
  if (event) setInstallPromptEvent(event);
  setShowInstallButton(true);
}

function handleAppInstalled(setInstallPromptEvent, setShowInstallButton) {
  console.log("handleAppInstalled");
  setInstallPromptEvent(null);
  setShowInstallButton(false);
}

export default function App() {
  const [display, setDisplay] = React.useState("game");
  const [installPromptEvent, setInstallPromptEvent] = React.useState();
  const [showInstallButton, setShowInstallButton] = React.useState(true);
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit,
  );

  React.useEffect(() => {
    const listener = (event) =>
      handleBeforeInstallPrompt(
        event,
        setInstallPromptEvent,
        setShowInstallButton,
      );

    window.addEventListener("beforeinstallprompt", listener);
    return () => window.removeEventListener("beforeinstallprompt", listener);
  }, []);

  React.useEffect(() => {
    const listener = () =>
      handleAppInstalled(setInstallPromptEvent, setShowInstallButton);

    window.addEventListener("appinstalled", listener);
    return () => window.removeEventListener("appinstalled", listener);
  }, []);

  const savedIsFirstGame = JSON.parse(
    localStorage.getItem("dailyMathletIsFirstGame"),
  );

  const [isFirstGame, setIsFirstGame] = React.useState(
    savedIsFirstGame ?? true,
  );

  React.useEffect(() => {
    window.localStorage.setItem(
      "dailyMathletIsFirstGame",
      JSON.stringify(isFirstGame),
    );
  }, [isFirstGame]);

  const savedSawWhatsNew = JSON.parse(
    localStorage.getItem("dailyMathletSawWhatsNew20230609"),
  );

  const [sawWhatsNew, setSawWhatsNew] = React.useState(
    savedSawWhatsNew ?? false,
  );

  React.useEffect(() => {
    window.localStorage.setItem(
      "dailyMathletSawWhatsNew20230609",
      JSON.stringify(sawWhatsNew),
    );
  }, [sawWhatsNew]);

  React.useEffect(() => {
    window.localStorage.setItem("dailyMathletState", JSON.stringify(gameState));
  }, [gameState]);

  if (isFirstGame) {
    return (
      <Rules
        setDisplay={setDisplay}
        isFirstGame={isFirstGame}
        setIsFirstGame={setIsFirstGame}
        setSawWhatsNew={setSawWhatsNew}
      ></Rules>
    );
  }

  switch (display) {
    case "rules":
      return <Rules setDisplay={setDisplay}></Rules>;

    case "stats":
      return <Stats setDisplay={setDisplay} stats={gameState.stats}></Stats>;

    case "heart":
      return <Heart setDisplay={setDisplay}></Heart>;

    default:
      return (
        <Mathlet
          setDisplay={setDisplay}
          setInstallPromptEvent={setInstallPromptEvent}
          showInstallButton={showInstallButton}
          installPromptEvent={installPromptEvent}
          solutions={gameState.solutions}
          hintsGiven={gameState.hintsGiven}
          currentHint={gameState.currentHint}
          foundEquations={gameState.foundEquations}
          seed={gameState.seed}
          playedIndexes={gameState.playedIndexes}
          symbols={gameState.symbols}
          dispatchGameState={dispatchGameState}
          setSawWhatsNew={setSawWhatsNew}
          sawWhatsNew={sawWhatsNew}
        ></Mathlet>
      );
  }
}
