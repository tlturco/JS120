class Vehicle {
  constructor(year) {
    this.year = year;
  }
  startEngine() {
    return 'Ready to go!';
  }
}

class Truck extends Vehicle {
  constructor(year, bedType) {
    super(year);
    this.bedType = bedType;
    //this.startEngine();
  }

  startEngine(speed) {
    return `${super.startEngine()} Drive ${speed}, please!`;
  }
}

class Car extends Vehicle {

}

const towMixin = {
  tow() {
    return 'I can tow a trailer!';
  }
};

Object.assign(Truck.prototype, towMixin);

let truck1 = new Truck(2003, 'Short');
console.log(truck1.year);
console.log(truck1.bedType);
console.log(truck1.startEngine('fast'));

let truck2 = new Truck(2022, 'Long');
console.log(truck2.startEngine('slow'));

let car = new Car(2015);
console.log(car.year); // 2015


const walkMixin = {
  walk() {
    return 'Let\'s go for a walk!';
  }
};


class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

Object.assign(Cat.prototype, walkMixin);

let kitty = new Cat("Sophie");
console.log(kitty.greet());
console.log(kitty.walk());


const swimMixin = {
  swim() {
    return `${this.name} is swimming.`;
  }
};

class Fish {
  constructor(name) {
    this.name = name;
    //Object.assign(this, swimMixin);
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

class Maltese extends Dog {}

Object.assign(Maltese.prototype, swimMixin);
Object.assign(Fish.prototype, swimMixin);


let dog1 = new Maltese("Buddy");
let fish1 = new Fish("Nemo");

console.log(dog1.swim());
console.log(fish1.swim());


let truck = new Truck();
console.log(truck.tow());