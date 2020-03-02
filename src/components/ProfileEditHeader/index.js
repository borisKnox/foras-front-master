import React from 'react';
import 'react-rater/lib/react-rater.css';
import { Button } from 'react-bootstrap';
import './profile-edit-header.scss';

const detail_img = require('../../assets/profile-images/default-individual.png');
const icon_camera = require('../../assets/icons/icon-camera.png');

class ProfileEditHeader extends React.Component {
    constructor(props) {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="container pt-3">
                <div className="card individual-detail-header text-center">
                    <div className="row">
                        <div className="col-6 profile-info">
                            <div className="detail-img-container">
                                <div className="detail-img-wrapper p-0">
                                    <img src={this.props.user.logo 
                                        ? this.props.user.logo 
                                        : detail_img} alt="detail-img" className="detail-img" />
                                    <Button className="btn-upload">
                                        <img src={icon_camera} alt="icon-camera" width="30" />
                                    </Button>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-6 package-info">
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default ProfileEditHeader;