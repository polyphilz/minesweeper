import React, { useState } from "react";
import _ from "lodash";

import Tile, { TileProps } from "../tile/Tile";

import "./Board.css";

interface BoardProps {
  height: number;
  width: number;
  numMines: number;
}

const Board: React.FC<BoardProps> = ({ height, width, numMines }) => {
  const [tilesMatrix, setTilesMatrix] = useState(
    generateTilePropsMatrix(height, width, numMines)
  );

  function endGame() {
    console.log("Game over.");
  }

  function generateTilePropsMatrix(
    height: number,
    width: number,
    numMines: number
  ): Array<Array<TileProps>> {
    const tilesMatrix: Array<Array<TileProps>> = generateEmptyTilesMatrix(
      height,
      width
    );
    randomlyPlaceMines(tilesMatrix, height, width, numMines);
    computeAdjacentMines(tilesMatrix);

    return tilesMatrix;
  }

  function generateEmptyTilesMatrix(height: number, width: number) {
    const tilesMatrix: Array<Array<TileProps>> = [];
    for (let i = 0; i < height; i++) {
      const row: TileProps[] = [];
      for (let j = 0; j < width; j++) {
        const newTileProps: TileProps = {
          x: i,
          y: j,
          isDisabled: false,
          isOpen: false,
          isFlagged: false,
          incorrectlyFlagged: false,
          hasMine: false,
          mineTripped: false,
          numAdjMines: 0,
        };
        row.push(newTileProps);
      }
      tilesMatrix.push(row);
    }
    return tilesMatrix;
  }

  function handleLeftClick(x: number, y: number) {
    // Ignore click if the tile is already open or has been flagged.
    if (tilesMatrix[x][y].isOpen || tilesMatrix[x][y].isFlagged) return;

    /**
     * End the game if the tile has a mine under it:
     * - Disable left, middle and right clicks on all tiles
     * - Highlight background of clicked mine tile to be red
     * - Show all mines that are still hidden
     * - Don't change display of mines that have been flagged
     * - If a mine has been flagged incorrectly, do display that (black flag?)
     */
    if (tilesMatrix[x][y].hasMine) {
      const tilesMatrixCopy = _.cloneDeep(tilesMatrix);
      for (const row of tilesMatrixCopy) {
        for (const tile of row) {
          tile.isDisabled = true;
          if (!tile.isFlagged && tile.hasMine) tile.isOpen = true;
          if (tile.isFlagged && !tile.hasMine) tile.incorrectlyFlagged = true;
        }
      }
      tilesMatrixCopy[x][y].mineTripped = true;
      setTilesMatrix(tilesMatrixCopy);
      endGame();
      return;
    }

    /**
     * Open the tile's neighbors (and those neighbors too) if the tile/neighbors have no adjacent mines.
     */
    if (tilesMatrix[x][y].numAdjMines === 0) {
      const tilesMatrixCopy = _.cloneDeep(tilesMatrix);
      openTiles(x, y, tilesMatrixCopy);
      setTilesMatrix(tilesMatrixCopy);
      return;
    }

    const tilesMatrixCopy = _.cloneDeep(tilesMatrix);
    tilesMatrixCopy[x][y].isOpen = true;
    setTilesMatrix(tilesMatrixCopy);
  }

  /**
   * Recursively opens the neighboring tiles of tiles that have no adjacent mines.
   */
  function openTiles(
    x: number,
    y: number,
    tilesMatrix: Array<Array<TileProps>>
  ) {
    tilesMatrix[x][y].isOpen = true;
    if (tilesMatrix[x][y].numAdjMines !== 0) return;
    for (const [nbrX, nbrY] of [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
    ]) {
      if (
        nbrX >= 0 &&
        nbrX < tilesMatrix.length &&
        nbrY >= 0 &&
        nbrY < tilesMatrix[0].length &&
        !tilesMatrix[nbrX][nbrY].isOpen
      ) {
        openTiles(nbrX, nbrY, tilesMatrix);
      }
    }
  }

  function handleMiddleClick(x: number, y: number) {
    console.log(`Middle click on tile: ${x}, ${y}`);
  }

  function handleRightClick(x: number, y: number) {
    console.log(`Right click on tile: ${x}, ${y}`);

    // Ignore right clicks on opened tiles
    if (tilesMatrix[x][y].isOpen) return;

    const tilesMatrixCopy = _.cloneDeep(tilesMatrix);
    tilesMatrixCopy[x][y].isFlagged = !tilesMatrix[x][y].isFlagged;
    setTilesMatrix(tilesMatrixCopy);
  }

  function randomlyPlaceMines(
    tilesMatrix: Array<Array<TileProps>>,
    height: number,
    width: number,
    numMines: number
  ) {
    const placedMineCoordinates = new Set<string>();
    for (let i = 0; i < numMines; i++) {
      let randomX = getRandomInt(height);
      let randomY = getRandomInt(width);
      while (placedMineCoordinates.has(`${randomX}-${randomY}`)) {
        randomX = getRandomInt(height);
        randomY = getRandomInt(width);
      }
      tilesMatrix[randomX][randomY].hasMine = true;
      placedMineCoordinates.add(`${randomX}-${randomY}`);
    }
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

  return (
    <div className="board">
      {tilesMatrix.map((row, i) => {
        return (
          <div key={i} className="row">
            {row.map((tile, j) => (
              <Tile
                x={tile.x}
                y={tile.y}
                isDisabled={tile.isDisabled}
                isOpen={tile.isOpen}
                isFlagged={tile.isFlagged}
                incorrectlyFlagged={tile.incorrectlyFlagged}
                hasMine={tile.hasMine}
                mineTripped={tile.mineTripped}
                numAdjMines={tile.numAdjMines}
                leftClickCallback={(x: number, y: number) =>
                  handleLeftClick(x, y)
                }
                middleClickCallback={(x: number, y: number) =>
                  handleMiddleClick(x, y)
                }
                rightClickCallback={(x: number, y: number) =>
                  handleRightClick(x, y)
                }
                key={j}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default Board;
