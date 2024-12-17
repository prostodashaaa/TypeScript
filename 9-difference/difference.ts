interface IA {
  a: number;
  b: string;
  d: boolean;
}

interface IB {
  a: number;
  c: boolean;
}

let a: IA = { a: 5, b: "", d: true };
let b: IB = { a: 10, c: true };

function difference<T extends object, K extends object>(
  ReferenceObject: T,
  CompareObject: K
): Pick<T, Exclude<keyof T, keyof K>> {
  type UniqueKeys = Exclude<keyof T, keyof K>;

  const result: Partial<T> = {};

  for (const key of Object.keys(ReferenceObject)) {
    if (!(key in CompareObject)) {
      result[key] = ReferenceObject[key];
    }
  }

  return result as Pick<T, UniqueKeys>;
}

console.log(difference(a, b));
