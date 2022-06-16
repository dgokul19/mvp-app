import { Fragment, useEffect, useState } from 'react';

import { Modal, Backdrop, Fade, Button } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';

import callApiHelper from '../../Util/apiHelper';
import { useStyles } from './modalStyle';

import '../Style/modal.scss';

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
                            <h2>Delete employee</h2>
                            <HighlightOff onClick={handleModal} />
                        </div>

                        <div className='modalContent footContent'>
                            <h3> Are you sure want do delete employee - {formState.full_name}({formState.employee_id}) ?</h3>
                            <div>
                                <Button variant="contained" color="primary" onClick={submitHandler}>
                                    Delete
                                </Button>

                                <Button variant="contained" color="default" onClick={handleModal}>
                                    Cancel
                                </Button>
                            </div>
                            
                        </div>
                    </div>
                </Fade>
            </Modal>
        </Fragment>
    );
};

export default DeleteModal;