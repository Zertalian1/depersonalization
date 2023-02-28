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
    const [editingRowIndex, setEditingRowIndex] = useState(-1);
    const [editingRow, setEditingRow] = useState({});
    const [sorted, setsorted] = useState("");

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

    const checkAccess = () => {
        axios.get('http://localhost:8080/api/database/personalize/hasAccess', {withCredentials:true})
            .then(response => {
                props.setAccessLock(false);
            })
            .catch(error => {
                props.setAccessLock(true);
                setView([]);
                console.error(error);
            });
    }

    const updateTable = () => {
        let database = props.database
        axios.get('http://localhost:8080/api/database/'+database+'/view?sorted=' + sorted, {withCredentials:true})
            .then(response => {
                setView(response.data);
            })
            .catch(error => {
                setView([]);
                console.error(error);
            });
    }

    const sendRow = (row,index) => {
        let database = props.database
        axios.put('http://localhost:8080/api/database/'+database+'/' + row.id, row, {withCredentials:true})
            .then(response => {
                let newView = [];
                for (let i = 0; i < view.length; i++) {
                    if(i === index) {
                        newView.push(response.data);
                        continue;
                    }
                    newView.push(view[i]);
                }
                setView(newView);
                console.log("send success");
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleEditClick = (index) => {
        if (editingRowIndex !== -1) {
            // Отправить измененную строку на сервер
            sendRow(editingRow,editingRowIndex);
        }

        if (editingRowIndex === index) {
            setEditingRowIndex(-1);
        } else {
            setEditingRowIndex(index);
            setEditingRow(view[index]);
        }
    };

    function sendDelete(id,index) {
        let database = props.database
        setEditingRowIndex(-1);
        axios.delete('http://localhost:8080/api/database/'+database+'/' + id, {withCredentials:true})
            .then(response => {
                let newView = [];
                for (let i = 0; i < view.length; i++) {
                    if(i === index) {continue}
                    newView.push(view[i]);
                }
                setView(newView);
                console.log("delete success");
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleDeleteClick = (id) => {
        sendDelete(id);
    };
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingRow((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        checkAccess();
        updateTable();
        if (props.update) {
            updateTable();
            props.updateTable();
        }
    }, [props.update]);

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
        {view.map((item, index) => (
            <tr key={item.id}>
                <td>{editingRowIndex === index ? <input type="text" defaultValue={item.fullName} name="fullName" onChange={handleInputChange} /> : item.fullName}</td>
                <td>{editingRowIndex === index ? <input type="text" defaultValue={item.dateOfBirth} name="dateOfBirth" onChange={handleInputChange} /> : item.dateOfBirth}</td>
                <td>{editingRowIndex === index ? <input type="text" defaultValue={item.placeOfBirth} name="placeOfBirth" onChange={handleInputChange}/> : item.placeOfBirth}</td>
                <td>{editingRowIndex === index ? <input type="text" defaultValue={item.gender} name="gender" onChange={handleInputChange} /> : item.gender}</td>
                <td>{editingRowIndex === index ? <input type="text" defaultValue={item.inn} name="inn" onChange={handleInputChange} /> : item.inn}</td>
                <td>{editingRowIndex === index ? <input type="text" defaultValue={item.snils} name="snils" onChange={handleInputChange} /> : item.snils}</td>
                <td>{editingRowIndex === index ? <input type="text" defaultValue={item.contactInfo} name="contactInfo" onChange={handleInputChange} /> : item.contactInfo}</td>
                <td>{editingRowIndex === index ? <input type="text" defaultValue={item.address} name="address" onChange={handleInputChange}/> : item.address}</td>
                <td>{editingRowIndex === index ? <input type="text" defaultValue={item.documentType} name="documentType" onChange={handleInputChange}/> : item.documentType}</td>
                <td>{editingRowIndex === index ? <input type="text" defaultValue={item.documentNumber} name="documentNumber" onChange={handleInputChange}/> : item.documentNumber}</td>
                <td>
                    <div className="d-flex gap-3">
                        <img
                            src={pencil}
                            alt="pencil"
                            id={`edit-${index}`}
                            style={{ width: "60%" }}
                            onClick={() => handleEditClick(index)}
                        />
                        <UncontrolledTooltip placement="top" target={`edit-${index}`}>
                            Изменить
                        </UncontrolledTooltip>

                        <img
                            src={trashDelete}
                            alt="delete"
                            className="delete"
                            id={`delete-${index}`}
                            style={{ width: "50%",  right: "2vw", position: "relative"}}
                            onClick={() => sendDelete(item.id,index)}
                        />
                        <UncontrolledTooltip placement="top" target={`delete-${index}`}>
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