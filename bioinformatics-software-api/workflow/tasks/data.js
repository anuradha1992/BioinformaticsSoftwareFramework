/**
 * Created by anuradhawick on 9/11/17.
 */
export default class Data {
    static data;

    static execute() {
        return new Promise(resolve => resolve(Data.data));
    }
}