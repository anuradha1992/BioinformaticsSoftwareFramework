/**
 * Created by Vijini on 10/20/17.
 */

import cmd from 'node-cmd';
import fs from 'fs';
import uuidv4 from 'uuid/v4';

export default class WrapClustalOmega {
    input;

    // TODO these are the parameters
    constructor(inp = null) {
        this.input = inp;
    }

    exec() {

        // Get input file name
        const inputFilename = uuidv4();

        // Create input file with input data
        fs.writeFileSync(`${__dirname}/${inputFilename}.fasta`, this.input);

        // Get output file name
        const outputFilename = uuidv4();

        return new Promise((resolve, reject) => {
            const command = `${__dirname}/clustalo -i ${__dirname}/${inputFilename}.fasta -o ${__dirname}/${outputFilename}.fasta --auto --force -v`;
            // console.log('COMMAND:', command);
            // console.log('execute command');

            // Execute clustal omega command
            cmd.get( command, (err, data, stderr) => {
                    // console.log('RESULTS: ', data);
                    // console.log('finished aligning');

                    // Read .fasta result
                    const content = fs.readFileSync(`${__dirname}/${outputFilename}.fasta`, 'utf8');
                    // console.log('CONTENT: ', content);

                    resolve({step: 'clustal-omega', output: content});

                    // Remove input file
                    fs.unlinkSync(`${__dirname}/${inputFilename}.fasta`);
                    // console.log('input file removed');

                    // Remove output file
                    fs.unlinkSync(`${__dirname}/${outputFilename}.fasta`);
                    // console.log('output file removed');
                }
            );

        });

    }
}