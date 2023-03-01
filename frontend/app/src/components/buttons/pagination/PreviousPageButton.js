import React, { useState } from 'react';
import img3 from '../../../assets/images/buttons/button left one/button-left-one-push.png'
import img2 from '../../../assets/images/buttons/button left one/button-left-one-point.png'
import img1 from '../../../assets/images/buttons/button left one/button-left-one-nonclick.png'
import '../../../assets/styles/pagination.css';
const PreviousPageButton = props => {
    const [image, setImage] = useState(img1);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handlePress = () => {
        setImage(img3);
        if(props.pageNumber !== 0){
            props.setPageNumber(props.pageNumber-1);
            props.updateTable();
        }
    };

    return (
        <div className="user-select-none">
            <img
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

export default PreviousPageButton;
