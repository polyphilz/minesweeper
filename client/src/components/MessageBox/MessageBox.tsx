import React from "react";

import { GameState } from "../../state";

import "./MessageBox.css";

interface MessageBoxProps {
  elapsedSeconds: number;
  gameState: GameState;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  elapsedSeconds,
  gameState,
}) => {
  return (
    <div className="message-box">{getMessage(elapsedSeconds, gameState)}</div>
  );
};

function getMessage(elapsedSeconds: number, gameState: GameState) {
  if (gameState === GameState.WON) {
    return `Congratulations! You won. Time: ${elapsedSeconds} seconds`;
  }
  if (gameState === GameState.LOST) {
    return "Game over.";
  }
}

export default MessageBox;
