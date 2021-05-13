import React from "react";
import {
  Button,
  Snackbar,
  Box,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import { fetchLocally } from "../../utlity";
import { LSKey } from "../../utlity/constants";
import { Link } from "react-router-dom";

const PerformanceReview = (props) => {
  const reviewEmployees = fetchLocally(LSKey.PERF_REVIEW) || [];

  return (
    <>
      <div style={{}} className="content-wrapper">
        <h2>{props.title}</h2>
        <h5>{props.subTitle}</h5>

        {!reviewEmployees || !reviewEmployees.length ? (
          <Box m={3}>No performance review data found.</Box>
        ) : null}

        <List dense={true} style={{ maxHeight: "1000px", overflowY: "auto" }}>
          {reviewEmployees.map((value, idx) => {
            return (
              <div key={"list" + idx}>
                <ListItem
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link
                    to={{
                      pathname: "review-employee",
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

                    <ListItemText
                      primary={value.name}
                      secondary={value.designation}
                    />
                  </Link>
                </ListItem>
              </div>
            );
          })}
        </List>
      </div>
    </>
  );
};

export default PerformanceReview;
