import React, { useState } from 'react';
import img3 from '../../assets/images/buttons/chooseDepersonalize/output-push.png'
import img2 from '../../assets/images/buttons/chooseDepersonalize/output-point.png'
import img1 from '../../assets/images/buttons/chooseDepersonalize/output-nonclick.png'
const ChooseDepersonalizeDataButton = props => {
    const [image, setImage] = useState(img1);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handlePress = () => {
        setImage(img3);
        props.switchDatabase("depersonalize")
    };

    return (
        <div className="col-lg-12 d-flex mb-2 mt-2 justify-content-end">
            <img
                className=""
                src={image}
                alt="button"
                draggable="false"
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

export default ChooseDepersonalizeDataButton;
