import React from 'react';
import { Modal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import './login-modal.scss';
import userApi from '../../services/user.service';
import session from '../../services/session.service';
import helper from '../../services/helper.service';
import ForasGoogleLogin from '../ForasGoogleLogin';
import ConfirmRoleModal from '../ConfirmRoleModal';
import ForasFacebookLogin from '../ForasFacebookLogin';
import ForasLinkedinLogin from '../ForasLinkedinLogin';

const img_btn_go = require('../../assets/images/btn-go.png');
const icon_email = require('../../assets/icons/icon-email.png');
const icon_password = require('../../assets/icons/icon-password.png');
const img_indicator = require('../../assets/images/login-indicator.png');

class LoginModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: false,
            showRoleModal: false,
            email: '',
            password: '',
            errors: {},
            profile: {},
            access_token: '',
            login_type: ''
        }
    }
  
    handleClose = () => {
        this.setState({showModal: false});
    }

    closeRoleModal = () => {
        this.setState({showRoleModal: false});
    }
    
    handleShow = () => {
        this.setState({showModal: true});
    }

    handleInputChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({[name] : value});
    }

    handleLogin = () => {
        helper.startLoader();
        userApi.login(this.state)
            .then((response) => {
                helper.stopLoader();
                if (response.status === 200) {
                    session.set('foras-user', response.data);
                    helper.showToast('Success', 'Successfully logged in', 1);
                    window.location.reload();
                } else if(response.status === 400){
                    if(response.errors) {
                        this.setState({errors: response.errors});
                    }
                } else {
                    helper.showToast('Error', 'Invalid User', 3);
                }
            })
            .catch((error) => {
                helper.stopLoader();
                console.log('err: ', error);
                helper.showToast('Error', 'Invalid User', 3);
            });
    }
    
    // === Google Login === //
    handleGoogleLoginResponse = (profile) => {
        this.setState({
            profile: profile,
            // showRoleModal: true,
            showModal: false,
            login_type: 'google'
        });
        this.handleNext('');
    }

    // === Facebook Login === //
    handleFacebookLoginResponse = (profile) => {
        this.setState({
            profile: profile,
            // showRoleModal: true,
            showModal: false,
            login_type: 'facebook'
        });
        this.handleNext('');
    }

    // === Linkedin Login === //
    handleLinkedinLoginResponse = (token) => {
        console.log('token: ', token);
        this.setState({
            access_token: token,
            // showRoleModal: true,
            showModal: false,
            login_type: 'linkedin'
        });
        this.handleNext('');
    }

    handleNext = (role) => {
        let profile = {};
        if (this.state.login_type === 'linkedin') {
            this.linkedinLoginWithLinkedinAccessToken(role);
        } else {
            profile = {
                email: this.state.profile.email,
                name: this.state.profile.name,
                logo: this.state.profile.logo,
                first_name: this.state.profile.first_name,
                last_name: this.state.profile.last_name,
                login_type: this.state.login_type,
                role: role
            }
            this.socialLogin(profile);
        }
    }

    linkedinLoginWithLinkedinAccessToken = (role) => {
        helper.startLoader();
        userApi.socialLogin({login_type: 'linkedin', access_token: this.state.access_token, role: role})
            .then((response) => {
                helper.stopLoader();
                if (response.status === 200) {
                    if (response.data.role) {
                        session.set('foras-user', response.data);
                        helper.showToast('Success', 'Successfully logged in', 1);
                        window.location.reload();
                    } else {
                        this.setState({showRoleModal: true});
                    }
                } else {
                    helper.showToast('Error', 'Invalid User', 3);
                }
            })
            .catch((err) => {
                helper.stopLoader();
                console.log('err: ', err);
            })
    }

    socialLogin = (profileObj) => {
        helper.startLoader();
        userApi.socialLogin(profileObj)
            .then((response) => {
                helper.stopLoader();
                if (response.status === 200) {
                    if (response.data.role) {
                        session.set('foras-user', response.data);
                        helper.showToast('Success', 'Successfully logged in', 1);
                        window.location.reload();
                    } else {
                        this.setState({showRoleModal: true});
                    }
                } else if(response.status === 400){
                    if(response.errors) {
                        this.setState({errors: response.errors});
                    }
                } else {
                    helper.showToast('Error', 'Invalid User', 3);
                }
            })
            .catch((error) => {
                helper.stopLoader();
                console.log('err: ', error);
            })
    }
  
    render() {
        return (
            <div>
                <Button className="btn-login" onClick={this.handleShow}>
                تسجيل الدخول
                </Button>
        
                <Modal show={this.state.showModal} onHide={this.handleClose} className="login-modal">
                    <Modal.Header>
                        <Modal.Title>تسجيل الدخول</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="login-form">
                            <div className="err-msg text-center"> {(this.state.errors && typeof this.state.errors === 'string') ? this.state.errors : ''} </div>
                            <InputGroup className="my-3 d-block">
                                <img src={icon_email} className="input-icon" alt="Email Icon" />
                                <FormControl
                                    placeholder="ahmed@mail.com"
                                    aria-label="email"
                                    aria-describedby="basic-addon1"
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                />
                                <div className="err-msg"> {this.state.errors.email ? this.state.errors.email[0] : ''} </div>
                            </InputGroup>
                            <InputGroup className="mt-4 mb-3 d-block">
                                <img src={icon_password} className="input-icon" alt="Password Icon" />
                                <FormControl
                                    placeholder="كلمه السر"
                                    aria-label="Password"
                                    aria-describedby="basic-addon2"
                                    className="input-password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                                {/* <a href="/" className="btn-toggle-show">
                                    show
                                </a> */}
                                <div className="err-msg"> {this.state.errors.password ? this.state.errors.password[0] : ''} </div>
                            </InputGroup>
                            {/* <div className="text-right px-4 err-msg">asdaf asdfsda f</div> */}
                            <div className="text-center mt-3">
                                <img src={img_indicator} className="login-indicator" alt="Login Indicator" />
                            </div>
                        </Form>
                        <div className="social-icon-group pt-3">
                            <ForasLinkedinLogin handleLinkedinLoginResponse={this.handleLinkedinLoginResponse} />
                            <ForasGoogleLogin handleGoogleLoginResponse={this.handleGoogleLoginResponse} />
                            <ForasFacebookLogin handleFacebookLoginResponse={this.handleFacebookLoginResponse} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-go icon-button" onClick={this.handleLogin}>
                            <img src={img_btn_go} className="img-btn-go" alt="Go Button" />
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* === Role Confirm Modal For Social Login === */}
                <ConfirmRoleModal 
                    showModal={this.state.showRoleModal} 
                    handleNext={this.handleNext} 
                    closeRoleModal={this.closeRoleModal} 
                />
            </div>
        );
    }
    
}
  
export default LoginModal;