enum Gender {
  Female = "female",
  Male = "male",
}

interface User {
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  address: Address;
}

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface ResponseData {
  users: User[];
}

async function getFetch(url: string): Promise<User[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
    }

    const data: ResponseData = await res.json();
    return data.users;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
}

function displayUsers(users: User[]): void {
  users.forEach(({ firstName, lastName, age, gender, email, address }) => {
    console.log({ firstName, lastName, age, gender, email, address });
  });
}

getFetch("https://dummyjson.com/users").then(displayUsers);
