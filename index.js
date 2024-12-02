import HashMap from "./hashMap.js";
import 

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')


console.log(test.length());
console.log(test.capacity);

test.set("grape", "green");

console.log(test.length());
console.log(test.capacity);
console.log(test.size / test.capacity);

test.set('moon', 'silver')

console.log(test.length());
console.log(test.capacity);
console.log(test.size / test.capacity);

test.set("apple", "green");

console.log(test.length());
console.log(test.get("elephant")); // gray.
console.log(test.has("elephan")); 
console.log(test.remove("elephant")); 
console.log(test.get("elephant")); 
console.log(test.length()); 
console.log(test.keys()); 
console.log(test.values()); 
console.log(test.entries()); 



