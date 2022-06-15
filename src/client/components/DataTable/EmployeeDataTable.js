import { Fragment } from "react";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import './table.scss';

const EmployeeDataTable = () => {

const rows = [ {
        "id": 1,
        "full_name": "Corrianne Graffham",
        "login_id": "cgraffham0",
        "salary": 8214.74,
        "profile_pic": "http://dummyimage.com/156x100.png/cc0000/ffffff"
    },
    {
        "id": 2,
        "full_name": "Randolf Kaesmakers",
        "login_id": "rkaesmakers1",
        "salary": 9189.6,
        "profile_pic": "http://dummyimage.com/108x100.png/ff4444/ffffff"
    },
    {
        "id": 3,
        "full_name": "Nobe Todarini",
        "login_id": "ntodarini2",
        "salary": 9217.6,
        "profile_pic": "http://dummyimage.com/216x100.png/5fa2dd/ffffff"
    },
    {
        "id": 4,
        "full_name": "Myca Gromley",
        "login_id": "mgromley3",
        "salary": 8379.2,
        "profile_pic": "http://dummyimage.com/222x100.png/dddddd/000000"
    },
    {
        "id": 5,
        "full_name": "Gusella Francescotti",
        "login_id": "gfrancescotti4",
        "salary": 9033.58,
        "profile_pic": "http://dummyimage.com/125x100.png/dddddd/000000"
    },
    {
        "id": 6,
        "full_name": "Reese Potter",
        "login_id": "rpotter5",
        "salary": 9135.62,
        "profile_pic": "http://dummyimage.com/116x100.png/ff4444/ffffff"
    },
    {
        "id": 7,
        "full_name": "Zachary Meakes",
        "login_id": "zmeakes6",
        "salary": 8226,
        "profile_pic": "http://dummyimage.com/216x100.png/5fa2dd/ffffff"
    }
];
    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table className={`dataTableEmployee`} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Id</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Login</TableCell>
                            <TableCell align="center">Salary</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.id}</TableCell>
                                <TableCell align="left">{row.full_name}</TableCell>
                                <TableCell align="center">{row.login_id}</TableCell>
                                <TableCell align="center">{row.salary}</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
};


export default EmployeeDataTable;
