import React from 'react'
import { ChatState } from '../../Context/ChatProvider'

export default function UserListItem({ user, handleFunction }) {

    return (
    <div onClick={handleFunction} class="flex cursor-pointer hover:bg-blue-gray-100 items-center space-x-4 px-2">
        <img class="w-10 h-10 rounded-full " src={user.pic} alt={user.name} />
        <div class="font-medium dark:text-white">
        <div className="text-black">{user.name}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
        </div>
    </div>
  )
}
