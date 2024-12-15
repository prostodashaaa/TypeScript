const obj: Record<string, number> = {
  a: 1,
  b: 2,
};

/* 
  { 1: a, 2: b}
*/

function swapKeysAndValues<T extends Record<string, string | number>>(
  obj: T
): Record<T[keyof T], keyof T> {
  const swapped: Record<T[keyof T], keyof T> = {} as Record<
    T[keyof T],
    keyof T
  >;

  for (const key in obj) {
    const value = obj[key];
    swapped[value] = key;
  }

  return swapped;
}

console.log(swapKeysAndValues(obj));
