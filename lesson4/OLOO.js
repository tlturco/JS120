//FACTORY FUNCTION
function createCar(make, model, year) {
  return {
    make,
    model,
    year,
    started: false,

    start() {
      this.started = true;
    },

    stop() {
      this.started = false;
    },
  };
}

let car1 = createCar('Toyota', 'Corolla', 2016);
let car2 = createCar('Honda', 'Civic', 2017);



//Object Linking to Other Objects
//OLOO

//create a prototype object
//with all the shared methods & properties
let carPrototype = {
  start: function() {
    this.started = true;
  },

  stop: function() {
    this.started = false;
  },

  init(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    return this;
  }
}


//create instances of that object using Object.create
//which allows you to set to prototype to the 
//obj passed in the argument
let car3 = Object.create(carPrototype).init('Toyota', 'Corolla', 2016);
/*you can manually assign properties or you can use init
within the prototype obj
car1.make = 'Toyota';
car1.model = 'Corolla';
car1.year = 2016;
*/
/*
//FACTORY FUNCTION
function createPet(animal, name) {
  return {
    animal,
    name,
    sleep() {
      console.log("I am sleeping");
    },
    wake() {
      console.log("I am awake");
    }
  };
}

let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
*/
//OLOO
let PetPrototype = {
  sleep() {
    console.log("I am sleeping");
  },
  wake() {
    console.log("I am awake");
  },

  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  }
};

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
