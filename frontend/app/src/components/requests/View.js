import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import {ButtonGroup, Input, UncontrolledTooltip} from "reactstrap";

import "../../assets/styles/checkbox.css";
import "../../assets/styles/actions.css";
import pencil from "../../assets/images/actions/pencil.png";
import trashDelete from "../../assets/images/actions/delete.png";
import SortButton from "../buttons/SortButton";
const View = props => {
    const [view, setView] = useState([]);
    const [editingRowIndex, setEditingRowIndex] = useState(-1);
    const [editingRow, setEditingRow] = useState({});
    const [sorted, setSorted] = useState("Id");
    const [direction,setDirection] = useState("ASC")
    const [inputValues, setInputValues] = useState({});

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

    const changeSearchValue = (event) => {
        const { target } = event;
        const { id, value } = target;

        setInputValues((prevState) => ({
            ...prevState,
            [event.target.getAttribute("data-column")]: event.target.value
        }));
    }

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
        let pageNumber = props.pageNumber
        axios.post('http://localhost:8080/api/database/'+database+'/search?sorted=' + sorted + '&page=' + pageNumber + '&direction=' + direction,
            inputValues,
            {withCredentials:true})
            .then(response => {
                setView(response.data["table"]);
                props.setTotalPageNumber(response.data["pages"] - 1)
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
    }, [props.update,inputValues,sorted,direction]);

    return (
        <div style={{ overflowX: 'auto' }}>
        <tbody>
        <tr>
            {columns.map((column, index) => (
                <th key={index} scope="col">
                    {index === 1 || index === 10 ? null : (
                        <Input
                            style={{ height: "3vh" , display:"flex"}}
                            type="text"
                            id={`customSearchInput-${index}`}
                            data-column={columnsJson[index]}
                            onChange={changeSearchValue}
                            placeholder={"Поиск..."}
                        />
                    )}
                </th>
            ))}
        </tr>
        <tr>
            {columns.map((column, index) => (
                <th key={index} scope="col">
                    <ButtonGroup className="float-start">
                    {index === 10 ? null : (
                        <input
                            type="checkbox"
                            id={`customCheckbox-${index}`}// уникальный идентификатор
                            hidden={true}
                            data-column={columnsJson[index]}
                            onChange={handleSubmit}
                        />
                    )}
                    <label htmlFor={`customCheckbox-${index}`}/>
                    </ButtonGroup>
                    <ButtonGroup className="float-end">
                        {index === 10 ? null : (
                             <SortButton setSorted={setSorted} setDirection={setDirection} name={columnsJson[index]} sorted={sorted} />
                        )}
                    </ButtonGroup>
                </th>
            ))}
        </tr>
        <tr>
        {columns.map((column, index) => (
            <th className="user-select-none">
                {column}
            </th>
        ))}
        </tr>

            {view.map((item, index) => (
                <tr key={item.id}>
                    <td>{editingRowIndex === index ? <input type="text" style={{ width: "10vh"}} defaultValue={item.fullName} name="fullName" onChange={handleInputChange} /> : item.fullName}</td>
                    <td>{editingRowIndex === index ? <input type="text" style={{ width: "9vh"}} defaultValue={item.dateOfBirth} name="dateOfBirth" onChange={handleInputChange} /> : item.dateOfBirth}</td>
                    <td>{editingRowIndex === index ? <input type="text" style={{ width: "10vh"}} defaultValue={item.placeOfBirth} name="placeOfBirth" onChange={handleInputChange}/> : item.placeOfBirth}</td>
                    <td>{editingRowIndex === index ? <input type="text" style={{ width: "2vh"}} defaultValue={item.gender} name="gender" onChange={handleInputChange} /> : item.gender}</td>
                    <td>{editingRowIndex === index ? <input type="text" style={{ width: "10vh"}} defaultValue={item.inn} name="inn" onChange={handleInputChange} /> : item.inn}</td>
                    <td>{editingRowIndex === index ? <input type="text" style={{ width: "10vh"}} defaultValue={item.snils} name="snils" onChange={handleInputChange} /> : item.snils}</td>
                    <td>{editingRowIndex === index ? <input type="text" style={{ width: "17vh"}} defaultValue={item.contactInfo} name="contactInfo" onChange={handleInputChange} /> : item.contactInfo}</td>
                    <td>{editingRowIndex === index ? <input type="text" style={{ width: "10vh"}} defaultValue={item.address} name="address" onChange={handleInputChange}/> : item.address}</td>
                    <td>{editingRowIndex === index ? <input type="text" style={{ width: "10vh"}} defaultValue={item.documentType} name="documentType" onChange={handleInputChange}/> : item.documentType}</td>
                    <td>{editingRowIndex === index ? <input type="text" style={{ width: "10vh"}} defaultValue={item.documentNumber} name="documentNumber" onChange={handleInputChange}/> : item.documentNumber}</td>
                    <td>
                        <div className="d-flex gap-3 user-select-none">
                            <img
                                src={pencil}
                                alt="pencil"
                                draggable="false"
                                id={`edit-${index}`}
                                style={{ width: "9vh", height: "9vh",  position: "relative", bottom: "1.8vh", right: "1vw" }}
                                onClick={() => handleEditClick(index)}
                            />
                            <UncontrolledTooltip placement="top" target={`edit-${index}`}>
                                Изменить
                            </UncontrolledTooltip>

                            <img
                                src={trashDelete}
                                alt="delete"
                                className="delete"
                                draggable="false"
                                id={`delete-${index}`}
                                style={{ width: "5vh", height: "5vh", right: "3vw", position: "relative"}}
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
        </div>
    );
}
export default View;