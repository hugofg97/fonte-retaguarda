import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  title,
  message,
  confirm,
  deny,
  open,
  setOpen,
  component,
  fullScreen = false
}) {
  React.useEffect(() => {

  }, [open]);
  return (
    <div>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={setOpen}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
            <div>{component && component}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {deny && <Button onClick={deny?.action}>{deny?.label}</Button>}
          {confirm && (
            <Button onClick={confirm?.action}>{confirm?.label}</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
