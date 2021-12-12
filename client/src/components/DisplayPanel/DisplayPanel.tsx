import React from "react";
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
  return (
    <div className="display-panel">
      <div className="flag-number-display">{numFlagsRemaining}</div>
      <button
        onClick={() => gameStateSetterCallback(GameState.NOT_STARTED)}
        className="game-reset-button"
      >
        Restart game
      </button>
      <div className="timer">{elapsedSeconds}</div>
    </div>
  );
};

export default DisplayPanel;
