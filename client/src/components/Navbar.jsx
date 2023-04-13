import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Menu,
  MenuButton,
  VStack,
  Text,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [show, setShow] = useState(false);
  const data = useSelector((store) => store.auth.auth.token?.primaryToken);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  let userName = localStorage.getItem("userName");
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (userName || data) {
      setShow(true);
    }
  }, [data, userName]);

  return (
    <>
      <Box className={styles.navContainer} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box
              cursor={"pointer"}
              onClick={() => navigate("/")}
              className={styles.logo}
            ></Box>
            {userName === "Admin" ? (
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <NavLink >
                  <Link color="black" textDecoration={"none"} href="/dashboard">
                    Dashboard
                  </Link>
                </NavLink>
                <NavLink >
                  <Link color="black" textDecoration={"none"} href="/create">
                    Create Polls
                  </Link>
                </NavLink>
                <NavLink >
                  <Link
                    color="black"
                    textDecoration={"none"}
                    href="/live-polls"
                  >
                    Live Polls
                  </Link>
                </NavLink>
                <NavLink >
                  <Link
                    color="black"
                    textDecoration={"none"}
                    href="/ended-polls"
                  >
                    Ended Polls
                  </Link>
                </NavLink>
              </HStack>
            ) : (
              <>
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  <NavLink >
                    <Link color="black" textDecoration={"none"} href="/dashboard">
                      Dashboard
                    </Link>
                  </NavLink>
                  <NavLink >
                    <Link color="black" textDecoration={"none"} href="/user/participate">
                      Participate
                    </Link>
                  </NavLink>
                  <NavLink >
                    <Link
                      color="black"
                      textDecoration={"none"}
                      href="/user/recentpolls"
                    >
                      Recent Polls
                    </Link>
                  </NavLink>
                </HStack>
              </>
            )}
          </HStack>
          <Flex alignItems={"center"}>
            {!show ? (
              <Button
                bg="#D71A20"
                color="white"
                fontWeight={500}
                className={styles.loginButton}
                onClick={() => navigate("/signin")}
              >
                Login
              </Button>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Flex>
                    <Avatar
                      size={"25px"}
                      round="20px"
                      fontFamily={"Open Sans"}
                      textSizeRatio={"60px"}
                      name={userName}
                    />

                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text
                        margin={"auto"}
                        fontFamily={"Open Sans"}
                        fontSize="sm"
                        fontWeight={"600"}
                      >
                        {userName}
                      </Text>
                    </VStack>
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    fontFamily={"Open Sans"}
                    onClick={() => navigate("/dashboard")}
                  >
                    My Dashboard
                  </MenuItem>
                  <MenuItem fontFamily={"Open Sans"} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {/* {Links.map((link) => (
                <NavLink </NavLink>
              ))} */}
              {/* <NavLink onClick={()=>navigate("/dashboard")}><Link ></Link>Dashboard</NavLink> */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
