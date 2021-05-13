import React, { useState } from "react";

import {
  Box,
  Button,
  Backdrop,
  FormControl,
  InputAdornment,
  makeStyles,
  TextField,
  Snackbar
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import PhoneIcon from "@material-ui/icons/Phone";

// import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { MUTATUON_ADD_EMPLOYEE } from "../../service/graphql-app-crud";

import Alert from "../Alert";
import Back from "../Back";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  button: {
    margin: "5px"
  }
}));

const AddEmployee = (props) => {
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const [addEmployee] = useMutation(MUTATUON_ADD_EMPLOYEE, {
    fetchPolicy: "no-cache"
  });

  const [isSaving, setIsSaving] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    designation: "",
    image: ""
  });

  const [formValidationError, setFormValidationError] = useState({
    invalid: false,
    message: ""
  });

  const errorMsg = {
    name: "Please enter name",
    email: "Please enter email address",
    phoneNumber: "Please enter valid phone number"
  };

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFormValidationError({
      invalid: false
    });

    setOpen(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    // console.log({ target: e.target, name, value });
    if (!name) return;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const save = (employee) => {
    console.log("save", employee);

    if (
      employee.name === "" ||
      employee.phoneNumber === "" ||
      employee.email === ""
    ) {
      setOpen(true);

      setFormValidationError(() => {
        for (let key in employee) {
          if (employee[key] === "") {
            return {
              invalid: true,
              message: errorMsg[key]
            };
          }
        }
      });
      setIsSaving(false);
      return;
    }

    setIsSaving(true);

    const addStatus = addEmployee({
      variables: {
        name: employee.name,
        phoneNumber: employee.phoneNumber,
        email: employee.email,
        designation: employee.designation,
        image: employee.image
      }
    }).then((response) => {
      const { data } = response;
      console.log({ addEmployeeResponseData: data });

      if (
        data.addEmployee &&
        (data.addEmployee.emp_id !== null || data.addEmployee.emp_id !== "")
      ) {
        history.push("/");
      }
    });
    // console.log("handle Add ", addStatus);

    if (addStatus) {
      props.onEmployeeAddedStatus(addStatus);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    save(formState);
  };

  return (
    <>
      <div style={{}} className="content-wrapper">
        <h3>Add Employee</h3>

        {formValidationError.invalid ? (
          <>
            {/* <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                This is a success message!
              </Alert>
            </Snackbar>
            <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}

            <Snackbar
              autoHideDuration={2000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              key={"fieldError" + 1}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                {formValidationError.message}
              </Alert>
            </Snackbar>
          </>
        ) : null}

        {isSaving ? (
          <Backdrop
            className={classes.backdrop}
            open={true}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : null}

        <FormControl component="fieldset">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Box m={3}>
              <TextField
                autoFocus
                required
                name="name"
                id="name"
                label="Name"
                color="primary"
                defaultValue={formState.name}
                onChange={(e) => handleInput(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box m={3}>
              <TextField
                required
                name="email"
                id="email"
                label="Email address"
                type="email"
                color="primary"
                defaultValue={formState.email}
                onChange={handleInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box m={3}>
              <TextField
                required
                name="phoneNumber"
                id="phoneNumber"
                label="Phone Number"
                type="number"
                color="primary"
                defaultValue={formState.phoneNumber}
                onChange={(e) => handleInput(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box m={3}>
              <TextField
                name="designation"
                id="designation"
                label="Designation"
                color="primary"
                defaultValue={formState.designation}
                onChange={(e) => handleInput(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box m={3}>
              <TextField
                name="image"
                id="image"
                label="Photo"
                color="primary"
                defaultValue={formState.image}
                onChange={(e) => handleInput(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              startIcon={<SaveOutlinedIcon />}
            >
              Save
            </Button>
          </form>
        </FormControl>

        <Back />
      </div>
    </>
  );
};

export default AddEmployee;
