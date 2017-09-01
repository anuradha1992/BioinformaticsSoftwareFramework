/**
 * Created by anuradhawick on 9/2/17.
 */
import rp from 'request-promise';

// TODO to be used as the template class to access the web services
// Documentation https://github.com/request/request-promise
export default class SampleWebhook {
    constructor() {

    }

    testRequest() {
        const options = {
            uri: 'https://jsonplaceholder.typicode.com/comments',
            qs: {
                postId: '1' // -> uri + '?access_token=xxxxx%20xxxxx'
            },
            // TODO tbd
            // headers: {
            //     'User-Agent': 'Request-Promise'
            // },
            json: true // Automatically parses the JSON string in the response
        };

        rp(options)
            .then(function (repos) {
                console.log('User has %d repos', repos.length, repos);
            })
            .catch(function (err) {

            });
    }
}