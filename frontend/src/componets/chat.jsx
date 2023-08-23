import React, { useEffect, useState } from 'react'
import axios from "axios";
import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import { SideBar } from './miscellaneous/SideBar';
import { MyChat } from './miscellaneous/MyChat';
import { ChatBox } from './miscellaneous/ChatBox';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { ProfileModal } from './miscellaneous/ProfileModal';
import {useHistory} from 'react-router-dom';
import { getSender } from '../config/ChatLogics';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
 


export default function Chat() {
    const {user , notification, setNotification ,setSelectedChat} = ChatState()
    const [SideBaropen, setSideOpen] = React.useState(false);
    const openDrawer = () => setSideOpen(true);
    const closeDrawer = () => setSideOpen(false);
    const [fetchAgain , setFetchAgain] = useState(false);
    const handleOpen = (value) => {
      setSideOpen(SideBaropen === value ? 0 : value);
    };
    const history = useHistory();
   
    const logoutHandler = () => {
      localStorage.removeItem("userInfo");
      history.push("/");
    }

  return (
    <div>
      {user &&
        <div className=' h-[60px] shadow-deep-purple-500 shadow-md bg-[#433858a3] w-screen px-[20px] flex justify-between items-center'>
          <SideBar openDrawer={openDrawer} SideBaropen={SideBaropen}  closeDrawer={closeDrawer}/>
          <p className=' text-lg text-white font-medium font-sans'>Chat App</p>
          <divc className="flex items-center gap-1">
              <Menu>
                <MenuHandler>
                  <IconButton className='relative ' variant="text">
                    {/* { notification.length > 0 ? 
                     <div className='bg-[#f00]  w-[8px] h-[8px] rounded-full absolute right-0 top-[-2px]'></div>
                    : 
                    ''} */}
                    <NotificationBadge count={notification.length} effect={Effect.SCALE}/>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-7 w-7"
                    >
                      <path
                      className='text-white'
                        fillRule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconButton>
                </MenuHandler>
                <MenuList List className="flex flex-col gap-2">
                  {!notification.length && "No Notification"}
                  {notification.map((notif) => (
                    <MenuItem key={notif._id} onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }} className="flex items-center cursor-pointer gap-4 py-2 pr-8 pl-2">
                      <Avatar
                        variant="circular"
                        alt="tania andrew"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      />
                      <div className="flex flex-col gap-1">
                        <Typography variant="small" color="gray" className="font-normal">
                          you a message in   
                          <span className="pl-2 text-blue-gray-900 font-bold">{notif.chat.isGroupCHat? `${notif.chat.chatName}` : `${getSender(user, notif.chat.users)}`}</span> 
                        </Typography>
                        <Typography
                          variant="small"
                          className="flex items-center gap-1 text-xs text-gray-600"
                        >
                          <ClockIcon />
                          13 minutes ago
                        </Typography>
                      </div>
                    </MenuItem>
                  ))}
                 
                </MenuList>
              </Menu>
              {/* profile menu  */}
              <Menu>
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    alt={user.name}
                    className="cursor-pointer w-10 h-10"
                    src={user.pic}
                  />
                </MenuHandler>
                <MenuList>
                  <ProfileModal user={user} >
                    <MenuItem className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <Typography variant="small" className="font-normal">
                        {user.name}
                      </Typography>
                    </MenuItem>
                  </ProfileModal>
                  <MenuItem className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <Typography variant="small" className="font-normal">
                      Edit Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                      />
                    </svg>
                    <Typography variant="small" className="font-normal">
                      Inbox
                    </Typography>
                  </MenuItem>
                  <MenuItem className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                      />
                    </svg>
                    <Typography variant="small" className="font-normal">
                      Help
                    </Typography>
                  </MenuItem>
                  <hr className="my-2 border-blue-gray-50" />
                  <MenuItem onClick={logoutHandler} className="flex items-center gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                      />
                    </svg>
                    <Typography  variant="small" className="font-normal">
                      Sign Out
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
              {/* profile menu end */}
          </divc>
        </div>
      }
        <Box className='flex items-start gap-[5px]'>
            {user && <MyChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        </Box>
    </div>
  )
}

 
function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className=" h-3 w-3"
    >
      <path
      
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
