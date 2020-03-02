import React from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import './messages-mana.scss';
import adminApi from '../../../services/admin.service';
import helper from '../../../services/helper.service';
import DataTable from 'react-data-table-component';

const icon_search = require('../../../assets/icons/icon-search.png');

const columns = [
    {
        name: 'مرسل',
        selector: 'sender',
        sortable: true,
        allowOverflow: true,
        cell: row => <span> {row.sender.name} </span>
    },
    {
        name: 'المتلقي',
        selector: 'receiver',
        sortable: true,
        allowOverflow: true,
        cell: row => <span> {row.receiver.name} </span>
    },
    // {
    //     name: 'الصورة الرمزية لل',
    //     selector: 'logo',
    //     sortable: true,
    //     allowOverflow: true,
    //     cell: row => <img src={row.logo ? row.logo : img_default_individual} alt={row.name} className="img-logo" />
    // },
    // {
    //     name: 'موضوع',
    //     selector: 'subject',
    //     sortable: true,
    //     allowOverflow: true,
    // },
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

class MessagesMana extends React.Component {
    constructor(props) {
        super();
        this.state = {
            messages: [],
            isLoading: false,
            search: '',
        }
    }

    componentDidMount() {
        adminApi.getMessages()
            .then((response) => {
                this.setState({
                    messages: response.data,
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
        adminApi.getMessages({search: this.state.search})
            .then((response) => {
                if(response.status === 200) {
                    this.setState({
                        messages: response.data,
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
            <div className="messages-mana">
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
                        data={this.state.messages}
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

export default MessagesMana;