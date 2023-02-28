import React, { useState } from 'react';
import img3 from '../../../assets/images/buttons/button rigth one/button-right-one-push.png'
import img2 from '../../../assets/images/buttons/button rigth one/button-right-one-point.png'
import img1 from '../../../assets/images/buttons/button rigth one/button-right-one-nonclick.png'
const NextPageButton = props => {
    const [image, setImage] = useState(img1);

    const handleLeave = () => {
        setImage(img1);
    };

    const handleHover = () => {
        setImage(img2);
    };

    const handlePress = () => {
        setImage(img3);
        if(props.pageNumber !== props.totalPageNumber) {
            props.setPageNumber(props.pageNumber + 1);
            props.updateTable();
        }
    };

    return (
        <div className="">
            <img
                className=""
                src={image}
                alt="button"
                draggable="false"
                style={{width: "200px", height: "100px" ,marginTop: '-40px'}}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onMouseDown={handlePress}
                onMouseUp={handleHover}
            >
            </img>
        </div>
    );
}

export default NextPageButton;
