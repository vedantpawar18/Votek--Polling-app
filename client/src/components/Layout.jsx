import {
	Box,
	Flex,
	Heading,
	Image,
	Stack
} from "@chakra-ui/react";

import { CheckCircleIcon } from "@chakra-ui/icons";
import logo from "../images/logo.png";
import Frame from "../images/Frame.png";
import { useNavigate } from "react-router-dom";
export default function Layout() {

const navigate = useNavigate()
	const LinkItems = [
		{ name: "Ability to create live polls and get live results." },
		{ name: "Login functionality for admin & user." },
		{ name: "Create polls using inbuilt templates." },
		{ name: "Easy & understandable UI/UX." },
	];

	return (
		<Stack  maxW={'7xl'}  padding={"50px"} bgColor={"#F2F7FF"}>
			<Flex  justify={"center"} h={"100%"} bgColor={"#F2F7FF"}>
				<Stack spacing={6} w={"full"} maxW={"lg"}>
					<Box
					
						width={"25%"}
						height={"7%"}
						alignItems={"center"}
						bgColor={"#F2F7FF"}
					>
						<Flex  width={"100%"}
						cursor={'pointer'}
						onClick={()=>navigate('/')}
						height={"100%"}>
						<Image src={logo} width={"45%"} bgColor={"#F2F7FF"}/>
						<Image src={Frame} width={"20%"} height={'80%'}  bgColor={"#F2F7FF"} ml={"2px"}/>
						</Flex>


					</Box>

					<Stack width={"100%"} height={"100%"}>
						<Box mt={"15%"}></Box>
						<Heading
							
							fontFamily={"Open Sans"}
							fontSize={"30px"}
							fontWeight={"700"}
							textAlign={"start"}
						>
							Create live polls with Masai Poll and watch live results
						</Heading>

						<Box width={"100%"} height={"50%"}>
							{LinkItems.map((link) => (
								<Box
									textAlign={"start"}
									key={link.name}
									mt={"20px"}
									fontFamily={"Open Sans"}
									textColor={"#544D4F"}
								>
									<CheckCircleIcon color={"rgba(215, 26, 32, 1)"} /> {link.name}
								</Box>
							))}
						</Box>
					</Stack>
				</Stack>
			</Flex>
			<Flex flex={1}>
			
			</Flex>
		</Stack>
	);
}