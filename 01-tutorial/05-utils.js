/*
 *
 * 06 - utils
 *
 * Module exported with the sintex "module.exports = <something>"
 * Alternative: export default <something>
 *
*/

const sayHi = (name) => {
    console.log(`hello there ${name}`);
};

module.exports = { sayHi };
