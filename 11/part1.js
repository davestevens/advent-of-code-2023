const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const grid = input.split("\n").map(line => {
  return line.split('');
});

const GALAXY = '#';

// find empty rows/columns
const emptyRows = [];
for (let i = 0; i < grid.length; ++i) {
  const row = grid[i];
  if (row.every(cell => cell != GALAXY)) {
    emptyRows.push(i);
  }
}

const emptyCols = [];
for (let i = 0; i < grid[0].length; ++i) {
  const col = grid.map(row => row[i]);
  if (col.every(cell => cell != GALAXY)) {
    emptyCols.push(i);
  }
}

// find all galaxies
const galaxies = [];
grid.forEach((row, rowIndex) => {
  row.forEach((cell, colIndex) => {
    if (cell === GALAXY) {
      galaxies.push({ rowIndex, colIndex });
    }
  });
});

const calculateDistance = (from, to) => {
  const [minRow, maxRow] = [from.rowIndex, to.rowIndex].sort((a, b) => a - b);
  const [minCol, maxCol] = [from.colIndex, to.colIndex].sort((a, b) => a - b);
  const distance = (maxRow - minRow) + (maxCol - minCol);
  const emptyRowCount = emptyRows.filter(emptyRow => emptyRow > minRow && emptyRow < maxRow).length;
  const emptyColCount = emptyCols.filter(emptyCol => emptyCol > minCol && emptyCol < maxCol).length;
  return distance + emptyRowCount + emptyColCount;
};

// calculate all distance pairs
let distance = 0;
for (let i = 0; i < galaxies.length; ++i) {
  for (let j = i + 1; j < galaxies.length; ++j) {
    distance += calculateDistance(galaxies[i], galaxies[j]);
  }
}
console.log(distance);
