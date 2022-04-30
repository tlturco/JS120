//function can be invoked before its declared
prompt('How are you today?');

//function declarations can be hoisted
function prompt(message) {
  console.log(`=> ${message}`);
}

/*
//anything that has something before the keyword function
//is a function expression and cannot be hoisted

bar(); //will work. can be hoisted
function bar() {
  console.log("this is bar");
}

foo(); //will not work.
//ReferenceError: Cannot access 'foo' before initialization
const foo = function() {
  console.log("this is foo");
};

*/


//using function declaration
function logNum(num) {
  console.log('Number: ' + num);
}

[1, 2, 3].forEach(logNum);


//using function expression
[1, 2, 3].forEach(function logNum(num) {
  console.log('Number: ' + num);
});

//using an arrow function
[1, 2, 3].forEach(num => {
  console.log('Number: ' + num);
});


let myFunc = function() {};
console.log(typeof myFunc);


//------------------------HIGHER ORDER FUNCTIONS -------------
//functions that:
//either take a function as an argument
[1, 2, 3, 4].map(num => num * num); //map is a higher order function
//or return a function

function greet(language) {
  switch (language) {
    case 'en': 
      console.log('Hello!');
      break;
    case 'es': 
      console.log('¡Hola!');
      break;
    case 'fr': 
      console.log('Bonjour!');
      break;
  }
}

greet('fr');

function createGreeter(language) {
  switch (language) {
    case 'en':
      return () => console.log('Hello');
    case 'es':
      return () => console.log('¡Hola!');
    case 'fr':
      return () => console.log('Bonjour');
  }
}

let geeterEs = createGreeter('es');
geeterEs();

let geeterEn = createGreeter('en');
geeterEn();