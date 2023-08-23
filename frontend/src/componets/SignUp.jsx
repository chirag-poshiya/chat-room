import { Button, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useHistory} from 'react-router-dom';

export default function SignUp() {
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmpassword, setConfirmpassword] = useState()
    const [pic, setPic] = useState()
    const [loading , setLoading] = useState(false)
    const toast = useToast()
    const handleClick = () => setShow(!show);
    const history = useHistory();
    
    const postDetails = (pics) => {
        setLoading(true);
        if(pics===undefined) {
            console.log('undifind')
            toast({
                title: 'Please Select an Image.',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: "bottom",
            })
            return;
        }
        
        
        if(pics.type === "image/jpeg" || pics.type === "image/png") {
            // console.log(pics);
            // console.log('pics');
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset","chat-app");
            data.append("cloud_name","dodkgtqbf");
            fetch("https://api.cloudinary.com/v1_1/dodkgtqbf/image/upload" , {
                method: "post",
                body:data,
            }).then((res) => res.json()).then(data => {
                setPic(data.url.toString());
                setLoading(false);
            });
        }else{
            console.log('else')
            toast({
                title: 'PleaseEE Select an Image.',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: "bottom",
              })
              return;
        }
    }

    const submitHandler = async ()  => {
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
            toast({
                title:"Pelese Fill badhuy",
                status: "warning",
                duration: 4000,
                isClosable: true,
                position: "bottom-right"
            })
            setLoading(false);
            return;
        }
        
        if(password !== confirmpassword) {
            setLoading(false);
            toast({
                title:"Password Do Not Match",
                status: "warning",
                duration: 4000,
                isClosable: true,
                position: "bottom-right"
            });
            return;
       }

       try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        };
        const { data }  =  await axios.post("/api/user" , {name,email,password, pic}, config)
        toast({
            title:"Registration successful ",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "bottom-right"
        });
         
        localStorage.setItem('userInfo',JSON.stringify(data));
        setLoading(false);
        history.push('/chats');
       } catch (error) {
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


    }

    return (
        <div>
            <div className=''>
                <div className="py-4 px-12  z-20">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-4 text-black cursor-pointer">Create An Account</h1>
                        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an account to enjoy all the services without any ads for free!</p>
                    </div>
                    <div className='space-y-2'>
                    <FormControl textColor={'black'}  id='first-name' isRequired> 
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Your Name" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    </FormControl>

                    <FormControl id='email' textColor={'black'} isRequired>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Addres" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    </FormControl>

                    <FormControl id='password' textColor={'black'} isRequired>
                        <InputGroup>
                            <Input textColor={'black'} type={show ? "text" : "password"} placeholder='Set Password' onChange={(e) => setPassword(e.target.value)} />
                            <InputRightElement w={'4.5rem'}>
                                <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl id='confirmpassword' textColor={'black'} isRequired>
                        <InputGroup>
                            <Input textColor={'black'} type={show ? "text" : "password"} placeholder='Confirm Password' onChange={(e) => setConfirmpassword(e.target.value)} />
                            <InputRightElement w={'4.5rem'}>
                                <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl id="pic" isRequired>
                        <Input textColor={"black"} type='file'p={1.5} accept='image/' onChange={(e) => postDetails(e.target.files[0])} />
                    </FormControl>
                    <Button colorScheme='purple' w={"100%"} isLoading={loading} style={{marginTop: 15}} onClick={submitHandler}>Sign Up</Button>

                    </div>

                </div>
            </div>
        </div>
    )
}
