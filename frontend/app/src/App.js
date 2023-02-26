import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';

import './assets/styles/main.css';
import './assets/styles/adaptive-design.css';

import {publicRoutes } from "./routes/index"
import View from "./components/View";
const App = () => {
    return (
        <div className="App-background">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm">

                    </div>
                    <div className="col-sm">
                        <div className="table row justify-content-center mt-4">
                            <table className="table table-bordered " >
                                <thead>
                                <tr>
                                    <th scope="col">ФИО</th>
                                    <th scope="col">Дата рождения</th>
                                    <th scope="col">Место рождения</th>
                                    <th scope="col">Пол</th>
                                    <th scope="col">ИНН</th>
                                    <th scope="col">СНИЛС</th>
                                    <th scope="col">Контактные данные</th>
                                    <th scope="col">Адрес</th>
                                    <th scope="col">Документ, удостоверяющий личность</th>
                                </tr>
                                </thead>
                                <View/>
                            </table>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="row">
                            <div className="col-lg-12 d-flex mb-4 mt-4 justify-content-end">
                                <button
                                    className="btn btn-primary btn-sm btn-success top"
                                >
                                    <i className="mdi mdi-plus me-1"/>
                                    Авторизация
                                </button>
                            </div>
                            <div className="col-lg-12 d-flex mb-4 justify-content-end">
                                <button
                                    className="btn btn-primary btn-sm btn-success"
                                >
                                    <i className="mdi mdi-plus me-1"/>
                                    Авторизация
                                </button>
                            </div>
                            <div className="col-lg-12 d-flex mb-4 justify-content-end">
                                <button
                                    className="btn btn-primary btn-sm btn-success"
                                >
                                    <i className="mdi mdi-plus me-1"/>
                                    Авторизация
                                </button>
                            </div>
                            <div className="col-lg-12 d-flex mb-4 justify-content-end">
                                <button
                                    className="btn btn-primary btn-sm btn-success"
                                >
                                    <i className="mdi mdi-plus me-1"/>
                                    Авторизация
                                </button>
                            </div>
                            <div className="col-lg-12 d-flex mb-4 justify-content-end">
                                <button
                                    className="btn btn-primary btn-sm btn-success"
                                >
                                    <i className="mdi mdi-plus me-1"/>
                                    Авторизация
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
