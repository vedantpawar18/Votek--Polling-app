import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import {
    Button,
    Center,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text
  } from '@chakra-ui/react';
  
import { useEffect, useState } from 'react';
import validator from 'validator';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInAuth } from '../redux/auth/action';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';

  export default function SignIn() {
    const data = useSelector((store)=>store.auth.auth);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [emailError, setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    let userToken = localStorage.getItem("userToken");
    let userEmail = localStorage.getItem("userEmail");
    let userName = localStorage.getItem("userName");




const handleClick = ()=>{

let emailCheck = false;
let passCheck = false;

        if (!validator.isEmail(email)) {
        
          setEmailError("Not a valid email")
        }else{
           emailCheck = true
           setEmailError("")
        }
      

        if (!validator.isStrongPassword(password, {
            minLength: 8, minLowercase: 0,
            minUppercase: 0, minNumbers: 0, minSymbols: 0
          })){
            setPasswordError('Not a Strong Password')
          }else{
           passCheck = true
           setPasswordError("")
          }

        if(passCheck&&emailCheck){
            
          let data = {
           email:email,
           password:password
          }
      
          dispatch(signInAuth(data))
         

        }else{
          
        }
        
}



useEffect(()=>{

if(data?.token?.primaryToken){

  navigate("/dashboard")
}

},[data])






    return (
      <Stack minH={'100vh'}  direction={{ base: 'column', md: 'row' }}>
       <Layout/>
         
        <Flex  flex={1} align={'center'} justify={'center'}>
          <Stack spacing={3}  h={"90%"} w="100%" padding={'25px'} border={'1.5px solid #e8e8e8'} borderRadius={"10px"} maxW={'md'} >
            <Heading  fontFamily={"Open Sans"} fontSize={'2xl'}>Sign in </Heading>
            <FormControl id="email">
              <FormLabel fontFamily={"Open Sans"}>Email </FormLabel>
              <Input fontFamily={"Open Sans"} type="email" placeholder='example@mail.com' onChange={(e)=>setEmail(e.target.value)} />
              {
								emailError? <Text textAlign={"start"}  color={"red"}>{emailError}</Text> : <></>
							}
            </FormControl>
            <FormControl id="password">
              <FormLabel fontFamily={"Open Sans"}>Password</FormLabel>
              <InputGroup>
                <Input fontFamily={"Open Sans"} placeholder='keep your profile safe' onChange={(e)=>setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                  fontFamily={"Open Sans"}
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
            
              </InputGroup>
              {
								passwordError? <Text textAlign={"start"}  color={"red"}>{passwordError}</Text> : <></>
							}
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox fontFamily={"Open Sans"}>Remember me</Checkbox>
                {/* <Link color={'blue.500'}>Forgot password?</Link> */}
              </Stack>
              <Button fontFamily={"Open Sans"} color={'white'} bg={'red.400'} onClick={handleClick} variant={'solid'}>
                Sign in
              </Button>
              <Text fontFamily={"Open Sans"}>OR</Text>
              <Button
        w={'full'}
        maxW={'md'}
        variant={'outline'}
        leftIcon={<FcGoogle />}>
        <Center>
          <Text fontFamily={"Open Sans"}>Sign in with Google</Text>
        </Center>
      </Button>
            </Stack>
            <Text align={'center'} fontFamily={"Open Sans"} >
                Don't have an account? <Link color={'red.400'} href="/signup" >Sign-up</Link>
              </Text>
          </Stack>
        </Flex>
       
      </Stack>
    );
  }