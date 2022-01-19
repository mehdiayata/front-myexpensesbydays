import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from './Pages/NotFound';
import LoginPage from './Pages/LoginPage';
import Transaction from './Pages/Transaction';
import walletService from './Services/wallet.service';
import { useEffect } from 'react';
import axios from 'axios';
import securityService from './Services/security.service';

function App() {

  useEffect(() => {

    // Si l'user n'est pas connecté
    if (localStorage.getItem('JWT') != null) {
      // Get wallet by default and add in localStorage 
      walletService.getMainWallet().then((resp) => {
        localStorage.setItem('current_wallet', resp.data.id);
      });

      axios.interceptors.response.use(response => {
        return response;
      }, error => {
        if (error.response.status === 401) {
          securityService.refreshToken(localStorage.getItem('refresh_token')).then((resp) =>
            localStorage.setItem('JWT', resp.data.token)
          )
        }
        return error;
      });
    }


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
