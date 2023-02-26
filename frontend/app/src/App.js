import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';

import './assets/styles/main.css';
import './assets/styles/adaptive-design.css';
import './assets/styles/auth-btn.css'
import './assets/styles/download-btn.css'
import './assets/styles/getin-btn.css'
import './assets/styles/depers-btn.css'
import './assets/styles/upload-btn.css'

import {publicRoutes } from "./routes/index"
import View from "./components/View";
import ViewButton from "./components/ViewButton"

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
                                    <th scope="col">Тип документа</th>
                                    <th scope="col">Документ, удостоверяющий личность</th>
                                </tr>
                                </thead>
                                <View/>
                            </table>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="row">
                            <ViewButton > </ViewButton>
                            <div className="col-lg-12 d-flex mb-4 justify-content-end">
                                <button
                                    className="btn btn-primary btn-sm btn-success"
                                    id="download-btn"
                                >

                                    <i className="mdi mdi-plus me-1"/>
                                </button>
                            </div>
                            <div className="col-lg-12 d-flex mb-4 justify-content-end">
                                <button
                                    className="btn btn-primary btn-sm btn-success"
                                    id="getin-btn"
                                >

                                    <i className="mdi mdi-plus me-1"/>
                                </button>
                            </div>
                            <div className="col-lg-12 d-flex mb-4 justify-content-end">
                                <button
                                    className="btn btn-primary btn-sm btn-success"
                                    id="depers-btn"
                                >

                                    <i className="mdi mdi-plus me-1"/>
                                </button>
                            </div>
                            <div className="col-lg-12 d-flex mb-4 justify-content-end">
                                <button
                                    className="btn btn-primary btn-sm btn-success"
                                    id="upload-btn"
                                >

                                    <i className="mdi mdi-plus me-1"/>
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
