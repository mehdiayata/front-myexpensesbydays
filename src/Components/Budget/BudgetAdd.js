import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import budgetService from '../../Services/budget.service';
import DatePicker from "react-multi-date-picker"


const BudgetAdd = (props) => {
    const [formFields, setFormFields] = useState([
        { amount: '', date: [] },
    ]);

    const { walletSelected } = props;
    const { coast } = props;
    const [dateValue, setDateValue] = useState([]);

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

        for (let i = 0; i < formFields.length; i++) {
            // Si le champs est remplie
            if (formFields[i].amount) {
                if(coast == true) {
                    budgetService.postBudget(formFields[i].amount, formFields[i].date, walletSelected, true).then((resp) => { console.log(resp); })
                } else {
                    budgetService.postBudget(formFields[i].amount, formFields[i].date, walletSelected, false).then((resp) => { console.log(resp); })
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
        <div className="App">
            <Form onSubmit={submit}>
                {formFields.map((form, index) => {
                    return (
                        <Form.Group key={index}>
                            <Form.Control
                                required
                                type="number" step=".01"
                                className="budget-add-amount"
                                name='amount'
                                placeholder='Amount'
                                onChange={event => handleFormChange(event, index)}
                                value={form.amount}

                            />

                            <DatePicker
                                buttons={false}
                                hideYear="true"
                                hideMonth="true"
                                hideWeekDays="true"
                                multiple
                                format="DD"
                                value={dateValue}
                                onChange={event => handleDateChange(event, index)}
                            />
                            <Button variant="primary" onClick={() => removeFields(index)}>Remove</Button>


                        </Form.Group>
                    )
                })}


                <Button variant="primary" onClick={addFields}>+</Button>
                <Button type="submit" variant="primary">Submit</Button>
            </Form>
        </div>
    );
};

export default BudgetAdd;