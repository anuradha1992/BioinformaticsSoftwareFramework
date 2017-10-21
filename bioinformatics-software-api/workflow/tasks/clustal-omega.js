/**
 * Created by Vijini on 10/21/17.
 */

import uuidv4 from 'uuid/v4';
import fs from 'fs';
import path from 'path';

import WrapClustalOmega from '../../python-wrappers/clustal-omega/wrap-clustal-omega';

export default class ClustelOmega {

    execute(...taskParams) {
        // console.log(Blast.data === this.a);
        // const tempPath = path.join(__dirname, uuidv4());

        // fs.writeFileSync(tempPath, taskParams);

        const wrap = new WrapClustalOmega(taskParams[0]);
        //
        return wrap.exec();
        //
        // return new Promise(resolve => resolve(Blast.data))
    }
}