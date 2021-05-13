import React from "react";
import { Link } from "react-router-dom";

import { Box } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Back = () => {
  return (
    <Box p={2} display="flex" justifyContent="center">
      <Link to="/" className="btn btn-action btn-back">
        <ArrowBackIcon fontSize="large" />
        {/* Back */}
      </Link>
    </Box>
  );
};

export default Back;
