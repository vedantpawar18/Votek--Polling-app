import {
	Box,
	Button,
	Container,
	Heading,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import * as XLSX from 'xlsx'
import { useDispatch } from "react-redux";
import {  userVotedData } from "../redux/data/action";
import { useSelector } from "react-redux";

const UserVoted = () => {

    const dispatch  = useDispatch();
    let token = localStorage.getItem("adminToken");
    let pollId = localStorage.getItem("pollId");
    let optionId = localStorage.getItem("optionId");
    let questionId = localStorage.getItem("questionId");

const data = useSelector((store)=>store.data.userVoted)


    useEffect(()=>{
        let data = {
            pollId:pollId,
            optionId:optionId,
            questionId:questionId
        }

     dispatch(userVotedData(data,token))

    },[])

 
    const  handleClick = ()=>{
        const newData = data.map(({ email, fullName }) => ({ email, fullName }));
        const worksheet = XLSX.utils.json_to_sheet(newData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'user voted data.xlsx');
    }

   


	return (
		<>
			<Navbar />
			<Container padding={"3%"} maxW="6xl" centerContent>
				<Heading>User Voted</Heading>
				<TableContainer
					padding={"4%"}
					centerContent
					w="100%"
					mt="auto"
					mr={"auto"}
				>
					<Table size="md" justify={"space-between"}>
						<Thead>
							<Tr>
								<Th>User Name</Th>
								<Th>Email</Th>
							</Tr>
						</Thead>
						<Tbody>
                            {data.map((item)=>(
                                <Tr>
								<Td>{item.fullName}</Td>
								<Td>{item.email}</Td>
							</Tr>
                            ))}

						</Tbody>
					</Table>
				</TableContainer>
				<Button bgColor={"red.400"} onClick={handleClick} color={"white"} mt={"5%"}>
					Download
				</Button>
			</Container>
		</>
	);
};

export default UserVoted;