import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SessionContext from '../../context/Session';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function DeleteSession({videos, id}) {

  const {deleteSession,getSessionsReiki, msgError, setMsgError} = React.useContext(SessionContext)
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {categoryId} = useParams()
  const handleClickOpen = () => {
    setMsgError("");
    setOpen(true);
  };

  const handleClose = () => {
    setMsgError("");
    setOpen(false);
  };
  const deleteThisSession = async () => {
    setIsLoading(true);
    await deleteSession({id});
    await getSessionsReiki(categoryId);
    setIsLoading(false);
    handleClose()
  }

  useEffect(() => {
    console.log(msgError)
  }, [msgError])
  return (
    <div>
      <Button size="small" variant="text"  color="error" onClick={handleClickOpen}>
        Excluir
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sessão</DialogTitle>
        <DialogContent>
        {videos <= 0? 'Tem certeza que seseja excluir essa sessão?': 'Essa sessão não pode ser excluida pois tem videos associados a ela.'}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {isLoading ? (
          <CircularProgress style={{ color: "green" }}></CircularProgress>
        ) : videos <= 0 ?(
          <Button
            onClick={deleteThisSession}
            variant="outlined"
            color="primary"
            
          >
            Sim
          </Button>
        ): null}
        </DialogActions>
      </Dialog>
    </div>
  );
}