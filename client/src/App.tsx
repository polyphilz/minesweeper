import React, { useState, useEffect } from "react";

import Board from "./components/board/Board";
import DisplayPanel from "./components/DisplayPanel/DisplayPanel";
import MessageBox from "./components/MessageBox/MessageBox";
import { GameState } from "./state";

import "./App.css";

const HEIGHT = 16;
const WIDTH = 30;
const NUM_MINES = 9;

const App = () => {
  const [numFlagsRemaining, setNumFlagsRemaining] = useState(NUM_MINES);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [gameState, setGameState] = useState<GameState>(GameState.NOT_STARTED);

  useEffect(() => {
    if (gameState === GameState.NOT_STARTED) {
      setNumFlagsRemaining(NUM_MINES);
      setElapsedSeconds(0);
    }
    if (gameState === GameState.ACTIVE) {
      setTimeout(() => {
        if (elapsedSeconds > 999) return;
        setElapsedSeconds(elapsedSeconds + 1);
      }, 1000);
    }
  }, [elapsedSeconds, gameState]);

  return (
    <div className="app">
      <DisplayPanel
        numFlagsRemaining={numFlagsRemaining}
        elapsedSeconds={elapsedSeconds}
        gameStateSetterCallback={(newGameState: GameState) =>
          setGameState(newGameState)
        }
      />
      <div className="vertical-spacer"></div>
      <Board
        gameState={gameState}
        height={HEIGHT}
        width={WIDTH}
        numMines={NUM_MINES}
        flagToggleCallback={(flagPlaced: boolean) => {
          if (flagPlaced) {
            setNumFlagsRemaining(numFlagsRemaining - 1);
          } else {
            setNumFlagsRemaining(numFlagsRemaining + 1);
          }
        }}
        gameStateSetterCallback={(newGameState: GameState) =>
          setGameState(newGameState)
        }
      />
      <div className="vertical-spacer"></div>
      <MessageBox elapsedSeconds={elapsedSeconds} gameState={gameState} />
    </div>
  );
};

export default App;
