export type Person =
  | 'Nurit'
  | 'Neta'
  | 'Yotam'
  | 'Ratam'
  | 'Talia'
  | 'Alon'
  | 'Matan'
  | 'Nadav'
  | 'Itamar'
  | 'Nimrod'
  | 'Naama'
  | 'Rotem'
  | 'Roni'
  | 'Elor'
  | 'Erez'
  | 'Liron'
  | 'Guy'
  | 'Yonatan'
  | 'Dorit';

export const positives: Person[] = [
  'Guy',
  'Rotem',
  'Yotam',
  'Nimrod',
  'Erez',
  'Roni',
  'Yonatan',
];

export const positivesRoundTwo: Person[] = [...positives, 'Liron'];

export const guesses: Record<string, Person[]> = {
  Nurit: [
    'Elor',
    'Guy',
    'Rotem',
    'Yotam',
    'Liron',
    'Nimrod',
    'Erez',
    'Roni',
    'Naama',
    'Dorit',
    'Yonatan',
  ],
  Neta: [
    'Elor',
    'Yotam',
    'Rotem',
    'Guy',
    'Liron',
    'Erez',
    'Nimrod',
    'Roni',
    'Dorit',
    'Naama',
    'Yonatan',
  ],
  Yotam: [
    'Elor',
    'Roni',
    'Guy',
    'Erez',
    'Nimrod',
    'Liron',
    'Naama',
    'Rotem',
    'Dorit',
    'Yonatan',
    'Yotam',
  ],
  Ratam: [
    'Rotem',
    'Guy',
    'Roni',
    'Yotam',
    'Liron',
    'Naama',
    'Erez',
    'Nimrod',
    'Elor',
    'Dorit',
    'Yonatan',
  ],
  Talia: [
    'Guy',
    'Rotem',
    'Erez',
    'Yotam',
    'Roni',
    'Elor',
    'Naama',
    'Liron',
    'Nimrod',
    'Dorit',
    'Yonatan',
  ],
  Alon: [
    'Yotam',
    'Elor',
    'Guy',
    'Rotem',
    'Roni',
    'Liron',
    'Erez',
    'Nimrod',
    'Naama',
    'Dorit',
    'Yonatan',
  ],
  Matan: [
    'Yotam',
    'Rotem',
    'Guy',
    'Nimrod',
    'Elor',
    'Liron',
    'Naama',
    'Erez',
    'Roni',
    'Yonatan',
    'Dorit',
  ],
  Nadav: [
    'Rotem',
    'Elor',
    'Erez',
    'Roni',
    'Guy',
    'Naama',
    'Yotam',
    'Liron',
    'Nimrod',
    'Yonatan',
    'Dorit',
  ],
  Itamar: [
    'Guy',
    'Rotem',
    'Yotam',
    'Liron',
    'Elor',
    'Nimrod',
    'Dorit',
    'Yonatan',
    'Naama',
    'Erez',
    'Roni',
  ],
  Nimrod: [
    'Elor',
    'Rotem',
    'Yotam',
    'Guy',
    'Liron',
    'Roni',
    'Erez',
    'Naama',
    'Nimrod',
    'Dorit',
    'Yonatan',
  ],
  Naama: [
    'Yotam',
    'Liron',
    'Elor',
    'Rotem',
    'Erez',
    'Nimrod',
    'Guy',
    'Yonatan',
    'Dorit',
    'Roni',
    'Naama',
  ],
  Rotem: [
    'Elor',
    'Guy',
    'Rotem',
    'Roni',
    'Erez',
    'Yotam',
    'Liron',
    'Nimrod',
    'Naama',
    'Dorit',
    'Yonatan',
  ],
  Roni: [
    'Elor',
    'Roni',
    'Yotam',
    'Liron',
    'Nimrod',
    'Rotem',
    'Guy',
    'Erez',
    'Naama',
    'Dorit',
    'Yonatan',
  ],
  Elor: [
    'Elor',
    'Roni',
    'Liron',
    'Yotam',
    'Rotem',
    'Erez',
    'Nimrod',
    'Guy',
    'Naama',
    'Yonatan',
    'Dorit',
  ],
  Erez: [
    'Elor',
    'Yotam',
    'Liron',
    'Guy',
    'Rotem',
    'Roni',
    'Erez',
    'Nimrod',
    'Naama',
    'Dorit',
    'Yonatan',
  ],
  Liron: [
    'Guy',
    'Elor',
    'Rotem',
    'Nimrod',
    'Roni',
    'Erez',
    'Yotam',
    'Liron',
    'Naama',
    'Yonatan',
    'Dorit',
  ],
  Guy: [
    'Guy',
    'Rotem',
    'Elor',
    'Yotam',
    'Liron',
    'Erez',
    'Nimrod',
    'Roni',
    'Naama',
    'Dorit',
    'Yonatan',
  ],
};

