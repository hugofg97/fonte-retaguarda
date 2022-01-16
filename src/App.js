import logo from './logo.svg';
import './App.css';
import Routes from './routes';

import StepperPayment from './components/PaymentStepper/Index';
import { AppBar, Toolbar } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <AppBar>
      <Toolbar style={{backgroundColor:"#68846D"}}>
        <img alt="Logo" src="/assets/logo.png" />
      </Toolbar>
      </AppBar>
      <hr></hr>
      <Routes></Routes>
    </div>
  );
}

export default App;
