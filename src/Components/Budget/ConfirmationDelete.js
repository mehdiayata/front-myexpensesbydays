import React, { useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import budgetService from '../../Services/budget.service';

const ConfirmationDelete = (props) => {
    const { show } = props;
    const { setShow } = props;
    const { idBudget } = props;
    const { setOnSubmit } = props;
    const { indexDelete } = props;
    const { formFields } = props;
    const { setFormFields } = props;


    const handleClose = () => { setShow(false) };

    const deleteBudget = () => {
        if (idBudget) {
            budgetService.deleteBudget(idBudget).then((resp) => {
                handleClose();
                setOnSubmit(true)

            })
        } else {

            let data = [...formFields];
            data.splice(indexDelete, 1)
            setFormFields(data)

            handleClose();
        }
    }

    return (
        <div className='budget-confirmation-delete'>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Coast</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='h5'>Do you confirm delete your coast ? </p>

                    {idBudget && <p className="text-danger blockquote-footer"> If you delete a budget already save the page will reload and you will lose all your unsaved budget </p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        NO
                    </Button>
                    <Button variant="danger" onClick={() => deleteBudget()}>Yes</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default ConfirmationDelete;