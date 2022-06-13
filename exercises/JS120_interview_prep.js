function ConstructorName(argument) {
  this.property = argument;
}

ConstructorName.prototype.method1 = function() {
  console.log(`${this.constructor.name} Prototype Method`);
};


let test = new ConstructorName("Property1");

test.method1();


//I want to test whether changes to the Mixin object
//also change the instance object that that I have mixed into
//here I create the mixin and add it to the prototype property
//AFTER I've already created the instance object
let Mixin = {
  mixinMethod() {
    console.log("Mixin Method");
  }
};

Object.assign(ConstructorName.prototype, Mixin);

//expected behavior: the instance object now has access to all mixin methods
test.mixinMethod(); //Mixin Method is logged


//Now I'll mutatue the mixin object to see
//if the constructor prototype is also mutated
Mixin.method2 = function() {
  console.log("When you mutate the mixin after it's already added to the instance object, it does NOT get added");
};

//This throws an error.
//The instance object does NOT get access to newly added method
//test.method2();

//double checking this conclusion here
//test's prototype does not contain method2
//Even though Mixin does
console.log(Object.getPrototypeOf(test));
console.log(Mixin);

//these point to the same function in memory
console.log(ConstructorName.prototype.mixinMethod === Mixin.mixinMethod); //logs true



//you can invoke funcitons defined with function declaration
//BEFORE they are defined
//through hoisting
teresasFunction("Function Declaration");


function teresasFunction(arg1) {
  console.log(arg1);
}


//You cannot invoke functions defined with function expressions
//before they are defined
//functionExpressionExample("Function expression"); //this will throw an error
const functionExpressionExample = function(arg) {
  console.log(arg);
};

//arrow functions are a type of function expression
//always anonymous
//inherit their surrounding context as their execution context
//good for passing into other functions as a callback
const arrowFunctionExpression = arg => {
  console.log(arg);
};

functionExpressionExample("Function expression");
arrowFunctionExpression("Arrow Function example");


//Object factory example:
function createObj(arg1, arg2) {
  return {
    arg1,
    arg2,
    method() {
      console.log("Object Factory Method");
    }
  };
}

let instanceObjFromFactory = createObj("argument1", "argument2");
instanceObjFromFactory.method();


//Constructor Function Example
function ObjectConstructor(arg1, arg2) {
  this.arg1 = arg1;
  this.arg2 = arg2;
}

ObjectConstructor.prototype.method = function() {
  console.log("Constructor Function Method");
};

let instanceObjFromConstructor = new ObjectConstructor("argument1", "argument2");
instanceObjFromConstructor.method();


//ES6 Class example
class ClassObject {
  constructor(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;
  }

  method() {
    console.log("Class Method");
  }
}

let instanceObjFromClass = new ClassObject("argument1", "argument2");
instanceObjFromClass.method();

//OLOO
let objPrototype = {
  method() {
    console.log("OLOO Method");
  },

  init(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    return this;
  }
};

let instanceObjFromOLOO = Object.create(objPrototype).init("argument1", "argument2");
instanceObjFromOLOO.method();


function addVerticalSpace(numberOfSpaces) {
  while (numberOfSpaces > 0) {
    console.log(""); //add vertical space
    numberOfSpaces -= 1;
  }
}


function addBreak() {
  console.log('-----------------------------------------------------------------');
  addVerticalSpace(3);
}

addBreak();
//Exercise 1

//log the name of the constructor for each of the values
console.log("Hello".constructor.name); //Sting
console.log([1,2,3].constructor.name); //Array
console.log({name: 'Srdjan'}.constructor.name); //Object

addBreak();
//Exercise 2,3,4,5,7, 8
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }

//   greet() {
//     console.log(`Hello! My name is ${this.name}!`);
//   }

//   personalGreeting() {
//     console.log(`Hello! My name is ${this.name}!`);
//   }
//   static genericGreeting() {
//     console.log("Hello! I'm a cat!");
//   }

//   rename(newName) {
//     this.name = newName;
//   }
// }

// let kitty = new Cat('Sophie');
// kitty.greet();


// addBreak();

//excercise 6
// class Person {
//   constructor(name = 'John Doe') {
//     this.name = name;
//   }
// }

// let person1 = new Person();
// let person2 = new Person("Pepe");

// console.log(person1.name); // John Doe
// console.log(person2.name); // Pepe


// console.log(kitty.name); // Sophie
// kitty.rename('Chloe');
// console.log(kitty.name); // Chloe

// Cat.genericGreeting();
// kitty.personalGreeting();

addBreak();
console.log("OO Basics: Inheritance & Mixins");
addVerticalSpace(2);

// class Vehicle {
//   constructor(year) {
//     this.year = year;
//   }

//   startEngine() {
//     return 'Ready to go!';
//   }
// }

