import React, { useState } from 'react';

import img3 from '../../assets/images/getin/getin-push.png'
import img2 from '../../assets/images/getin/getin-point.png'
import img1 from '../../assets/images/getin/getin-nonclick.png'
const GetInButton = () => {
    const [image, setImage] = useState(img1);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handlePress = () => {
        setImage(img3);
    };

    return (
        <div className="col-lg-12 d-flex mb-4 mt-4 justify-content-end">
            <img
                className=""
                src={image}
                alt="button"
                style={{width: "100%", height: "100%"}}
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
