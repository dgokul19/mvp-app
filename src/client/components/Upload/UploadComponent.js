import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import './upload.scss';

const UploadComponent = () => {
    return (
        <div className="childContent uploadContent">
            <div className='uploadBox'>
                <CloudUploadIcon />
            </div>
        </div>
    );
};


export default UploadComponent;