/**
 *  
 *  10 - Async Patterns - Promise
 *  Create an async callback using new Promise
 * 
 */

const { readFile } = require('fs')

const getText = (path) => {
    console.log('inside task');

    return new Promise((resolve, reject) => {
        readFile(path, 'utf-8', (error, data) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(data)
            }
        })
    })
}

console.log('********* PROMISE BLOCK ***********');
console.log('before task');
getText('./content/first.txt')
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
console.log('after task');
