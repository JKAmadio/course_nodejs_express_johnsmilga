/*
 *
 * 04 - Names
 *
 * we can choose which variables/functions are exported in the module
 *
*/

// only local access
const secret = 'secret';

// global access
const john = 'john';
const peter = 'peter';

// uncomment the line below to see the attributes of module
// console.log(module);

module.exports = { john, peter };
