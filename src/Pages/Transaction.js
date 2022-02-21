import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import TransactionList from '../Components/Transaction/TransactionList';

const Transaction = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('JWT') == null) {
            navigate('/login');
        }
    })

    return (
        <div className="transaction-page">
                <BreadcrumbNav title="Transactions"/>
                <TransactionList />
                
        </div>
    );
};


export default Transaction;