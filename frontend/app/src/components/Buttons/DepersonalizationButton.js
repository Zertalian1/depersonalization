import React, { useState } from 'react';

import img1 from '../../assets/images/depersonalization/depersonalization-nonclick.png'
import img3 from '../../assets/images/depersonalization/depersonalization-pusht.png'
import img2 from '../../assets/images/depersonalization/depersonalization-point.png'
const DepersonalizationButton = () => {
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
                style={{width: "40%", height: "100%"}}
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
