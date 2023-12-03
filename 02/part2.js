const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const data = input.split("\n").map((line) => {
  const [game, subsets] = line.split(': ');
  const sets = subsets.split('; ');
  const picks = sets.map((set) => {
    const pickInfo = {};
    const cubeInfos = set.split(', ');
    cubeInfos.forEach((cubeInfo) => {
      const [count, color] = cubeInfo.split(' ');
      pickInfo[color] = parseInt(count);
    });
    return pickInfo;
  });
  return {
    id: parseInt(game.substring(5)),
    picks,
  };
});


const findPossible = (redCount, greenCount, blueCount, data) => {
  return data.filter((datum) => {
    return datum.picks.every((v) => (v.red || 0) <= redCount && (v.green || 0) <= greenCount && (v.blue || 0) <= blueCount)
  });
};

const findMinimum = (data) => {
  return data.map((datum) => {
    const red = Math.max(...datum.picks.map((v) => v.red).filter((v) => !!v));
    const green = Math.max(...datum.picks.map((v) => v.green).filter((v) => !!v));
    const blue = Math.max(...datum.picks.map((v) => v.blue).filter((v) => !!v));
    return { red, green, blue };
  });
};

const minimums = findMinimum(data);
console.log(minimums.reduce((acc, m) => acc + (m.red * m.green * m.blue), 0));
