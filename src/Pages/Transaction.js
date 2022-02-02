import Navigation from '../Components/Navigation/Navigation';
import TransactionList from '../Components/Transaction/TransactionList';

const Transaction = () => {

    return (
        <div className="transaction-page">
            <Navigation />
            <TransactionList />
        </div>
    );
};


export default Transaction;