import React, {useState} from 'react';
import img2 from '../../assets/images/buttons/sort/bottom-sort-button.png'
import img1 from '../../assets/images/buttons/sort/top-sort-button.png'

const SortButton = ({toggle}) => {
    const [image, setImage] = useState(img1);

    const handlePress = () => {
        if (image === img1)
            setImage(img2)
        else
            setImage(img1)
    };

    return (
        <div className="">
            <img
                className=""
                src={image}
                alt="button"
                draggable="false"
                style={{
                    height: "40px",
                    width: "40px",
                    position: "relative",
                    bottom: "0.5vh",
                    marginRight: "1vw"
                }}
                onMouseDown={handlePress}

            >
            </img>
        </div>
    );
}

export default SortButton;
