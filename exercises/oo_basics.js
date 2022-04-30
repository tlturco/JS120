//log the constructor

console.log("Hello".constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);


//Create an empty class named Cat.
class Cat {};

//create an instance of Cat and assign it to a variable named kitty.
let kitty = new Cat();