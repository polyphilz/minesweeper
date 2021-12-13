import React, { useState } from "react";
import { GameState } from "../../state";

import "./DisplayPanel.css";

interface DisplayPanelProps {
  numFlagsRemaining: number;
  elapsedSeconds: number;
  gameStateSetterCallback: (gameState: GameState) => void;
}

const DisplayPanel: React.FC<DisplayPanelProps> = ({
  numFlagsRemaining,
  elapsedSeconds,
  gameStateSetterCallback,
}) => {
  const [restartGameEmoji, setRestartGameEmoji] = useState("🥀");

  return (
    <div className="display-panel">
      <div className="display-panel-box">
        <span>{numFlagsRemaining}</span>
      </div>
      <div
        onClick={() => gameStateSetterCallback(GameState.NOT_STARTED)}
        onMouseDown={() => setRestartGameEmoji("😈")}
        onMouseUp={() => setRestartGameEmoji("🥀")}
        className="display-panel-box square"
      >
        <span>{restartGameEmoji}</span>
      </div>
      <div className="display-panel-box">
        <span>{createElapsedSecondsString(elapsedSeconds)}</span>
      </div>
    </div>
  );
};

function createElapsedSecondsString(elapsedSeconds: number) {
  if (elapsedSeconds < 10) return `00${elapsedSeconds}`;
  if (elapsedSeconds < 100) return `0${elapsedSeconds}`;
  return elapsedSeconds;
}

export default DisplayPanel;
