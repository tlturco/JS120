

//Typical constructor definition
//constructor & prototype

function Rectangle(length, width) {
  this.length = length;
  this.widgth = width;
}

Rectangle.prototype.getArea = function() {
  return this.length * this.width;
};

//adding a static method to the constructor
Rectangle.getDescription = function() {
  return 'A rectangle is a shape with 4 sides';
}

let rec = new Rectangle(10, 5);
console.log(typeof Rectangle); //function
console.log(rec instanceof Rectangle); //true
console.log(rec.constructor); //[FUnction: Rectangle]
console.log(rec.getArea()); //50
console.log(Rectangle.getDescription());



/*
//Class Declarations

class Rectangle {
  //all state properties go in this constructor method
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }
  //to define a statics method with the class keyword
  //just use the static keyword
  static getDescription() {
    return 'A rectangle is a shape with 4 sides';
  }
  //all aother methods that you add go below
  //they automatically get added to the prototype object on the class
  getArea() {
    return this.length * this.width;
  }
}

let rec = new Rectangle(10, 5);
console.log(typeof Rectangle); //function
console.log(rec instanceof Rectangle); //true
console.log(rec.constructor); //[class Rectangle]
console.log(rec.getArea()); //50

*/


//Class Expressions
//functionally the same as Class Declarations
//pick whichever syntax you like better

let Rectangle = class {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  //to define a statics method with the class keyword
  //just use the static keyword
  static getDescription() {
    return 'A rectangle is a shape with 4 sides';
  }

  getArea() {
    return this.length * this.width;
  }
};

console.log(Rectangle.getDescription());