import { Fragment, useEffect, useState } from 'react';

import { Modal, Backdrop, Fade, Button } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import callApiHelper from '../../Util/apiHelper';

import '../Style/modal.scss';

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

const DeleteModal = ({ openModal, handleModal, modalData }) => {
    const [formState, setFormState] = useState({});

    const classes = useStyles();

    const submitHandler = (e) => {
        e.preventDefault();
        callApiHelper(`employees/${formState.employee_id}`, {}, 'DELETE').then(response => {
            if (response.status === 204) {
                alert(`Employee Id ${formState.employee_id} updated successfully !!`);
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

    return (
        <Fragment>
            <Modal
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
                            <h2>Delete - {formState.full_name}({formState.employee_id})</h2>
                            <HighlightOff onClick={handleModal} />
                        </div>

                        <div className='modalContent footContent'>
                            <Button variant="contained" color="primary" onClick={submitHandler}>
                                Update
                            </Button>

                            <Button variant="contained" color="default" onClick={handleModal}>
                                Cancel
                            </Button>

                        </div>
                    </div>
                </Fade>
            </Modal>
        </Fragment>
    );
};

export default DeleteModal;