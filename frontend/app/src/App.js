import React, {useState} from "react";

import "./assets/styles/main.css";

import View from "./components/requests/View";
import AuthButton from "./components/buttons/AuthButton";
import DepersonalizationButton from "./components/buttons/DepersonalizationButton";
import UploadButton from "./components/buttons/UploadButton";
import DownloadButton from "./components/buttons/DownloadButton";
import AuthForm from "./components/forms/AuthForm";
import {
    Button,
    Col,
    Container,
    Form,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Navbar,
    Row,
    Table,
} from "reactstrap";


import GetInButton from "./components/buttons/GetInButton";
import AddClientButton from "./components/buttons/AddClientButton";
import AddForm from "./components/forms/AddForm";
import ChooseDepersonalizeDataButton from "./components/buttons/ChooseDepersonalizeDataButton";
import ChoosePersonalizeDataButton from "./components/buttons/ChoosePersonalizeDataButton";


const App = () => {
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [update,setUpdate] = useState(false)
    const [modalAuth, setModalAuth] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [database, setdatabase] = useState("personalize");


    const handleSubmit = (columns) => {
        setSelectedColumns(columns);
    };

    const toggleAuth = () => {
        setModalAuth(modalAuth => !modalAuth);
    };

    const toggleAdd = () => {
        setModalAdd(modalAdd => !modalAdd);
    };

    const updateTable = () => {
        setUpdate(update => !update)
    }

    const switchDatabase = (type) => {
        // if (database === "personalize") {
        //     setdatabase("depersonalize")
        // } else {
        //     setdatabase("personalize")
        // }
        setdatabase(type)
        updateTable();
    }

    return (
            <Container fluid={true} className="App container">
                <Row>
                    <Col lg={2}>

                    </Col>
                    <Col lg={8} className="">
                        <AddClientButton toggle={toggleAdd}/>
                        <Modal isOpen={modalAuth} toggle={toggleAuth}>
                            <ModalHeader tag="h4">
                                {"Авторизоваться"}
                            </ModalHeader>
                            <ModalBody>
                                <AuthForm toggle={toggleAuth} updateTable={updateTable}/>
                            </ModalBody>
                        </Modal>
                        <div className="overflow-auto min-vh-100 " >
                            <Table className="table table-bordered mt-4 ">
                                <View handleSubmit={handleSubmit} update={update} updateTable={updateTable} database={database}/>
                            </Table>
                        </div>
                        <Modal isOpen={modalAdd} toggle={toggleAdd}>
                            <ModalHeader tag="h4">
                                {"Добавить клиента"}
                            </ModalHeader>
                            <ModalBody>
                                <AddForm toggle={toggleAdd} updateTable={updateTable}/>
                            </ModalBody>
                        </Modal>
                    </Col>
                    <Col lg={2}>
                        <div className="row">
                            <AuthButton toggle={toggleAuth}/>
                            <UploadButton updateTable={updateTable}/>
                            <DepersonalizationButton selectedColumns={selectedColumns} updateTable={updateTable}/>
                            <DownloadButton/>
                            <ChooseDepersonalizeDataButton switchDatabase={switchDatabase}/>
                            <ChoosePersonalizeDataButton switchDatabase={switchDatabase}/>
                        </div>
                    </Col>
                </Row>
            </Container>
);
}

export default App;