import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from './Pages/NotFound';
import LoginPage from './Pages/LoginPage';
import Transaction from './Pages/Transaction';
import walletService from './Services/wallet.service';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    // Get wallet by default and add in localStorage 
    walletService.getMainWallet().then((resp) => {
      localStorage.setItem('current_wallet', resp.data.id);
    })
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route component={NotFound} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
