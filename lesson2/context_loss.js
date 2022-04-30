/*
let john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings() {
    console.log('hello, ' + this.firstName + ' ' + this.lastName);
  },
};

john.greetings();         // context is john
let foo = john.greetings; // Strips context
foo();                    // context is now the global object

function repeatThreeTimes(func) {
  func(); // can't use func.call(john); john is out of scope
  func();
  func();
}

function foo2() {
  let john = {
    firstName: 'John',
    lastName: 'Doe',
    greetings: function() {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    },
  };

  repeatThreeTimes(john.greetings); // Strips context
}

foo2();

// => hello, undefined undefined
// => hello, undefined undefined
// => hello, undefined undefined

//fixing foo by hard binding the context to repeatthreetimes
function fooFixed() {
  let john = {
    firstName: 'John',
    lastName: 'Doe',
    greetings: function() {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    },
  };

  repeatThreeTimes(john.greetings.bind(john)); // Strips context
}

fooFixed();

// => hello, John Doe
// => hello, John Doe
// => hello, John Doe

let obj = {
  a: 'hello',
  b: 'world',
  logAandB: function() {
    let self = this; //define the context you want (ie the object)

    function bar() {
      console.log(self.a + ' ' + self.b);
    }

    bar();
  },

  //arrow functions inherit their execution context from the surrounding context
  logAandBArrow: function() {
    let bar = () => {
      console.log(this.a + ' ' + this.b);
    };

    bar();
  }
};

obj.logAandB();
obj.logAandBArrow();



let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

let getTurkDescription = turk.getDescription.bind(turk);



logReturnVal(turk.getDescription, turk);


logReturnVal(getTurkDescription);



const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();


let food = {
  a: 0,
  incrementA: function () {
    let increment = () => {
      this.a += 1;
    };

    increment();
  }
};

food.incrementA();
food.incrementA();
food.incrementA();

console.log(food.a);

global.foo = 5;
if (isFinite(foo)) {
  let bar = 3;
  xyz = 5;
  console.log(bar);
}

*/
function bar() {
  console.log('good morning');
}

global.inner = {
  bar() {
    console.log('good afternoon');
  },
};

let obj = {
  inner: {
    bar() {
      console.log('good night');
    },

    foo() {
      bar();
    },
  },

  bar() {
    console.log('wake up');
  },

  foo() {
    this.inner.bar();
    inner.bar();
    bar();
  }
};

let foo = function() {
  console.log('go to sleep');
}

function go(foo) {
  foo();
}

go(obj.foo);