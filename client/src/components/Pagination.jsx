import { Flex, Button } from "@chakra-ui/react";
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


const arr = new Array(Math.ceil(total/showPerPage)).fill(0)


  return (

  <>
    <Flex justifyContent={"center"} gap={'5px'}  textAlign={"center"} marginTop={"8%"}>

      <Button onClick={() => onButtonClick("prev")} color={'white'}  bgColor={'red.400'}>
        Previous
      </Button>

      {arr.map((item,page)=>(
        
        <Button onClick={()=>onPaginationChange(page+1)}>
          {page+1}
        </Button>

      ))}

      <Button  onClick={() => onButtonClick("next")}  color={'white'} bgColor={'red.400'} >
        Next
      </Button>
    </Flex>
    </>

  );
};

export default Pagination;