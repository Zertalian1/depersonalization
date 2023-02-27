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

import {useFormik} from "formik";
import * as Yup from "yup";
import GetInButton from "./components/buttons/GetInButton";


const App = () => {
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [modal, setModal] = useState(false);

    const handleSubmit = (columns) => {
        setSelectedColumns(columns);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        validation.handleBlur(event);
    };

    const toggle = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    };

    const [isEdit, setIsEdit] = useState(false);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            vacancyName: '',
            salary: '',
        },
        validationSchema: Yup.object({
            login: Yup.string().required("Пожалуйста, введите логин"),
            password: Yup.string().required("Пожалуйста, введите пароль"),
        }),
        onSubmit: (values) => {
            toggle();
        }
    });
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
                                        validation.handleSubmit();
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
                                                    onBlur={handleBlur}
                                                    onChange={validation.handleChange}
                                                />
                                                {validation.touched.login && validation.errors.login ? (
                                                    <div style={{ color: 'red' }}>{validation.errors.login}</div>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Пароль</Label>
                                                <Input
                                                    name="password"
                                                    type="password"
                                                    onBlur={handleBlur}
                                                    onChange={validation.handleChange}
                                                />
                                                {validation.touched.password && validation.errors.password ? (
                                                    <div style={{ color: 'red' }}>{validation.errors.password}</div>
                                                ) : null}
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