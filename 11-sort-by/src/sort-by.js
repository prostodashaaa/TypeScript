import sortBy from 'sort-by';
let users = [
    {
        id: 7,
        name: "Foo",
        age: "34",
        email: { primary: "foo@email.com" },
    },
    {
        id: 3,
        name: "Baz",
        age: "67",
        email: { primary: "baz@email.com" },
    },
    {
        id: 4,
        name: "Bar",
        age: "67",
        email: { primary: "bar@email.com" },
    },
];
console.log(users.sort(sortBy("name", "age")));
/**
 *   result:
 *       [{id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
 *       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }},
 *       {id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }}]
 */
/**
 * Use `-` to reverse the sort order
 */
console.log(users.sort(sortBy("-id", "name")));
/*
 *   result:
 *       [{id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }},
 *       {id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
 *       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }}]
 */
/**
 * Use `.` notation to traverse nested properties. See [object-path](https://www.npmjs.org/package/object-path) npm module for support.
 */
console.log(users.sort(sortBy("age", "email.primary")));
/*
 *   result:
 *       [{id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }},
 *       {id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
 *       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }}]
 */
