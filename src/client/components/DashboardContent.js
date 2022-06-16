import { Fragment, useEffect, useState } from 'react';
import { TextField, InputAdornment, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import EmployeeDataTable from './DataTable/EmployeeDataTable';
import UploadCSV from './Modal/UploadCSV';

import callApiHelper from '../Util/apiHelper';
import { defaultEmployeeState } from '../Util/constants';

import './Style/dashboard.scss';

const DashboardContent = () => {

    const [employees, setEmployees] = useState({...defaultEmployeeState});
    const [filter, setFilter] = useState({minimumSalary : '', maximumSalary : ''});

    const [modal, setModal] = useState(false);

    const fetchEmployeesList = async () => {
        setEmployees({
            ...employees,
            isFetching : true
        });
        callApiHelper('get_employees', {}, 'GET').then(response => {
          if(response.status === 200) {
            setEmployees({ ...employees, isFetchine: false, data : response.data});
          } else {
            setEmployees({
                ...employees,
                isFetchine: false,
                error : true,
                errorMessage : 'No data found !!'
            })
          }
        }).catch(ex => {
            setEmployees({
                ...employees,
                isFetchine: false,
                error : true,
                errorMessage : 'Server Error, Please Try Again Later !!'
            })
        });
    };

    useEffect(() => {
        fetchEmployeesList();
    },[]);

    const handleUploadModal = (inputType) => {
        if(!inputType) {
            fetchEmployeesList();
        }
        setModal(inputType);
    };

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
                    <Button variant="contained" onClick={() => handleUploadModal(true)}>Upload Employee CSV</Button>

                    <div className='filterRange'>
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
                </div>
                <EmployeeDataTable employees={employees} filterParams={filter} fetchList={() => fetchEmployeesList()}/>
                {modal && <UploadCSV openModal={modal} handleModal={() => handleUploadModal(false)}/>}
            </div>
        </Fragment>
    );
};


export default DashboardContent;