import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, CircularProgress, TextareaAutosize } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoContext from "../../context/Video";
import { newVideoSchema } from "../../schemas/newVideoSchema";

export default function EditVideo({ videoEditable }) {
  const { updateVideo, getVideos, msgError, setMsgError } =
    React.useContext(VideoContext);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [video, setVideo] = React.useState({
    name: "",
    description: "",
    locked: false,
    videoThumb: null,
    videoUrl: "",
  });
  const { sessionId } = useParams();
  const handleClickOpen = () => {
    setVideo(videoEditable);
    setMsgError("");
    setOpen(true);
  };

  const handleClose = () => {
    setMsgError("");
    setOpen(false);
    setVideo({
      name: "",
      description: "",
      videoThumb: "",
      locked: false,
      videoUrl: "",
    });
    setSelectedImage(null);
  };
  const saveVideo = async () => {
    setIsLoading(true);
    await updateVideo({ video, sessionId, selectedImage });
    await getVideos(sessionId);
    setIsLoading(false);
    handleClose();
  };
  const handleChange = (prop) => (event) => {
    if (prop === "locked") {
      setVideo({ ...video, [prop]: event.target.checked });
      return;
    }
    if (prop === "videoThumb") {
      setSelectedImage(event.target.files[0]);
      return;
    }
    setVideo({ ...video, [prop]: event.target.value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", resolver: yupResolver(newVideoSchema) });
  useEffect(() => {
    console.log(msgError);
  }, [msgError]);
  return (
    <div>
      <Button size="small" variant="outlined" onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Video</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <DialogContentText>Adicionar novo Video</DialogContentText>
          <TextField
            style={{ marginBottom: 12 }}
            value={video?.name}
            error={!!errors.name?.message}
            helperText={errors.name?.message}
            {...register("name", handleChange("name"))}
            onChange={handleChange("name")}
            type="text"
            id="outlined-error-helper-text"
            label="Nome"
            variant="outlined"
          />
          <label> Descrição</label>
          <TextareaAutosize
            style={{ marginBottom: 12 }}
            minRows={10}
            value={video?.description}
            error={!!errors.description?.message}
            helperText={errors.description?.message}
            {...register("description")}
            onChange={handleChange("description")}
            type="description"
            id="outlined-error-helper-text"
            label="Descrição"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 12 }}
            value={video?.videoUrl}
            error={!!errors.description?.message}
            helperText={errors.description?.message}
            {...register("videoUrl")}
            onChange={handleChange("videoUrl")}
            type="description"
            id="outlined-error-helper-text"
            label="Url Video"
            variant="outlined"
          />
          <label style={{ marginBottom: 12 }} placeholder="Gratuito">
            Restrito a assinantes?
            <Checkbox
              checked={video.locked}
              {...register("locked")}
              onChange={handleChange("locked")}
              color="primary"
            ></Checkbox>
          </label>
          {msgError ? <p style={{ color: "red" }}>{msgError}</p> : null}
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
              onClick={handleSubmit(saveVideo)}
            >
              Salvar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
