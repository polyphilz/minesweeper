import React from "react";

import "./Tile.css";

export interface TileProps {
  x: number;
  y: number;
  hasMine: boolean;
  numAdjMines: number;
}

const Tile: React.FC<TileProps> = ({ x, y, hasMine, numAdjMines }) => {
  console.log(x, y, hasMine, numAdjMines);
  return (
    <div className={`tile ${hasMine ? "mine" : ""}`}>
      {!hasMine ? numAdjMines : ""}
    </div>
  );
};

export default Tile;
