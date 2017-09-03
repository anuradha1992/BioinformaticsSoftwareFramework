/**
 * Created by anuradhawick on 9/3/17.
 */
import PythonShell from 'python-shell';

export default class WrapBlast {
    options;

    // TODO these are the parameters
    constructor(arg1, arg2, arg3) {
        this.options = {
            mode: 'text',
            // pythonPath: 'python',
            pythonOptions: ['-u'],
            // scriptPath: './blast',
            args: [arg1, arg2, arg3]
        };
    }

    exec() {
        const shell = new PythonShell('./python-wrappers/blast/blast.py', this.options);

        shell.on('message', (message) => {
            console.log('MESSAGE: ',message);
        });

        return new Promise((resolve, reject) => {
            shell.end((err) => {
                if (err) reject();
                console.log('finished');
                resolve();
            });
        });

    }
}