import React from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import './corporates-mana.scss';
import adminApi from '../../../services/admin.service';
import helper from '../../../services/helper.service';
import DataTable from 'react-data-table-component';
import AdminNewCorporateModal from '../../../components/AdminNewCorporateModal';

const img_default_corporate = require('../../../assets/profile-images/default-corporate.png');
const icon_search = require('../../../assets/icons/icon-search.png');

const columns = [
    {
        name: 'PG Integrated',
        selector: 'name',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'البريد الإلكتروني',
        selector: 'email',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'شعار',
        selector: 'logo',
        sortable: true,
        allowOverflow: true,
        cell: row => <img src={row.logo ? row.logo : img_default_corporate} alt={row.name} className="img-logo" />
    },
    {
        name: 'عنوان',
        selector: 'address',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'مدينة',
        selector: 'city',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'حالة',
        selector: 'state',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'هاتف',
        selector: 'phone',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'رقم السجل التجاري',
        selector: 'commercial_registration',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'مجالات عمل الشركة',
        selector: 'sector',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'مسجل من قبل',
        selector: 'registered_by',
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
                        <option value="pending"> pending </option>
                        <option value="close"> close </option>
                    </Form.Control>
    },
];

const handlePermission = (event, id) => {
    const permission = event.target.value;
    adminApi.updateUserPemission({id: id, permission: permission, role: 'individual'})
        .then((response) => {
            if(response.status === 200) {
                helper.showToast('Success', 'Successfully updated.', 1);
            }
        })
        .catch((error) => {
            console.log('err: ', error);
            helper.showToast('Error', 'Error occupied.', 3);
        });
}

class CorporatesMana extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: false,
            corporates: [],
            search: '',
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        adminApi.getCorporates()
            .then((response) => {
                this.setState({
                    corporates: response.data,
                    isLoading: false,
                    search: '',
                });
            })
            .catch((error) => {
                console.log('err: ', error);
            })
    }

    handleChangeSearchInput = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({[name] : value});
    };

    handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            this.handleSearch();
        }
    }

    handleSearch = () => {
        this.setState({isLoading: true});
        adminApi.getCorporates({search: this.state.search})
            .then((response) => {
                if(response.status === 200) {
                    this.setState({
                        corporates: response.data,
                        isLoading: false
                    });
                }
            })
            .catch((error) => {
                console.log('err: ', error);
            })
    }

    render() {
        return (
            <div className="corporates-mana">
                <div className="card box-shadow">
                    <div className="table-header">
                        <AdminNewCorporateModal />
                        <InputGroup className="mb-0">
                            <Button className="btn-search" onClick={this.handleSearch}>
                                <img src={icon_search} className="img-search" alt="icon-search" />
                            </Button>
                            <FormControl
                                placeholder="بحث"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                                type="text"
                                name="search"
                                value={this.state.search}
                                onChange={this.handleChangeSearchInput}
                                onKeyUp={this.handleKeyPress}
                            />
                        </InputGroup>
                    </div>
                    <DataTable
                        // title="الأفراد إدارة الجدول"
                        columns={columns}
                        data={this.state.corporates}
                        pagination={true}
                        keyField='id'
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

export default CorporatesMana;