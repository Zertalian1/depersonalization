import React, { useState } from 'react';
import img3 from '../../assets/images/buttons/download/download-push.png'
import img2 from '../../assets/images/buttons/download/download-point.png'
import img1 from '../../assets/images/buttons/download/download-nonclick.png'
import axios from "axios";
const DownloadButton = () => {
    const [image, setImage] = useState(img1);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handlePress = () => {
        setImage(img3);
        axios.get("http://localhost:8080/api/database/depersonalize/download-file", {withCredentials:true,responseType:'blob'})
            .then(response => {
                // обрабатываем успешный ответ от сервера
                console.log(response);
                // create file link in browser's memory
                const href = URL.createObjectURL(response.data);

                // create "a" HTML element with href to file & click
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', 'depersonlizeData.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();

                // clean up "a" element & remove ObjectURL
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
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

export default DownloadButton;
