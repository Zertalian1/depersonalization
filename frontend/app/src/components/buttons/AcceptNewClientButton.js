import React, { useState } from 'react';

import img3 from '../../assets/images/buttons/create/create-push.png'
import img2 from '../../assets/images/buttons/create/create-point.png'
import img1 from '../../assets/images/buttons/create/create-nonclick.png'

import axios from "axios";
const AcceptNewClientButton = props => {
    const [image, setImage] = useState(img1);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handlePress = () => {
        setImage(img3);
        let fullName = props.fullName;
        let documentType = props.documentType;
        let documentNumber = props.documentNumber;
        let dateOfBirth = props.dateOfBirth;
        let contactInfo = props.contactInfo;
        let address = props.address;
        let gender = props.gender;
        let inn = props.inn;
        let snils = props.snils;
        let placeOfBirth = props.placeOfBirth;
        axios.post('http://localhost:8080/api/database/personalize/save', {
            fullName,documentType,documentNumber,dateOfBirth,contactInfo,address,gender,inn,snils,placeOfBirth
        },{withCredentials:true})
            .then((response) => {
                props.toggle();
                props.updateTable();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="col-lg-12 mb-4">
            <img
                className=""
                src={image}
                alt="button"
                draggable="false"
                style={{width: "50%", height: "100%"}}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onMouseDown={handlePress}
                onMouseUp={handleHover}
            >
            </img>
        </div>
    );
}

export default AcceptNewClientButton;
