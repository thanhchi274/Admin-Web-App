import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  a: {
    color: "#fff",
    "&:hover": {
      color: "#fff",
    },
  },
}));
const ListImageLink = ({ data }) => {
  const classes = useStyles();
  const handleClick = (value) => {
    console.log(value);
    window.location.href(value);
  };
  return data ? (
    <>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        {data.map((item, index) => (
          <Button
            className={classes.a}
            key={index}
            target="_blank"
            href={`${item.images}`}
          >
            {index} Image
          </Button>
        ))}
      </ButtonGroup>
    </>
  ) : null;
};
export default ListImageLink;
