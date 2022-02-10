export const arraysAreEqual = <T>(a: T[], b: T[]) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

export const arrayContains = <T>(a: T[], b: T[]) =>
  b.every(value => a.includes(value));
