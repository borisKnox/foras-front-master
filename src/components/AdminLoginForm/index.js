import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './admin-login-form.scss';
import Line from '../Line';
import adminApi from '../../services/admin.service';
import session from '../../services/session.service';
import helper from '../../services/helper.service';

const icon_email = require('../../assets/icons/icon-email.png');
const icon_password = require('../../assets/icons/icon-password.png');

class AdminLoginForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: false,
            email: '',
            password: '',
        }
    }

    handleInputChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({[name] : value});
    }

    handleLogin = () => {
        adminApi.login(this.state)
            .then((response) => {
                if (response.status === 200) {
                    session.set('foras-user', response.data);
                    helper.showToast('Success', 'Successfully logged in.', 1);
                    window.location.reload();
                } else {
                    helper.showToast('Error', 'Failed to log in.', 3);
                }
            })
            .catch((error) => {
                console.log('err: ', error);
                helper.showToast('Error', 'Invalid Admin.', 3);
            });
    }

    render() {
        return (
            <div className="admin-login">
                <Form className="admin-login-form">
                    <h2 className="text-center mb-4"> تسجيل الدخول كمسؤول </h2>
                    <Line />
                    <Form.Group controlId="formAdminEmail" className="mt-4">
                        <img src={icon_email} className="input-icon email-icon" alt="Email Icon" />
                        <Form.Control 
                            type="email" 
                            placeholder="البريد الإلكتروني" 
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAdminPassword">
                        <img src={icon_password} className="input-icon password-icon" alt="Password Icon" />
                        <Form.Control 
                            type="password" 
                            placeholder="كلمه السر" 
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="button" className="btn-admin-login-form-submit" onClick={this.handleLogin}>
                        تسجيل الدخولs
                    </Button>
                </Form>
            </div>
        );
    }
}

export default AdminLoginForm;