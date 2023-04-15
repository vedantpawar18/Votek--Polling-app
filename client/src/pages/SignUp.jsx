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
    Text,
    useToast
  } from '@chakra-ui/react';
  
import { useEffect, useState } from 'react';
import validator from 'validator';
import Layout from '../components/Layout';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/auth/action';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

  export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const[name,setName]=useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError,setPasswordError] = useState("")
    const data = useSelector((store)=>store.auth.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast()
    const error = useSelector((store) => store.auth.error);

const handleClick = ()=>{
  
let emailCheck = false;
let passCheck = false;


if(name.length<3){
	setNameError("Enter valid name")
}else{
	setNameError("")
}


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
          let postData = {
            email:email,
            password:password,
            fullName:name
            
            }
            dispatch(signUp(postData))
    
        }else{
          
        
    
        }
        
}


useEffect(()=>{

  if(data?.token?.primaryToken){
  
    navigate("/dashboard")
  }
  
  },[data,navigate])


useEffect(()=>{
if(error?.response?.data){
  toast({
    title: 'Account already exist.',
    description: "Please login.",
    status: 'warning',
    duration: 9000,
    isClosable: true,
  })
}
  
},[error,toast])





    return (
      <Stack minH={'100vh'}  direction={{ base: 'column', md: 'row' }} >
       <Layout />
         
        <Flex  flex={1} align={'center'} justify={'center'} >
          <Stack spacing={3}  h={"95%"} w="100%" padding={'25px'}  borderRadius={"10px"} maxW={'md'} border={'1px solid #CCCCCC'}>
            <Heading fontFamily={"Open Sans"}  fontSize={'2xl'}>Sign up </Heading>
            
								<FormControl id="firstName" isRequired>
									<FormLabel fontFamily={"Open Sans"}>First Name</FormLabel>
									<Input fontFamily={"Open Sans"}  placeholder="enter name here" type="text"  value={name} onChange={(e)=>setName(e.target.value)}  />
                                    {
								nameError? <Text textAlign={"start"} color={"red"}>{nameError}</Text> : <></>
							}
								</FormControl>
            <FormControl id="email">
              <FormLabel fontFamily={"Open Sans"}>Email </FormLabel>
              <Input  fontFamily={"Open Sans"} type="email" placeholder='example@mail.com' onChange={(e)=>setEmail(e.target.value)} />
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
                    variant={'ghost'}
                    fontFamily={"Open Sans"}
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
                Sign up
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
            <Text fontFamily={"Open Sans"} align={'center'}>
               aleady an account? <Link color={'red.400'} href="/signin">Sign-in</Link>
              </Text>
          </Stack>
        </Flex>
       
      </Stack>
    );
  }