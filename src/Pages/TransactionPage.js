import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import Transaction from '../Components/Transaction/Transaction';

const TransactionPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('JWT') == null) {
            navigate('/login');
        }
    })

    return (
        <div className="transaction-page">
                <BreadcrumbNav title="Transactions"/>
                <Transaction />
                
        </div>
    );
};


export default TransactionPage;