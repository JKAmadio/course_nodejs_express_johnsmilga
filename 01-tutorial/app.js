/**
 * 
 *  14 - Streams - Read file
 *  Reading a file dividing it into chucks (usefull for big files)
 * 
 */

 const { createReadStream } = require('fs')

 const stream = createReadStream('./content/big.txt')

 /**
  * 
  * default 64kb
  * last buffer - remainder
  * highWaterMark - control size
  * const stream = createReadStream('./content/big.txt', { highWaterMark: 9000 })
  * const stream = createReadStream('./content/big.txt', { encoding: 'utf8' })
  * 
  */
 
 stream.on('data', (result) => {
     console.log(result);
 })
 
 stream.on('error', (error) => { console.log(error) })
 