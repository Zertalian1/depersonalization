import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import {UncontrolledTooltip} from "reactstrap";

import "../../assets/styles/checkbox.css";
import "../../assets/styles/actions.css";
import pencil from "../../assets/images/actions/pencil.png";
import trashDelete from "../../assets/images/actions/delete.png";
const View = props => {
    const [view, setView] = useState([]);
    // Список столбцов таблицы
    const columns = [
        "ФИО",
        "Дата рождения",
        "Место рождения",
        "Пол",
        "ИНН",
        "СНИЛС",
        "Контактные данные",
        "Адрес",
        "Тип документа",
        "Номер документа",
        "Действие"
    ];
    const columnsJson = [
        "fullName",
        "dateOfBirth",
        "placeOfBirth",
        "gender",
        "inn",
        "snils",
        "contactInfo",
        "address",
        "documentType",
        "documentNumber"
    ];

    // Обработчик нажатия на кнопку
    const handleSubmit = () => {
        const checkboxes = document.querySelectorAll('input[data-column]');
        const selectedColumns = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedColumns.push(checkbox.dataset.column);
            }
        });
        props.handleSubmit(selectedColumns);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/database/personalize/view')
            .then(response => {
                setView(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <tbody>
        <tr>
            {columns.map((column, index) => (
                <th key={index} scope="col">
                    <input
                        type="checkbox"
                        id={`customCheckbox-${index}`}// уникальный идентификатор
                        hidden={true}
                        data-column={columnsJson[index]}
                        onChange={handleSubmit}
                    />
                    <label htmlFor={`customCheckbox-${index}`}></label>
                    <div className="user-select-none">
                        {column}
                    </div>
                </th>
            ))}
        </tr>
        {view.map(item => (
            <tr key={item.id}>
                <td>{item.fullName}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.placeOfBirth}</td>
                <td>{item.gender}</td>
                <td>{item.inn}</td>
                <td>{item.snils}</td>
                <td>{item.contactInfo}</td>
                <td>{item.address}</td>
                <td>{item.documentType}</td>
                <td>{item.documentNumber}</td>
                <td>
                    <div className="d-flex gap-3">
                        <img
                            src={pencil}
                            alt="pencil"
                            id="edit"
                            style={{width: "50%"}}
                        >
                        </img>
                        <UncontrolledTooltip placement="top" target="edit">
                            Изменить
                        </UncontrolledTooltip>
                        <img src={trashDelete}
                             alt="trashDelete"
                             id="delete"
                             style={{width: "40%"}}
                        >
                        </img>
                        <UncontrolledTooltip placement="top" target="delete">
                            Удалить
                        </UncontrolledTooltip>
                    </div>
                </td>
            </tr>
        ))}
        </tbody>
    );
}
export default View;