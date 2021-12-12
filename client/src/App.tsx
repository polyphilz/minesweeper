import React from "react";

import Board from "./components/board/Board";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Board height={16} width={30} numMines={99} />
    </div>
  );
};

export default App;
