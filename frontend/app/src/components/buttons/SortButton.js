import React, {useEffect,useState} from 'react';
import DESCSortImg from '../../assets/images/buttons/sort/bottom-sort-button.png'
import ASCSortImg from '../../assets/images/buttons/sort/top-sort-button.png'
import noSortImg from '../../assets/images/buttons/sort/no-sort-button.png'


const SortButton = props => {
    const [image, setImage] = useState(noSortImg);

    const handlePress = () => {
        if (image === ASCSortImg) {
            setImage(DESCSortImg)
            props.setDirection("DESC")
            props.setSorted(props.name)
        }
        else if (image === DESCSortImg) {
            setImage(noSortImg)
            props.setDirection("ASC")
            props.setSorted("Id")
        }
        else if (image === noSortImg) {
            setImage(ASCSortImg)
            props.setDirection("ASC")
            props.setSorted(props.name)
        }
    };

    useEffect(() => {
        if(props.sorted !== props.name){
            setImage(noSortImg);
        }
    }, [props.sorted]);

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
                }}
                onMouseDown={handlePress}

            >
            </img>
        </div>
    );
}

export default SortButton;
