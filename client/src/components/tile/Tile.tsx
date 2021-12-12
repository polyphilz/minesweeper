import React from "react";

import "./Tile.css";

export interface TileProps {
  x: number;
  y: number;
  isDisabled: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  incorrectlyFlagged: boolean;
  hasMine: boolean;
  mineTripped: boolean;
  numAdjMines: number;
  isHighlighted: boolean;
  leftClickCallback?: (x: number, y: number) => void;
  middleClickDownCallback?: (x: number, y: number) => void;
  middleClickUpCallback?: (x: number, y: number) => void;
  rightClickCallback?: (x: number, y: number) => void;
}

export const Tile: React.FC<TileProps> = ({
  x,
  y,
  isDisabled,
  isOpen,
  isFlagged,
  incorrectlyFlagged,
  hasMine,
  mineTripped,
  numAdjMines,
  isHighlighted,
  leftClickCallback = () => undefined,
  middleClickDownCallback = () => undefined,
  middleClickUpCallback = () => undefined,
  rightClickCallback = () => undefined,
}) => {
  // Handles mouse down for middle button click
  function onMiddleClickDown(event: any) {
    if (event.button === 1) {
      if (isDisabled) return;
      middleClickDownCallback(x, y);
    }
  }

  // Handles mouse up for middle button click
  function onMiddleClickUp(event: any) {
    if (event.button === 1) {
      if (isDisabled) return;
      middleClickUpCallback(x, y);
    }
  }

  // Handles right click
  function onRightClick(event: any) {
    event.preventDefault();
    if (isDisabled) return;

    rightClickCallback(x, y);
  }

  return (
    <div
      onClick={() => {
        if (isDisabled) return;
        leftClickCallback(x, y);
      }}
      onContextMenu={onRightClick.bind(this)}
      // onAuxClick={onMiddleClick.bind(this)}
      onMouseDown={onMiddleClickDown.bind(this)}
      onMouseUp={onMiddleClickUp.bind(this)}
      className={getClasses(isOpen, hasMine, mineTripped, isHighlighted)}
    >
      {handleTileDisplay(
        isFlagged,
        incorrectlyFlagged,
        isOpen,
        hasMine,
        numAdjMines
      )}
    </div>
  );
};

function getClasses(
  isOpen: boolean,
  hasMine: boolean,
  mineTripped: boolean,
  isHighlighted: boolean
) {
  let classNameString = "tile";
  if (isOpen) {
    classNameString += " open";
    if (hasMine) classNameString += " mine";
  } else {
    classNameString += " closed";
  }
  if (isHighlighted) classNameString += " highlighted";
  if (mineTripped) classNameString += " mine-tripped";
  return classNameString;
}

function handleTileDisplay(
  isFlagged: boolean,
  incorrectlyFlagged: boolean,
  isOpen: boolean,
  hasMine: boolean,
  numAdjMines: number
) {
  if (isFlagged && !incorrectlyFlagged) return "🏳";
  if (isFlagged && incorrectlyFlagged) return "🏴";
  if (isOpen && hasMine) return "💣";
  if (isOpen && !!numAdjMines) return numAdjMines;
  if (isOpen && numAdjMines === 0) return "";
  return "";
}

export default Tile;
