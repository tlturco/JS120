let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo); //2


//write a function that searches the prototype chain of an object for
//a given property and assigns it a new value

function assignProperty(obj, key, value) {
  let nextPrototype = obj;
  while (nextPrototype !== null) {
    if (nextPrototype.hasOwnProperty(key)) {
      nextPrototype[key] = value;
      break;
    }
    nextPrototype = Object.getPrototypeOf(nextPrototype);
  }

}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false


//5
let bar = {teresa: 'is'};
let foo = {super: 'cool'};
Object.setPrototypeOf(foo, bar);

console.log('FOR / IN');
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

console.log('\n\n Object.keys + forEach');
Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});

//will not output the same thing
//bc for in will iterate over prototype properties
//Object.keys only returns the object's own properties



//6
//creating an objct without a prototype
let objectWithoutPrototype = {};
Object.setPrototypeOf(objectWithoutPrototype, null);
// or
let bareObject = Object.create(null);

//to determine if an object has a prototype: 
console.log(Object.getPrototypeOf(objectWithoutPrototype) === null); // true

console.log(Object.getPrototypeOf(bareObject) === null); //true