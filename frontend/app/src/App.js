import React, {useState} from "react";
import {Switch, BrowserRouter as Router} from "react-router-dom";

import "./assets/styles/main.css";
import "./assets/styles/adaptive-design.css";

import {publicRoutes} from "./routes/index"
import View from "./components/View";
import AuthButton from "./components/Buttons/AuthButton";
import DepersonalizationButton from "./components/Buttons/DepersonalizationButton";
import UploadButton from "./components/Buttons/UploadButton";
import DownloadButton from "./components/Buttons/DownloadButton";
import GetInButton from "./components/Buttons/GetInButton";
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
    TabPane
} from "reactstrap";

const App = () => {
    const [selectedColumns, setSelectedColumns] = useState([]);

    const handleSubmit = (columns) => {
        setSelectedColumns(columns);
    };

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="App-background">
            <Container fluid={true}>
                <Row>
                    <Col>

                    </Col>
                    <Col>
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
                        <div className="table row justify-content-center mt-4">
                            <Table className="table table-bordered">
                                <View handleSubmit={handleSubmit}/>
                            </Table>
                        </div>
                        <Modal isOpen={false}>
                            <ModalHeader tag="h4">
                                {!!isEdit ? "Изменить" : "Авторизоваться"}
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
                                                    name="vacancy"
                                                    type="text"
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Пароль</Label>
                                                <Input
                                                    name="externalLink"
                                                    type="text"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="text-lg-center">
                                                <GetInButton/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </ModalBody>
                        </Modal>
                    </Col>
                    <Col>
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
                            <AuthButton/>
                            <UploadButton/>
                            <DepersonalizationButton/>
                            <DownloadButton/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
);
}

export default App;