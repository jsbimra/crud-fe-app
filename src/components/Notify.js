import React, { useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notify = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const { alertType, message } = props;

  useEffect(() => {
    // console.log(props)
    setOpen(props.show);
  }, [props]);
  if (!message) return null;

  return (
    <>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        key={"fieldError" + 1}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alertType || "error"}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notify;
