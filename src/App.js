import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from './Pages/NotFound';
import LoginPage from './Pages/LoginPage';
import Transaction from './Pages/Transaction';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route component={NotFound} />
          <Route path="/login"  element={<LoginPage />} />
          <Route path="/transaction"  element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
