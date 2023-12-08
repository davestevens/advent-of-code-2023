const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const [instructions, networkInput] = input.split("\n\n");
const network = networkInput.split("\n").reduce((acc, line) => {
  const [start, options] = line.split(' = ');
  const [left, right] = options.substring(1, options.length - 1).split(', ');
  acc[start] = { L: left, R: right };
  return acc;
}, {});

let current = 'AAA';
let instructionIndex = 0;
let stepCount = 0;
while (current !== 'ZZZ') {
  const instruction = instructions[instructionIndex];
  const currentNode = network[current];
  current = currentNode[instruction];
  instructionIndex = (instructionIndex + 1) % instructions.length;
  ++stepCount;
}

console.log(stepCount);
