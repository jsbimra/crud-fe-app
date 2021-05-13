import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";

import {
  Button,
  Snackbar,
  // Chip,
  Box,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

import Alert from "../Alert";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
// import PermIdentityIcon from "@material-ui/icons/PermIdentity";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import DeleteIcon from "@material-ui/icons/Delete";

import Back from "../Back";

import {
  QUERY_EMPLOYEES,
  MUTATUON_UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
} from "../../service/graphql-app-crud";
import { fetchLocally, saveLocally } from "../../utlity";
import { LSKey } from "../../utlity/constants";

const EmployeeList = (props) => {
  // console.log("props employee list ", props);
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState({ default: false });
  const [snackbarState, setSnackbarState] = useState({
    severity: "error",
    message: "Error occoured!"
  });

  const { loading, error, data, refetch, networkStatus } = useQuery(
    QUERY_EMPLOYEES,
    {
      fetchPolicy: "no-cache", // network-only introduces a weird defect where permissions are being cached: 107847
      notifyOnNetworkStatusChange: true
    }
  );

  const [updateEmployee] = useMutation(MUTATUON_UPDATE_EMPLOYEE, {
    fetchPolicy: "no-cache"
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    fetchPolicy: "no-cache"
  });

  const [checked, setChecked] = React.useState([0]);
  const { deleteActiveStatus } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleDelete = (employee) => {
    if (!employee.emp_id) {
      // console.error("no id found! ");
      return;
    }

    //run mutation method
    const emp_id = parseInt(employee["emp_id"]);
    deleteEmployee({
      variables: {
        emp_id
      }
    }).then((response) => {
      if (response.data) {
        console.log("response of delete", response.data);
        // console.log('refetching ', refetch);
        setSnackbarState({
          severity: "success",
          message: "Employee deleted successfully."
        });
        setOpen(true);
        refetch();
        history.push("/");
      }
    });
  };

  const handleReviewSwitch = (employee, name) => (e) => {
    console.log(name, e.target);
    const { checked } = e.target;
    setSwitchChecked({ ...switchChecked, [name]: checked });
    updatePerformanceReview(employee, checked);
  };

  const updatePerformanceReview = (employee, assigned) => {
    console.log(employee);
    if (!employee) return false;

    const allEmps = fetchLocally(LSKey.PERF_REVIEW) || [];

    console.log({ allEmps });

    if (assigned) {
      const duplicate =
        !allEmps.length ?  -1 : allEmps.findIndex((item) => item.emp_id === employee.emp_id);
      if (duplicate === -1) {
        allEmps.push(employee);
        saveLocally(LSKey.PERF_REVIEW, allEmps);
      }
    } else {
      console.log("else ", { assigned });
      const filterAllEmps = allEmps.filter(
        (emp) => emp.emp_id !== employee.emp_id
      );
      console.log({ filterAllEmps });

      saveLocally(LSKey.PERF_REVIEW, filterAllEmps);
    }

    return true;
  };

  useEffect(() => {
    // console.log({ data, error });
  }); //important empty otherwise infinite loop

  if (networkStatus === NetworkStatus.refetch)
    return (
      <div className="content-wrapper">
        <p>Refetching... list!</p>
      </div>
    );

  if (loading)
    return (
      <div className="content-wrapper">
        <p>Please wait... refreshing</p>
      </div>
    );
  if (error)
    return (
      <>
        <div className="content-wrapper">
          {data === undefined ? (
            <Box>
              {props.title ? <h2>{props.title}</h2> : null}
              <p>No records found.</p>
            </Box>
          ) : (
            <Box>
              {props.title ? <h2>{props.title}</h2> : null}
              <p>
                Error
                <br />
                <small>In fetching records...</small>
              </p>
            </Box>
          )}

          <Button m={3} size="small" variant="contained" color="primary">
            <Link to="/add" style={{ textDecoration: "none", color: "white" }}>
              Add New Employee
            </Link>
          </Button>
        </div>
      </>
    );

  let resultEmployees = data && data.employees.length ? data.employees : [];

  if (resultEmployees.length) {
    resultEmployees = resultEmployees.sort((a, b) =>
      parseInt(a.emp_id) > parseInt(b.emp_id) ? -1 : 1
    );
  }

  // console.log({ resultEmployees });
  return (
    <>
      <div className="content-wrapper">
        {props.title ? <h2>{props.title}</h2> : null}
        {props.subTitle ? <h5>{props.subTitle}</h5> : null}

        <Snackbar
          autoHideDuration={2500}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          onClose={handleClose}
          key={"field-snackbar" + 1}
        >
          <Alert onClose={handleClose} severity={`${snackbarState.severity}`}>
            {snackbarState.message}
          </Alert>
        </Snackbar>

        {!deleteActiveStatus ? (
          <Box
            m={3}
            display={"flex"}
            alignContent="center"
            justifyItems="space-around"
            justifyContent="space-between"
          >
            <Button size="small" variant="contained" color="secondary">
              <Link
                to="/delete"
                style={{ textDecoration: "none", color: "white" }}
              >
                Delete Employee
              </Link>
            </Button>

            <Button size="small" variant="contained" color="primary">
              <Link
                to="/add"
                style={{ textDecoration: "none", color: "white" }}
              >
                Add Employee
              </Link>
            </Button>
          </Box>
        ) : null}

        {resultEmployees.length ? (
          <List dense={true} style={{ maxHeight: "1000px", overflowY: "auto" }}>
            {!deleteActiveStatus && resultEmployees.length > 1 ? (
              <Box
                display="flex"
                justifyContent="flex-end"
                flexDirection="row"
                p={1}
              >
                <strong>Total Employees: {resultEmployees.length}</strong>
              </Box>
            ) : null}

            {resultEmployees.map((value, idx) => {
              return (
                <div key={"list" + idx}>
                  <ListItem
                    onClick={handleToggle(value.name)}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link
                      to={{
                        pathname: !deleteActiveStatus
                          ? `/edit/${value.emp_id}`
                          : "delete",
                        state: { employee: value }
                      }}
                      style={{ display: "flex", textDecoration: "none" }}
                      color="default"
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={value.name ? value.name.replace(" ", "-") : ""}
                        >
                          <small>
                            {value.name[0].toUpperCase() +
                              "" +
                              value.name[1].toUpperCase()}
                          </small>
                          {/* <PermIdentityIcon color={"inherit"} /> */}
                        </Avatar>
                      </ListItemAvatar>

                      {!deleteActiveStatus ? (
                        <>
                          <ListItemText
                            primary={value.name}
                            secondary={
                              <>
                                {value.designation} <br />
                                {value.phoneNumber ? (
                                  <>
                                    <span title={value.phoneNumber}>
                                      {value.phoneNumber}
                                    </span>{" "}
                                    |{" "}
                                  </>
                                ) : null}
                                <span title={value.email}>{value.email}</span>
                              </>
                            }
                          />
                        </>
                      ) : (
                        <ListItemText
                          primary={value.name}
                          secondary={value.email}
                        />
                      )}
                    </Link>

                    <FormControlLabel
                      control={
                        <Switch
                          value={
                            switchChecked[`reviewToggle${idx}`] ||
                            switchChecked.default
                          }
                          checked={
                            switchChecked[`reviewToggle${idx}`] ||
                            switchChecked.default
                          }
                          onChange={handleReviewSwitch(
                            value,
                            `reviewToggle` + idx
                          )}
                          name={`reviewToggle` + idx}
                        />
                      }
                      label="Assign to Review"
                    />
                    {deleteActiveStatus ? (
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(value)}
                        >
                          <DeleteOutlinedIcon color="secondary" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    ) : null}
                  </ListItem>
                </div>
              );
            })}
          </List>
        ) : null}

        {!resultEmployees.length && !deleteActiveStatus ? (
          <p>No employee's founds</p>
        ) : null}

        {deleteActiveStatus ? <Back /> : null}
      </div>
    </>
  );
};

export default EmployeeList;
