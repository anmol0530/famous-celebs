import React, { useEffect, useState } from 'react';
import "../styles/Celebrity.css";
import { del, edit, greenTick, greyTick, redCross } from '../images';
import { GENDER_OPTIONS } from '../config';
import { FormValidationErrorContainer } from './FormValidationErrorContainer';

export const Celebrity = ({ celeb, onDelete, active, setActive, editable, setEditable, onSubmit }) => {

    const [initial, setInitial] = useState(celeb);
    const [value, setValue] = useState(celeb);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isAgeValid, setIsAgeValid] = useState(true);
    const [isCountryValid, setIsCountryValid] = useState(true);
    const [isDescValid, setIsDescValid] = useState(true);

    const initialValidation = {
        name: '',
        age: '',
        country: '',
        description: '',
    }
    const [validation, setValidation] = useState(initialValidation);

    const { id, picture } = celeb;

    const onClick = (event) => {
        if (active !== id) {
            event.stopPropagation();
        }
        if (editable !== id) {
            setActive(active == id ? '' : id);
        }
    }

    const onChange = (event) => {
        if (editable === id) {
            setValue({ ...value, [event.target.name]: event.target.value });
        }
    };

    const onCancel = () => {
        setValue(initial);
        setEditable('');
    }

    const handleSubmit = () => {
        if (JSON.stringify(initialValidation) === JSON.stringify(validation)) {
            setEditable('');
            setInitial(value);
            onSubmit(value);
        }
    }

    useEffect(() => validateForm(), [value]);

    const validateForm = () => {
        let errors = validation;

        if (!value.name.trim()) {
            errors.name = '*Name is required';
            setIsNameValid(false);
        } else {
            errors.name = '';
            setIsNameValid(true);
        }
        if (!value.age || !/^[0-9]+$/.test(value.age)) {
            errors.age = '*Numeric value required';
            setIsAgeValid(false);
        } else {
            errors.age = "";
            setIsAgeValid(true);
        }
        if (!value.country.trim() || !/^[A-Za-z ]+$/.test(value.country)) {
            errors.country = '*Text value Required';
            setIsCountryValid(false);
        }
        else {
            errors.country = '';
            setIsCountryValid(true);
        }
        if (!value.description.trim()) {
            setIsDescValid(false);
            errors.description = '*Description is required';
        } else {
            errors.description = '';
            setIsDescValid(true);
        }

        setValidation(errors);
    }

    const isChanged = JSON.stringify(initial) !== JSON.stringify(value);

    return (
        <div className="accordion">
            <div className="accordion-item">
                <div className="accordion-title" onClick={(e) => editable === '' ? onClick(e) : null}>
                    <img className="profile" alt="profile" src={picture} />
                    <div className="name-toggle">
                        <div className='inline-input name-input'>
                            <input className={editable === id ? "name edit" : "name view"}
                                type="text"
                                aria-label="Name"
                                name="name"
                                value={value.name}
                                onChange={onChange}
                                onClick={(e) => { if (active === id && editable === id) e.stopPropagation() }}
                            />
                            {!isNameValid && <FormValidationErrorContainer errMessage={validation.name} />}
                        </div>
                        <div className="toggle">{active === id ? '+' : '-'}</div>
                    </div>
                </div>
                {active === id &&
                    <div className="accordion-content">
                        <div className="details">
                            <div className={editable === id ? "inline-input age age-edit" : "inline-input age age-view"}>
                                <label htmlFor="Age" className="label">Age</label>
                                <input className={editable === id ? "edit" : "view"}
                                    type="text"
                                    aria-label="Age"
                                    value={value.age}
                                    name="age"
                                    onChange={onChange}
                                />
                                {!isAgeValid && <FormValidationErrorContainer errMessage={validation.age} />}
                            </div>
                            <div className="dropdown inline-input">
                                <label htmlFor="Gender" className='label'>Gender</label>
                                <select className={editable === id ? "edit" : "view"} value={value.gender} onChange={onChange} name="gender">
                                    {GENDER_OPTIONS.map((option) => (
                                        <option key={option.label} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='inline-input country'>
                                <label htmlFor="Country" className="label">Country</label>
                                <input className={editable === id ? "edit" : "view"}
                                    type="text"
                                    aria-label="Country"
                                    value={value.country}
                                    name="country"
                                    onChange={onChange}
                                />
                                {!isCountryValid && <FormValidationErrorContainer errMessage={validation.country} />}
                            </div>
                        </div>
                        <div className={editable === id ? "textarea" : "textarea view"}>
                            <label htmlFor="Description" className='label'>Description</label>
                            <textarea
                                className={editable === id ? "edit" : "view"}
                                aria-label="description"
                                name="description"
                                value={value.description}
                                onChange={onChange}
                                rows={6}
                            />
                            {!isDescValid && <FormValidationErrorContainer errMessage={validation.description} />}
                        </div>
                        <div className="actions">
                            {editable === id ?
                                <><img src={redCross} alt="red cross" onClick={onCancel} />
                                    <img src={isChanged ? greenTick : greyTick} alt="green tick" onClick={() => { if (isChanged) handleSubmit() }} />
                                </> :
                                <><img src={del} alt="delete" onClick={() => onDelete(id)} />
                                    <img src={edit} alt="edit" onClick={() => {
                                        if (value.age < 18) {
                                            alert("Can't edit child profiles!!!");
                                        } else {
                                            setEditable(id)
                                        }
                                    }} />
                                </>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};