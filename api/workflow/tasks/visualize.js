/**
 * Created by anuradhawick on 9/11/17.
 */
export default class Visualize {

    static execute(...taskParams) {
        console.log('PERFORMING VISUALIZATIONS');
        return new Promise((resolve) => {
            resolve('DONE');
        });
    }
}