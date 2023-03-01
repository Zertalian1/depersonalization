import { useState } from 'react';
import GetInButton from "../buttons/GetInButton";
import {Col, Form, Input, Label, Row} from "reactstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import AddClientButton from "../buttons/AddClientButton";
import AcceptNewClientButton from "../buttons/AcceptNewClientButton";

const ClientCard = ({toggle, item, index}) => {


    const validation = useFormik({
        enableReinitialize: false,
        initialValues: {
            fullName: item.fullName,
            dateOfBirth: item.dateOfBirth,
            placeOfBirth: item.placeOfBirth,
            gender: item.gender,
            inn: item.inn,
            snils: item.snils,
            contactInfo: item.contactInfo,
            address: item.address,
            documentType: item.documentType,
            documentNumber: item.documentNumber
        },
        onSubmit: (index) => {
            toggle(index);
        }
    });


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
                        <Label className="form-label">ФИО: </Label>
                        {" " + item.fullName}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Дата рождения:</Label>
                        {" " + item.dateOfBirth}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Место рождения:</Label>
                            {" " + item.placeOfBirth}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Пол:</Label>
                           {" " + item.gender}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">ИНН:</Label>
                            {" " + item.inn}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">СНИЛС:</Label>
                            {" " + item.snils}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Контактные данные:</Label>
                            {" " + item.contactInfo}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Адрес:</Label>
                            {" " + item.address}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Тип документа:</Label>
                            {" " + item.documentType}

                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Номер документа:</Label>
                            {" " + item.documentNumber}
                    </div>
                </Col>
            </Row>
        </Form>
    );
}
export default ClientCard;
