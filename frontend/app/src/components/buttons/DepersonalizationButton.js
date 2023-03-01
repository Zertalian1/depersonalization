import React, { useEffect,useState } from 'react';

import img1 from '../../assets/images/buttons/depersonalization/depersonalization-nonclick.png'
import img3 from '../../assets/images/buttons/depersonalization/depersonalization-pusht.png'
import img2 from '../../assets/images/buttons/depersonalization/depersonalization-point.png'
import axios from "axios";
import lock from "../../assets/images/buttons/lock-nonclick.png";


const DepersonalizationButton = ({ selectedColumns,updateTable,accessLock }) => {
    const [image, setImage] = useState(img1);

    const hasAccess = () => {
        return !accessLock;
    };

    const handleLeave = () => {
        if (hasAccess()) {
            setImage(img1);
        } else {
            setImage(lock)
        }
    };

    const handleHover = () => {
        if (hasAccess()) {
            setImage(img2);
        } else {
            setImage(lock)
        }
    };

    const handlePress = () => {
        if (hasAccess()) {
            setImage(img3)
            const result = selectedColumns.reduce((acc, curr) => {
                acc[curr] = true;
                return acc;
            }, {});

            axios.post("http://localhost:8080/api/database/personalize/depersonalize", result, {withCredentials:true})
                .then(response => {
                    // обрабатываем успешный ответ от сервера
                    console.log(response);
                    updateTable();
                })
                .catch(error => {
                    // обрабатываем ошибку
                    console.error(error);
                });
        } else {
            setImage(lock)
        }
    };
    useEffect(() => {
        if (accessLock) {
            setImage(lock);
        } else {
            setImage(img1);
        }
    }, [accessLock]);
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

export default DepersonalizationButton;
