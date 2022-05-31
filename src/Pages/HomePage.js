import React, { useEffect, useState } from 'react';
import AuthorizedExpense from '../Components/Budget/AuthorizedExpense';
import TransactionAdd from '../Components/Transaction/TransactionAdd';
import WalletRead from '../Components/Wallet/WalletRead';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import { Spinner } from 'react-bootstrap';
import walletService from '../Services/wallet.service';
import calculatorService from '../Services/calculator.service';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [walletSelected, setWalletSelected] = useState();
  const [onSubmitAdd, setOnSubmitAdd] = useState(false);
  const [addTransactionButton, setAddTransactionButton] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [saving, setSaving] = useState();
  const [savingReal, setSavingReal] = useState();
  const [coasts, setCoasts] = useState([]);
  const [incomes, setIncomes] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('JWT') == null) {
      navigate('/login');
    }

    setWalletSelected(localStorage.getItem('current_wallet'));

    if (localStorage.getItem('current_wallet')) {

      walletService.getWalletBudgets(localStorage.getItem('current_wallet')).then((resp) => {
        // Assign budget
        resp.data['hydra:member'].map((budget) => {
          if (budget.coast === false) {
            incomes.push(budget)
          } else {
            coasts.push(budget)
          }
        })

        localStorage.setItem('budget_preview', calculatorService.budgetPreviewCalcul(incomes, coasts));
      })
    }

  }, [onSubmitAdd])

  return (
    <div className='homepage'>
      <BreadcrumbNav title={'HomePage'} />

      <p className="text-info">Amet do ullamco anim eiusmod veniam ut.</p>

      <div className="homepage-container">
        <div className='homepage-container-1'>
          <WalletRead setSaving={setSaving} setSavingReal={setSavingReal} onSubmitAdd={onSubmitAdd} />
          <AuthorizedExpense onSubmitAdd={onSubmitAdd}
            saving={saving}
            savingReal={savingReal} setSpinner={setSpinner} />
        </div>

        <div className="homepage-container-2">
          <TransactionAdd walletSelected={walletSelected} setOnSubmitAdd={setOnSubmitAdd}
            addTransactionButton={addTransactionButton}
            setAddTransactionButton={setAddTransactionButton}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;