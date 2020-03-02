import React from 'react';
import jobApi from '../../services/job.service';
import './map.scss';
import ForasHeroImage from '../../components/ForasHeroImage';
import ForasOpportunityMap from '../../components/ForasOpportunityMap';
import ForasFilterJobs from '../../components/ForasFilterJobs';
import ForasFilterIndividuals from '../../components/ForasFilterIndividuals';
import session from '../../services/session.service';
import userApi from '../../services/user.service';

const hero_img = require('../../assets/images/map-hero.png');
const img_map_footer = require('../../assets/images/map-footer.png');

class Map extends React.Component {
    constructor(props) {
        super();
        this.state = {
            jobs: [],
            individuals: [],
            userRole: null,
        }
    }

    componentDidMount() {
        global.sortObj = {
            orderBy: null,
            orderDirection: 'ASC',
            search: null
        };
        const user = session.get('foras-user');
        if(user) {
            this.setState({userRole: user.role});
        }
        this.getJobs(global.sortObj);
        this.getIndividuals(global.sortObj);
    }

    getJobs = (body) => {
        jobApi.getJobs(body)
            .then((response) => {
                if(response.status === 200) {
                    this.setState({jobs: response.data});
                }
            })
            .catch((error) => {
                console.log('err: ', error);
            })
    }

    getIndividuals = (body) => {
        userApi.getIndividuals(body)
            .then((response) => {
                if(response.status === 200) {
                    this.setState({individuals: response.data});
                }
            })
            .catch((error) => {
                console.log('err: ', error);
            })
    }

    handleSearch = (search) => {
        global.sortObj.search = search;
        this.getJobs(global.sortObj);
    }

    handleSort = () => {
        if(this.state.userRole === 'individual') {
            this.getJobs(global.sortObj);
        } else {
            this.getIndividuals(global.sortObj);
        }
    }

    handleFilter = (filter) => {
        if(this.state.userRole === 'individual') {
            this.getJobs(filter);
        } else {
            this.getIndividuals(filter);
        }
    }

    render() {
        return (
            <div className="main">
                <ForasHeroImage src={hero_img} footer={false} handleSearch={this.handleSearch} />
                <ForasOpportunityMap 
                    data={this.state.userRole && this.state.userRole === 'individual' ? this.state.jobs : this.state.individuals} 
                    userRole={this.state.userRole} 
                    handleFilter={this.handleFilter}
                />
                {/* <ForasOpportunityMap /> */}
                {/* <img src={img_map_footer} className="map-footer" alt="map-footer" /> */}
                {this.state.userRole && this.state.userRole === 'individual' 
                    ? <ForasFilterJobs data={this.state.jobs} handleSort={this.handleSort} /> 
                    : <ForasFilterIndividuals data={this.state.individuals} handleSort={this.handleSort} />}
            </div>
        );
    }
}

export default Map;