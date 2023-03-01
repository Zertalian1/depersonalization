import React, {useEffect, useState} from "react";
import axios from "axios";
import {ButtonGroup, Input, Modal, ModalBody, ModalHeader, UncontrolledTooltip} from "reactstrap";

import "../../assets/styles/checkbox.css";
import "../../assets/styles/actions.css";
import pencil from "../../assets/images/actions/pencil.png";
import trashDelete from "../../assets/images/actions/delete.png";
import clientCard from "../../assets/images/actions/client-card.png";

import SortButton from "../buttons/SortButton";
import ClientCard from "../forms/ClientCard";

const View = props => {
    const [view, setView] = useState([]);
    const [editingRowIndex, setEditingRowIndex] = useState(-1);
    const [editingRow, setEditingRow] = useState({});
    const [sorted, setSorted] = useState("Id");
    const [direction, setDirection] = useState("ASC")
    const [inputValues, setInputValues] = useState({});
    const [modal, setModal] = useState([false, false, false, false, false]);

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

    const toggle = (index) => {
        setModal((prevModal) => {
            const newModal = [...prevModal];
            newModal[index] = !newModal[index];
            return newModal;
        });
    };
    const changeSearchValue = (event) => {
        const {target} = event;
        const {id, value} = target;

        setInputValues((prevState) => ({
            ...prevState,
            [event.target.getAttribute("data-column")]: event.target.value
        }));
    }

    const checkAccess = () => {
        axios.get('http://localhost:8080/api/database/personalize/hasAccess', {withCredentials: true})
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
        axios.post('http://localhost:8080/api/database/' + database + '/search?sorted=' + sorted + '&page=' + pageNumber + '&direction=' + direction,
            inputValues,
            {withCredentials: true})
            .then(response => {
                setView(response.data["table"]);
                props.setTotalPageNumber(response.data["pages"] - 1)
            })
            .catch(error => {
                setView([]);
                console.error(error);
            });
    }

    const sendRow = (row, index) => {
        let database = props.database
        axios.put('http://localhost:8080/api/database/' + database + '/' + row.id, row, {withCredentials: true})
            .then(response => {
                let newView = [];
                for (let i = 0; i < view.length; i++) {
                    if (i === index) {
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
            sendRow(editingRow, editingRowIndex);
        }

        if (editingRowIndex === index) {
            setEditingRowIndex(-1);
        } else {
            setEditingRowIndex(index);
            setEditingRow(view[index]);
        }
    };

    function sendDelete(id, index) {
        let database = props.database
        setEditingRowIndex(-1);
        axios.delete('http://localhost:8080/api/database/' + database + '/' + id, {withCredentials: true})
            .then(response => {
                let newView = [];
                for (let i = 0; i < view.length; i++) {
                    if (i === index) {
                        continue
                    }
                    newView.push(view[i]);
                }
                setView(newView);
                console.log("delete success");
            })
            .catch(error => {
                console.error(error);
            });
    }


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
        const {name, value} = e.target;
        setEditingRow((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleKeyDown = (e, index) => {
        if (e.keyCode === 13) {
            handleEditClick(index);
        }
    };

    useEffect(() => {
        checkAccess();
        updateTable();
    }, [props.update, inputValues, sorted, direction]);

    return (
        <div style={{overflowX: 'auto'}}>
            <tbody>
            <tr>
                {columns.map((column, index) => (
                    <th key={index} scope="col">
                        {index === 1 || index === 10 ? null : (
                            <Input
                                style={{height: "3vh", display: "flex"}}
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
                        <ButtonGroup className="float-start user-select-none">
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

                            {index === 10 ? null : (
                                <SortButton setSorted={setSorted} setDirection={setDirection} name={columnsJson[index]}
                                            sorted={sorted}/>
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
                    <td>{editingRowIndex === index ?
                        <input type="text" style={{width: "10vh"}} defaultValue={item.fullName} name="fullName"
                               onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, index)}/> : item.fullName}</td>
                    <td>{editingRowIndex === index ?
                        <input type="text" style={{width: "9vh"}} defaultValue={item.dateOfBirth} name="dateOfBirth"
                               onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, index)}/> : item.dateOfBirth}</td>
                    <td>{editingRowIndex === index ?
                        <input type="text" style={{width: "10vh"}} defaultValue={item.placeOfBirth} name="placeOfBirth"
                               onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, index)}/> : item.placeOfBirth}</td>
                    <td>{editingRowIndex === index ?
                        <input type="text" style={{width: "2vh"}} defaultValue={item.gender} name="gender"
                               onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, index)}/> : item.gender}</td>
                    <td>{editingRowIndex === index ?
                        <input type="text" style={{width: "10vh"}} defaultValue={item.inn} name="inn"
                               onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, index)}/> : item.inn}</td>
                    <td>{editingRowIndex === index ?
                        <input type="text" style={{width: "10vh"}} defaultValue={item.snils} name="snils"
                               onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, index)}/> : item.snils}</td>
                    <td>{editingRowIndex === index ?
                        <input type="text" style={{width: "17vh"}} defaultValue={item.contactInfo} name="contactInfo"
                               onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, index)}/> : item.contactInfo}</td>
                    <td>{editingRowIndex === index ?
                        <input type="text" style={{width: "10vh"}} defaultValue={item.address} name="address"
                               onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, index)}/> : item.address}</td>
                    <td>{editingRowIndex === index ?
                        <input type="text" style={{width: "10vh"}} defaultValue={item.documentType} name="documentType"
                               onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, index)}/> : item.documentType}</td>
                    <td>{editingRowIndex === index ?
                        <input type="text" style={{width: "10vh"}} defaultValue={item.documentNumber}
                               name="documentNumber" onChange={handleInputChange} onKeyDown={(e) => handleKeyDown(e, index)}/> : item.documentNumber}</td>
                    <td>
                        <div className="d-flex gap-3 user-select-none">
                            <img
                                src={pencil}
                                alt="pencil"
                                draggable="false"
                                id={`edit-${index}`}
                                style={{width: "9vh", height: "9vh", position: "relative", bottom: "1.8vh", right: "1vw"}}
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
                                style={{width: "5vh", height: "5vh", right: "3vw", position: "relative"}}
                                onClick={() => sendDelete(item.id, index)}
                            />
                            <UncontrolledTooltip placement="top" target={`delete-${index}`}>
                                Удалить
                            </UncontrolledTooltip>

                            <img
                                src={clientCard}
                                alt="clientCard"
                                draggable="false"
                                id={`clientCard-${index}`}
                                style={{width: "7vh", height: "7vh", right: "3vw", position: "relative", bottom: "1.2vh"}}
                                onClick={() => toggle(index)}
                            />
                            <UncontrolledTooltip placement="top" target={`clientCard-${index}`}>
                                Карточка клиента
                            </UncontrolledTooltip>

                            <Modal isOpen={modal[index]} toggle={()=>toggle(index)}>
                                <ModalHeader tag="h4">
                                    {"Карточка клиента"}
                                </ModalHeader>
                                <ModalBody>
                                    <ClientCard toggle={toggle} item={item} index={index}/>
                                </ModalBody>
                            </Modal>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </div>
    );
}
export default View;