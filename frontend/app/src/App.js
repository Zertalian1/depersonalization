import React, {useState} from "react";

import "./assets/styles/main.css";

import View from "./components/requests/View";
import AuthButton from "./components/buttons/AuthButton";
import DepersonalizationButton from "./components/buttons/DepersonalizationButton";
import UploadButton from "./components/buttons/UploadButton";
import DownloadButton from "./components/buttons/DownloadButton";
import AuthForm from "./components/forms/AuthForm";
import {
    Button, ButtonGroup,
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
import FirstPageButton from "./components/buttons/pagination/FirstPageButton";
import PreviousPageButton from "./components/buttons/pagination/PreviousPageButton";
import NextPageButton from "./components/buttons/pagination/NextPageButton";
import LastPageButton from "./components/buttons/pagination/LastPageButton";


const App = () => {

    const [selectedColumns, setSelectedColumns] = useState([]);
    const [update,setUpdate] = useState(false)
    const [modalAuth, setModalAuth] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [database, setdatabase] = useState("depersonalize");
    const [accessLock,setAccessLock] = useState(true);
    const [pageNumber,setPageNumber] = useState(0);
    const [totalPageNumber,setTotalPageNumber] = useState(0);



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
        setdatabase(type)
        updateTable();
    }


    return (
            <Container fluid={true} className="App container">
                <Row>
                    <Col lg={2}>

                    </Col>
                    <Col lg={8} className="">
                        <AddClientButton toggle={toggleAdd} accessLock={accessLock}/>
                        <Modal isOpen={modalAuth} toggle={toggleAuth}>
                            <ModalHeader tag="h4">
                                {"Авторизоваться"}
                            </ModalHeader>
                            <ModalBody>
                                <AuthForm toggle={toggleAuth} updateTable={updateTable} setAccessLock={setAccessLock}/>
                            </ModalBody>
                        </Modal>

                        <div className="overflow-auto min-vh-100 " >
                            <Table className="table table-bordered mt-4 ">
                                <View handleSubmit={handleSubmit}
                                      update={update}
                                      updateTable={updateTable}
                                      database={database}
                                      setAccessLock={setAccessLock}
                                      pageNumber={pageNumber}
                                      setTotalPageNumber={setTotalPageNumber}
                                />

                            </Table>
                            <div style={{ marginTop: '10px' }}>
                                <ButtonGroup className="float-start">
                                    <FirstPageButton setPageNumber={setPageNumber} pageNumber={pageNumber} updateTable={updateTable}/>
                                    <PreviousPageButton setPageNumber={setPageNumber} pageNumber={pageNumber} updateTable={updateTable}/>
                                </ButtonGroup>
                                <div style={{ display: 'inline-block', background: 'white',  borderRadius: '4px', marginLeft: '17%' }}>
                                    {pageNumber}
                                </div>
                                <ButtonGroup className="float-end">
                                    <NextPageButton setPageNumber={setPageNumber} pageNumber={pageNumber} updateTable={updateTable} totalPageNumber={totalPageNumber}/>
                                    <LastPageButton setPageNumber={setPageNumber} pageNumber={pageNumber} updateTable={updateTable} totalPageNumber={totalPageNumber}/>
                                </ButtonGroup>
                            </div>
                        </div>


                        <Modal isOpen={modalAdd} toggle={toggleAdd}>
                            <ModalHeader tag="h4">
                                {"Добавить клиента"}
                            </ModalHeader>
                            <ModalBody>
                                <AddForm toggle={toggleAdd} updateTable={updateTable} />
                            </ModalBody>
                        </Modal>
                    </Col>
                    <Col lg={2}>
                        <div className="row">
                            <AuthButton toggle={toggleAuth}/>
                            <UploadButton updateTable={updateTable} accessLock={accessLock}/>
                            <DepersonalizationButton selectedColumns={selectedColumns} updateTable={updateTable} accessLock={accessLock}/>
                            <DownloadButton/>
                            <ChooseDepersonalizeDataButton switchDatabase={switchDatabase} setPageNumber={setPageNumber}/>
                            <ChoosePersonalizeDataButton switchDatabase={switchDatabase} setPageNumber={setPageNumber}/>
                        </div>
                    </Col>
                </Row>
            </Container>
);
}

export default App;