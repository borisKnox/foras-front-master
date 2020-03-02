import React from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import './jobs-mana.scss';
import adminApi from '../../../services/admin.service';
import helper from '../../../services/helper.service';
import DataTable from 'react-data-table-component';

const img_default_corporate = require('../../../assets/profile-images/default-corporate.png');
const icon_search = require('../../../assets/icons/icon-search.png');

const columns = [
    {
        name: 'مسمى الوظيفة',
        selector: 'job_name',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'الشركات',
        selector: 'corporate',
        sortable: true,
        allowOverflow: true,
        cell: row => <span>{row.users.name}</span>
    },
    {
        name: 'شعار',
        selector: 'logo',
        sortable: true,
        allowOverflow: true,
        cell: row => <img src={row.users.logo ? row.users.logo : img_default_corporate} alt={row.users.name} className="img-logo" />
    },
    {
        name: 'الفئة',
        selector: 'category',
        sortable: true,
        allowOverflow: true,
        cell: row => <span>{row.categories.category_name}</span>
    },
    {
        name: 'موقعك',
        selector: 'location',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'تاريخ البدء',
        selector: 'start_date',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'تاريخ الانتهاء',
        selector: 'end_date',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'أيام العمل',
        selector: 'workdays',
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: 'ساعات العمل',
        selector: 'workhours',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'نوع الراتب',
        selector: 'salary_type',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'مبلغ الراتب',
        selector: 'salary_amount',
        sortable: true,
        allowOverflow: true,
    },
    {
        name: 'اللغات',
        selector: 'languages',
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: 'تفاصيل الوظيفة',
        selector: 'job_details',
        sortable: true,
        allowOverflow: true,
        wrap: true,
    },
    {
        name: 'الحالة',
        selector: 'status',
        sortable: true,
        right: true,
        allowOverflow: true,
        cell: row => <Form.Control as="select" defaultValue={row.status} onChange={(event) => handleJobStatus(event, row.id)}>
                        <option value="open"> open </option>
                        <option value="processing"> processing </option>
                        <option value="completed"> completed </option>
                        <option value="closed"> closed </option>
                        <option value="deleted"> deleted </option>
                    </Form.Control>
    },
    {
        name: 'أنشئت في',
        selector: 'created_at',
        sortable: true,
        right: true,
        allowOverflow: true,
    },
];

const handleJobStatus = (event, id) => {
    const status = event.target.value;
    adminApi.updateJobStatus({id: id, status: status})
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

class JobsMana extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: false,
            jobs: [],
            search: '',
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        adminApi.getJobs()
            .then((response) => {
                console.log('>>', response);
                this.setState({
                    jobs: response.data,
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
        adminApi.getJobs({search: this.state.search})
            .then((response) => {
                if(response.status === 200) {
                    this.setState({
                        jobs: response.data,
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
            <div className="jobs-mana">
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
                        data={this.state.jobs}
                        pagination={true}
                        keyField='id'
                        striped={true}
                        highlightOnHover={true}
                        pointerOnHover={true}
                        progressPending={this.state.isLoading}
                        noHeader={true}
                        paginationComponentOptions={{ rowsPerPageText: 'الصفوف في كل صفحة:', rangeSeparatorText: 'من', noRowsPerPage: false }}
                    />
                    {/* <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="job_name"> مسمى الوظيفة </th>
                                <th className="corporate"> الشركات </th>
                                <th className="logo"> شعار </th>
                                <th className="category"> الفئة </th>
                                <th className="location"> موقعك </th>
                                <th className="start_date"> تاريخ البدء </th>
                                <th className="end_date"> تاريخ الانتهاء </th>
                                <th className="workdays"> أيام العمل </th>
                                <th className="workhours"> ساعات العمل </th>
                                <th className="salary_type"> نوع الراتب </th>
                                <th className="salary_amount"> مبلغ الراتب </th>
                                <th className="languages"> اللغات </th>
                                <th className="job_details"> تفاصيل الوظيفة </th>
                                <th className="status"> الحالة </th>
                                <th className="created_at"> أنشئت في </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.jobs && this.state.jobs.map((obj, index) => 
                                <tr key={index}>
                                    <td> {obj.id} </td>
                                    <td> {obj.job_name} </td>
                                    <td> {obj.users.name} </td>
                                    <td> 
                                        <img src={obj.users.logo ? obj.users.logo : img_default_corporate} alt={obj.users.name} className="img-logo" />
                                    </td>
                                    <td> {obj.categories.category_name} </td>
                                    <td> {obj.location} </td>
                                    <td> {obj.start_date} </td>
                                    <td> {obj.end_date} </td>
                                    <td> {obj.workdays} </td>
                                    <td> {obj.workhours} </td>
                                    <td> {obj.salary_type} </td>
                                    <td> {obj.salary_amount} </td>
                                    <td> {obj.languages} </td>
                                    <td> {obj.job_details} </td>
                                    <td> 
                                        <Form.Control as="select" onChange={(event) => this.handleJobStatus(event, obj.id)}>
                                            <option value="open" selcted={obj.status === 'active' ? 'selected' : ''}> open </option>
                                            <option value="processing" selcted={(obj.status === 'pending' || obj.status === '') ? 'selected' : ''}> processing </option>
                                            <option value="completed" selcted={obj.status === 'close' ? 'selected' : ''}> completed </option>
                                            <option value="closed" selcted={obj.status === 'close' ? 'selected' : ''}> closed </option>
                                            <option value="deleted" selcted={obj.status === 'close' ? 'selected' : ''}> deleted </option>
                                        </Form.Control>
                                    </td>
                                    <td> {obj.created_at} </td>
                                </tr>
                            )}
                        </tbody>
                    </Table> */}
                </div>
            </div>
        );
    }
}

export default JobsMana;