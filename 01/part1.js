const input =`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const lines = input.split("\n");

const findNumber = (chars) => {
  for (let i = 0; i < chars.length; ++i) {
    const char = chars[i];
    const value = parseInt(char);
    if (!isNaN(value)) {
      return value;
    }
  }
}

const value = lines.reduce((acc, line) => {
  const chars = line.split('');
  const lineValue = `${findNumber(chars)}${findNumber(chars.reverse())}`;
  return acc + parseInt(lineValue);
}, 0);

console.log(value);
