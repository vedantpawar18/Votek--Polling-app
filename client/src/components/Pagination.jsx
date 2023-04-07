import { Box, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <Box className="d-flex justify-content-between" textAlign={"center"} marginTop={"8%"} >
      <Button onClick={() => onButtonClick("prev")} marginRight={"15%"} >
        Previous
      </Button>
      <Button  onClick={() => onButtonClick("next")} >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;