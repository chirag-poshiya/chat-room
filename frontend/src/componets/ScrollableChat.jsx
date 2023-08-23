import React from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender, isSameSenderMargin } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import { Avatar, Tooltip } from '@chakra-ui/react';

const ScrollableChat = ({messages}) => {
    const { user } = ChatState();
  return (
    <ScrollableFeed className='w-full'>
        {messages && messages.map((m,i) => (
             <div className='flex ' style={{ display: 'flex'}} key={m._id}>
                    {(isSameSender(messages, m, i , user._id)
                        || isLastMessage(messages, i, user._id)
                    ) && (
                        <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                            <Avatar mt="7px" mr={1} size="sm" cursor={'pointer'} name={m.sender.name} src={m.sender.pic}/>
                        </Tooltip>
                    )}

                    <span className='rounded-sm p-2 mb-1 max-w-[75%]' style={{
                        backgroundColor: `${
                            m.sender._id === user._id ? "#D5D1DD" : "#8976AD"
                         }`,
                         marginLeft: isSameSenderMargin(messages, m,i, user._id),
                    }}
                    >{m.content}</span>
             </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat