/*
 *
 * 07 - Mind grenade
 *
 * All files are modules and when we execute a function
 * and require the file elsewhere (./03-modules.js) it's executed
 *
*/

const num1 = 5
const num2 = 10

function addValues() {
    console.log(`the sum is: ${num1 + num2}`);
}

addValues()