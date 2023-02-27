import React, {useState} from "react";
import {Switch, BrowserRouter as Router} from "react-router-dom";

import "./assets/styles/main.css";

import {publicRoutes} from "./routes/index"
import View from "./components/requests/View";
import AuthButton from "./components/buttons/AuthButton";
import DepersonalizationButton from "./components/buttons/DepersonalizationButton";
import UploadButton from "./components/buttons/UploadButton";
import DownloadButton from "./components/buttons/DownloadButton";
import GetInButton from "./components/buttons/GetInButton";
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

const App = () => {
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [modal, setModal] = useState(false);

    const handleSubmit = (columns) => {
        setSelectedColumns(columns);
    };

    const toggle = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    };


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
                                <View handleSubmit={handleSubmit}/>
                            </Table>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader tag="h4">
                                {"Авторизоваться"}
                            </ModalHeader>
                            <ModalBody>
                                <Form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        return false;
                                    }}
                                >
                                    <Row>
                                        <Col className="col-12">
                                            <div className="mb-3">
                                                <Label className="form-label">Логин</Label>
                                                <Input
                                                    name="login"
                                                    type="text"
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Пароль</Label>
                                                <Input
                                                    name="password"
                                                    type="text"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="text-lg-center">
                                                <GetInButton toggle={toggle}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
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