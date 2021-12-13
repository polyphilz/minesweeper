# Minesweeper

## Todo

- [x] Create board component
- [x] Create tile component
- [x] Figure out how to randomize mine placement at start of game
- [x] Display for number of flags placed
- [x] Display for elapsed seconds
- [x] New game button
- [x] Actual UI design in Figma
- [] Refactor board component code (it's pretty bad)
- [] Prevent placing more than X flags
- [] Implement leaderboard component
- [] Implement Twitter authentication
- [] Implement API
- [] Host on DigitalOcean?
- [] Implement legend for button
- [] Use a truly random API for mine generation

## Notes

- Board details: height 16 tiles, width 30 tiles, 99 minutes
- Mine generation? Naive approach: iterate through 99 and pick random x, y tuple between 0-15 and 0-29 respectively
  - If already has mine, re-pick x, y tuple else put x, y tuple in "used" set and move on to placing next mine
- Main app component composed of:
  - Mine number display (_may_ need its own component; depends how complex it is)
  - New game component (should _not_ need its own component)
  - Timer (_may_ need its own component; depends how complex it is)
  - Board component (is definitely its own component)
- Need 1 main board component comprised of 480 tile components
- Tile component needs to have some props:
  - `hasMine`
  - `numAdjMines`
  - A callback to invoke when the component is either left or right clicked
