import { Fragment, useEffect, useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import EmployeeDataTable from './DataTable/EmployeeDataTable';

import callApiHelper from '../Util/apiHelper';

import './Style/dashboard.scss';

const initialState = {
    data : [],
    error : false,
    errorMessage : ''
};

const DashboardContent = () => {

    const [employees, setEmployees] = useState({...initialState});
    const [filter, setFilter] = useState({minumumSalary : '', maximumSalary : ''});

    const fetchEmployeesList = async () => {
        callApiHelper('employees', {}, 'GET').then(response => {
          if(response.status === 200) {
            setEmployees(response.data);
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

    return (
        <Fragment>
            <div className='dashBoardContainer'>
                <h3 className='title'> Employees </h3>
                <div className='filterSection'>
                    <TextField
                        className={`filterField`}
                        variant="outlined"
                        label="Minimum Salary"
                        value={filter.minumumSalary}
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
                </div>
                <EmployeeDataTable employees={employees}/>
            </div>
        </Fragment>
    );
};


export default DashboardContent;