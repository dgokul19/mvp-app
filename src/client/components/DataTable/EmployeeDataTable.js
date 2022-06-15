import { Fragment, useEffect, useState } from "react";

import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, TablePagination, TableSortLabel,
        CircularProgress } from '@material-ui/core';

import { Edit, Delete, AccountCircle } from '@material-ui/icons';

import { stableSort, getComparator } from './tableHelper';

import CustomTableHead from './CustomTableHead';
import EmployeeModal from '../Modal/EmployeeModal';

import { useStyles } from './tableStyle';

import './table.scss';

const modalState = {
    openState : false,
    data : {}
};

const EmployeeDataTable = ({ employees, filterParams, fetchList }) => {
    const classes = useStyles();

    const [employeeData, setEmployeeData] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [ modal, setModal ] = useState({...modalState});

    useEffect(() => {
        let data = [];
        if(!employeeData.length && employees?.data?.length){
            data = [ ...employees.data];
            setEmployeeData(data);
        }
        if(parseFloat(filterParams.minimumSalary) >= 0 && parseFloat(filterParams.maximumSalary) >= 0) {
            data = [ ...employees.data].filter(value => {
                if(value.salary >= parseFloat(filterParams.minimumSalary) && value.salary <=  parseFloat(filterParams.maximumSalary)) {
                    return true;
                }
            });            
            setEmployeeData(data.length ? data : []);
        } else{
            data = [ ...employees.data];
            setEmployeeData(data);
        }
    },[filterParams, employees]);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const editEmployeeDetails = ( row ) => {
        setModal({
            openState : true,
            data : row
        })
    }
    const resetModal = ( ) => {
        setModal({data : {}, modalState : false});
        fetchList();
    }

    const loadContent = () => {
        if (employees?.data?.length) {
            return (
                <TableContainer component={Paper}>
                    <Table className={`dataTableEmployee`} aria-label="simple table">
                        <CustomTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={employeeData.length}
                        />
                        <TableBody>
                            {stableSort(employeeData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(row => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.full_name}
                                        >
                                        <TableCell align="left">{row.employee_id}</TableCell>
                                            <TableCell className={`nameCell`} align="left">
                                                {row.profile_pic ? <img src={row.profile_pic} alt='Profile Picture of Employee'/> : <AccountCircle/>}
                                                {row.full_name}
                                            </TableCell>
                                            <TableCell align="center">{row.login_id}</TableCell>
                                            <TableCell align="center">{row.salary}</TableCell>
                                            <TableCell align="center" className="actionCell">
                                                <Edit onClick={() => editEmployeeDetails(row)}/>
                                                <Delete />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        } else {
            if(employees.error) {
                return <Fragment>
                    <div className="loaderTable">
                        <h2>{employees.errorMessage}</h2>   
                    </div>
                </Fragment>
            }
            return (
                <Fragment>
                    <div className="loaderTable">
                        <CircularProgress  />   
                    </div>
                </Fragment>
            )
        }
    };

    return (
        <Fragment>
            {loadContent()}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={employees?.data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
           {modal.openState && <EmployeeModal openModal={modal.openState} modalData={modal.data} handleModal={resetModal}/>}
        </Fragment>
    )
};


export default EmployeeDataTable;