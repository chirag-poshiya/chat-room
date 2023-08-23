import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { Box, background, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';
import { getSender } from '../../config/ChatLogics';
import GroupChatModal from './GroupChatModal';

export const MyChat = ({fetchAgain, setFetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const {selectedChat ,setSelectedChat, user , chats , setChats} = ChatState();
  const toast = useToast();

  const  fetchChats = async () =>{
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

    const {data} = await axios.get("/api/chat", config);
   
    setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain])

  return (
    <div className='w-[300px] bg-[#433858a3] shadow-md shadow-light-green-50 h-[calc(100vh_-_60px)]'>
      <div className='flex justify-end'>
        <GroupChatModal>
          <button className='p-[10px] m-2 font-medium text-black bg-purple-200 rounded-lg'>Create Group +</button>
        </GroupChatModal>
      </div>
      <div className='p-[20px] space-y-2'> 
          {chats ? (
            <div>
              {
                chats.map((chat) => (
                    <div key={chat._id} onClick={() => setSelectedChat(chat)} class="cursor-pointer flex items-center space-x-4" background={selectedChat === chat ? "#38b2ac" : "#e8e8e8"}>
                        <img class="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits/men/23.jpg" alt=""/>
                        <div class="font-medium text-white">
                            <div>{!chat.isGroupChat? getSender(loggedUser, chat.users):chat.chatName}</div>
                            <div class="text-sm  text-gray-400">Joined in August 2023</div>
                        </div>
                    </div>
                ))
              }
            </div>
          ):(
            <Spinner/>
          )}

      </div>
    </div>
  )
}
