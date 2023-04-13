import { Box, Button, Stack, Heading, Text, Image } from "@chakra-ui/react";

import dashboard_image from "../images/dashboard_image.png";
import image_1 from "../images/image_1.png";
import image_2 from "../images/image_2.png";
import image_3 from "../images/image_3.png";
import image_4 from "../images/image_4.png";
import Navbar from "../components/Navbar";

export default function Simple() {
  return (
    <>
      <Navbar />
      <Stack
        height={"10%"}
        width={"100%"}
        direction={{ base: "column", md: "row" }}
        mb={"5%"}
        mt={"1%"}
      >
        <Box padding={"4%"} textAlign={"start"} w={"50%"} h={"300px"}>
          <Heading fontFamily={"Open Sans"} lineHeight={"100px"}>
            Interactive Live Polling
          </Heading>
          <Text fontFamily={"Open Sans"} color={"#6C6768"}>
            Mentimeter gives you the power to design a wide variety of
            interactive polls. Polling your audience can be the most effective
            way to increase engagement and make a presentation dynamic and
            memorable.
          </Text>
          <Button
            fontFamily={"Open Sans"}
            bgColor={"red"}
            color={"white"}
            mt={"2%"}
          >
            Show Poll
          </Button>
        </Box>
        <Box w={"50%"} h={"300px"}>
          <Image src={dashboard_image} w={"100%"} h={"100%"} fit={"contain"} />
        </Box>
      </Stack>
      <Stack
        direction={{ base: "column", md: "row" }}
        justify={"space-around"}
        bgColor={"#F2F7FF"}
      >
        <Box>
          <Box w={"100%"} height={"80%"}>
            <Image src={image_1} />
          </Box>

          <Text
            fontFamily={"Open Sans"}
            fontWeight={"600"}
            fontSize={"17px"}
            fontStyle={"normal"}
          >
            Ask Multiple Choice questions
          </Text>
        </Box>
        <Box>
          <Box w={"100%"} height={"80%"}>
            <Image src={image_2} />
          </Box>

          <Text
            fontFamily={"Open Sans"}
            fontWeight={"600"}
            fontSize={"17px"}
            fontStyle={"normal"}
          >
            See trends with segmentation
          </Text>
        </Box>
        <Box>
          <Box w={"100%"} height={"80%"}>
            <Image src={image_3} />
          </Box>

          <Text
            fontFamily={"Open Sans"}
            fontWeight={"600"}
            fontSize={"17px"}
            fontStyle={"normal"}
          >
            Easy & understanding
          </Text>
        </Box>
        <Box>
          <Box w={"100%"} height={"80%"}>
            <Image src={image_4} />
          </Box>

          <Text
            fontFamily={"Open Sans"}
            fontWeight={"600"}
            fontSize={"17px"}
            fontStyle={"normal"}
          >
            Cloud functionality
          </Text>
        </Box>
      </Stack>
    </>
  );
}
