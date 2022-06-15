import { Fragment, useState } from "react";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel,
        CircularProgress } from '@material-ui/core';

import { Edit, Delete } from '@material-ui/icons';

import { headColumns, stableSort, getComparator } from './tableHelper';

import { useStyles } from './tableStyle';

import './table.scss';

const EmployeeDataTable = ({ employees }) => {
    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    function CustomTableHead(props) {
        const { classes, order, orderBy, onRequestSort } = props;

        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headColumns.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'center' : 'left'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    const loadContent = () => {
        if (employees?.length) {
            return (
                <TableContainer component={Paper}>
                    <Table className={`dataTableEmployee`} aria-label="simple table">
                        <CustomTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={employees.length}
                        />
                        <TableBody>
                            {stableSort(employees.data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(row => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                        <TableCell align="left">{row.id}</TableCell>
                                            <TableCell align="left">{row.full_name}</TableCell>
                                            <TableCell align="center">{row.login_id}</TableCell>
                                            <TableCell align="center">{row.salary}</TableCell>
                                            <TableCell align="center" className="actionCell">
                                                <Edit />
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
            console.log({employees});
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
        </Fragment>
    )
};


export default EmployeeDataTable;