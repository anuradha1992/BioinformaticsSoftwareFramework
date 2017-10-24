/**
 * Created by Vijini on 10/21/17.
 */

/**
 * This wrapper requires T-Coffee to be installed locally.
 * Can be downloaded from http://www.tcoffee.org/Projects_home_page/t_coffee_home_page.html
 */

import cmd from 'node-cmd';
import fs from 'fs';
import uuidv4 from 'uuid/v4';

export default class WrapTCoffee {
    input;

    // TODO these are the parameters
    constructor(inp = null) {
        this.input = inp;
    }

    exec(){
        // Get input file name
        const inputFilename = uuidv4();

        // Create input file with input data
        fs.writeFileSync(`${__dirname}/${inputFilename}.fasta`, this.input);

        // Get output file name
        const outputFilename = uuidv4();

        return new Promise((resolve, reject) => {

            // Format t-coffee command to execute
            const command = `t_coffee -output clustalw  -infile ${__dirname}/${inputFilename}.fasta -outfile ${__dirname}/${outputFilename}.aln`;

            // Execute t-coffee command
            cmd.get( command, (err, data, stderr) => {

                // Read .fasta result
                const content = fs.readFileSync(`${__dirname}/${outputFilename}.aln`, 'utf8');

                resolve(content);

                // Remove input file
                fs.unlinkSync(`${__dirname}/${inputFilename}.fasta`);

                // Remove output file
                fs.unlinkSync(`${__dirname}/${outputFilename}.aln`);

                // Remove .dnd file formed for input file
                fs.unlinkSync(`${__dirname}/../../${inputFilename}.dnd`);
            });

        });
    }
}