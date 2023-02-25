import './assets/styles/main.css';
import React from 'react';

const App = () => {
    return (
        <div className="App-background">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                    </div>
                    <div className="col-lg-2">
                        <div className="table row justify-content-center mt-4">
                            <table className="table table-bordered" >
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
                                <tbody>
                                <tr>
                                    <td>Иванов Иван Иванович</td>
                                    <td>01.01.1970</td>
                                    <td>Москва</td>
                                    <td>Мужской</td>
                                    <td>1234567890</td>
                                    <td>123-456-789 00</td>
                                    <td>ivanov@gmail.com, +7 (123) 456-7890</td>
                                    <td>Москва, ул. Примерная, д. 1, кв. 1</td>
                                    <td>Паспорт РФ, серия 1234, номер 567890</td>
                                </tr>
                                <tr>
                                    <td>Петров Петр Петрович</td>
                                    <td>02.02.1975</td>
                                    <td>Санкт-Петербург</td>
                                    <td>Мужской</td>
                                    <td>0987654321</td>
                                    <td>098-765-432 01</td>
                                    <td>petrov@gmail.com, +7 (098) 765-4321</td>
                                    <td>Санкт-Петербург, ул. Примерная, д. 2, кв. 2</td>
                                    <td>Паспорт РФ, серия 5678, номер 901234</td>
                                </tr>
                                <tr>
                                    <td>Петров Петр Петрович</td>
                                    <td>02.02.1980</td>
                                    <td>Санкт-Петербург</td>
                                    <td>Мужской</td>
                                    <td>0987654321</td>
                                    <td>098-765-432 10</td>
                                    <td>petrov@gmail.com, +7 (987) 654-3210</td>
                                    <td>Санкт-Петербург, ул. Набережная, д. 2, кв. 2</td>
                                    <td>Паспорт РФ, серия 4321, номер 098765</td>
                                </tr>
                                <tr>
                                    <td>Сидорова Анна Ивановна</td>
                                    <td>03.03.1990</td>
                                    <td>Екатеринбург</td>
                                    <td>Женский</td>
                                    <td>1111111111</td>
                                    <td>111-111-111 11</td>
                                    <td>sidorova@gmail.com, +7 (111) 111-1111</td>
                                    <td>Екатеринбург, ул. Центральная, д. 3, кв. 3</td>
                                    <td>Заграничный паспорт, серия 5555, номер 666666</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-lg-7">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
