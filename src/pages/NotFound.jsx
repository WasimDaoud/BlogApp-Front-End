import React from 'react';


const NotFound = () => {
  return (
    <div className='pageHeight w-full flex justify-center items-center bg-white dark:bg-black'>
        <div className='w-[400px] h-[400px] flex flex-col gap-[30px] justify-center items-center bg-gray text-gray-dark dark:text-gray rounded-xl dark:bg-gray-dark'>
            <h1 className='text-[45px] font-bold'>Error : 404</h1>
            <h1 className='text-[40px] font-bold'>Page not Found</h1>
        </div>
    </div>
  )
}

export default NotFound
