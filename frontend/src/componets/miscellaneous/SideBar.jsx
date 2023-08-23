import React, { useState } from "react";
import {
  Typography,
  Input,
  Drawer,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ChatState } from "../../Context/ChatProvider";
import { useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import UserListItem from "../UserAvatar/UserListItem";



export function SideBar(props) {
  // console.log(props)
  // const {user} = ChatState()
  const { openDrawer, closeDrawer, SideBaropen } = props;
  const {user ,setSelectedChat , chats , setChats} = ChatState()
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult ] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingChat, setLoadingChat] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()

  // console.log(searchResult.length);
  

  const handleSearch = async () => {
    if(!search) {
      toast({
        title: "Please Enter Something in Search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization:`Bearer ${user.token}`
        }
      };
      const {data} = await axios.get(`/api/user?search=${search}`, config)
      setLoading(false);

      setSearchResult(data);
      
    } catch (error) {
      toast({
        title: "Error Occured",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
      
      const {data} = await axios.post("/api/chat", {userId}, config);
      if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the Chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }
  }


  return (
    <React.Fragment >
      <Button className="p-2 bg-transparent" onClick={openDrawer}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </Button>
      <Drawer open={SideBaropen} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Serach User
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="bg-white h-[calc(100vh-2rem)] w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5 ">

          <div className="p-2 flex items-center justify-start relative">
            <Input onChange={(e) => setSearch(e.target.value)} value={search} icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
            <button onClick={handleSearch} className="w-[30px] h-[30px]  absolute right-3 z-10 rounded-lg"></button>
          </div>
         <div className="space-y-2 h-[60vh] overflow-auto">
          { loading? (
              <Spinner/> 
              ) : (
                  searchResult?.map((user) => (
                  <UserListItem 
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                  />
                  ))
              )}
           
          </div>


        </div>

      </Drawer>
    </React.Fragment>
  );
}


