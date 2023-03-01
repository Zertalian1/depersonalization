import { useState } from 'react';
import GetInButton from "../buttons/GetInButton";
import {Col, Form, Input, Label, Row} from "reactstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import AddClientButton from "../buttons/AddClientButton";
import AcceptNewClientButton from "../buttons/AcceptNewClientButton";

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
        onSubmit: () => {
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

    const formFields = [
        {
            label: "ФИО",
            name: "fullName",
            type: "text",
            exampleField : "Паньков Дмитрий Вячеславович",
            onBlur: handleBlur,
            onChange: handleFullNameChange,
            validation: {
                touched: validation.touched.fullName,
                errors: validation.errors.fullName,
            },
        },
        {
            label: "Дата рождения",
            name: "dateOfBirth",
            type: "text",
            exampleField: "27-12-2002",
            onBlur: handleBlur,
            onChange: handleDateOfBirthChange,
            validation: {
                touched: validation.touched.dateOfBirth,
                errors: validation.errors.dateOfBirth,
            },
        },
        {
            label: "Место рождения",
            name: "placeOfBirth",
            type: "text",
            exampleField: "Новосибирск",
            onBlur: handleBlur,
            onChange: handlePlaceOfBirthChange,
            validation: {
                touched: validation.touched.placeOfBirth,
                errors: validation.errors.placeOfBirth,
            },
        },
        {
            label: "Пол",
            name: "gender",
            type: "text",
            exampleField: "м",
            onBlur: handleBlur,
            onChange: handleGenderChange,
            validation: {
                touched: validation.touched.gender,
                errors: validation.errors.gender,
            },
        },
        {
            label: "ИНН",
            name: "inn",
            type: "text",
            exampleField: "202082024666",
            onBlur: handleBlur,
            onChange: handleInnChange,
            validation: {
                touched: validation.touched.inn,
                errors: validation.errors.inn,
            },
        },
        {
            label: "СНИЛС",
            name: "snils",
            type: "text",
            onBlur: handleBlur,
            onChange: handleSnilsChange,
            exampleField: "465-197-270 16",
            validation: {
                touched: validation.touched.snils,
                errors: validation.errors.snils,
            },
        },
        {
            label: "Контактные данные",
            name: "contactInfo",
            type: "text",
            exampleField: "d.pankov@g.nsu.ru",
            onBlur: handleBlur,
            onChange: handleContactInfoChange,
            validation: {
                touched: validation.touched.contactInfo,
                errors: validation.errors.contactInfo,
            },
        },
        {
            label: "Адрес",
            name: "address",
            type: "text",
            exampleField: "Гусь-Хрустальный, ул. Космонавтов, д. 60",
            onBlur: handleBlur,
            onChange: handleAddressChange,
            validation: {
                touched: validation.touched.address,
                errors: validation.errors.address,
            },
        },
        {
            label: "Тип документа",
            name: "documentType",
            type: "text",
            exampleField: "пасспорт",
            onBlur: handleBlur,
            onChange: handleDocumentTypeChange,
            validation: {
                touched: validation.touched.documentType,
                errors: validation.errors.documentType,
            },
        },
        {
            label: "Номер документа",
            name: "documentNumber",
            type: "text",
            exampleField: "4953 461348",
            onBlur: handleBlur,
            onChange: handleDocumentNumberChange,
            validation: {
                touched: validation.touched.documentNumber,
                errors: validation.errors.documentNumber,
            },
        },
    ];




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
                    {formFields.map((field) => (
                        <div className="mb-3" key={field.name}>
                            <Label className="form-label">{field.label}</Label>
                            <Input
                                name={field.name}
                                type="text"
                                onBlur={field.onBlur}
                                onInput={field.onInput}
                                onChange={field.onChange}
                                placeholder={field.exampleField}
                            />
                            {field.error ? <div style={{ color: "red" }}>{field.error}</div> : null}
                        </div>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="text-lg-center">
                        <AcceptNewClientButton toggle={toggle} updateTable={updateTable}
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
