//with a regular function call, javascript sets the binding for this
//to the global object
//there is no explicit context,
//so JS supplies an implicit context: the global object
function foo() {
  console.log("this refers to: " + this);
}

foo(); // this refers to: [object global]


//strict mode
"use strict";

function foo2() {
  console.log("this refers to: " + this);
}

foo(); // this refers to: undefined



//implicit execution context
//from method execution on an object
let foo3 = {
  bar: function() {
    console.log(this);
  }
};

foo3.bar(); // `foo` is the implicit execution context for `bar`
// { bar: [Function: bar] }



//explicit execution context
//using call method

function logNum() {
  console.log(this.num);
}

let obj = {
  num: 42
};

//specify obj as the execution context for lognum function
logNum.call(obj); //42

logNum(); //undefined (because this refers to the gloal object whch doesn't have a num property)

//or
obj.logNum = logNum; //mutate the object by adding a logNum method
obj.logNum(); // logs 42



let obj2 = {
  func: function() {
    return this;
  },
};

let context = obj2.func();

console.log(context);


message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage(); //Hello from the global scope

let fooop = {
  message: 'Hello from the function scope!',
};

fooop.deliverMessage = deliverMessage;

fooop.deliverMessage(); //Hello from the function scope


let fooo = {
  a: 1,
  b: 2,
};

let barr = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

console.log(barr.add.call(fooo));

//---------------------------------------HARD BINDING FUNCTIONS WITH CONTEXTS -------------------------------

function sumNum(num1) {
  return this.num + num1;
}

let obj42 = {
  num: 42
};

//permenently sets the execution context of sumNum2 function to the obj42
let sumNum2 = sumNum.bind(obj42);
console.log(sumNum2(5)); //47


let object = {
  a: 'hello',
  b: 'world',
  foo: function() {
    return this.a + ' ' + this.b;
  },
};

let unbound = object.foo;
console.log(unbound()); //undefined undefined

let bound = object.foo.bind(object);
console.log(bound()); // hello world

//execution context cannot be changed later (with call, apply, or bind)
//after you used bind earlier
let object2 = {
  a: 'hi',
  b: 'there'
};

console.log(bound.call(object2)) //hello world still from object (does not use object 2)


//bind creates a new function with a fixed context
//the original function is unaffected and can still change it's context
console.log(object.foo.apply(object2)); //hi there



//Final exampple

let greetings = {
  morning: 'Good morning, ',
  afternoon: 'Good afternoon, ',
  evening: 'Good evening, ',

  greeting: function(name) {
    let currentHour = (new Date()).getHours();

    if (currentHour < 12) {
      console.log(this.morning + name);
    } else if (currentHour < 18) {
      console.log(this.afternoon + name);
    } else {
      console.log(this.evening + name);
    }
  }
};

let spanishWords = {
  morning: 'Buenos dias, ',
  afternoon: 'Buenas tardes, ',
  evening: 'Buenas noches, '
};

let spanishGreeter = greetings.greeting.bind(spanishWords);

spanishGreeter('Jose'); //Buenas tardes, Jose
spanishGreeter('Juan'); //Buenas tardes, Juan

greetings.greeting('Teresa'); //Good afternoon, Teresa