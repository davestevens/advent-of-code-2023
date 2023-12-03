const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const replacementsLookup = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
};
const replacements = {};
const replacementWords = Object.keys(replacementsLookup);
const reverseReplacementWords = [];
const reverse = (input) => input.split('').reverse().join('');
Object.entries(replacementsLookup).forEach(([key, value]) => {
  replacements[key] = value;
  const reverseKey = reverse(key);
  replacements[reverseKey] = value;
  reverseReplacementWords.push(reverseKey);
});

const lines = input.split("\n");

const findNumber = (line, currentReplacements) => {
  for (let i = 0; i < line.length; ++i) {
    const char = line[i];
    const value = parseInt(char);
    if (!isNaN(value)) {
      return value;
    }

    const s = line.substring(i);
    for (let j = 0; j < currentReplacements.length; ++j) {
      if (s.search(currentReplacements[j]) == 0) {
        return replacements[currentReplacements[j]];
      }
    }
  }
}

const value = lines.reduce((acc, line) => {
  const firstNumber = findNumber(line, replacementWords);
  const lastNumber = findNumber(reverse(line), reverseReplacementWords);
  return acc + parseInt(`${firstNumber}${lastNumber}`);
}, 0);

console.log(value);
