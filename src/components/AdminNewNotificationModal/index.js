import React from 'react';
import { Modal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import './admin-new-notification-modal.scss';
import adminApi from '../../services/admin.service';

class AdminNewNotificationModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: false,
            type: '1',
            message: '',
        }
    }
  
    handleClose = () => {
        this.setState({showModal: false});
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

    handleNewNotification = () => {
        adminApi.newNotification(this.state)
            .then((response) => {
                if (response.status === 200) {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log('err: ', error);
            });
    }
  
    render() {
        return (
            <div>
                <Button className="btn-new-notification" onClick={this.handleShow}>
                    إشعار جديد
                </Button>
        
                <Modal show={this.state.showModal} onHide={this.handleClose} className="new-notification-modal">
                    <Modal.Header>
                        <Modal.Title> إشعار جديد </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="new-notification-form">
                            <InputGroup className="my-3">
                                <FormControl
                                    as="textarea"
                                    placeholder="محتوى الإخطار"
                                    aria-label="message"
                                    aria-describedby="basic-addon1"
                                    rows="5"
                                    name="message"
                                    value={this.state.message}
                                    onChange={this.handleInputChange}
                                />
                            </InputGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-submit" onClick={this.handleNewNotification}>
                            خضع
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
}
  
export default AdminNewNotificationModal;