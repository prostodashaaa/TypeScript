class MapPolifil {
  array: any[][];
  size: number;

  constructor(array?: any[][]) {
    this.array = new Array(127);
    this.size = 0;

    if (array) {
      array.forEach((item) => this.set(item[0], item[1]));
    }
  }

  private hashFunction(key: any): number {
    let hash: number = 0;
    let keyValue = key;
    if (typeof key !== "object" && typeof key !== "string") {
      keyValue = String(key);
    } else if (Array.isArray(key)) {
      keyValue = key.join("");
    } else if (typeof key == "object" && key !== null) {
      keyValue = JSON.stringify(key);
    }

    for (let i = 0; i < keyValue.length; i++) {
      hash += keyValue.charCodeAt(i);
    }

    return hash % this.array.length;
  }

  set(key: any, value: any): any[][] {
    const index = this.hashFunction(key);
    if (this.array[index]) {
      for (let i = 0; i < this.array[index].length; i++) {
        if (this.array[index][i][0] == key) {
          this.array[index][i][1] = value;
        }
      }
    } else {
      this.array[index] = [];
    }
    this.array[index].push([key, value]);
    this.size++;

    return this.array;
  }

  get(key: any): any {
    const index = this.hashFunction(key);
    if (this.array[index]) {
      for (let i = 0; i < this.array[index].length; i++) {
        if (this.array[index][i][0] == key) {
          return this.array[index][i][1];
        }
      }
    }
    return;
  }

  clear(): void {
    this.array = [];
  }

  delete(key: any): boolean {
    const index = this.hashFunction(key);
    if (this.array[index] && this.array[index].length) {
      for (let i = 0; i < this.array[index].length; i++) {
        if (this.array[index][i][0] == key) {
          this.array[index].splice(i, 1);
          this.size--;
          return true;
        }
      }
    }
    return false;
  }

  display(): void {
    this.array.forEach((bucket) => {
      if (bucket.length > 0) {
        bucket.forEach(([key, value]) => {
          console.log(`${key} => ${value}`);
        });
      }
    });
  }
}

const map = new MapPolifil();
map.set("01", 5);
map.set(1, 6);
map.set(10, 7);
map.set([1, 2, 3], 8);
map.set({ a: 1 }, 9);
console.log(map.display());
