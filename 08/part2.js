const input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const [instructions, networkInput] = input.split("\n\n");
const network = networkInput.split("\n").reduce((acc, line) => {
  const [start, options] = line.split(' = ');
  const [left, right] = options.substring(1, options.length - 1).split(', ');
  acc[start] = { L: left, R: right };
  return acc;
}, {});

const currents = Object.keys(network).filter(key => key.endsWith('A'));

const currentSteps = currents.map(current => {
  let instructionIndex = 0;
  let stepCount = 0;
  while (!current.endsWith('Z')) {
    const instruction = instructions[instructionIndex];
    const currentNode = network[current];
    current = currentNode[instruction];
    instructionIndex = (instructionIndex + 1) % instructions.length;
    ++stepCount;
  }
  return stepCount;
});

const greatestCommonDivisor = (a, b) => {
  if (b === 0) {
    return a;
  }
  return greatestCommonDivisor(b, a % b);
}

const lowestCommonMultiple = (a, b) => {
  return (a * b) / greatestCommonDivisor(a, b);
}

const stepCount = currentSteps.reduce((acc, curr) => lowestCommonMultiple(acc, curr), 1);
console.log(stepCount);
