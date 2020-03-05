import React from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import './membership-mana.scss';
import adminApi from '../../../services/admin.service';
import AdminNewPackageModal from '../../../components/AdminNewPackageModal';
import helper from '../../../services/helper.service';
import DataTable from 'react-data-table-component';
const icon_search = require('../../../assets/icons/icon-search.png');

const columns = [

    {
        name: 'Price',
        selector: 'price',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'Contact Count',
        selector: 'contactCount',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'Post Count',
        selector: 'postCount',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'أنشئت في',
        selector: 'created_at',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'الإذن',
        selector: 'permission',
        sortable: true,
        right: true,
        allowOverflow: true,
        cell: row => <Form.Control as="select" defaultValue={row.permission} onChange={(event) => handlePermission(event, row.id)}>
                        <option value="active"> active </option>
                        <option value="close"> close </option>
                    </Form.Control>
    },
];


const handlePermission = (event, id) => {
    const permission = event.target.value;
    console.log(permission);
    // adminApi.updatePackageState({id: id, permission: permission})
    //     .then((response) => {
    //         if(response.status === 200) {
    //             helper.showToast('Success', 'Successfully updated.', 1);
    //         }
    //     })
    //     .catch((error) => {
    //         console.log('err: ', error);
    //         helper.showToast('Error', 'Error occupied.', 3);
    //     });
}
class MembershipMana extends React.Component {
    constructor(props) {
        super();
        this.state = {
            membership:[],
            // membership: [
            //     {

            //         message: '1',
            //         created_by: 'message',
            //         created_at: 'true'
            //     },
            //     {

            //         message: '2',
            //         created_by: 'message',
            //         created_at: 'true'
            //     },
            //     {

            //         message: '3',
            //         created_by: 'message',
            //         created_at: 'true'
            //     }
                
            // ],
            isLoading: false,
            search: '',
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        adminApi.getPackageList()
            .then((response) => {
                console.log(response);
                this.setState({
                    membership: response.data,
                    isLoading: false,
                    search: '',
                });
            })
            .catch((error) => {
                console.log('err: ', error);
                helper.showToast('Error', 'Error occupied.', 3);
            })
    }

    render() {
        return (
            <div className="membership-mana">
                <div className="card box-shadow">
                    <div className="action-header d-inline-flex">
                        <AdminNewPackageModal />
                    </div>
                    
                    <DataTable
                        columns={columns}
                        data={this.state.membership}
                        pagination={true}
                        keyField='name'
                        striped={true}
                        highlightOnHover={true}
                        pointerOnHover={true}
                        progressPending={this.state.isLoading}
                        noHeader={true}
                        paginationComponentOptions={{ rowsPerPageText: 'الصفوف في كل صفحة:', rangeSeparatorText: 'من', noRowsPerPage: false }}
                    />
                </div>
            </div>
        );
    }
}

export default MembershipMana;