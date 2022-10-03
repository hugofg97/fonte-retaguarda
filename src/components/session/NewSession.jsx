import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SessionContext from '../../context/Session';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newSessionSchema } from '../../schemas/newSessionSchema';
import { withStyles } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';

export default function NewSession() {

  const {createNewSession, getSessionsReiki, msgError, setMsgError} = React.useContext(SessionContext)
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [session, setSession] = React.useState({});

  const handleClickOpen = () => {
    setMsgError("");
    setOpen(true);
  };

  const handleClose = () => {
    setMsgError("");
    setOpen(false);
  };
  const saveSession = async () => {
    setIsLoading(true);
    await createNewSession({session});
    await getSessionsReiki();
    setIsLoading(false);
    setSession({name: '', description:''});
  }
  const handleChange = (prop) => (event) => {
    setSession({ ...session, [prop]: event.target.value });
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", resolver: yupResolver(newSessionSchema) });
  useEffect(() => {
    console.log(msgError)
  }, [msgError])
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Adicionar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sessão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adicionar nova sessão
          </DialogContentText>
          <TextField
          value={session?.name}
          error={!!errors.name?.message}
          helperText={errors.name?.message}
          {...register("name", handleChange("name"))}
          onChange={handleChange("name")}
          type="text"
          id="outlined-error-helper-text"
          label="Nome"
          variant="outlined"
        />
        <TextField
          value={session?.description}
          error={!!errors.description?.message}
          helperText={errors.description?.message}
          {...register("description")}
          onChange={handleChange("description")}
          type="description"
          id="outlined-error-helper-text"
          label="Descrição"
          variant="outlined"
        />
        {msgError?<p style={{color:'red'}}>{msgError}</p>: null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {isLoading ? (
          <CircularProgress style={{ color: "green" }}></CircularProgress>
        ) : (
          <Button
            disabled={!isValid}
            variant="outlined"
            color="primary"
            onClick={handleSubmit(saveSession)}
          >
            Salvar
          </Button>
        )}
        </DialogActions>
      </Dialog>
    </div>
  );
}