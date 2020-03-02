import React from 'react';
import session from '../../services/session.service';
import './profile.scss';
import ProfileEditHeader from '../../components/ProfileEditHeader';
import ProfileEditBody from '../../components/ProfileEditBody';
import ProfileEditFooter from '../../components/ProfileEditFooter';

class ProfileEdit extends React.Component {
    constructor(props) {
        super();
        this.state = {
            role: null,
            user: {},
        }
    }

    componentDidMount() {
        const user = session.get('foras-user');
        if(user) {
            this.setState({role: user.role, user: user});
        } else {
            window.location.href='/';
        }
    }

    render() {
        return (
            <div className="main bg-detail-header">
                <div className="individual-profile">
                    <ProfileEditHeader user={this.state.user}  />
                    <ProfileEditBody user={this.state.user}  />
                    <ProfileEditFooter user={this.state.user} />
                </div>
            </div>
        );
    }
    
}

export default ProfileEdit;