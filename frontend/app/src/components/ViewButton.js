import React, { useState } from 'react';
import img1 from '../assets/images/authorization/authorization-nonclick.png';
import img2 from '../assets/images/authorization/authorization-point.png';
import img3 from '../assets/images/authorization/authorization-push.png';

const ViewButton = () => {
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
            <button
                className=""
                style={{backgroundColor: 'none' , backgroundImage: `url(${image})`}}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onMouseDown={handlePress}
                onMouseUp={handleHover}
            >
                dfjglsdhjksdfgkbn
                <i className="mdi mdi-plus me-1"/>
            </button>
        </div>
    );
}

export default ViewButton;
