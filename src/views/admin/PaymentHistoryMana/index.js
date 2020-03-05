import React from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import './paymenthistory-mana.scss';
import adminApi from '../../../services/admin.service';
import helper from '../../../services/helper.service';
import DataTable from 'react-data-table-component';
const icon_search = require('../../../assets/icons/icon-search.png');

const columns = [
    // {
    //     name: 'نوع',
    //     selector: 'type',
    //     sortable: true,
    //     allowOverflow: true,
    // },
    {
        name: 'Date',
        selector: 'created_at',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'User',
        selector: 'email',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'Package',
        selector: 'packageID',
        sortable: true,
        allowOverflow: true,
    },
];

class PaymentHistoryMana extends React.Component {
    constructor(props) {
        super();
        this.state = {
            paymenthistory: [],
            isLoading: false,
            search: '',
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        adminApi.getPaymentHistory()
            .then((response) => {
                this.setState({
                    paymenthistory: response.data,
                    isLoading: false,
                    search: '',
                });
                console.log(this.state);
            })
            .catch((error) => {
                console.log('err: ', error);
                helper.showToast('Error', 'Error occupied.', 3);
            })
    }

    handleChangeSearchInput = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({[name] : value});
    };

    handleKeyPress = (event) => {
        // if(event.key === 'Enter') {
            this.handleSearch();
        // }
    }

    handleSearch = () => {
        this.setState({isLoading: true});
        adminApi.searchPaymentHistory({search: this.state.search})
            .then((response) => {
                if(response.status === 200) {
                    this.setState({
                        paymenthistory: response.data,
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
            <div className="paymenthistory-mana">
                <div className="card box-shadow">
                    <div className="action-header d-inline-flex">
                        <div className="table-header">
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
                    </div>
                    
                    <DataTable
                        // title="الأفراد إدارة الجدول"
                        columns={columns}
                        data={this.state.paymenthistory}
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

export default PaymentHistoryMana;