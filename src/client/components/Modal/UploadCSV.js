import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Backdrop, Fade, Button, Card, CircularProgress, List, ListItem, ListItemText } from '@material-ui/core';
import { HighlightOff, CloudUpload, Search, InsertDriveFile, Close } from '@material-ui/icons';

import { initialUpload } from '../../Util/constants';

import { useStyles } from './modalStyle';

import '../Style/modal.scss';

const UploadCSVModal = ({ openModal, handleModal }) => {
    const [upload, setUpload] = useState({...initialUpload});
    const [file, setFile] = useState({ selectedFile: null, displayFiles: [] });

    const classes = useStyles();

    const onFileChange = (e) => {
        let files = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            if (file.size < 2048 && file.type === 'text/csv') {
                files.push({
                    name: file?.name,
                    size: file?.size,
                    type: file?.type,
                })
            }
        }
        setFile({ selectedFile: e.target.files, displayFiles: files });
    };

    const removeCurrentElement = (removeElemIndex) => {
        let temp = { ...file };
        temp.displayFiles.splice(removeElemIndex, 1);
        setFile(temp);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
            file?.displayFiles.forEach(element => {
                for (let i = 0; i < file.selectedFile.length; i++) {
                    if(file.selectedFile[i].name === element.name) {
                        formData.append('files', file.selectedFile[i]);
                    }
                }
            });
        setUpload({ ...upload,isuploading : true});
        axios({
            method: "post",
            url: "http://localhost:8080/users/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(response => {
            if(response.status === 201){
                 setUpload({isuploading : true, data : response.data});
            }
        }).catch(ex => {
            alert(`There is a problem in uploading the content, Error =>${ ex}`);
        })
    };
                        console.log('file.selected', upload);

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
                            <h2>Upload Employee CSV</h2>
                            <HighlightOff className="uploadClose" onClick={handleModal} />
                        </div>
                        <div className='modalContent uploadModalContent'>
                            <div className='uploadContent'>
                                <CloudUpload />
                                <input id='upload' type="file" multiple onChange={onFileChange} />
                                <label htmlFor="upload"><Search />Browse Files</label>
                            </div>

                            {file?.displayFiles && <div className='fileContentInModal'>
                                {
                                    file.displayFiles.map((eachFile, index) => {
                                        return (
                                            <Card key={eachFile.name} className={`fileElement`}>
                                                <Close className='fileCloseIcon' onClick={() => removeCurrentElement(index)} />
                                                <InsertDriveFile />
                                                <span>{eachFile.name}</span>
                                            </Card>
                                        );
                                    })
                                }

                            </div>}
                        </div>
                        <div className='uploadFooter'>
                            {file.displayFiles?.length > 0 && <Button variant="contained" color="primary" onClick={submitHandler}>
                                Upload
                            </Button>}
                        </div>

                        {upload.isuploading && (
                            <div className='uploadedContent'>
                                {upload.data.length === 0 &&  (
                                    <div className='loader_uploading'>
                                        <CircularProgress />
                                        Uploading...
                                    </div>
                                )}
                                {
                                    <List className="uploadedStatus">
                                        {
                                            upload.data.map(value => (
                                                <ListItem key={value.file_name} button className={`defaultStatus ${value.error && 'error-info'}`}>
                                                    <ListItemText primary={`File Name : ${value.file_name}, Upload Status : ${value.error ? value.error : value.message}`} />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                }
                            </div>
                        )}
                    </div>
                </Fade>
            </Modal>
        </Fragment>
    );
};

export default UploadCSVModal;