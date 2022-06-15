import { useEffect, useState } from 'react';

import { Modal, Backdrop, Fade, TextField, Button } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import callApiHelper from '../../Util/apiHelper';


import './modal.scss';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const EmployeeModal = ({ openModal, handleModal, modalData }) => {
    const [formState, setFormState] = useState({});
    const classes = useStyles();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        })
    };

    const submitHandler = (e) => {
        e.preventDefault();
        let params = {
            full_name: formState.full_name,
            salary: formState.salary,
            login_id: formState.login_id,
        };
        callApiHelper(`update_employee/${formState.employee_id}`, {}, 'PUT', params).then(response => {
            if(response.status === 204){
                alert(`Employee Id ${formState.employee_id} updated successfully !!` );
            } else {
                alert(`Cannot update the details successfully !!`)
            }
            handleModal();
        }).catch(ex => {
            alert(`Something Occured, Try again later !!`);
             handleModal();
        })
    };

    useEffect(() => {
        if (Object.keys(modalData).length && Object.keys(formState).length === 0) {
            setFormState({ ...modalData });
        }
    }, []);

    console.log(formState);
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openModal}>
                <div className={`${classes.paper} modalContainer`}>
                    <div className='title_modal'>
                        <h2>Edit employee </h2>
                        <HighlightOff onClick={handleModal} />
                    </div>

                    <div className='modalContent'>
                        <form noValidate autoComplete="off">
                            <TextField className={`textField`}
                                variant="outlined"
                                value={formState.employee_id}
                                disabled />

                            <TextField className={`textField`}
                                label={`Full Name`}
                                variant="outlined" onChange={handleChange}
                                value={formState.full_name} name={`full_name`} />

                            <TextField className={`textField`} label={`Login Id`}
                                variant="outlined" onChange={handleChange}
                                value={formState.login_id} name={`login_id`} />

                            <TextField className={`textField`} label={`Salary`}
                                variant="outlined" onChange={handleChange}
                                value={formState.salary} name={`salary`} />

                            <Button variant="contained" color="primary" onClick={submitHandler}>
                                Update
                            </Button>
                        </form>

                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default EmployeeModal;