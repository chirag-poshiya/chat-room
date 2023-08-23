import { Modal, ModalBody, ModalCloseButton,Button, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast, Input, FormControl } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import { Spinner } from '@material-tailwind/react';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

function GroupChatModal({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ groupChatName, setGroupChatName] = useState();
    const [ selectedUsers, setSelectedUsers] = useState([]);
    const [ search , setSearch ] = useState("");
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const toast = useToast();

    const {user , chats ,setChats} = ChatState();


    const handleSearch = async (query) =>{
        // console.log(query)
        setSearch(query)
        if(!query){
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }


            const {data} = await axios.get(`/api/user?search=${search}`, config);
            // console.log(data)
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
            }
        }
        const handleSubmit = async() =>{
            if(!groupChatName || !selectedUsers) {
            toast({
                title: "Please fill all feilds",
                status: "warring",
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
              });
              return;
        }


        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }


            const {data} = await axios.post(
                '/api/chat/group', 
                {
                name: groupChatName,
                users:JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                config
            );

            setChats([data, ...chats]);
            onClose();
            toast({
                title:"New Group Chat Created!",
                status: "success", 
                duration: 4000,
                isClosable: true,
                position: "bottom-right"
            });
        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right"
            })
        }
    }
    const handelGroup = (userToAdd) =>{
        
        if(selectedUsers.includes(userToAdd)){
            toast({
                title: "User already Added",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
            })
            return;
        }

        setSelectedUsers([...selectedUsers,userToAdd])
        
    }
    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== delUser._id))
    }
    
    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Group Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                    <FormControl>
                        <Input placeholder='Chat Name' mb={3} onChange={(e) => setGroupChatName(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <Input placeholder='Add User' mb={3} onChange={(e) => handleSearch(e.target.value)}/>
                    </FormControl>
                    <div className='py-2 badge flex-wrap flex gap-2'>
                        {selectedUsers.map(u => {
                           return <UserBadgeItem key={user._id} user={u} handleFunction={()=> handleDelete(u)}/>
                        })}

                    </div>
                    
                    <div className="space-y-2  overflow-auto">
                        { loading? (
                            <Spinner/> 
                            ) : (
                                searchResult?.map((user) => (
                                <UserListItem 
                                key={user._id}
                                user={user}
                                handleFunction={() => handelGroup(user)}
                                />
                                ))
                            )}
                        
                        </div>

              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' onClick={handleSubmit}>
                  Create Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal