// output expected FALSE but TRUE  
console.log(false == 0);
console.log(true == 1);
console.log([] == 0);

// output expected TRUE but FALSE
console.log({}.length == 0);
console.log({}.length === 0);

// expected FALSE output 
console.log(true == false);
console.log(false == 'false');
console.log('true' == 1);
console.log('true' == 0);
console.log('false' == 0);
console.log(true == 0);
console.log(true == 'true');
console.log({} == 0);
console.log([] === 0);
console.log(false === 0);
console.log(true === 0);
console.log(true === 1);
console.log('true' === 1);
console.log('true' === 0);
console.log('false' === 0);
console.log('false' === 1);
console.log('false' === 1);

// expected TRUE output 
console.log([].length == 0);
console.log([].length === 0);