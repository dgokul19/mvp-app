import { Fragment, useEffect, useState } from "react";

import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, TablePagination,CircularProgress } from '@material-ui/core';

import { Edit, Delete, AccountCircle } from '@material-ui/icons';

import { stableSort, getComparator } from './tableHelper';

import CustomTableHead from './CustomTableHead';
import EmployeeModal from '../Modal/EmployeeModal';
import DeleteModal from '../Modal/DeleteModal';

import { modalState } from '../../Util/constants';

import { useStyles } from './tableStyle';

import './table.scss';

const EmployeeDataTable = ({ employees, filterParams, fetchList }) => {
    const classes = useStyles();

    const [employeeData, setEmployeeData] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modal, setModal] = useState({ ...modalState });

    useEffect(() => {
        let data = [];
        if (!employeeData.length && employees?.data?.length) {
            data = [...employees.data];
            setEmployeeData(data);
        }
        if (parseFloat(filterParams.minimumSalary) >= 0 && parseFloat(filterParams.maximumSalary) >= 0) {
            data = [...employees.data].filter(value => {
                if (value.salary >= parseFloat(filterParams.minimumSalary) && value.salary <= parseFloat(filterParams.maximumSalary)) {
                    return true;
                }
            });
            setEmployeeData(data.length ? data : []);
        } else {
            data = [...employees.data];
            setEmployeeData(data);
        }
    }, [filterParams, employees]);


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

    const triggerEmployeeModal = (row, modalType) => {
        setModal({
            openState: true,
            data: row,
            modalType: modalType
        })
    };
    const resetModal = () => {
        setModal({ data: {}, modalState: false, modalType: '' });
        fetchList();
    };

    const loadContent = () => {
        if (employees.isFetching) {
            return (
                <Fragment>
                    <div className="loaderTable">
                        <CircularProgress />
                    </div>
                </Fragment>
            )
        } else if (employees.error) {
            return <Fragment>
                <div className="loaderTable">
                    <h2>{employees.errorMessage}</h2>
                </div>
            </Fragment>
        } else if (employees?.data?.length) {
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
                                                <AccountCircle />
                                                {row.full_name}
                                            </TableCell>
                                            <TableCell align="center">{row.login_id}</TableCell>
                                            <TableCell align="center">{row.salary}</TableCell>
                                            <TableCell align="center" className="actionCell">
                                                <Edit onClick={() => triggerEmployeeModal(row, 'edit')} />
                                                <Delete onClick={() => triggerEmployeeModal(row, 'delete')} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        } else {
            return (
                <Fragment>
                    <TableContainer component={Paper}>
                        <Table className={`dataTableEmployee`} aria-label="simple table">
                            <CustomTableHead
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                            />
                            <TableBody>
                                <TableRow
                                    hover>
                                    <TableCell align="center" colSpan={5}>{`No data found !!`}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Fragment>
            )
        }
    };

    return (
        <Fragment>
            {loadContent()}
            {employees?.data?.length > 0 && <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={employees?.data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
            {(modal.openState && modal.modalType === 'edit') && <EmployeeModal openModal={modal.openState} modalData={modal.data} handleModal={resetModal} />}
            {(modal.openState && modal.modalType === 'delete') && <DeleteModal openModal={modal.openState} modalData={modal.data} handleModal={resetModal} />}
        </Fragment>
    )
};


export default EmployeeDataTable;