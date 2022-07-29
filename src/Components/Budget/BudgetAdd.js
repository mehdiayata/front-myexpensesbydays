import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import budgetService from '../../Services/budget.service';
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker"


const BudgetAdd = (props) => {

    const [formFields, setFormFields] = useState([])
    const { walletSelected } = props;
    const { coast } = props;
    const [dateValue, setDateValue] = useState([]);
    const { setOnSubmitBudget } = props;
    const { setSpinner } = props;
    const { coasts } = props;

    useEffect(() => {
        // Si il y a déjà des budget enregistré
        if (Array.isArray(coasts) && coasts.length) {
            initFormFields();
        } else {
            setFormFields([{ amount: '', date: [] }]);
        }

    }, [coasts]);

    const initFormFields = () => {
        let object = [];

        let dateArray = initDate();

        coasts.map((coast, index) => {
            object[index] = {
                id: coast.id,
                amount: coast.amount,
                date: dateArray[index]
            }
        })

        console.log(object);
        setFormFields(object)
    }

    const initDate = () => {
        // Récupère les dates de l'utilisateur est le format pour le calendrier (mois de février)
        let dateArray = [];

        coasts.map((coast, index) => {
            dateArray[index] = [];
            coast.dueDate.map((date) => {
                dateArray[index].push(
                    new DateObject({
                        year: 2022,
                        month: 2,
                        day: date
                    })
                )
            })
        })

        return dateArray;
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
            dateFormat.push(new DateObject({
                year: 2022,
                month: 2,
                day: date
            }));
        });


        data[index]['date'] = dateFormat;
        setFormFields(data);
    }

    const submit = (e) => {
        e.preventDefault();

        setSpinner(true);

        // Format date pour envoyer en bdd (Récupère seulement les jour)
        let newDate = []

        for (let i = 0; i < formFields.length; i++) {
            newDate[i] = [];

            formFields[i].date.map((date) => {
                newDate[i].push(date.day);
            })


            //Si le champs est remplie
            if (formFields[i].amount) {

                // Si le dans le champs du formulaire il y a un id (permet de différencier si c'est un create ou update)
                if (formFields[i].id) {
                    if (coast == true) {
                        budgetService.putCoast(formFields[i].id, formFields[i].amount, newDate[i], true).then((resp) => {

                            setOnSubmitBudget(true);

                        })
                    } else {
                        budgetService.putCoast(formFields[i].id, formFields[i].amount, newDate[i], false).then((resp) => {

                            setOnSubmitBudget(true);

                        })
                    }

                } else {
                    if (coast == true) {
                        budgetService.postBudget(formFields[i].amount, newDate[i], walletSelected, true).then((resp) => {

                            setOnSubmitBudget(true);

                        })
                    } else {
                        budgetService.postBudget(formFields[i].amount, newDate[i], walletSelected, false).then((resp) => {

                            setOnSubmitBudget(true);
                        })
                    }

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

                <p className="budget-add-example"> <strong>Example.</strong> Name : "Subscription", Amount: 20€, Due date: 5, 12, 19, 26  </p>
            </div>

            <Form onSubmit={submit} className="budget-form">

                {formFields.map((form, index) => {
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
                                    value={form.date}
                                    currentDate={
                                        new DateObject({
                                            year: 2022,
                                            month: 2,
                                            day: 1
                                        })
                                    }

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

            <p className="budget-add-info-bottom">The days of the month range from 1 to 28 because, the month of February only has 28 days</p>
        </div>
    );
};

export default BudgetAdd;