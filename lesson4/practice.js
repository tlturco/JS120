const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}
Object.assign(Car.prototype, Speed);

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}

Object.assign(Truck.prototype, Speed);

let car = new Car();
let truck = new Truck();

console.log('goFast' in car);
console.log('goFast' in truck);


car.goFast();
truck.goFast();

console.log(Car.constructor);
console.log(Car.prototype.constructor);


class Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelCap = fuelCapInLiter;
    this.fuelEfficiency = kmTravelledPerLiter;
  }
  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }

}

class WheeledVehicle extends Vehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    super(kmTravelledPerLiter, fuelCapInLiter);
    this.tires = tirePressure;

  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }

}

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}

class Catamaran extends Vehicle {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    super(kmTravelledPerLiter, fuelCapInLiter);
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}




