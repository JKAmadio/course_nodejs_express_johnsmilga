/**
 * 
 *  12 - Event emitter
 *  Learning to listen to an event emit 
 * 
 */

// import the whole EventEmmiter class
const EventEmitter = require('events');

// envolke the EventEmitter class
// we will mainly use the 'on' and 'emit' events
const customEmitter = new EventEmitter()

// here we stablish what we will do when something happens
// in this case we will console.log something on the 'response' event be emitted
customEmitter.on('response', () => {console.log('data received');})

// here we emit the 'response' event
customEmitter.emit('response')
