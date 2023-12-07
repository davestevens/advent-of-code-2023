const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const data = input.split("\n").reduce((acc, line) => {
  const [cards, bid] = line.split(' ');
  acc[cards] = parseInt(bid);
  return acc;
}, {});

const CARD_ORDER = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};
const HAND_ORDER = {
  FiveOfAKind: 7,
  FourOfAKind: 6,
  FullHouse: 5,
  ThreeOfAKind: 4,
  TwoPair: 3,
  OnePair: 2,
  HighCard: 1,
};
const getHandType = (cardCounts) => {
  const counts = Object.values(cardCounts);

  if (counts.indexOf(5) > -1) {
    return 'FiveOfAKind';
  } if (counts.indexOf(4) > -1) {
    return 'FourOfAKind';
  } if (counts.indexOf(3) > -1) {
    if (counts.indexOf(2) > -1) {
      return 'FullHouse';
    }
    return 'ThreeOfAKind';
  } if (counts.indexOf(2) > -1) {
    if (counts.filter(count => count == 2).length > 1) {
      return 'TwoPair';
    }
    return 'OnePair';
  } else {
    return 'HighCard';
  }
};

const getHandScore = (hand) => {
  const cardCounts = hand.reduce((acc, card) => {
    acc[card] = (acc[card] || 0) + 1;
    return acc;
  }, {});
  const handType = getHandType(cardCounts);
  return HAND_ORDER[handType];
};

const hands = Object.keys(data).map(datum => datum.split(''));

const sortedHands = hands.sort((a, b) => {
  const diff = getHandScore(a) - getHandScore(b);
  if (diff != 0) {
    return diff;
  }
  for (var i = 0; i < a.length; ++i) {
    const cardDiff = CARD_ORDER[a[i]] - CARD_ORDER[b[i]];
    if (cardDiff != 0) {
      return cardDiff;
    }
  }
  return 0;
});

// console.log(sortedHands);

const winnings = sortedHands.reduce((acc, hand, index) => {
  const cards = hand.join('');
  return acc + (data[cards] * (index + 1));
}, 0);

console.log(winnings);
