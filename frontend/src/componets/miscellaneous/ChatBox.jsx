import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import SingleChat from '../UserAvatar/SingleChat';

export const ChatBox = ({fetchAgain, setFetchAgain})  => {
  const {selectedChat} = ChatState();
  return (
    <div  className='bg-[#070113] w-[calc(100vw_-_300px)] h-[calc(100vh_-_60px)] '>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </div>
  )
}
