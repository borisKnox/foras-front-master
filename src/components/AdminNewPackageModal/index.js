import React from 'react';
import { Modal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import './admin-new-package-modal.scss';
import adminApi from '../../services/admin.service';

class AdminNewPackageModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            showModal: false,
            type: '1',
            price: '',
            contactCount: '',
            postCount:'',
        }
    }
  
    handleClose = () => {
        this.setState({showModal: false});
    }
    
    handleShow = () => {
        this.setState({showModal: true});
    }

    handlePriceInputChange = (event) => {
        let target = event.target;
        let price = target.name;
        let value = target.value;
        this.setState({[price] : value});
    }

    handleContactInputChange = (event) => {
        let target = event.target;
        let contactCount = target.name;
        let value = target.value;
        this.setState({[contactCount] : value});
    }

    handlePostCountInputChange = (event) => {
        let target = event.target;
        let postCount = target.name;
        let value = target.value;
        this.setState({[postCount] : value});
    }

    handleNewPackage = () => {
        
        const body = {
            price: this.state.price,
            contactCount: this.state.contactCount,
            postCount: this.state.postCount
        }
        console.log(body);
        adminApi.newPackage(body)
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
                <Button className="btn-new-package" onClick={this.handleShow}>
                حزمة جديدة
                </Button>
        
                <Modal show={this.state.showModal} onHide={this.handleClose} className="new-package-modal">
                    <Modal.Header>
                        <Modal.Title>
                            حزمة جديدة
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="new-package-form">
                            <InputGroup className="d-block">
                                <FormControl
                                    placeholder="Price"
                                    aria-label="Price"
                                    aria-describedby="basic-addon1"
                                    type="number"
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.handlePriceInputChange}
                                />
                            </InputGroup>
                            <InputGroup className="d-block">
                                <FormControl
                                    placeholder="Contact Count"
                                    aria-label="Contact Count"
                                    aria-describedby="basic-addon1"
                                    type="number"
                                    name="contactCount"
                                    value={this.state.contactCount}
                                    onChange={this.handleContactInputChange}
                                />
                            </InputGroup>
                            <InputGroup className="d-block">
                                <FormControl
                                    placeholder="Job Post Count"
                                    aria-label="Job Post Count"
                                    aria-describedby="basic-addon1"
                                    type="number"
                                    name="postCount"
                                    value={this.state.postCount}
                                    onChange={this.handlePostCountInputChange}
                                />
                            </InputGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-submit" onClick={this.handleNewPackage}>
                            خضع
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
}
  
export default AdminNewPackageModal;