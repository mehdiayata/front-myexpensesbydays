import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route component={NotFound} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
