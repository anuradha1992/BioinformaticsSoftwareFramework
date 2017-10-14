import express from "express";
import bodyParser from 'body-parser';

const workflowRouter = require('./routes/work-flow');

const app = express();

app.use(bodyParser.json());
app.use('/api', workflowRouter);

app.listen(3000, function () {
    console.log("Live at Port 3000");
});

import Step from './workflow/step';
import * as Task from './workflow/tasks';


const step1 = new Step(Task.Blast, true);
const step2 = new Step(Task.Visualize);
const step3 = new Step(Task.Visualize);


// async function main() {
//     step1.setNext(step2);
//     // step2.setNext(step3)
//
//     const result = await step1.start();
//
//     console.log('Final outcome', result);
// }
//
// main();


// const wb = new WrapBlast('asd', 'asd', 'asda');
// wb.exec();


/* ncbi blastp backend */

// var blast = require('blastjs');
//
// var type = 'nucl';
// var fileIn = './ncbi/test.fasta';
// var outPath = './ncbi';
// var name = 'test';
//
// blast.makeDB(type, fileIn, outPath, name, function(err){
//   if(err){
//     console.error(err);
//   } else {
//     console.log('database created at', outPath);
//   }
// });
//
// blast.outputString(true); //optional
//
// var dbPath = './ncbi/test';
// var query = 'CTAATACCGAATAAGGTCAGTTAATTTGTTAATTGATGAAAGGAAGCCTT';
//
// blast.blastN(dbPath, query, function (err, output) {
//   if(!err){
//     console.log(output);
//   }
// });