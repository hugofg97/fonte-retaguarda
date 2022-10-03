import logo from './logo.svg';
import './App.css';
import Routes from './routes';
import Button from '@mui/material/Button';

import { AppBar, Toolbar } from '@material-ui/core';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function App() {
  const history = useNavigate()
  return (
    <div className="App">
      <AppBar>
      <Toolbar style={{backgroundColor:"#68846D"}}>
        <img alt="Logo" src="/assets/logo.png" />
        <div style={{margin:'auto'}}>
        <Button onClick={() => history('/session/reiki')
        } style={{color:'white'}} variant="text">Reiki</Button>
        <Button onClick={() => {
          return history('/session/meditacao')
        }} style={{color:'white'}} variant="text">Meditação</Button>
        <Button  style={{color:'white'}} variant="text">Frases</Button>
        <Button onClick={() => {
          return history('/session/curiosidades')
        }}  style={{color:'white'}} variant="text">Curiosidades</Button>
        <Button onClick={() => {
          return history('/session/dicas')
        }} style={{color:'white'}} variant="text">Dicas</Button>
        <Button onClick={() => {
          return history('/session/afirmacoes')
        }}  style={{color:'white'}} variant="text">Afirmações</Button>
        <Button onClick={() => {
          return history('/session/business')
        }}  style={{color:'white'}} variant="text">Empresa</Button>

        </div>
      </Toolbar>
      </AppBar>
      <hr></hr>
      <Routes></Routes>
    </div>
  );
}

export default App;
