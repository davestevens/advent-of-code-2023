const input = `Time:      7  15   30
Distance:  9  40  200`;

const lines = input.split("\n");
const times = [parseInt(lines[0].split(':')[1].trim().replace(/\s/g, ''))];
const distances = [parseInt(lines[1].split(':')[1].trim().replace(/\s/g, ''))];

const beatCounts = [];
for (let i = 0; i < times.length; ++i) {
  const time = times[i];
  const distance = distances[i];

  let count = 0;
  for (let j = 0; j < time; ++j) {
    const potentialDistance = j * (time - j);
    if (potentialDistance > distance) {
      ++count;
    }
  }
  beatCounts.push(count);
}

console.log(beatCounts.reduce((acc, count) => acc * count, 1));
