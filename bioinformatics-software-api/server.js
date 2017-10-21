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
// import WrapClustalOmega from './python-wrappers/clustal-omega/wrap-clustal-omega';
import WrapTCoffee from './python-wrappers/t-coffee/wrap-t-coffee';


const step1 = new Step(Task.Blast, true);
const step2 = new Step(Task.Visualize);
const step3 = new Step(Task.Visualize);

const input = ">gnl|GNOMON|17969.m Partial model predicted by Gnomon on Acanthaster planci unplaced genomic scaffold, OKI-Apl_1.0 oki_scaffold1752, whole genome shotgun sequence (NW_019093106.1)\n" +
    "AAGCAAAAAGCAGAGAAGGAGAAACCAGGTTTCCTTAGTAGGATCCACCAGGCATTCAGCTTTGAAGAGG\n" +
    "AACAGTCCAGGGATGATGAGCAGGATAGTCAAGACAGCGAGTCCGAGGATGGGAGTATTGACGAAGACCC\n" +
    "TGAGGGCAATGAAAACACGGTGGATCCAATCGACTGTTTGAGTGCCCCACGTGCTGTTGTCACCAAAGAA\n" +
    "GAGCTCATCACTGAGGAG\n" +
    ">gnl|GNOMON|70594930.m Model predicted by Gnomon on Acanthaster planci unplaced genomic scaffold, OKI-Apl_1.0 oki_scaffold1731, whole genome shotgun sequence (NW_019093085.1)\n" +
    "CAAGAACAGTGGATGAAGAAAACAGCAGGCGATAGCAGCGTGGTTGGCGCCTTGCCCCTGGGCTCATCTT\n" +
    "CTAGCATCACTGCCCTGATACGCGAAAGCAGCGTGGTTGGTCCCTTCCTGTGGGCTCATCTTCTGGCATC\n" +
    "ACTGCCCTGATAATGTAAGGCGGTAGCAGCGAGGTTGGTCCCCTGCCTGTGGGCTCATCTTCTGGAATCA\n" +
    "CCACCCT\n" +
    ">gnl|GNOMON|18113.m Partial model predicted by Gnomon on Acanthaster planci unplaced genomic scaffold, OKI-Apl_1.0 oki_scaffold1727, whole genome shotgun sequence (NW_019093081.1)\n" +
    "ATGGATTTCTACCAAGACATACAAAACTGCCAAACGTACGAAGCGCTCAACTTGCTTCTCGAAACCATTG\n" +
    "TACTCAGCGAAGATGAGAGGGCGTACGCTTTTCATAGACTGTGCGAACTGGCTCTGATTCAGGAGGCCGG\n" +
    "TGACGGTCCGGGGGATGAAGAGGAACGAATGGACCCGACTGAAGACGGCGCACCGCACCAGCGAGGGTAC\n" +
    "GGGCACGACAACGATGATCCGTGGGCAGAATTTGAGGAGGATGATCCAGAGGACGAGGGGACGGAAGAGC\n" +
    "TACCGGAGGAGGAAGACGAGGAGAACCAGCCACCGAGGAAAAGGATTCGCGTGGAGAGACCGCAAGATTA\n" +
    "TTACAATATTGTAGACGTTAATGAAAA\n" +
    ">gnl|GNOMON|130719778.m Model predicted by Gnomon on Acanthaster planci unplaced genomic scaffold, OKI-Apl_1.0 oki_scaffold1726, whole genome shotgun sequence (NW_019093080.1)\n" +
    "CCTGAGTTACAACTCCTTCTGTGCCCTTCCGCCATGGAGTTAACTTCCACGCACCTACTATAATCAGCAC\n" +
    "GAAACGCAAGACCATAGCTTAATACTTACAGGGAAGTGGATGATCGTGCTG\n" +
    ">gnl|GNOMON|65528162.m Model predicted by Gnomon on Acanthaster planci unplaced genomic scaffold, OKI-Apl_1.0 oki_scaffold1702, whole genome shotgun sequence (NW_019093056.1)\n" +
    "TATATGCAAACAGTCCACAGACCAGCACCAACTGGCCCTCTGTGATACCTGCAAGAAGCACTACCATCTG\n" +
    "GGCTGTCTGGACCCACCACTGAGCCGAATGCCTAAGAAGACTGCTTTCAGCGGATGGCAGTGCTCTGAGT\n" +
    "GCGTCTCATCTTCCAGTGATACCTCCATGGCTGAGACTGTAGAAGGCGAGGAAGGGGATGAGGCAGGCAG\n" +
    "GCGTAAGCGACGAGTCATCCGAGAACCCAATAAATTCACCCCTCCCGTGGACGGCAAAGGCGGTCAGAA\n" +
    ">gnl|GNOMON|85684402.m Model predicted by Gnomon on Acanthaster planci unplaced genomic scaffold, OKI-Apl_1.0 oki_scaffold1690, whole genome shotgun sequence (NW_019093044.1)\n" +
    "GGAAACTGTTGAAATGGTCCCCACCAGCCTAGCTCTTCTTCTTTCGCTGTTTGGAAGGGAACCTCTTTCA\n" +
    "CAAGGCAGATAGGGAAATATTTTCATTTCCAAGAGAGAGGTAGTCAGTGAGGATCCATCATCACCACGAG\n" +
    "AGGGTTACAATGATAACAGCCCAGATGAAGACATAGAAAATCCACTGGTGACAGGACAAAACCCAACTGT\n" +
    "CTACAAAATT\n" +
    ">gnl|GNOMON|65753714.m Model predicted by Gnomon on Acanthaster planci unplaced genomic scaffold, OKI-Apl_1.0 oki_scaffold1685, whole genome shotgun sequence (NW_019093039.1)\n" +
    "GTACCTATACCCACTAAACCAGTCAAATGCTTTGCAGGAGATTCCATCTCTGAAATGGAGACGATTCTGC\n" +
    "AGAATGCTGTGACCTAGCTGCTGGCATCAGATACTGCATTCAGATCCAACAAGACTGGTATTCTTGTAAG\n" +
    "ATGGGAACTACTACTACGTTGAGAACCTACCAGTCTGTCAGCCAGCCAACCAGGAACTTTACCATCCCCC\n" +
    "AGCCACCTTGTCAGC\n" +
    ">gnl|GNOMON|22673.m Partial model predicted by Gnomon on Acanthaster planci unplaced genomic scaffold, OKI-Apl_1.0 oki_scaffold1684, whole genome shotgun sequence (NW_019093038.1)\n" +
    "TGGGGAGCTTTGCAGGAACAAGCTTTTAGGACGCTGAAAGCGCGACTGGAATCACAACCGATCTTGAATC\n" +
    "TTCCCGATCCGGAGAAACCGTATATCTTAGCCACAGATGCCTCAGATGTAGGAATAGGGGCGGTGCTCAT\n" +
    "GCAAGAGCATGAAGGTGTGAACCATCCGATCAGCTATGCCAGCCGAAAGTTGCTGCCACCATCTCGCCTC\n" +
    "TATAACAAGGGCTTCGATGAGCAGCTCATCGGCAAGACAACAAGCCACAGGTCAAATGCCATAAGAGCGT\n" +
    "ACAAGAGAACCAGCGAGGACGAGAAGCAAGCTGTCAGCGTGGCTTTGTACGGAGAGTTACAGCAGG\n" +
    ">gnl|GNOMON|11409.m Partial model predicted by Gnomon on Acanthaster planci unplaced genomic scaffold, OKI-Apl_1.0 oki_scaffold1657, whole genome shotgun sequence (NW_019093011.1)\n" +
    "AAATTCAATAAAACAATTTTTCTAAAAGAAGGCTATTCAGTGAAAATGGCTTTGTGGTGTGATTACCTAT\n" +
    "GCATAGAATGTGCTCGAGATGAAGACCTGGAGAGTCTACCCAGCCACGAGGAAGAGCTTCAAGATGTTGG\n" +
    "GCAGCAACAGCAGCAAATGGATAACACACACATTGACCTTGTCACCCCAGAGCTGAGTGCCGAGGAAAAG\n" +
    "GAATCCATGCCCATGCCTCCGAGACTGTCTCACAAGAAGTCCCTCAAGAAGAAAAGTCCATCGGCTGAGC\n" +
    "ACAGCAGAAAAAGTGGCAGGAAGCTGGATTACCAGAGCTCTAACCAAG\n" +
    ">gnl|GNOMON|22945.m Partial model predicted by Gnomon on Acanthaster planci unplaced genomic scaffold, OKI-Apl_1.0 oki_scaffold1640, whole genome shotgun sequence (NW_019092994.1)\n" +
    "ATCTGCGCCCGCGGCGGCTGCACGCGGCCTCGCGGCCGGCGCTTCGACGTGCACCGGGGCGGCCCTCCTA\n" +
    "CTCGTTGGGGCGCACCACCCGGGCGGCGGTCCCACTCTTTCTCTGCCCCGACGGCCGGGTGTGGGCGGCA\n" +
    "CGCTCAGCGCCGTCCATTTTCAGGGCTAGTTGATTCGGCAGGCTCCATCTATCCTGAGGGAAACTTCGGA\n" +
    "GGGAACCAGCTACTAGACGGTTCGAATAGTCTTTCGCCCCTATACCCAAGTCGGTTTGCAG";

const wco = new WrapTCoffee(input);
// wco.exec();
wco.exec().then(result => {console.log(result)});

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