// class Truck extends Vehicle {
//   constructor(year, bedType) {
//     super(year);
//     this.bedType = bedType;
//   }
//   startEngine(speed) {
//     return super.startEngine() + ` Drive ${speed} please!`;
//   }
// }

// class Car extends Vehicle {}

// let truck1 = new Truck(2003, 'Short');
// console.log(truck1.year);
// console.log(truck1.bedType);

// let car = new Car(2015);
// console.log(car.year); // 2015


// console.log(truck1.startEngine('fast'));
// console.log(truck1.startEngine('slow'));


addBreak();
// let walkMixin = {
//   walk() {
//     return "Let's go for a walk!";
//   }
// };

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }

//   greet() {
//     return `Hello! My name is ${this.name}!`;
//   }
// }

// Object.assign(Cat.prototype, walkMixin);

// let kitty = new Cat("Sophie");
// console.log(kitty.greet());
// console.log(kitty.walk());


addBreak();

const swimMixin = {
  swim() {
    return `${this.name} is swimming.`;
  }
};

class Fish {
  constructor(name) {
    this.name = name;
  }
}
Object.assign(Fish.prototype, swimMixin);

class Dog {
  constructor(name) {
    this.name = name;
  }
}

class Maltese extends Dog {}
Object.assign(Maltese.prototype, swimMixin);

let dog1 = new Maltese("Buddy");
let fish1 = new Fish("Nemo");

console.log(dog1.swim());
console.log(fish1.swim());


let towMixin = {
  tow() {
    console.log("I can tow a trailer");
  }
};

// Object.assign(Truck.prototype, towMixin);
// truck1.tow();


addBreak();
console.log("Easy Exercises:");
addVerticalSpace(2);


class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

let rect = new Rectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20


class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
}

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25


// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//   speaks() {
//     return `${this.name} says meowwww.`;
//   }
// }

// let fakeCat = Object.create(Cat.prototype);// your implementation
// console.log(fakeCat instanceof Cat); // logs true
// console.log(fakeCat.name);           // logs undefined
// console.log(fakeCat.speaks());       // logs undefined says meowwww.


// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Cat extends Pet {
//   constructor(name, age, colors) {
//     super(name, age);
//     this.colors = colors;
//   }

//   info() {
//     return `My cat ${this.name} is ${this.age} years old and has ${this.colors} fur.`;
//   }
// }

// let pudding = new Cat('Pudding', 7, 'black and white');
// let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

// console.log(pudding.info());
// console.log(butterscotch.info());



class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}
class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'cat', status);
  }

  introduce() {
    return `${super.introduce()}  Meow meow!`;
  }
}

// class Dog extends Animal {
//   constructor(name, age, status, master) {
//     super(name, age, 4, 'dog', status);
//     this.master = master;
//   }

//   greetMaster() {
//     return `Hello ${this.master}! Woof, woof!`
//   }
// }



class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}
class Car extends Vehicle {
  constructor(make, model) {
    super(make, model, 4)
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model, 6);
    this.payload = payload;
  }
}



// function Person() {
// }
// Person.prototype.greeting = function(text) {
//   console.log(text);
// }

class Person {
  greeting(text) {
    console.log(text);
  }
}

// function Shouter() {
//   Person.call(this);
// }
// Shouter.prototype = Object.create(Person.prototype)
// Shouter.prototype.greeting = function(text) {
//   Person.prototype.greeting.call(this, text.toUpperCase());
// }

class Shouter extends Person {
  greeting(text) {
    super.greeting(text.toUpperCase());
  }
}

let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.



let walkMixin = {
  walk () {
    return `${this.name} ${this.gait()} forward`;
  }
};

// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   gait() {
//     return "strolls";
//   }
// }

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }

//   gait() {
//     return "saunters";
//   }
// }

class Cheetah {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "runs";
  }
}

// Object.assign(Person.prototype, walkMixin);
// Object.assign(Cat.prototype, walkMixin);
Object.assign(Cheetah.prototype, walkMixin);

// let mike = new Person("Mike");
// console.log(mike.walk());
// // "Mike strolls forward"

// let kitty = new Cat("Kitty");
// console.log(kitty.walk());
// // "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"


class Banner {
  constructor(message) {
    this.message = message;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    let lineLength = this.messageLine().length;
    return '+' + '-'.repeat(lineLength - 2) + '+';
  }

  emptyLine() {
    let lineLength = this.messageLine().length;
    return '|' + ' '.repeat(lineLength - 2) + '|';
  }

  messageLine() {
    return `| ${this.message} |`;
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();

let banner2 = new Banner('');
banner2.displayBanner();


function objectsEqual(a, b) {
  if (a === b) {
    return true;
  }

  return (keysMatch(a, b) && valuesMatch(a, b));

}

function keysMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();
  let bKeys = Object.getOwnPropertyNames(b).sort();

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key, index) => {
    return key === bKeys[index];
  });
}

function valuesMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();

  return aKeys.every(key => a[key] === b[key]);
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false