export type RGB = [number, number, number];

export const LIGHT_GREEN: RGB = [13, 177, 90];
export const LIGHT_BLUE: RGB = [30, 83, 207];

export const DARK_GREEN: RGB = [10, 157, 80];
export const DARK_BLUE: RGB = [27, 73, 187];

const lerp = (start: number, end: number, iteration: number, total: number) =>
  start + ((end - start) * iteration) / (total - 1);

const componentToHex = (c: number) => {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

const rgbToHex = ([r, g, b]: RGB) =>
  '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);

export const getColors = (amount: number, start: RGB, end: RGB) => {
  const colors: string[] = [];

  for (let i = 0; i < amount; i++) {
    const r = Math.floor(lerp(start[0], end[0], i, amount));
    const g = Math.floor(lerp(start[1], end[1], i, amount));
    const b = Math.floor(lerp(start[2], end[2], i, amount));

    colors.push(rgbToHex([r, g, b]));
  }

  return colors;
};

const positivesDict: Record<number, Person[]> = {
  1: positives,
  2: positivesRoundTwo,
};

export const getPositives = (round: number) => positivesDict[round];

export const isPositive = (round: 1 | 2, person: Person) =>
  getPositives(round).includes(person);

const getScore = (index: number) => 12 - index;

const weightedScoresDict: Record<number, number> = {
  0: 25,
  1: 16,
  2: 12,
  3: 8,
  4: 6,
  5: 5,
  6: 4,
  7: 3,
  8: 2,
  9: 1,
  10: 0,
};

const getWeightedScore = (index: number) => weightedScoresDict[index];

export const getResults = (
  round = 1,
  weighted = false
): [Person[], number[]] => {
  const tempResults: [Person, number][] = [];

  Object.keys(guesses).forEach(person => {
    let score = 0;
    guesses[person].forEach((currGuess, index) => {
      if (positivesDict[round].includes(currGuess)) {
        if (weighted) {
          score += getWeightedScore(index);
        } else {
          score += getScore(index);
        }
      }
    });

    tempResults.push([person as Person, score]);
  });

  tempResults.sort((a, b) => b[1] - a[1]);

  const people = tempResults.map(a => a[0]);
  const results = tempResults.map(a => a[1]);

  return [people, results];
};

const nameDict: Record<Person, string> = {
  Nurit: 'נורית',
  Neta: 'נטע',
  Yotam: 'יותם',
  Ratam: 'רתם זהר',
  Talia: 'טליה',
  Alon: 'אלון',
  Matan: 'מתן',
  Nadav: 'נדב',
  Itamar: 'איתמר',
  Nimrod: 'נמרוד',
  Naama: 'נעמה',
  Rotem: 'רותם צבי',
  Roni: 'רוני',
  Elor: 'אלאור',
  Erez: 'ארז',
  Liron: 'לירון',
  Guy: 'גיא',
  Dorit: 'דורית',
  Yonatan: 'יונתן',
};

const reverseNameDict = Object.keys(nameDict).reduce(
  (all, curr) => ({
    ...all,
    [(nameDict as any)[curr]]: curr,
  }),
  {} as Record<Person, string>
);

export const peopleTranslator = (name: Person) =>
  nameDict[name] || reverseNameDict[name] || name;

const maxScoreDict = {
  normal: {
    1: 63,
    2: 68,
  },

  weighted: {
    1: 76,
    2: 79,
  },
};

export const getMaxScore = (round: 1 | 2, weighted = false) => {
  if (weighted) return maxScoreDict.weighted[round];
  return maxScoreDict.normal[round];
};
