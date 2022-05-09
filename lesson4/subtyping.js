function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}

Rectangle.prototype.getArea = function() {
  return this.length * this.width;
};

Rectangle.prototype.toString = function() {
  return `[Rectangle ${this.length} X ${this.width}]`;
};

let rect = new Rectangle(10, 5);
console.log(rect.getArea());     // => 50
console.log(rect.toString());    // => "[Rectangle 10 x 5]"


//because the Square function does the same thing
//as the constructor function
//we can reuse that constructor
//by invoking it an explicityly setting the execution context
function Square(size) {
  /*
  this.length = size;
  this.width = size;
  */
  Rectangle.call(this, size, size);
}

//this is duplicative code
//since the Rectangle prototype already does this
/*
Square.prototype.getArea = function() {
  return this.length * this.width;
};
*/
//Square is a sub-type of Rectangle
//this code makes Square.prototype point to an empty object
//that inherits from Rectangle.prototype
Square.prototype = Object.create(Rectangle.prototype);

//add methods to the Square.prototype obj
//Rectangle objs cannot access these
Square.prototype.toString = function() {
  return `[Square ${this.length} x ${this.width}]`;
};


let sqr = new Square(5);
console.log(sqr.getArea());
console.log(sqr.toString());

//PROTOTYPE CHAIN:
//sqr --> Square.prototype --> Rectangle.prototype --> Object.prototype


//Restoring the constructor property
//a side effect of this approach is that we now have the
//constructor property on square objects pointing to
//Rectangle when it should point to Square
console.log(sqr.constructor === Rectangle); // => true
//fix this by reassigining the Square.prototype.constructor
Square.prototype.constructor = Square;
console.log(sqr.constructor === Square); // => true



class Human {
  myName() { return this.name; }
  myAge() { return this.age; }
}

class Person extends Human {
  toString() {
    return `My name is ${this.myName()} and I'm ${this.myAge()} years old.`;
  }
}

let will = new Person();
will.name = 'William';
will.age = 28;
console.log(will.toString()); 


//PRACTICE PROBLEMS

function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};

let hello = new Hello();
hello.hi(); //logs "Hello!" to the console
//hello.bye(); //Error message (bye is not a method on Hello)
hello.greet(); //logs undefined to the console
hello.greet('Goodbye'); //logs Goodbye to the console
//Hello.hi(); //Error hi is a method on the prototype not on Hello itself



class Greeting {
  greet(msg) {
    console.log(msg);
  }
}

class Hello extends Greeting{
  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet('Goodbye');
  }
}
