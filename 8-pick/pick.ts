const user = {
  name: "Vasiliy",
  age: 8,
  skills: ["typescript", "javascript"],
};

const user1 = {
  name: "Vasiliy",
  lastname: "Ivanov",
  skills: ["typescript", "javascript"],
};

type ObjectKey<T> = {
  [P in keyof T]: T[P];
};

function pickObjectKey<T, K extends keyof T>(obj: T, keys: K[]): { [P in K]: T[P] } {
  const res = {} as { [P in K]: T[P] };
  keys.forEach((key) => {
    res[key] = obj[key];
  });
  return res;
}

console.log(pickObjectKey(user, ["age", "skills"]));
console.log(pickObjectKey(user1, ["name", "lastname"]));
