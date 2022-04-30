const arr = ['a', 'b'];
console.log(arr.hasOwnProperty(0)); //true

//How does hasOwnProperty method work?
//looks at the prototype property of the Array constructor
//the prototye property is an object that has a bunch of methods & a __proto__
//this references the prototype property on the Object constructor
//this Object.prototype is an object which contains the hasOwnProperty method

//An array is made from the Array constructor
console.log(arr.constructor === Array);
//the array has a prototype that comes from
//the prototype property on the Array constructor
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.hasOwnProperty('join'));//this is where you get the array methods from
//the Array prototype references
//the prototype  on the Object constructor
console.log(Array.prototype.__proto__ === Object.prototype);
//The Object prototype is the end of the chain
console.log(Object.prototype.__proto__); //null

//The Array constructor itself has a __proto__
//of the Function prototype property
console.log(Array.__proto__ === Function.prototype);
//And a Function as the constructor
console.log(Array.constructor === Function);

/*

//OOP example
const userFunction =  {
  add: function () {this.points += 1},
  login: function () {console.log("Now I'm logged in.")}
};

function userCreator(name, points) {
  let newUser = Object.create(userFunction); //creates a new object with userFunction as the __proto__
  newUser.name = name;
  newUser.points = points;
  return newUser;
}

const user = userCreator('Teresa', 3);
console.log(user);
user.add();
console.log(user);

//another example of creating an object
//use a constructor function
function UserCreator2(name, points) {
  this.name = name;
  this.points = points;
}

//add methods to the prototype on the Constructor
//all child objs can then access these methods
UserCreator2.prototype.add = function() {
  this.points += 1;
};

UserCreator2.prototype.login = function() {
  console.log("Now I'm logged in.");
};
 
//invoke the UserCreator2 function using the new keyword
//this creates a new object and sets the execution object to it
//so this keyword refers to the new object
//this.name and this.points assign those properties to the new obj
//__proto__ of the new obj is set to UserCreator2's prototype property
//you can use this fact to add methods without copying them in all your
//child objs you create
//then the new obj is returned
//and assigned to user2
const user2 = new UserCreator2('Ryan', 5);

user2.add();
console.log(user2);


//how to create subclasses:
UserCreator2.prototype.sayName = function() {
  console.log(`I'm ${this.name}`);
}

function PaidUserCreator(paidName, balance) {
  UserCreator2.call(this, paidName, 0);
  this.balance = balance;
}

const user3 = new UserCreator2('Dean', 4);


//currently the PaidUserCreator constructor's prototype points up the
//prototype chain to the prototype property on the Object constructor
console.log(PaidUserCreator.prototype.__proto__ === Object.prototype); //true
console.log(PaidUserCreator.prototype.__proto__ === UserCreator2.prototype); //false
//SO the chain goes
//user4 -> PaidUserCreator.prototype -> Object.prototype
//But we want it to access the UserCreator2.prototype property so we can gain
//access to all of those methods
PaidUserCreator.prototype = Object.create(UserCreator2.prototype)
//Object.create makes a new, empty object & sets its __proto__ to
//the argument passed (ie UserCreator2.prototype)

//we have now successfully reassigned the prototype
//for the PaidUserCreator constructor
console.log(PaidUserCreator.prototype.__proto__ === Object.prototype); //false
console.log(PaidUserCreator.prototype.__proto__ === UserCreator2.prototype); //true


//AND we still have access to the Object prototype methods
//cuz their at the way end of the prototype chain
console.log(PaidUserCreator.prototype.__proto__.__proto__ === Object.prototype); //true


//HOWEVER, now the prototype on paidUserCreator is pointing to the
//wrong constructor (UserCreator2)
//it should be pointing back to PaidUserCreator
console.log(PaidUserCreator.prototype.constructor); //UserCreator2
//reasssign
PaidUserCreator.prototype.constructor = PaidUserCreator;


//they are NOT the same object
console.log(PaidUserCreator.prototype !== UserCreator2.prototype);

console.log(UserCreator2.prototype.constructor);
console.log(PaidUserCreator.prototype.constructor);


//add a method to all paidUserObjects by updating
//the prototype on the constuctor
//which is the __proto__ of the objects
PaidUserCreator.prototype.increase = function() {
  this.balance += 1;
};

const user4 = new PaidUserCreator('John', 700);
console.log(user4);
user4.increase();
console.log(user4.__proto__ === PaidUserCreator.prototype);
console.log(user4);

user4.sayName();
*/


class UserCreator {
  constructor (name) {
    this.name = name;
  }

  //don't need to add it to UserCreator.prototype
  //javascript automatically does it for us here
  //bc we're using the 'class' keyword
  sayName() {
    console.log(`I'm ${nane}.`);
  }
}

//extends keyword sets PaidUserCreator.prototype.__proto__
//automatically to UserCreator.prototype
class PaidUserCreator extends UserCreator {
  constructor (paidName, balance) {
    super(paidName);
    this.balance = balance;
  }

  increase() {
    this.balance += 1;
  }
}

//even though we're using different syntax
//these constructor things are still functions
console.log(typeof UserCreator); //function 
console.log(typeof PaidUserCreator);//function


const user1 = new UserCreator("Dean");
console.log(user1.__proto__ === UserCreator.prototype);
console.log(user1.constructor === UserCreator);


const paidUser1 = new PaidUserCreator('Ryan', 1);
console.log(paidUser1.__proto__ === PaidUserCreator.prototype);
console.log(paidUser1.__proto__.__proto__ === UserCreator.prototype);
console.log(paidUser1.constructor === PaidUserCreator);