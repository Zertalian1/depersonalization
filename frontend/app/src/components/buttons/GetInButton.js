import React, { useState } from 'react';

import img3 from '../../assets/images/buttons/getin/getin-push.png'
import img2 from '../../assets/images/buttons/getin/getin-point.png'
import img1 from '../../assets/images/buttons/getin/getin-nonclick.png'
import axios from "axios";
const GetInButton = ({ toggle, login, password }) => {
    const [image, setImage] = useState(img1);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handlePress = () => {
        setImage(img3);
        let fd = new FormData();
        fd.append('username',login);
        fd.append('password',password);
        axios.post('http://localhost:8080/login', fd,{withCredentials:true})
            .then((response) => {
                console.log(response.data);
                toggle();
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

export default GetInButton;
