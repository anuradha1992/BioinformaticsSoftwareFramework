/**
 * Created by anuradhawick on 1/13/18.
 */

import fs from 'fs';
import WrapTCoffee from './python-wrappers/t-coffee/wrap-t-coffee';
import WrapClustalOmega from './python-wrappers/clustal-omega/wrap-clustal-omega';
import WrapDialign from './python-wrappers/dialign/wrap-dialign';
import WrapBlast from './python-wrappers/blast/wrap-blast';

let startTime = Date.now();

let strMSA = [];
let testData = [
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000100.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000200.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000300.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000400.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000500.txt',
];

let testDataMSA = [
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000100.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000200.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000300.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000400.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000500.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000600.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000700.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000800.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00000900.txt',
    '/Users/anuradhawick/Desktop/blastp-queries/SequenceLength_00001000.txt',
];


// Generate MSA strings
for (let i = 0; i < 6; i++) {
    let tempStr = ``;
    for (let j = i; j < i + 5; j++) {
        tempStr += fs.readFileSync(testDataMSA[j]);
    }
    strMSA.push(tempStr);
}

let f = fs.readFileSync(testData[4]);

async function doBlast(seq) {
    const bls = new WrapBlast('blastp','env_nr',seq);
    return (await bls.exec()).output;
}

async function doDialign(seq) {
    const dal = new WrapDialign(seq);
    return await dal.exec();
}

async function doClustalOmega(seq) {
    const comega = new WrapClustalOmega(seq);
    return (await comega.exec()).output;
}

async function doTCoffee(seq) {
    const tc = new WrapTCoffee(seq);
    return await tc.exec();
}


// console.log(f.toString())
// console.log(strMSA[4]);

async function mainParallel(i) {
    startTime = Date.now();
    let x = doClustalOmega(strMSA[i]);
    let y = doTCoffee(strMSA[i]);
    let z = doDialign(strMSA[i]);
    await x;
    await y;
    await z;
    console.log(`parallel time is ${Date.now() - startTime}`);
}

async function mainSerial(i) {
    startTime = Date.now();
    let x = await doClustalOmega(strMSA[i]);
    let y = await doTCoffee(strMSA[i]);
    let z = await doDialign(strMSA[i]);

    console.log(`serial time is ${Date.now() - startTime}`);
}

async function msaBlsSerial(i) {
    startTime = Date.now();
    let x = await doClustalOmega(strMSA[i]);
    let y = await doBlast(fs.readFileSync(testData[i]));

    console.log(`serial time is ${Date.now() - startTime}`);
}

async function msaBlsParallel(i) {
    startTime = Date.now();
    let x = doClustalOmega(strMSA[i]);
    let y = doBlast(fs.readFileSync(testData[i]));

    await x;
    await y;
    console.log(`parallel time is ${Date.now() - startTime}`);
}



async function main() {
    // for (let i = 0; i < 6; i++) {
    //     console.log(`running tests for seq ${(i + 1) * 100}-${(i + 5) * 100}`)
    //     await mainParallel(i);
    //     await mainSerial(i);
    //     console.log('\n');
    // }

    for (let i = 3; i < 5; i++) {
            console.log(`running tests for seq ${(i + 1) * 100}-${(i + 5) * 100}`);
            await msaBlsSerial(i);
            await msaBlsParallel(i);
            console.log('\n');
        }
    // let x  = await doBlast(fs.readFileSync(testData[0]));
    // console.log(x);
}

main();
