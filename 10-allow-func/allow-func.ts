class Person {
  @allowFunc((a: number) => a > 0)
  age: number = 30;
}

function allowFunc(func: (a: number) => boolean) {
  return (target: Object, propertyKey: string | symbol) => {
    let value: number;
    const setter = function (num: number) {
      if (func(num)) {
        value = num;
      } else {
        console.log(
          new Error(
            `Нельзя присвоить значение, которое не соответствует ${func}`
          )
        );
      }
    };

    const getter = function () {
      return value;
    };

    Object.defineProperty(target, propertyKey, {
      set: setter,
      get: getter,
    });
  };
}

const person = new Person();
console.log(person.age);

person.age = 31;
console.log(person.age);
