const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const data = input.split("\n").map(line => {
  return line.split(' ').map(v => parseInt(v));
});

const extrapolate = (numbers, oldValues) => {
  if (numbers.every(value => value == 0)) {
    let value = 0;
    for (let i = oldValues.length - 1; i >= 0; --i) {
      value = oldValues[i][0] - value;
    }
    return value;
  }

  const newValues = [];
  for (let i = 0; i < numbers.length - 1; ++i) {
    newValues.push(numbers[i + 1] - numbers[i]);
  }
  return extrapolate(newValues, oldValues.concat([numbers]));
};

console.log(data.reduce((acc, datum) => acc + extrapolate(datum, []), 0));
