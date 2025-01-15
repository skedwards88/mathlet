import React from "react";

export default function WhatsNew({setDisplay, setSawWhatsNew}) {
  return (
    <div className="App whatsNew">
      <h1 id="whatsNewHeader">{"What's New"}</h1>
      <p id="whatsNewText">TODO</p>
      <button
        id="whatsNewClose"
        className="close"
        onClick={() => {
          setSawWhatsNew(true);
          setDisplay("game");
        }}
      >
        {"Close"}
      </button>
    </div>
  );
}
