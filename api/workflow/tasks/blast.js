/**
 * Created by anuradhawick on 9/11/17.
 */
import WrapBlast from '../../python-wrappers/blast/wrap-blast';

export default class Blast {

    static execute(taskParams) {
        const wrap = new WrapBlast();
        return wrap.exec();
    }
}