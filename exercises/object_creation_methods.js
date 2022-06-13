//Object Factories
function objectFactory(arg1, arg2) {
  return {
    arg1,
    arg2,
    method() {}
  };
}

//Pseudo-Classical Approach (Constructors & Prototypes)
function Constructor(arg1, arg2) {
  this.arg1 = arg1;
  this.arg2 = arg2;
}

Constructor.prototype.method = function() {}

let obj = new Constructor(this, that);


//OLOO
let prototype = {
  method() {},
  init(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    return this;
  }
}

let obj = Object.create(prototype).init(this, that);


//ES6 Classes
class ClassName {
  constructor(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;
  }

  method(){}
}