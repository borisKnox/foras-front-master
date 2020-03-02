import environment from '../environments';

export default {
    post: function(path, body, headers = {}) {
        return fetch(`${environment.baseApi}/${path}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                ...headers
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(body)
        })
        .then((response) => response.json());
    },
    get: function(path, headers = {}) {
        return fetch(`${environment.baseApi}/${path}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                ...headers
            }
        })
        .then((response) => response.json());
    },
    commonPost: function(path, body, headers = {}) {
        return fetch(`${path}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
            //make sure to serialize your JSON body
        })
        .then((response) => response.json());
    },
    commonGet: function(path, headers) {
        return fetch(`${path}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Allow-Origin': `${window.location.origin}`,
                // 'Access-Control-Expose-Headers':
                'Access-Control-Max-Age': 1728000,
                ...headers
            }
            //make sure to serialize your JSON body
        })
        .then((response) => response.json());
    },
}