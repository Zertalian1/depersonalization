import React, { useState } from 'react';
import img3 from '../../assets/images/buttons/add/add-push.png'
import img2 from '../../assets/images/buttons/add/add-point.png'
import img1 from '../../assets/images/buttons/add/add-nonclick.png'
const AddClientButton = ({toggle}) => {
    const [image, setImage] = useState(img1);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handlePress = () => {
        setImage(img3);
        toggle();
    };

    return (
        <div className="col-lg-12 d-flex mb-5 mt-5 justify-content-center">
            <img
                className=""
                src={image}
                alt="button"
                style={{width: "15%", height: "10%"}}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onMouseDown={handlePress}
                onMouseUp={handleHover}
            >
            </img>
        </div>
    );
}

export default AddClientButton;
