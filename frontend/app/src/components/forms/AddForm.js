import { useState } from 'react';
import GetInButton from "../buttons/GetInButton";
import {Col, Form, Input, Label, Row} from "reactstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import AddClientButton from "../buttons/AddClientButton";
import AddButton from "../buttons/AddButton";

const AddForm = ({toggle,updateTable}) => {
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [placeOfBirth, setPlaceOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [inn, setInn] = useState('');
    const [snils, setSnils] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [address, setAddress] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');


    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: '',
            dateOfBirth: '',
            placeOfBirth: '',
            gender: '',
            inn: '',
            snils: '',
            contactInfo: '',
            address: '',
            documentType: '',
            documentNumber: ''
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required    ("Пожалуйста, введите ФИО"),
            dateOfBirth: Yup.string().required ("Пожалуйста, введите дату рождения"),
            placeOfBirth: Yup.string().required("Пожалуйста, введите место рождения"),
            gender: Yup.string().required      ("Пожалуйста, введите пол"),
            inn: Yup.string().required         ("Пожалуйста, введите ИНН"),
            snils: Yup.string().required       ("Пожалуйста, введите СНИЛС"),
            contactInfo: Yup.string().required ("Пожалуйста, введите контактные данные"),
            address: Yup.string().required     ("Пожалуйста, введите адрес"),
            documentType: Yup.string().required("Пожалуйста, введите тип документа"),
            documentNumber: Yup.string().required  ("Пожалуйста, введите номер документа"),
        }),
        onSubmit: (values) => {
            toggle();
        }
    });

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    }

    const handleDateOfBirthChange = (event) => {
        setDateOfBirth(event.target.value);
    }
    const handlePlaceOfBirthChange = (event) => {
        setPlaceOfBirth(event.target.value);
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    }
    const handleInnChange = (event) => {
        setInn(event.target.value);
    }

    const handleSnilsChange = (event) => {
        setSnils(event.target.value);
    }
    const handleContactInfoChange = (event) => {
        setContactInfo(event.target.value);
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const handleDocumentTypeChange = (event) => {
        setDocumentType(event.target.value);
    }
    const handleDocumentNumberChange = (event) => {
        setDocumentNumber(event.target.value);
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
                        <Label className="form-label">ФИО</Label>
                        <Input
                            name="fullName"
                            type="text"
                            onBlur={handleBlur}
                            onInput={validation.handleChange}
                            onChange={handleFullNameChange}
                        />
                        {validation.touched.fullName && validation.errors.fullName ? (
                            <div style={{color: 'red'}}>{validation.errors.fullName}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Дата рождения</Label>
                        <Input
                            name="dateOfBirth"
                            type="text"
                            onBlur={handleBlur}
                            onInput={validation.handleChange}
                            onChange={handleDateOfBirthChange}
                        />
                        {validation.touched.dateOfBirth && validation.errors.dateOfBirth ? (
                            <div style={{color: 'red'}}>{validation.errors.dateOfBirth}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Место рождения</Label>
                        <Input
                            name="placeOfBirth"
                            type="text"
                            onBlur={handleBlur}
                            onInput={validation.handleChange}
                            onChange={handlePlaceOfBirthChange}
                        />
                        {validation.touched.placeOfBirth && validation.errors.placeOfBirth ? (
                            <div style={{color: 'red'}}>{validation.errors.placeOfBirth}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Пол</Label>
                        <Input
                            name="gender"
                            type="text"
                            onBlur={handleBlur}
                            onInput={validation.handleChange}
                            onChange={handleGenderChange}
                        />
                        {validation.touched.gender && validation.errors.gender ? (
                            <div style={{color: 'red'}}>{validation.errors.gender}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">ИНН</Label>
                        <Input
                            name="inn"
                            type="text"
                            onBlur={handleBlur}
                            onInput={validation.handleChange}
                            onChange={handleInnChange}
                        />
                        {validation.touched.inn && validation.errors.inn ? (
                            <div style={{color: 'red'}}>{validation.errors.inn}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">СНИЛС</Label>
                        <Input
                            name="snils"
                            type="text"
                            onBlur={handleBlur}
                            onInput={validation.handleChange}
                            onChange={handleSnilsChange}
                        />
                        {validation.touched.snils && validation.errors.snils ? (
                            <div style={{color: 'red'}}>{validation.errors.snils}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Контактные данные</Label>
                        <Input
                            name="contactInfo"
                            type="text"
                            onBlur={handleBlur}
                            onInput={validation.handleChange}
                            onChange={handleContactInfoChange}
                        />
                        {validation.touched.contactInfo && validation.errors.contactInfo ? (
                            <div style={{color: 'red'}}>{validation.errors.contactInfo}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Адрес</Label>
                        <Input
                            name="address"
                            type="text"
                            onBlur={handleBlur}
                            onInput={validation.handleChange}
                            onChange={handleAddressChange}
                        />
                        {validation.touched.address && validation.errors.address ? (
                            <div style={{color: 'red'}}>{validation.errors.address}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Тип документа</Label>
                        <Input
                            name="documentType"
                            type="text"
                            onBlur={handleBlur}
                            onInput={validation.handleChange}
                            onChange={handleDocumentTypeChange}
                        />
                        {validation.touched.documentType && validation.errors.documentType ? (
                            <div style={{color: 'red'}}>{validation.errors.documentType}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <Label className="form-label">Номер документа</Label>
                        <Input
                            name="documentNumber"
                            type="text"
                            onBlur={handleBlur}
                            onInput={validation.handleChange}
                            onChange={handleDocumentNumberChange}
                        />
                        {validation.touched.documentNumber && validation.errors.documentNumber ? (
                            <div style={{color: 'red'}}>{validation.errors.documentNumber}</div>
                        ) : null}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="text-lg-center">
                        <AddButton toggle={toggle} updateTable={updateTable}
                                   fullName={fullName}
                                   documentType={documentType}
                                   documentNumber={documentNumber}
                                   gender={gender}
                                   inn={inn}
                                   snils={snils}
                                   placeOfBirth={placeOfBirth}
                                   contactInfo={contactInfo}
                                   address={address}
                                   dateOfBirth={dateOfBirth}/>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}
export default AddForm;
