import React, {useState} from "react";

import "./assets/styles/main.css";

import View from "./components/requests/View";
import AuthButton from "./components/buttons/AuthButton";
import DepersonalizationButton from "./components/buttons/DepersonalizationButton";
import UploadButton from "./components/buttons/UploadButton";
import DownloadButton from "./components/buttons/DownloadButton";
import AuthForm from "./components/forms/AuthForm";
import {
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


const App = () => {
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [update,setUpdate] = useState(false)
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const handleSubmit = (columns) => {
        setSelectedColumns(columns);
    };

    const toggle = () => {
        setModal(modal => !modal);
    };

    const updateTable = () => {
        setUpdate(true)
    }

    return (
            <Container fluid={true} className="App container">
                <Row>
                    <Col lg={4}>

                    </Col>
                    <Col lg={4} className="table-responsive ">
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                            <Table className="table table-bordered mt-4">
                                <View handleSubmit={handleSubmit} update={update}/>
                            </Table>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader tag="h4">
                                {"Авторизоваться"}
                            </ModalHeader>
                            <ModalBody>
                                <AuthForm  toggle={toggle} updateTable={updateTable}/>
                            </ModalBody>
                        </Modal>
                    </Col>
                    <Col lg={4}>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <Navbar>

                        </Navbar>
                        <div className="row">
                            <AuthButton toggle={toggle}/>
                            <UploadButton/>
                            <DepersonalizationButton/>
                            <DownloadButton/>
                        </div>
                    </Col>
                </Row>
            </Container>
);
}

export default App;