import React, { useState } from 'react';

import img3 from '../../assets/images/buttons/getin/getin-push.png'
import img2 from '../../assets/images/buttons/getin/getin-point.png'
import img1 from '../../assets/images/buttons/getin/getin-nonclick.png'
import axios from "axios";
const   GetInButton = props => {
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
        fd.append('username',props.login);
        fd.append('password',props.password);
        axios.post('http://localhost:8080/login', fd,{withCredentials:true})
            .then((response) => {
                console.log(response.data);
                props.toggle();
                props.updateTable();
                props.setAccessLock(false);
            })
            .catch((error) => {
                props.setAccessLock(true);
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

export default GetInButton;
