import http from './http.service';

const path = {
    categories: 'categories',
};

export default {
    categories: function() {
        return http.get(path.categories, {});
    },
}