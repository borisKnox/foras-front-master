import http from './http.service';
import environment from '../environments';

const path = {
    linkedinAccessToken: 'https://www.linkedin.com/oauth/v2/accessToken',
    getProfileFromLinkedin: 'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))',
    getEmailFromLinkedin: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
};

export default {
    linkedinAccessToken: function(code) {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Access-Control-Allow-Origin': '*'
        };

        return http.commonPost(`${path.linkedinAccessToken}?grant_type=authorization_code&code=${code}&redirect_uri=${environment.LinkedinRedirectUri}&client_id=${environment.LinkedinClientID}&client_secret=${environment.LinkedinClientSecret}`, {}, headers);
        // return http.commonPost(`${path.linkedinAccessToken}?grant_type=client_credentials&code=${code}&client_id=${environment.LinkedinClientID}&client_secret=${environment.LinkedinClientSecret}`, {}, headers);
    },
    getProfileFromLinkedin: function(access_token) {
        const headers = {
            'Connection': 'Keep-Alive',
            "Authorization": `Bearer ${access_token}`
        };
        return http.commonGet(`${path.getProfileFromLinkedin}`, headers);
    },
    getEmailFromLinkedin: function(access_token) {
        console.log('>>>', access_token);
        const headers = {
            'Connection': 'Keep-Alive',
            "Authorization": `Bearer ${access_token}`
        };
        return http.commonGet(`${path.getEmailFromLinkedin}`, headers);
    }

}