import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import budgetService from '../../Services/budget.service';
import DatePicker, { Calendar } from "react-multi-date-picker"


const BudgetAdd = (props) => {
    // const [formFields, setFormFields] = useState([
    //     { amount: '', date: [] },
    // ]);

    const [formFields, setFormFields] = useState([])
    const { walletSelected } = props;
    const { coast } = props;
    const [dateValue, setDateValue] = useState([]);
    const { setOnSubmitBudget } = props;
    // const {onSubmit} = props;
    const { setSpinner } = props;
    const { coasts } = props;
    const [test, setTest] = useState();

    useEffect(() => {
        setTest( Date.now());

        if (Array.isArray(coasts) && coasts.length) {
            initFormFields();
        } else {
            setFormFields([{ amount: '', date: [] }]);
        }

    }, [coasts]);

    const initFormFields = () => {
        let object = [];

        coasts.map((coast, index) => {
            object[index] = {
                amount: coast.amount,
                date: coast.dueDate
            }
        })


        setFormFields(object)

        console.log(formFields);
    }

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }

    const handleDateChange = (event, index) => {

        let data = [...formFields];

        // Config array date 
        let dateFormat = [];

        event.forEach(date => {
            dateFormat.push(date.day);
        });

        data[index]['date'] = dateFormat;
        setFormFields(data);
    }

    const submit = (e) => {
        e.preventDefault();

        setSpinner(true);

        for (let i = 0; i < formFields.length; i++) {
            // Si le champs est remplie
            if (formFields[i].amount) {
                if (coast == true) {
                    budgetService.postBudget(formFields[i].amount, formFields[i].date, walletSelected, true).then((resp) => {

                        setOnSubmitBudget(true);

                    })
                } else {
                    budgetService.postBudget(formFields[i].amount, formFields[i].date, walletSelected, false).then((resp) => {

                        setOnSubmitBudget(true);
                    })
                }

            }
        }
    }

    const addFields = () => {
        let object = {
            amount: '',
            date: []
        }

        setFormFields([...formFields, object])
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }

    return (
        <div className="budget-add">
            <div className="budget-add-text-info">

                {coast ?
                    <p> Please indicate your coast that you have each month ?</p>
                    :
                    <p> Please indicate your cash inflows that you have each month ?</p>
                }
            </div>

            <Form onSubmit={submit} className="budget-form">

                {formFields.map((form, index) => {
                    console.log(form)
                    return (
                        <Form.Group key={index} className="budget-add-container">

                            <Form.Label> Amount </Form.Label>
                            <Form.Control
                                required
                                type="number" step=".01"
                                className="budget-add-amount"
                                name='amount'
                                placeholder='Ex: 250'
                                onChange={event => handleFormChange(event, index)}
                                value={form.amount}

                            />

                            <div className="budget-add-date">
                                <Form.Label className="budget_add_label_date">Choice your due date</Form.Label>
                                <br />
                                <Calendar className='budget-add-calendar'
                                    buttons={false}
                                    hideYear="true"
                                    hideMonth="true"
                                    hideWeekDays="true"
                                    multiple
                                    format="DD"
                                    value="5"
                                    default={test}
                                    onChange={event => handleDateChange(event, index)}
                                />
                            </div>

                            {index !== 0 &&
                                <Button variant="outline-danger" onClick={() => removeFields(index)}>Remove</Button>

                            }

                        </Form.Group>
                    )
                })}


                <div className='budget-add-button-group'>
                    <Button variant="info" onClick={addFields} className="budget-add-button-addFields">+</Button>

                    <Button type="submit" variant="success" className="budget-add-button-submit">Save</Button>
                </div>
            </Form>
        </div>
    );
};

export default BudgetAdd;