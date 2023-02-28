import React, { useState } from 'react';
import img3 from '../../assets/images/buttons/choosePersonalize/input-push.png'
import img2 from '../../assets/images/buttons/choosePersonalize/input-point.png'
import img1 from '../../assets/images/buttons/choosePersonalize/input-nonclick.png'
const ChoosePersonalizeDataButton = props => {
    const [image, setImage] = useState(img1);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handlePress = () => {
        setImage(img3);
        props.switchDatabase("personalize")
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

export default ChoosePersonalizeDataButton;
