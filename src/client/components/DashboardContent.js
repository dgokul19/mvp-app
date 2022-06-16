import { Fragment, useEffect, useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import EmployeeDataTable from './DataTable/EmployeeDataTable';

import callApiHelper from '../Util/apiHelper';
import { defaultEmployeeState } from '../Util/constants';

import './Style/dashboard.scss';

const DashboardContent = () => {

    const [employees, setEmployees] = useState({...defaultEmployeeState});
    const [filter, setFilter] = useState({minimumSalary : '', maximumSalary : ''});

    const fetchEmployeesList = async () => {
        callApiHelper('get_employees', {}, 'GET').then(response => {
          if(response.status === 200) {
            setEmployees({ ...employees, data : response.data});
          } else {
            setEmployees({
                ...employees,
                error : true,
                errorMessage : 'No data found !!'
            })
          }
        }).catch(ex => {
            setEmployees({
                ...employees,
                error : true,
                errorMessage : 'Server Error, Please Try Again Later !!'
            })
        });
    };

    useEffect(() => {
        fetchEmployeesList()
    },[]);

    const handleSalryRange = (e) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name] : value
        })
    };

    return (
        <Fragment>
            <div className='dashBoardContainer'>
                <h3 className='title'> Employees </h3>
                <div className='filterSection'>
                    <TextField
                        className={`filterField`}
                        variant="outlined"
                        name={`maximumSalary`}
                        onChange={handleSalryRange}
                        label="Maximum Salary"
                        value={filter.maximumSalary}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className={`filterField`}
                        variant="outlined"
                        label="Minimum Salary"
                        value={filter.minimumSalary}
                        onChange={handleSalryRange}
                        name={`minimumSalary`}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <EmployeeDataTable employees={employees} filterParams={filter} fetchList={() => fetchEmployeesList()}/>
            </div>
        </Fragment>
    );
};


export default DashboardContent;