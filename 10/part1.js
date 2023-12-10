const input = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

// [N, E, S, W]
const PIPE_CONNECTIONS = {
  '|': [true, false, true, false],
  '-': [false, true, false, true],
  'L': [true, true, false, false],
  'J': [true, false, false, true],
  '7': [false, false, true, true],
  'F': [false, true, true, false],
};
const GROUND = '.';
const START = 'S';

const startPosition = { x: -1, y: -1 };

const grid = input.split("\n").map((line, y) => {
  return line.split('').map((char, x) => {
    const isStart = char === START;
    const isGround = char === GROUND;
    if (isStart) {
      startPosition.x = x;
      startPosition.y = y;
    }
    return { x, y, char, isStart, isGround, distance: -1 };
  });
});

const findSurrounding = (x, y) => {
  return [
    [x, y - 1, 2], // above
    [x + 1, y, 3], // right
    [x, y + 1, 0], // below
    [x - 1, y, 1], // left
  ].map(([surroundX, surroundY, connectionPosition]) => {
    const tile = grid[surroundY]?.[surroundX];
    if (!tile || tile.isGround || tile.isStart) {
      return;
    }
    const surround = PIPE_CONNECTIONS[tile.char];
    if (!surround[connectionPosition]) {
      return;
    }
    return tile;
  }).filter(value => !!value);
};

const run = (x, y) => {
  const toInvestigate = [{ tile: grid[y][x], step: 1 }];
  grid[y][x].distance = 0;
  let midPositionTile = null;

  do {
    const current = toInvestigate.shift();
    const surrounding = findSurrounding(current.tile.x, current.tile.y);
    surrounding.forEach(surround => {
      if (surround.distance === -1) {
        surround.distance = current.step;
        toInvestigate.push({ tile: surround, step: current.step + 1 });
      } else if (surround.distance == current.step) {
        midPositionTile = surround;
      }
    });
  } while (toInvestigate.length);

  return midPositionTile.distance;
};

console.log(run(startPosition.x, startPosition.y));
