let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  /* ORIGINAL CODE 
  this.area = RECTANGLE.area(); returns NaN
  this.perimeter = RECTANGLE.perimeter(); returns NaN
    //bc the calling obj Rectangle does not have width & height properties
  */
  this.area = RECTANGLE.area.call(this); //specify the excecution context
  this.perimeter = RECTANGLE.perimeter.call(this); //specify the excecution context
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area); //6
console.log(rect1.perimeter); //10


function Circle(radius) {
  this.radius = radius;
};

Circle.prototype.area = function() {
  return Math.PI * this.radius * this.radius;

};

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false


/*
function Ninja() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object


Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
};

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`

*/
let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
let ninjaB = new ninjaA.constructor();


console.log(ninjaA.constructor === ninjaB.constructor); // => true



//write a constructor function that you can call
//with or without the new operator

function User(first, last) {
  if (this === User) {
    this.name = `${first} ${last}`;
  } else {
    return {name: `${first} ${last}`};
  }
}

/*launch school solution
function User(first, last) {
  if (!(this instanceof User)) {
    return newUser(first, last);
  }

  this.name = first + " " + last;
}
*/

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe