/**
 * Created by anuradhawick on 9/11/17.
 */
import WrapBlast from '../../python-wrappers/blast/wrap-blast';


export default class Blast {

    execute(...taskParams) {
        const wrap = new WrapBlast('blastn', 'nr', taskParams[0]);
        return wrap.exec();
    }
}