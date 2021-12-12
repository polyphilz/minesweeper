import React from "react";

import { Tile, TileProps } from "../tile/Tile";

import "./Board.css";

const Board: React.FC = () => {
  const tilesMatrix: Array<Array<TileProps>> = generateTilePropsMatrix();
  randomlyPlaceMines(tilesMatrix);
  computeAdjacentMines(tilesMatrix);

  return (
    <div className="board">
      {tilesMatrix.map((row, i) => {
        return (
          <div key={i} className="row">
            {row.map((tile, j) => (
              <Tile
                x={tile.x}
                y={tile.y}
                hasMine={tile.hasMine}
                numAdjMines={tile.numAdjMines}
                key={j}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

function generateTilePropsMatrix(): Array<Array<TileProps>> {
  const tilesMatrix: Array<Array<TileProps>> = [];
  for (let i = 0; i < 5; i++) {
    const row: TileProps[] = [];
    for (let j = 0; j < 5; j++) {
      const newTileProps: TileProps = {
        x: i,
        y: j,
        hasMine: false,
        numAdjMines: 0,
      };
      row.push(newTileProps);
    }
    tilesMatrix.push(row);
  }
  return tilesMatrix;
}

function randomlyPlaceMines(tilesMatrix: Array<Array<TileProps>>) {
  const placedMineCoordinates = new Set<string>();
  for (let i = 0; i < 10; i++) {
    let randomX = getRandomInt(5);
    let randomY = getRandomInt(5);
    while (placedMineCoordinates.has(`${randomX}-${randomY}`)) {
      randomX = getRandomInt(5);
      randomY = getRandomInt(5);
    }
    tilesMatrix[randomX][randomY].hasMine = true;
    placedMineCoordinates.add(`${randomX}-${randomY}`);
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function computeAdjacentMines(tilesMatrix: Array<Array<TileProps>>) {
  for (let i = 0; i < tilesMatrix.length; i++) {
    for (let j = 0; j < tilesMatrix[i].length; j++) {
      if (tilesMatrix[i][j].hasMine) continue;

      let numAdjMines = 0;

      // 3 tiles above
      if (i > 0) numAdjMines += tilesMatrix[i - 1][j].hasMine ? 1 : 0;
      if (i > 0 && j > 0)
        numAdjMines += tilesMatrix[i - 1][j - 1].hasMine ? 1 : 0;
      if (i > 0 && j < tilesMatrix[i - 1].length - 1)
        numAdjMines += tilesMatrix[i - 1][j + 1].hasMine ? 1 : 0;

      // 2 tiles on the sides (left and right)
      if (j > 0) numAdjMines += tilesMatrix[i][j - 1].hasMine ? 1 : 0;
      if (j < tilesMatrix[i].length - 1)
        numAdjMines += tilesMatrix[i][j + 1].hasMine ? 1 : 0;

      // 3 tiles below
      if (i < tilesMatrix.length - 1)
        numAdjMines += tilesMatrix[i + 1][j].hasMine ? 1 : 0;
      if (i < tilesMatrix.length - 1 && j > 0)
        numAdjMines += tilesMatrix[i + 1][j - 1].hasMine ? 1 : 0;
      if (i < tilesMatrix.length - 1 && j < tilesMatrix[i + 1].length - 1)
        numAdjMines += tilesMatrix[i + 1][j + 1].hasMine ? 1 : 0;

      tilesMatrix[i][j].numAdjMines = numAdjMines;
    }
  }
}

export default Board;
