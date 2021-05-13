import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
  // useHistory
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import Drawer from "@material-ui/core/Drawer";
import ToggleButton from "@material-ui/lab/ToggleButton";

import ViewListIcon from "@material-ui/icons/ViewList";

import Logo from "./components/Logo";
import Employee from "./components/employee";
import AddEmployee from "./components/employee/add";
import EditEmployee from "./components/employee/edit";
import Footer from "./components/Footer";
import PerformanceReview from "./components/performance-review";
import ReviewEmployee from "./components/performance-review/review";

const useStyles = makeStyles((theme) => ({
  root: {
    //fontFamily: "Pacifico, cursive",
    width: "100%",
    // maxWidth: 640,
    margin: "0 auto"
    // padding: '.8rem 1.4rem',
    // background: 'rgba(221, 221, 221,.9)',
    // color: '#000',
  }
}));

export default function App(props) {
  // const history = useHistory();
  const classes = useStyles();

  const [layout, setLayout] = useState("list");

  const [deletionActive, setDeletionActive] = useState(false);

  const employeeAddedStatus = (status) => {
    // console.log("employeeAddStatus invoke at parent");
    if (status) {
      setLayout("list");
    }
  };

  const employeeDeletedStatus = (status) => {
    // console.log("employeeAddStatus invoke at parent");
    if (status) {
      setDeletionActive(false);
      setLayout("list");
    }
  };

  const handleBack = () => {
    setLayout("list");
  };

  // console.log("props app ", props);
  // console.log("history app ", history);

  return (
    <>
      <Router>
        <div className="App">
          <Logo />

          <Box display={"flex"} className={classes.root}>
            <Box
              className="sidebar-nav"
              style={{ width: "30%" }}
              display={"flex"}
              justifyContent="flex-start"
            >
              <List>
                <ListItem button className="list-item">
                  <NavLink
                    to={"/employees"}
                    activeClassName="active"
                    style={{ textDecoration: "none" }}
                  >
                    {"Employees"}
                  </NavLink>
                </ListItem>
                <Divider />
                <ListItem button className="list-item">
                  <NavLink
                    to={"/performance-review"}
                    activeClassName="active"
                    style={{ textDecoration: "none" }}
                  >
                    {"Performance Review"}
                  </NavLink>
                </ListItem>
              </List>
            </Box>

            <Switch>
              <Route exact path={["/", "/employees"]}>
                <Employee title="Employees Dashboard" />
              </Route>
              <Route exact path="/performance-review">
                <PerformanceReview
                  title="Performance Review Dashboard"
                  subTitle="All Employees"
                />
              </Route>
              <Route path="/add">
                <AddEmployee
                  title="Employees Dashboard"
                  subTitle="Add Employee"
                  onEmployeeAddedStatus={employeeAddedStatus}
                />
              </Route>
              <Route path="/delete">
                <Employee
                  title="Employees Dashboard"
                  subTitle="Delete Employee"
                  onEmployeeDeletedStatus={employeeDeletedStatus}
                  deleteActiveStatus={true}
                />
              </Route>
              <Route path="/delete:id">
                <Employee
                  title="Employees Dashboard"
                  subTitle="Delete Employee"
                  onEmployeeDeletedStatus={employeeDeletedStatus}
                  deleteActiveStatus={true}
                />
              </Route>
              <Route path="/edit/:id">
                <EditEmployee
                  title="Employees Dashboard"
                  subTitle="Edit Employee"
                />
              </Route>

              <Route path="/review-employee">
                <ReviewEmployee
                  title="Performance Review Dashboard"
                  subTitle="Review Employee"
                />
              </Route>
            </Switch>
          </Box>

          {/* Back Component */}
          {layout === "add" || layout === "delete" ? (
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={() => handleBack()}
                variant="contained"
                color="action"
                size="small"
                className="d-flex align-self-start"
              >
                Back
                {/* <ArrowBackIcon size="small" />  Back */}
              </Button>
            </Box>
          ) : null}

          <Footer {...props} />

          {/* <Route exact path={`/`} component={() => <Footer {...props} />} /> */}
        </div>
      </Router>
    </>
  );
}
