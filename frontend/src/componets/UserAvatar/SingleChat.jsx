import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { ClassNames } from '@emotion/react'
import { Center, FormControl, Input, Spinner, useToast } from '@chakra-ui/react'
import { getSender, getSenderFull } from '../../config/ChatLogics'
import { ProfileModal } from '../miscellaneous/ProfileModal'
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal'
import axios from 'axios'
import io from 'socket.io-client';
import ScrollableChat from '../ScrollableChat'
import Lottie from "lottie-react";
import animationData from '../../animations/typing.json';


const ENDPOINT = "http://localhost:5000";
var socket , selectedChatCompare; 

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const {user, selectedChat, setSelectedChat ,  notification,
        setNotification} = ChatState()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const toast = useToast();

    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //       preserveAspectRatio: "xMidYMid slice",
    //     },
    //   };

    const  fetchMessage = async () => {
        if(!selectedChat) return
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }

            setLoading(true)

            const {data} = await axios.get(`/api/message/${selectedChat._id}`, config)
            console.log(data);
            setMessages(data);
            setLoading(false);
            socket.emit('join chat', selectedChat._id);
        } catch (error) {
            console.log(error)
            toast({
                title: "Error Occured !",
                description:"Failed to send the Message",
                status:"error",
                duration:3000,
                isClosable: true,
                position:"bottom-right"
            })
        }
    }

    
    useEffect(() =>{
        socket = io(ENDPOINT);
        socket.emit("setup",user);
        socket.on('Connected',() => setSocketConnected(true))
        socket.on('typing', ()=>setIsTyping(true))
        socket.on('stop typing', ()=>setIsTyping(false))
    },[]);


    useEffect(() => {
        fetchMessage();


        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
                    if(!notification.includes(newMessageRecieved)) {
                        setNotification([newMessageRecieved,...notification]);  
                        setFetchAgain(!fetchAgain)
                    }
            }else{
                setMessages([...messages, newMessageRecieved])
            }
        })
    })

    const sendMessage = async(event) => {
        if(event.key === "Enter" && newMessage){
            socket.emit('stop typing', selectedChat._id);
            try {
                const config ={
                    headers: {
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${user.token}`,
                    }
                }

                setNewMessage("");
                const {data} = await axios.post('/api/message', {
                    content: newMessage,
                    chatId: selectedChat._id,
                },config);

                console.log(data);
                socket.emit("new message", data);
                setMessages([...messages, data])
            } catch (error) {
                toast({
                    title: "Error Occured !",
                    description:"Failed to send the Message",
                    status:"error",
                    duration:3000,
                    isClosable: true,
                    position:"bottom-right"
                })
            }
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if(!socketConnected) return;
        if(!typing){
            setTyping(true)
            socket.emit('typing', selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(()=> {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if(timeDiff >= timerLength && typing) {
                socket.emit('stop typing', selectedChat._id);
                setTyping(false);
            }
        },timerLength);
    }

  return (
    <div>
        {
            selectedChat  ? (
                <div className='p-2 w-[calc(100vw_-_330px)] h-[calc(100vh_-_80px)]'>
                    <div className='flex items-center justify-between'>
                        {/* left arrow  */}
                        <div onClick={() => setSelectedChat("")}>
                            <svg xmlns="http://www.w3.org/2000/svg"   fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                                <path stroke-linecap="round" className='text-white' stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        {/* name  */}
                        <div>
                            {!selectedChat.isGroupChat ? (
                                <div className='text-lg font-medium'>{getSender(user, selectedChat.users)}</div>
                            ) : (
                                <>
                                    {selectedChat.chatName.toUpperCase()}
                                </>
                            )}
                        </div>

                        {/* profile view  */}
                        <div>
                        {!selectedChat.isGroupChat ? (
                                <ProfileModal user={getSenderFull(user, selectedChat.users)}/>
                        ) :(
                             <UpdateGroupChatModal 
                                fetchAgain={fetchAgain}
                                setFetchAgain={setFetchAgain}
                                fetchMessage={fetchMessage}
                                />
                        )}
                        </div>
                    </div>
                    {/* message box  */}
                    <div className="h-full w-full flex-col flex pb-6 justify-between items-center">
                        {loading ? (
                            <div className=''>
                                <Spinner size='xl' w={20} h={20} alignSelf='Center' margin='auto' />
                            </div>
                        ) : ( <div className=' justify-start overflow-auto self-start w-full'>
                            <ScrollableChat  messages={messages}/>
                            {istyping?<div>
                                    <Lottie
                                        animationData={animationData}
                                        loop={true}
                                        width={'20px'}
                                        style={{marginLeft: 20 , width: 80}}
                                    />
                                </div> : ""}
                        </div>)}    
                        <div className='w-full'>
                            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                                
                                <Input placeholder='Enter a Message' onChange={typingHandler} value={newMessage} className='w-full'/>
                            </FormControl>
                        </div>
                    </div>
                </div>
            ) : ( 
                <div className='text-xl text-white w-[calc(100vw_-_330px)] h-[calc(100vh_-_80px)] flex items-center justify-center'>
                    <p>CliCk On User To Satrt Chating....</p>
                </div>
            )
        }
    </div>
  )
}

export default SingleChat