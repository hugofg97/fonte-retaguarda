import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import VideoContext from '../../context/Video';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function DeleteVideo({videos, id}) {

  const {deleteVideo,getVideos, msgError, setMsgError} = React.useContext(VideoContext)
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {sessionId} = useParams()

  const handleClickOpen = () => {
    setMsgError("");
    setOpen(true);
  };

  const handleClose = () => {
    setMsgError("");
    setOpen(false);
  };
  const deleteThisVideo = async () => {
    setIsLoading(true);
    await deleteVideo({id});
    await getVideos(sessionId);
    setIsLoading(false);
    handleClose()
  }

  useEffect(() => {
    console.log(msgError)
  }, [msgError])
  return (
    <div>
      <Button size="small" variant="outlined" onClick={handleClickOpen}>
        Excluir
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sessão</DialogTitle>
        <DialogContent>
           Tem certeza que seseja excluir esse video?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {isLoading ? (
          <CircularProgress style={{ color: "green" }}></CircularProgress>
        ) : (
          <Button
            onClick={deleteThisVideo}
            variant="outlined"
            color="primary"
            
          >
            Sim
          </Button>
        )}
        </DialogActions>
      </Dialog>
    </div>
  );
}