import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import TransactionList from '../Components/Transaction/TransactionList';

const Transaction = () => {

    return (
        <div className="transaction-page">
                <BreadcrumbNav title="Transactions"/>
                <TransactionList />
                
        </div>
    );
};


export default Transaction;