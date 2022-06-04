import React from 'react';
import { NavLink } from 'react-router-dom';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import { BsGraphDown, BsGraphUp } from 'react-icons/bs'; 
import { MdSavings } from 'react-icons/md'; 

const BudgetPage = () => {
    return (
        <div className='budget-page'>
            <BreadcrumbNav title="Budget" />

            <div className="budget-container">

                <NavLink to='/income' exact='true' activeclassname="nav-active">
                    <BsGraphDown />
                    <p>Income</p>
                </NavLink>

                <NavLink to='/coast' exact='true' activeclassname="nav-active">
                    <BsGraphUp />
                    <p>Coast</p>
                </NavLink>
                <NavLink to='/saving' exact='true' activeclassname="nav-active">
                    <MdSavings />
                    <p>Saving</p>
                </NavLink>
            </div>
        </div>
    );
};

export default BudgetPage;