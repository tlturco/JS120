//example object
/*
let raceCar = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    this.engineOn = true;
  },

  drive() {
    this.fuelLevel -= 0.1;
  },

  stopEngine() {
    this.engineOn = false;
  },

  refuel(percent) {
    if ((this.fuelLevel + (percent / 100)) <= 1) {
      this.fuelLevel += (percent / 100);
    } else {
      this.fuelLevel = 1;
    }
  },
};
*/

// eslint-disable-next-line max-lines-per-function
function createCar(make, fuelLevel, engineOn) {
  return {
    make,
    fuelLevel,
    engineOn,
    startEngine() {
      this.engineOn = true;
    },

    drive() {
      this.fuelLevel -= 0.1;
    },

    stopEngine() {
      this.engineOn = false;
    },

    refuel(percent) {
      if ((this.fuelLevel + (percent / 100)) <= 1) {
        this.fuelLevel += (percent / 100);
      } else {
        this.fuelLevel = 1;
      }
    },
  };
}

let raceCar1 = createCar('BMW', 0.5, false);
raceCar1.drive();

let raceCar2 = createCar('Ferrari', 0.7, true);
raceCar2.drive();

let jaguar = createCar('Jaguar', 0.4, false);
//console.log(jaguar);


function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      let readStatus = "haven't";
      if (this.read) {
        readStatus = "have";
      }
      return `${this.title} was written by ${this.author}. ` +
      `I ${this.read ? 'have' : "haven't"} read it.`;
    },

    readBook() {
      this.read = true;
    }
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', true);
let book3 = createBook('Aunts aren\'t Gentlemen', 'PG Wodehouse');

console.log(book1.getDescription());  // "Mythos was written by Stephen Fry."
console.log(book2.getDescription());  // "Me Talk Pretty One Day was written by David Sedaris."
console.log(book3.getDescription());  // "Aunts aren't Gentlemen was written by PG Wodehouse"

book3.readBook();

console.log(book1.read); // => false
console.log(book2.read); // => true
console.log(book3.read); // => true

console.log(book1.getDescription()); // Mythos was written by David Fry. I haven't read it.
book1.readBook();
console.log(book1.getDescription()); // Mythos was written by David Fry. I have read it.