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
import { useParams } from 'react-router-dom';

export default function EditSession({sessionEditable }) {

  const {updateSession,getSessionsReiki, msgError, setMsgError} = React.useContext(SessionContext)
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [session, setSession] = React.useState({});
  const {categoryId} = useParams()
  const handleClickOpen = () => {
    setMsgError("");
    setSession({...sessionEditable})
    setOpen(true);
  };

  const handleClose = () => {
    setMsgError("");
    setOpen(false);
  };
  const saveSession = async () => {
    setIsLoading(true);
    await updateSession({session});
    await getSessionsReiki(categoryId);
    handleClose()
    setIsLoading(false);
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
      <Button size="small" variant="text" onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sess??o</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adicionar nova sess??o
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
          label="Descri????o"
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