import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const Pagination2 = (props) => {
const [currentPage, setCurrentPage] = useState(1);
const [pagesArr, setPagesArr] = useState([]);

useEffect(() => {
let total_pages = Math.ceil(props.items.length / 8);
let arr = [];
for (let i = 0; i < total_pages; i++) {
arr.push(i + 1);
}
setPagesArr(arr);
setCurrentPage(1);
}, [props.items]);

const handlePageClick = (page) => {
setCurrentPage(page);
props.onPageChange(page);
};

return (
<>
{pagesArr.map((page) => (
<Button key={page} onClick={() => handlePageClick(page)}>{page}</Button>
))}
</>
);
};

export default Pagination2;