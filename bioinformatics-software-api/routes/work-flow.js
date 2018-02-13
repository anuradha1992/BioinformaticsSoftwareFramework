/**
 * Created by anuradhawick on 10/14/17.
 */
import express from "express";
import * as _ from 'lodash';

import Step from '../workflow/step';
import * as Task from '../workflow/tasks';

const router = express.Router();

router.use((req, res, next) => {
    next()
});

router.post('/flow', (req, res) => {
    res.header('content-type', 'application/json');

    const steps = [];

    _.each(req.body.steps, (step, index) => {
        console.log(step.text);
        switch (step.text) {
            case 'User Input':
                steps.push(new Step(new Task.Data(step.inputs[0].value), null, index === 0));
                break;
            case 'Blast':
                const blastInputs = {};

                _.each(step.inputs, (input) => {
                    blastInputs[input.name] = input.value
                });

                steps.push(new Step(new Task.Blast(`blast${_.lowerCase(blastInputs['N/P'])}`), null, index === 0));
                break;
            case 'Clustal Omega':
                steps.push(new Step(new Task.ClustalOmega(), null, index === 0));
                break;
            case 'Visualize Output':
                steps.push(new Step(new Task.Visualize(), null, index === 0));
                break;
            case 'DIALIGN':
                steps.push(new Step(new Task.Dialign(), null, index === 0));
                break;
            case 'T-Coffee':
                steps.push(new Step(new Task.TCoffee(), null, index === 0));
                break;
        }
    });

    for (let i = 0; i < steps.length - 1; i++) {
        steps[i].setNext(steps[i + 1]);
    }

    steps[0].start().then(result => {
        console.log('SENDING RESULT OVER HTTP');
        res.send(result);
    }).catch((e) => {
        console.log('ERROR OCCURRED', e);
        res.status(500);
    });
});


module.exports = router;