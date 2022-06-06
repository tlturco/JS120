let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);
/*
Logs NaN because anywhere outside of a a function
this is bound to the global object.
global.firsName and global.lastName are undefined.
undefined + undefined = NaN
*/


let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    });
  },
  allMovies2: function() {
    return [1, 2, 3].map(number => {
      return this.name + ' ' + number;
    });
  },
  allMovies3: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }.bind(this));
  },

};

console.log(franchise.allMovies());
console.log(franchise.allMovies2());
console.log(franchise.allMovies3());

/*desired output
[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]
*/

//Using this within the map function method wont work
//because the anonomyous callback function has the global obj
//as the execution context


function myFilter(array, func, thisArg) {
  let result = [];

  array.forEach(function(value) {
    if (func.call(thisArg, value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
};

let result = myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter); // returns [5, 6, 9]

console.log(result);