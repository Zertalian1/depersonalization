import { useState } from 'react';
import GetInButton from "../buttons/GetInButton";
import {Col, Form, Input, Label, Row} from "reactstrap";
import {useFormik} from "formik";
import * as Yup from "yup";

const AuthForm = ({toggle}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

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

    const handleLoginChange = (event) => {

        setLogin(event.target.value);
    }

    const handlePasswordChange = (event) => {

        setPassword(event.target.value);
    }

    const handleLoginClick = (event) => {
        event.preventDefault();
        // Вызываем функцию авторизации и передаем в нее логин и пароль
        loginFunc(login, password);
    }

    const loginFunc = (login, password) => {
        // Ваша функция авторизации здесь
        console.log('Login:', login);
        console.log('Password:', password);
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        validation.handleBlur(event);
    };


    return (
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
                            onInput={validation.handleChange}
                            onChange={handleLoginChange}
                        />
                        {validation.touched.login && validation.errors.login ? (
                            <div style={{color: 'red'}}>{validation.errors.login}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Пароль</Label>
                        <Input
                            name="password"
                            type="password"
                            onBlur={handleBlur}
                            onInput={validation.handleChange}
                            onChange={handlePasswordChange}
                        />
                        {validation.touched.password && validation.errors.password ? (
                            <div style={{color: 'red'}}>{validation.errors.password}</div>
                        ) : null}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="text-lg-center">
                        <GetInButton toggle={toggle} login={login} password={password}/>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}
export default AuthForm;
