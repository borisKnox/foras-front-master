import React from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import './contacts-mana.scss';
import adminApi from '../../../services/admin.service';
import helper from '../../../services/helper.service';
import DataTable from 'react-data-table-component';

const icon_search = require('../../../assets/icons/icon-search.png');

const columns = [
    {
        name: 'اسم',
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
        name: 'موضوع',
        selector: 'subject',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'رسالة',
        selector: 'message',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'أنشئت في',
        selector: 'created_at',
        sortable: true,
        allowOverflow: true,
    },
];

class ContactsMana extends React.Component {
    constructor(props) {
        super();
        this.state = {
            tickets: [],
            isLoading: false,
            search: '',
        }
    }

    componentDidMount() {
        adminApi.getTickets()
            .then((response) => {
                this.setState({
                    tickets: response.data,
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
        adminApi.getTickets({search: this.state.search})
            .then((response) => {
                if(response.status === 200) {
                    this.setState({
                        tickets: response.data,
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
            <div className="tickets-mana">
                <div className="card box-shadow">
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
                    <DataTable
                        // title="الأفراد إدارة الجدول"
                        columns={columns}
                        data={this.state.tickets}
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

export default ContactsMana;