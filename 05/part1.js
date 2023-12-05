const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const sections = input.split("\n\n");

const seeds = sections[0].split(': ')[1].split(' ').map(v => parseInt(v));
const parse = (input) => {
  const data = input.split("\n").slice(1).map(line => {
    const [destinationStart, sourceStart, rangeLength] = line.split(' ').map(v => parseInt(v));
    return {
      sourceStart,
      rangeLength,
      diff: destinationStart - sourceStart,
    };
  });

  return (value) => {
    for (var i = 0; i < data.length; ++i) {
      var datum = data[i];
      if (value >= datum.sourceStart && value < (datum.sourceStart + datum.rangeLength)) {
        return value + datum.diff;
      }
    }
    return value;
  };
}

const mappings = [
  parse(sections[1]),
  parse(sections[2]),
  parse(sections[3]),
  parse(sections[4]),
  parse(sections[5]),
  parse(sections[6]),
  parse(sections[7]),
];

const locations = seeds.map(seed => {
  let current = seed;
  mappings.forEach(mapping => {
    current = mapping(current);
  });
  return current;
});

console.log(Math.min(...locations));
