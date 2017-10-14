/**
 * Created by anuradhawick on 9/11/17.
 */
export default class Visualize {

    static execute(...taskParams) {
        return new Promise((resolve) => {
            const resultObject = {
                type: 'seqMatches',
                command: 'visualize',
                data: taskParams[0]
            };

            resolve(resultObject);
        });
    }
}