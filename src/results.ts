export enum Name {
  ELOR,
  GUY,
  ROTEM,
  YOTAM,
  LIRON,
  NIMROD,
  EREZ,
  RONI,
  NAAMA,
  DORIT,
  YONATAN,
}

export const positives = [
  Name.GUY,
  Name.ROTEM,
  Name.YOTAM,
  Name.NIMROD,
  Name.EREZ,
  Name.RONI,
  Name.YONATAN,
];

const guesses: Record<string, number[]> = {
  Nurit: [
    Name.ELOR,
    Name.GUY,
    Name.ROTEM,
    Name.YOTAM,
    Name.LIRON,
    Name.NIMROD,
    Name.EREZ,
    Name.RONI,
    Name.NAAMA,
    Name.DORIT,
    Name.YONATAN,
  ],
  Neta: [
    Name.ELOR,
    Name.YOTAM,
    Name.ROTEM,
    Name.GUY,
    Name.LIRON,
    Name.EREZ,
    Name.NIMROD,
    Name.RONI,
    Name.DORIT,
    Name.NAAMA,
    Name.YONATAN,
  ],
  Yotam: [
    Name.ELOR,
    Name.RONI,
    Name.GUY,
    Name.EREZ,
    Name.NIMROD,
    Name.LIRON,
    Name.NAAMA,
    Name.ROTEM,
    Name.DORIT,
    Name.YONATAN,
    Name.YOTAM,
  ],
  Ratam: [
    Name.ROTEM,
    Name.GUY,
    Name.RONI,
    Name.YOTAM,
    Name.LIRON,
    Name.NAAMA,
    Name.EREZ,
    Name.NIMROD,
    Name.ELOR,
    Name.DORIT,
    Name.YONATAN,
  ],
  Talia: [
    Name.GUY,
    Name.ROTEM,
    Name.EREZ,
    Name.YOTAM,
    Name.RONI,
    Name.ELOR,
    Name.NAAMA,
    Name.LIRON,
    Name.NIMROD,
    Name.DORIT,
    Name.YONATAN,
  ],
  Alon: [
    Name.YOTAM,
    Name.ELOR,
    Name.GUY,
    Name.ROTEM,
    Name.RONI,
    Name.LIRON,
    Name.EREZ,
    Name.NIMROD,
    Name.NAAMA,
    Name.DORIT,
    Name.YONATAN,
  ],
  Matan: [
    Name.YOTAM,
    Name.ROTEM,
    Name.GUY,
    Name.NIMROD,
    Name.ELOR,
    Name.LIRON,
    Name.NAAMA,
    Name.EREZ,
    Name.RONI,
    Name.YONATAN,
    Name.DORIT,
  ],
  Nadav: [
    Name.ROTEM,
    Name.ELOR,
    Name.EREZ,
    Name.RONI,
    Name.GUY,
    Name.NAAMA,
    Name.YOTAM,
    Name.LIRON,
    Name.NIMROD,
    Name.YONATAN,
    Name.DORIT,
  ],
  Itamar: [
    Name.GUY,
    Name.ROTEM,
    Name.YOTAM,
    Name.LIRON,
    Name.ELOR,
    Name.NIMROD,
    Name.DORIT,
    Name.YONATAN,
    Name.NAAMA,
    Name.EREZ,
    Name.RONI,
  ],
  Nimrod: [
    Name.ELOR,
    Name.ROTEM,
    Name.YOTAM,
    Name.GUY,
    Name.LIRON,
    Name.RONI,
    Name.EREZ,
    Name.NAAMA,
    Name.NIMROD,
    Name.DORIT,
    Name.YONATAN,
  ],
  Naama: [
    Name.YOTAM,
    Name.LIRON,
    Name.ELOR,
    Name.ROTEM,
    Name.EREZ,
    Name.NIMROD,
    Name.GUY,
    Name.YONATAN,
    Name.DORIT,
    Name.RONI,
    Name.NAAMA,
  ],
  Rotem: [
    Name.ELOR,
    Name.GUY,
    Name.ROTEM,
    Name.RONI,
    Name.EREZ,
    Name.YOTAM,
    Name.LIRON,
    Name.NIMROD,
    Name.NAAMA,
    Name.DORIT,
    Name.YONATAN,
  ],
  Roni: [
    Name.ELOR,
    Name.RONI,
    Name.YOTAM,
    Name.LIRON,
    Name.NIMROD,
    Name.ROTEM,
    Name.GUY,
    Name.EREZ,
    Name.NAAMA,
    Name.DORIT,
    Name.YONATAN,
  ],
  Elor: [
    Name.ELOR,
    Name.RONI,
    Name.LIRON,
    Name.YOTAM,
    Name.ROTEM,
    Name.EREZ,
    Name.NIMROD,
    Name.GUY,
    Name.NAAMA,
    Name.YONATAN,
    Name.DORIT,
  ],
  Erez: [
    Name.ELOR,
    Name.YOTAM,
    Name.LIRON,
    Name.GUY,
    Name.ROTEM,
    Name.RONI,
    Name.EREZ,
    Name.NIMROD,
    Name.NAAMA,
    Name.DORIT,
    Name.YONATAN,
  ],
  Liron: [
    Name.GUY,
    Name.ELOR,
    Name.ROTEM,
    Name.NIMROD,
    Name.RONI,
    Name.EREZ,
    Name.YOTAM,
    Name.LIRON,
    Name.NAAMA,
    Name.YONATAN,
    Name.DORIT,
  ],
  Guy: [
    Name.GUY,
    Name.ROTEM,
    Name.ELOR,
    Name.YOTAM,
    Name.LIRON,
    Name.EREZ,
    Name.NIMROD,
    Name.RONI,
    Name.NAAMA,
    Name.DORIT,
    Name.YONATAN,
  ],
};

const lerp = (start: number, end: number, iteration: number, total: number) =>
  start + ((end - start) * iteration) / (total - 1);

const componentToHex = (c: number) => {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

const rgbToHex = ([r, g, b]: number[]) =>
  '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);

export const getColors = (
  amount: number,
  start = [13, 177, 90],
  end = [30, 83, 207]
) => {
  const colors: string[] = [];

  for (let i = 0; i < amount; i++) {
    const r = Math.floor(lerp(start[0], end[0], i, amount));
    const g = Math.floor(lerp(start[1], end[1], i, amount));
    const b = Math.floor(lerp(start[2], end[2], i, amount));

    const color = [r, g, b];
    colors.push(rgbToHex(color));
  }

  return colors;
};

const getScore = (index: number) => 12 - index;

export const calculateResults = (): [string[], number[]] => {
  const tempResults: [string, number][] = [];

  Object.keys(guesses).forEach(person => {
    let score = 0;
    guesses[person].forEach((currGuess, index) => {
      if (positives.includes(currGuess)) {
        score += getScore(index);
      }
    });

    tempResults.push([person, score]);
  });

  tempResults.sort((a, b) => b[1] - a[1]);

  const people = tempResults.map(a => a[0]);
  const results = tempResults.map(a => a[1]);

  return [people, results];
};

const nameDict: Record<string, string> = {
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
};

export const peopleTranslator = (name: string) => nameDict[name] || name;
