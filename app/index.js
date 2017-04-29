require('./scss/index.scss');

const myArr = [1, 2, 3, 4, 5, 6];

myArr.forEach(x => console.log(x));

let newArr = myArr.map(x => x*x);

console.log(newArr);