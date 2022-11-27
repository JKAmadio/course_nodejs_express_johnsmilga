/*
 *
 * 03 - Modules
 *
 * Encapulated code to only share what is needed
 * Every file on Node is a Module
 *
*/

// import the exported infos from file 04-names
// we can destructure the exported info ( [john, peter] = require('./04-names.js) )
const names = require('./04-names.js');
const { sayHi } = require('./05.utils')

// when the exported module is a function
// we don't need to assign it to anything and it will be executed automaticly
require('./07-mind-grenade.js');

sayHi('susan');
sayHi(names.john);
sayHi(names.peter);
