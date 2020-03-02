import http from './http.service';
import session from './session.service';

const path = {
    login: 'admin/login',
    getIndividuals: 'admin/individuals',
    getCorporates: 'admin/corporates',
    updateUserPemission: 'admin/updateUserPemission',
    getJobs: 'admin/jobs',
    updateJobStatus: 'admin/updateJobStatus',
    getNotifications: 'admin/notifications',
    newNotification: 'admin/newNotification',
    getMessages: 'admin/messages',
    getTickets: 'admin/tickets',
};

export default {
    login: function(admin) {
        return http.post(path.login, admin, {});
    },
    getIndividuals: function(body) {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.post(path.getIndividuals, body, header);
    },
    getCorporates: function() {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.post(path.getCorporates, {}, header);
    },
    updateUserPemission: function(body) {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.post(path.updateUserPemission, body, header);
    },
    getJobs: function(body) {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.post(path.getJobs, body, header);
    },
    updateJobStatus: function(body) {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.post(path.updateJobStatus, body, header);
    },
    getNotifications: function(body) {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.post(path.getNotifications, body, header);
    },
    newNotification: function(body) {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.post(path.newNotification, body, header);
    },
    getMessages: function(body) {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.post(path.getMessages, body, header);
    },
    getTickets: function(body) {
        const user = session.get('foras-user');
        const api_token = user ? user.api_token : '';
        const header = {
            Authorization: 'Bearer ' + api_token
        };

        return http.post(path.getTickets, body, header);
    },
}