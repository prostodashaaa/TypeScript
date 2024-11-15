"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Gender;
(function (Gender) {
    Gender["Female"] = "female";
    Gender["Male"] = "male";
})(Gender || (Gender = {}));
function getFetch(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(url);
            if (!res.ok) {
                throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
            }
            const data = yield res.json();
            return data.users;
        }
        catch (error) {
            console.error("Ошибка при получении данных:", error);
            return [];
        }
    });
}
function displayUsers(users) {
    users.forEach(({ firstName, lastName, age, gender, email, address }) => {
        console.log({ firstName, lastName, age, gender, email, address });
    });
}
getFetch("https://dummyjson.com/userr").then(displayUsers);
