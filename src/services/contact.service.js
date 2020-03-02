import http from './http.service';

const path = {
    submitTicket: 'web/submitTicket',
};

export default {
    submitTicket: function(ticket) {
        return http.post(path.submitTicket, ticket, {});
    },
}