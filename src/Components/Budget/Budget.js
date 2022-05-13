import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import budgetService from '../../Services/budget.service';
import BudgetAdd from './BudgetAdd';

const Budget = (props) => {
    const { walletSelected } = props;

    return (
        <div className='budget'>
            <BudgetAdd walletSelected={walletSelected}/>
        </div>
    );
};

export default Budget;