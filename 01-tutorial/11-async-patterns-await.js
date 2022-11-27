/**
 *  
 *  11 - Async Patterns - Async/Await
 *  Create an async callback using Async/Await
 * 
 */

const { readFile } = require('fs')

getText = (path) => {
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

const start = async () => {
    try {
        const first = await getText('./content/first.txt');
        const second = await getText('./content/second.txt');
        console.log(first);
        console.log(second);
    }
    catch (error) {
        console.log(error);
    }
}

console.log('before task');
start('./content/first.txt');
console.log('after task');
