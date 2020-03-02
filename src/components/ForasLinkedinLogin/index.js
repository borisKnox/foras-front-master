import React from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import environment from '../../environments';
import socialApi from '../../services/social.service';

const img_linkedin = require('../../assets/images/btn-linkedin.png');

class ForasLinkedinLogin extends React.Component {
    constructor(props) {
        super();
        this.state = {
          profileObj: {}
        }
    }

    handleSuccess = (response) => {
        if (response.code) {
          socialApi.linkedinAccessToken(response.code)
            .then((res) => {
                console.log('in-res: ', res);
              if(res.access_token) {
                this.props.handleLinkedinLoginResponse(res.access_token);
              }
            })
            .catch((err) => {
              console.log('in-err: ', err);
            })
        }
    }

    handleFailure = (error) => {
        console.log('in-err: ', error);
    }

    render() {
        return (
            <LinkedIn
                clientId={environment.LinkedinClientID}
                scope="r_emailaddress,r_liteprofile,w_member_social"
                // fields="id,firstName,lastName,emailAddress,profilePicture"
                onFailure={this.handleFailure}
                onSuccess={this.handleSuccess}
                redirectUri={environment.LinkedinRedirectUri}
                renderElement={({ onClick, disabled }) => (
                    <button className="social-btn icon-button" onClick={onClick} disabled={disabled}>
                        <img src={img_linkedin} className="social-icon" alt="Linkedin" />
                    </button>
                )}
            />
        );
    }
}

export default ForasLinkedinLogin;