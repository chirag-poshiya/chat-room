import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { button } from '@material-tailwind/react'
import React from 'react'

export const ProfileModal = ({user, children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
        {children ? ( <span onClick={onOpen}>{children}</span>
        ) : (
            <button onClick={onOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                    <path className='w-[30px] h-[30px]' stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>

            )}
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile Details</ModalHeader>
          <ModalCloseButton />
          <div class="relative flex w-96 mx-auto flex-col rounded-xl bg-white bg-clip-border text-gray-700 ">
            <div class="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <img src={user.pic} alt="profile-picture" />
            </div>
            <div class="p-6 text-center">
                <h4 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {user.name}
                </h4>
                <p class="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                {user.email}
                </p>
            </div>
            <div class="flex justify-center gap-7 p-6 pt-2">
                <a
                href="#facebook"
                class="block bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
                >
                <i class="fab fa-facebook" aria-hidden="true"></i>
                </a>
                <a
                href="#twitter"
                class="block bg-gradient-to-tr from-light-blue-600 to-light-blue-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
                >
                <i class="fab fa-twitter" aria-hidden="true"></i>
                </a>
                <a
                href="#instagram"
                class="block bg-gradient-to-tr from-purple-600 to-purple-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
                >
                <i class="fab fa-instagram" aria-hidden="true"></i>
                </a>
            </div>
            </div>
         
        </ModalContent>
        </Modal>
    </div>
  )
}
