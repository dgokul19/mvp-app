import { Fragment, useEffect, useState } from 'react';

import EmployeeDataTable from './DataTable/EmployeeDataTable';

import callApiHelper from '../Util/apiHelper';

import './Style/dashboard.scss';

const DashboardContent = () => {

    const [employees, setEmployees] = useState();

    const fetchEmployeesList = async () => {
        callApiHelper('employees', {}, 'GET').then(response => {
          if(response.status === 200) {
            setEmployees(response.data);
          }
        });
    };

    useEffect(() => {
        fetchEmployeesList()
    },[]);

    return (
        <Fragment>
            <div className='dashBoardContainer'>
                <div className='filterSection'>

                </div>
                <h3 className='title'> Employees </h3>

                <EmployeeDataTable employees={employees}/>
            </div>
        </Fragment>
    );
};


export default DashboardContent;