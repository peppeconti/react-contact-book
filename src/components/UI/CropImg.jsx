import React, { useState } from 'react';
import styles from './CropImg.module.scss';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../functions/cropImage';
// BOOTSTRAP COMPS
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const CropImg = ({ fileList, blob, setBlob, getBlob, inputImg, setInputImg, setImage }) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(2);

    /* onCropComplete() will occur each time the user modifies the cropped area, 
    which isn't ideal. A better implementation would be getting the blob 
    only when the user hits the submit button, but this works for now  */
    const onCropComplete = async (_, croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(
            inputImg,
            croppedAreaPixels
        )
        getBlob(croppedImage);
    };

    const closeCropper = () => {
        setImage('');
        setInputImg('');
        setBlob(null);
        setZoom(2);
        // RESETTING FILELIST IN INPUFILE
        fileList.current.value = ''; 
    };

    const closeAndCrop = () => {
        let imageUrl = window.URL.createObjectURL(blob);
        setImage(imageUrl);
        setInputImg('');
        setZoom(2);
        // RESETTING FILELIST IN INPUFILE
        fileList.current.value = ''; 
    };

    const zoomHandler = (e) => {
        const zoomValue = e.target.value;
        setZoom(zoomValue);
    };

    return (
        <div className={styles.wrapper}>
            <Container className='d-flex justify-content-center align-items-center' fluid>
                <Col className='p-0 m-0 d-flex justify-content-center align-items-center flex-column' lg={6} md={10} sm={10} xs={12}>
                    <div className={styles.cropperContainer}>
                        <Cropper
                            image={inputImg}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className={styles.cropperControl}>
                        <input className={styles.zoom} type="range" id="range" name="zoom"
                            min="1" max="10" value={zoom} step="1" onChange={zoomHandler} />
                        <button className={styles.button} type='button' onClick={closeCropper}>Cancel</button>
                        <button className={styles.button} type='button' onClick={closeAndCrop}>Crop</button>
                    </div>
                </Col>
            </Container>
        </div>
    )
}
export default CropImg;