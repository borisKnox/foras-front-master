import http from './http.service';
import session from './session.service';

const path = {
    getJobs: 'jobs/read',
    jobDetail: 'jobs/details',
    postJob: 'jobs/create',
};

export default {
    getJobs: function(body) {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.post(path.getJobs, body, header);
    },
    jobDetail: function(param) {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.get(`${path.jobDetail}/${param}`, header);
    },
    postJob: function(body) {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.post(path.postJob, body, header);
    },
}