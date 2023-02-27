import React, {useRef, useState} from 'react';

import img3 from '../../assets/images/buttons/upload/upload-push.png'
import img2 from '../../assets/images/buttons/upload/upload-point.png'
import img1 from '../../assets/images/buttons/upload/upload-nonclick.png'
import axios from "axios";
const UploadButton = props => {
    const [image, setImage] = useState(img1);
    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handleFileSelect = (event) => {
        console.log(event);
        setSelectedFile(event.target.files[0])
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        axios.post('http://localhost:8080/api/database/personalize/upload-file', formData,{withCredentials:true, headers:{"Content-Type":"multipart/form-data"}})
            .then((response) => {
                console.log(response.data);
                props.updateTable();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handlePress = () => {
        setImage(img3);
        inputFile.current.click();

    };

    return (
        <div className="col-lg-12 d-flex mb-4 mt-4 justify-content-end">
            <input type="file" style={{display:"none"}} ref={inputFile} onChange={handleFileSelect} />
            <img
                className=""
                src={image}
                alt="button"
                style={{width: "80%", height: "100%"}}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onMouseDown={handlePress}
                onMouseUp={handleHover}
            >
            </img>
        </div>
    );
}

export default UploadButton;
