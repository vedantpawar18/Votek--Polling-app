import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

const Pagination = ({ data, pagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const totalPages = Math.ceil(data.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderCards = currentCards.map((card, index) => {
    return (
      <div className="card" key={index}>
        <h2>{card.title}</h2>
        <p>{card.description}</p>
      </div>
    );
  });

  useEffect(() => {
    pagination(currentItems, currentPage, totalPages);
  }, [currentPage, data]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <Box
        key={number}
        id={number}
        onClick={handlePageClick}
        fontFamily={"Open Sans"}
        className={currentPage === number ? "active" : null}
      >
        {number}
      </Box>
    );
  });

  return (
    <Box className="pagination">
      {renderCards}
      <Flex alignItems={"center"} gap={3} id="page-numbers">
        <Button
          bg={"#FFC1C3"}
          onClick={handlePrevClick}
          isDisabled={currentPage === 1 ? true : false}
        >
          <GrCaretPrevious />
        </Button>
        <Text fontWeight={600}>{currentPage}</Text>
        <Button
          bg={"#FFC1C3"}
          onClick={handleNextClick}
          isDisabled={currentPage === totalPages ? true : false}
        >
          <GrCaretNext />
        </Button>
      </Flex>
    </Box>
  );
};

export default Pagination;
