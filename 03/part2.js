const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const spacer = '.';
const gear = '*';

const numbers = [];
const symbols = [];

const lines = input.split("\n");
for (let y = 0; y < lines.length; ++y) {
  const line = lines[y];
  const chars = line.split('');
  let number = '';
  for (let x = 0; x < chars.length; ++x) {
    const char = chars[x];
    if (digits.indexOf(char) > -1) {
      number += char;
    } else {
      if (number !== '') {
        numbers.push({ number: parseInt(number), x1: x - number.length, x2: x, y });
        number = '';
      }

      if (char !== spacer) {
        symbols.push({ symbol: char, x, y })
      } 
    }
  }

  if (number !== '') {
    const x = chars.length - 1;
    numbers.push({ number: parseInt(number), x1: x - number.length, x2: x, y });
  }
}

const gears = symbols
.filter((symbol) => symbol.symbol === gear)
.map((symbol) => {
  return numbers.filter((number) => {
    const yHit = Math.abs(symbol.y - number.y) <= 1;
    const xHit = symbol.x >= number.x1 - 1 && symbol.x < number.x2 + 1;
    return yHit && xHit;
  });
})
.filter((surrounding) => surrounding.length >= 2);

console.log(gears.reduce((acc, gear) => acc + (gear[0].number * gear[1].number), 0));
