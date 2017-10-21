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
        switch (step.text) {
            case 'User Input':
                steps.push(new Step(new Task.Data(step.inputs[0].value), null, index === 0));
                break;
            case 'BlastN':
                steps.push(new Step(new Task.Blast(), null, index === 0));
                break;
            case 'Clustal Omega':
                steps.push(new Step(new Task.ClustalOmega(), null, index === 0));
                break;
            case 'Visualize Output':
                steps.push(new Step(new Task.Visualize(), null, index === 0));
                break;
        }
    });

    for (let i = 0; i < steps.length - 1; i++) {
        steps[i].setNext(steps[i + 1]);
    }

    steps[0].start().then(result => {
        console.log(result);
        res.send(result);
    });
});


module.exports = router;