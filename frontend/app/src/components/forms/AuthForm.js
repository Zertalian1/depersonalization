import { useState } from 'react';
import GetInButton from "../buttons/GetInButton";
import {Col, Form, Input, Label, Row} from "reactstrap";

const AuthForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
                <Col className="col-12">
                    <div className="mb-3">
                        <Label className="form-label">Логин</Label>
                        <Input
                            name="login"
                            type="text"
                            value={login}
                            onChange={handleLoginChange}
                        />
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Пароль</Label>
                        <Input
                            name="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
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
    );
}
export default AuthForm;
