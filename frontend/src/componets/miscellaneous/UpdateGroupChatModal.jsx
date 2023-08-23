import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModal = ({ children, fetchAgain, setFetchAgain ,fetchMessage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);
    const toast = useToast();
    const { selectedChat, setSelectedChat, user } = ChatState();

    const handleAddUser = async (user1) => {
        if(selectedChat.users.find((u) => u._id === user1._id)) {
            toast ({
                title: "User Already In Group !",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right"
            })
            return;
        }

        if(selectedChat.groupAdmin._id !== user._id) {
            toast ({
                title: "Only Admins Can Add Someone !",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right"
            })
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }

            const {data} = await axios.put('/api/chat/groupadd',{
                chatId:selectedChat._id,
                userId: user1._id,
            }, config)

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);            
        } catch (error) {
            toast ({
                title: "Error Occured !",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right"
            })
            setLoading(false);
        }
     }
    
    const handleRemove = async (user1) => {
        if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id){
            toast({
                title:"Only admins can remove someone!",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right"
            })
            return;
        }

         try {
            setLoading(true);
            const config ={
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data } = await axios.put('/api/chat/groupremove', {
                chatId: selectedChat._id,
                userId:user1._id,
            }, config);
            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessage();
            setLoading(false)
         } catch (error) {
            toast({
                title:"Error Occured !",
                description: error.response.data.messagem,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right"
            })
            setLoading(false);
         }
     };

    const handleRename = async () => {
        if(!groupChatName) return
        
        try {
            setRenameLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.put('/api/chat/rename', {
                chatId: selectedChat._id,
                chatName: groupChatName,
            }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
              }); 
              setRenameLoading(false);
        }
        setGroupChatName("");
     }
    
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

    return (
        <div> {children ? (<span onClick={onOpen}>{children}</span>
        ) : (
            <button onClick={onOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                    <path className='w-[30px] h-[30px]' stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>

        )}

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <div className='py-2 badge flex-wrap flex gap-2'>
                                {selectedChat.users.map((u) => (
                                    <UserBadgeItem key={user._id} user={u} handleFunction={() => handleRemove(u)} />
                                ))}
                            </div>
                        </Box>
                        <FormControl className='flex' d="flex">
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml={1}
                                isLoading={renameloading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add User to group"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <div className="space-y-2  overflow-auto">
                        { loading? (
                            <Spinner/> 
                            ) : (
                                searchResult?.map((user) => (
                                <UserListItem 
                                key={user._id}
                                user={user}
                                handleFunction={() => handleAddUser(user)}
                                />
                                ))
                            )}
                        
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => handleRemove(user)} colorScheme="red">
                        Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal></div>
    )
}

export default UpdateGroupChatModal