/*
 *
 * 08 - Built-in Modules
 *
 * OS -> operating system module
 * PATH -> path system module
 * FS -> file system module
 * HTTP -> http server module
 * ...
 *
*/

/****** OS ******/
console.log('\n/****** OS ******/');
const os = require('os');

// info about current user
const user = os.userInfo()
console.log(user);

// system uptime in seconds
const system = os.uptime();
console.log(system);

const currentOs = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem()
};
console.log(currentOs);

/****** PATH ******/
console.log('\n/****** PATH ******/');
const path = require('path');

// indicate the separator symbol based on the OS
console.log(path.sep);

// create a path
const pathFile = path.join('/content', 'subfolder', 'test.txt');
console.log(pathFile);

// get the basename (name of the file)
const base = path.basename(pathFile);
console.log(base);

// get the absolute path to the specific file or directory
const absolute = path.resolve(__dirname);
console.log(absolute);

/****** FS ******/
console.log('\n/****** FS ******/');

// import destructured modules
const { readFileSync, writeFileSync } = require('fs');

// get the content of the files, passing the path and the enconding
const first = readFileSync('./content/first.txt', 'utf-8');
const second = readFileSync('./content/second.txt', 'utf-8');

console.log(first);
console.log(second);

// create or overwrite a file syncronsly, passing the path and the content
// if we want to add content to the file and not overwrite, we must add a third argument { flag: 'a' }
writeFileSync(
    './content/result-sync.txt',
    `Here is the result: ${first}\n${second}`
)

const { readFile, writeFile } = require('fs');

readFile('./content/first.txt', 'utf-8', (err, res) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(res);
})

writeFile(
    './content/result-async.txt',
    `Here is the result: ${first}`,
    (err, res) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log(res);   
    }
)
