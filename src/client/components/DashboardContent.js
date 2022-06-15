import { Fragment } from 'react';

import EmployeeDataTable from './DataTable/EmployeeDataTable';

import './Style/dashboard.scss';

const DashboardContent = () => {
    return (
        <Fragment>
            <div className='dashBoardContainer'>
                <div className='filterSection'>

                </div>
                <h3 className='title'> Employees </h3>

                <EmployeeDataTable />
            </div>
        </Fragment>
    );
};


export default DashboardContent;