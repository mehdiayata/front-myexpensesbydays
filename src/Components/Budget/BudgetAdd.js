import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import budgetService from '../../Services/budget.service';

const BudgetAdd = (props) => {
    const [formFields, setFormFields] = useState([
        { amount: '' },
    ]);

    const { walletSelected } = props;

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }

    const submit = (e) => {
        console.log('test');
        e.preventDefault();

        for (let i = 0; i < formFields.length; i++) {
            // Si le champs est remplie
            if (formFields[i].amount) {
                budgetService.postBudget(formFields[i].amount, walletSelected).then((resp) => { console.log(resp); })
            }
        }
    }

    const addFields = () => {
        let object = {
            amount: ''
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