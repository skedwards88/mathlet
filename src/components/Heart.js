import React from "react";
import Share from "./Share";
import packageJson from "../../package.json";

export default function Heart({setDisplay}) {
  const feedbackLink =
    "https://github.com/skedwards88/mathlet/issues/new/choose";

  return (
    <div className="App info">
      <div className="infoText">
        {"Like this game? Share it with your friends.\n\n"}
        {<Share text={"Check out this math puzzle!"}></Share>}
        {`\n\n`}
        {<hr></hr>}
        {`\n`}
        {`Want more games? Check out `}
        <a href="https://lexlet.com">Lexlet</a>
        {", the word version of Mathlet, or see all of our puzzle-y games "}
        <a href="https://skedwards88.github.io/">here</a>
        {`. `}
        {`\n\n`}
        {<hr></hr>}
        {`\n`}
        {"Feedback? "}
        <a href={feedbackLink}>Open an issue</a>
        {` on GitHub or email SECTgames@gmail.com.`}
        {`\n\n`}
        {<hr></hr>}
        {`\n`}
        <a href="./privacy.html">Privacy policy</a>
      </div>
      <button className="close" onClick={() => setDisplay("game")}>
        CLOSE
      </button>
      <small id="rulesVersion">version {packageJson.version}</small>
    </div>
  );
}
