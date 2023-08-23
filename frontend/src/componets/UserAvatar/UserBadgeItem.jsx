import { ClockIcon } from '@heroicons/react/24/solid';
import React from 'react'

const UserBadgeItem = ({user , handleFunction}) => {
    console.log('first')
  return (
    <div>
        <div className='py-[6px] flex w-fit  px-[9px] bg-purple-300 text-black rounded-lg' onClick={handleFunction}>
            {user.name}
            <div className='text-white ml-2 cursor-pointer'>
                x
            </div>
        </div>
    </div>
  )
}

export default UserBadgeItem;

