import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  ListItemText,
  TextField,
  InputAdornment,
  Button
} from "@material-ui/core";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import Back from "../Back";

const ReviewEmployee = (props) => {
  const history = useHistory();

  // const [addReview] = useMutation(MUTATUON_ADD_EMPLOYEE, {
  //   fetchPolicy: "no-cache"
  // });

  const [isSaving, setIsSaving] = useState(false);

  const [formState, setFormState] = useState({
    comments: ""
  });

  const [formValidationError, setFormValidationError] = useState({
    invalid: false,
    message: ""
  });

  const errorMsg = {
    comments: "Please enter review comments"
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFormValidationError({
      invalid: false
    });
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
    if (employee.comments === "") {
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

    // const addStatus = addEmployee({
    //   variables: {
    //     emp_id: employee.emp_id,
    //     comments: employee.comments
    //   }
    // }).then((response) => {
    //   const { data } = response;
    //   console.log({ addReviewResponseData: data });

    //   if (
    //     data.addReview &&
    //     (data.addReview.emp_id !== null || data.addReview.emp_id !== "")
    //   ) {
    //     history.push("/");
    //   }
    // });
    // // console.log("handle Add ", addStatus);

    // if (addStatus) {
    //   props.onEmployeeAddedStatus(addStatus);
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Sorry, saving this form is under construction!");
    // save(formState);
  };

  const currentEmp =
    history.location.state && history.location.state.employee
      ? { ...history.location.state.employee }
      : null;

  return (
    <>
      <div style={{}} className="content-wrapper">
        <h2>{props.title}</h2>
        <h5>{props.subTitle}</h5>

        <Box
          m={3}
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          style={{ textAlign: "center" }}
        >
          <ListItemAvatar>
            <Avatar
              alt={currentEmp.name ? currentEmp.name.replace(" ", "-") : ""}
            >
              <small>
                {currentEmp.name[0].toUpperCase() +
                  "" +
                  currentEmp.name[1].toUpperCase()}
              </small>
              {/* <PermIdentityIcon color={"inherit"} /> */}
            </Avatar>
          </ListItemAvatar>
        </Box>
        <Box m={3}>
          <ListItemText
            primary={currentEmp.name}
            secondary={currentEmp.designation}
          />
        </Box>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Box m={3}>
            <TextField
              autoFocus
              required
              name="comments"
              id="comments"
              multiline
              rows={4}
              label="Review Comments"
              color="primary"
              defaultValue={formState.comments}
              onChange={(e) => handleInput(e)}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<SaveOutlinedIcon />}
          >
            Save
          </Button>
        </form>
        <Back />
      </div>
    </>
  );
};

export default ReviewEmployee;
