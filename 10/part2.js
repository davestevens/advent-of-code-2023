const input = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

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

  return midPositionTile;
};

const findSurroundingByDistance = (x, y, distance) => {
  return [
    [x, y - 1], // above
    [x + 1, y], // right
    [x, y + 1], // below
    [x - 1, y], // left
  ].map(([surroundX, surroundY]) => {
    const tile = grid[surroundY]?.[surroundX];
    if (!tile || tile.distance !== distance) {
      return;
    }
    return tile;
  }).filter(value => !!value);
};

const markUpGrid = (midPositionTile) => {
  midPositionTile.isOnPath = true;

  const toInvestigate = [midPositionTile];

  do {
    const current = toInvestigate.shift();
    const surrounding = findSurroundingByDistance(current.x, current.y, current.distance - 1);
    surrounding.forEach(surround => {
      if (surround.isOnPath) {
        return;
      }
      surround.isOnPath = true;
      if (surround.isStart) {
        return;
      }
      toInvestigate.push(surround);
    });
  } while (toInvestigate.length);
};

const isValid = (tile) => {
  const connections = PIPE_CONNECTIONS[tile.char];
  return [
    [tile.x, tile.y - 1, 2], // above
    [tile.x + 1, tile.y, 3], // right
    [tile.x, tile.y + 1, 0], // below
    [tile.x - 1, tile.y, 1], // left
  ]
    .filter((_, index) => connections[index])
    .every(([surroundX, surroundY, connectionPosition]) => {
      const other = grid[surroundY]?.[surroundX];
      if (!other) {
        return false;
      }
      const otherConnections = PIPE_CONNECTIONS[other.char];
      if (otherConnections && !otherConnections[connectionPosition]) {
        return false;
      }
      return true;
    });
};

const cleanUpOrphans = () => {
  grid.forEach(row => {
    row.forEach(tile => {
      if (!tile.isOnPath || tile.isStart) {
        return;
      }
  
      if (!isValid(tile)) {
        tile.isOnPath = false;
      }
    });
  });
};

const setStartTileType = () => {
  const tile = grid[startPosition.y][startPosition.x];
  const connections = [
    [tile.x, tile.y - 1, 2], // above
    [tile.x + 1, tile.y, 3], // right
    [tile.x, tile.y + 1, 0], // below
    [tile.x - 1, tile.y, 1], // left
  ].map(([surroundX, surroundY, connectionPosition]) => {
    const other = grid[surroundY]?.[surroundX];
    if (!other || other.char === GROUND) {
      return false;
    }
    return PIPE_CONNECTIONS[other.char][connectionPosition];
  });

  const [key, _] = Object.entries(PIPE_CONNECTIONS).find(([_, value]) => {
    return JSON.stringify(value) == JSON.stringify(connections);
  });
  tile.char = key;
  tile.isStart = false;
};

///
const midPositionTile = run(startPosition.x, startPosition.y);
markUpGrid(midPositionTile);
cleanUpOrphans();
setStartTileType();

let insideCount = 0;
grid.forEach(row => {
  let isInside = false;
  row.forEach(tile => {
    if (tile.isOnPath) {
      if (!(tile.char === '-' || tile.char === 'L' || tile.char === 'J')) {
        isInside = !isInside;
      }
    }
    if (!tile.isOnPath && isInside) {
      tile.isInside = true;
      ++insideCount;
    }
  });
});
console.log(insideCount);


