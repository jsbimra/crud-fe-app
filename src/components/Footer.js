import React from "react";
import { Figure } from "react-bootstrap";
import { Box } from "@material-ui/core";

const Footer = (props) => {
  return (
    <>
      <Box p={2} className="footer">
        <Figure>
          <Figure.Caption>
            Thanks!
          </Figure.Caption>
        </Figure>
      </Box>
    </>
  );
};

export default Footer;
