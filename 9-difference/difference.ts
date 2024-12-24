interface IA {
  a: number;
  b: string;
  d: boolean;
}
interface IB {
  a: number;
  c: boolean;
}

let a = { a: 5, b: "", d: true };
let b: IB = { a: 10, c: true };

function Difference<T extends object, K extends object>(
  ReferenceObject: T,
  CompareObject: K
): { [Key in Exclude<keyof T, keyof K>]: T[Key] } {
  const result = <{ [Key in Exclude<keyof T, keyof K>]: T[Key] }>{};

  for (const key of Object.keys(ReferenceObject)) {
    if (!(key in CompareObject)) {
      result[key as Exclude<keyof T, keyof K>] = ReferenceObject[key];
    }
  }

  return result;
}

let res = Difference(a, b);
console.log(res);
