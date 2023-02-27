import React, { useState } from 'react';

import img1 from '../../assets/images/buttons/depersonalization/depersonalization-nonclick.png'
import img3 from '../../assets/images/buttons/depersonalization/depersonalization-pusht.png'
import img2 from '../../assets/images/buttons/depersonalization/depersonalization-point.png'
import axios from "axios";


const DepersonalizationButton = ({ selectedColumns }) => {
    const [image, setImage] = useState(img1);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handlePress = () => {
        setImage(img3)
        const result = selectedColumns.reduce((acc, curr) => {
            acc[curr] = true;
            return acc;
        }, {});

        axios.post("http://localhost:8080/api/database/personalize/depersonalize", result, {withCredentials:true})
            .then(response => {
                // обрабатываем успешный ответ от сервера
                console.log(response);
            })
            .catch(error => {
                // обрабатываем ошибку
                console.error(error);
            });
    };

    return (
        <div className="col-lg-12 d-flex mb-4 mt-4 justify-content-end">
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

export default DepersonalizationButton;
