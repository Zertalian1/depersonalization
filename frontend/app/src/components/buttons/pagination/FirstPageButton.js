import React, { useState } from 'react';
import img3 from '../../../assets/images/buttons/button left two/button-left-two-push.png'
import img2 from '../../../assets/images/buttons/button left two/button-left-two-point.png'
import img1 from '../../../assets/images/buttons/button left two/button-left-two-nonclick.png'
import '../../../assets/styles/pagination.css';
const FirstPageButton = props => {
    const [image, setImage] = useState(img1);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handlePress = () => {
        setImage(img3);
        props.setPageNumber(0);
        props.updateTable();
    };

    return (
        <div className="">
            <img
                className=""
                src={image}
                alt="button"
                draggable="false"
                id="pagination-button"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onMouseDown={handlePress}
                onMouseUp={handleHover}
            >
            </img>
        </div>
    );
}

export default FirstPageButton;