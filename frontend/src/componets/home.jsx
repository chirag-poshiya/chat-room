import React, { useEffect } from 'react'
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Login from './Login';
import SignUp from './SignUp';
import {useHistory} from 'react-router-dom';


export default function Home() {
    const history = useHistory();

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if(!userInfo) {
          history.push('/');
      }
  },[history]);
      

    return (<>
        <div className='w-screen overflow-hidden relative h-screen flex justify-center items-center'>
            <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
            <div className="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
            <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
            <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
            <div className='bg-white  shadow-xl rounded-2xl'>
                <div className=''>
                    <div className='ml-4 mt-4 text-[22px] font-medium text-center  w-fit text-black'>
                        Cabotto Chat
                    </div>
                </div>
                <div>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList className='mt-3 ml-4'>
                        <Tab _selected={{ color: 'black', bg: 'purple.300' }}>Log in</Tab>
                        <Tab _selected={{ color: 'black', bg: 'purple.300' }}>Sign In</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <SignUp/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                </div>
            </div>
        </div>
    </>
    )
}
