import { Button, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import React, { useState } from 'react'

export default function Login() {
    
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading , setLoading] = useState(false);
    const toast = useToast()
    const history = useHistory();
    const handleClick = () => setShow(!show);


    const submitHandler = async () => {
        setLoading(true);
        if(!email || !password) {
            toast({
                title:"Pelese Fill badhuy",
                status: "warning",
                duration: 4000,
                isClosable: true,
                position: "bottom-right"
            });
            setLoading(false);
            return;
        };

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            };

            const { data } = await axios.post(
                '/api/user/login',
                {email , password},
                config
            );

            toast({
                title:"Login successfuly ",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "bottom-right"
            });

             
        localStorage.setItem('userInfo',JSON.stringify(data));
        setLoading(false);
        history.push('/chats');
        }catch (error) {
            toast({
                title:"Error Occured",
                status: "error",
                description: error.response.data.message,
                duration: 4000,
                isClosable: true,
                position: "bottom-right"
            });
         setLoading(false);
       }
    };

    return (
        <div>
            <div className=''>
                <div className="py-4 px-12  z-20">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-4 text-black cursor-pointer">Welcome Back !!</h1>
                        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer"></p>
                    </div>
                    <div className='space-y-2'>

                        <FormControl id='email' textColor={'black'} isRequired>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email Addres" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                        </FormControl>

                        
                        <FormControl id='password' textColor={'black'} isRequired>
                            <InputGroup>
                                <Input textColor={'black'} value={password} type={show ? "text" : "password"} placeholder='Set Password' onChange={(e) => setPassword(e.target.value)} />
                                <InputRightElement w={'4.5rem'}>
                                    <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button colorScheme='purple' w={"100%"} isLoading={loading} style={{marginTop: 15}} onClick={submitHandler}>Log In</Button>
                        <Button colorScheme='red' w={"100%"} style={{marginTop: 8}} onClick={() => {setEmail("guest@gmail.com"); setPassword('123')}} >Get Guest</Button>
                    </div>
                   
                </div>

            </div>
        </div>
    );
}
