import React from 'react'

const Userprofile = ({params}) => {
  return (
    <div className=' flex items-center justify-center min-h-screen flex-col'>
        <h1>Profile Page</h1>
        <p className='text-4xl'>Welcome hello world 
        <span className=' rounded-md bg-orange-500 p-2'>{params.id}</span>
        </p>
      
    </div>
  )
}

export default Userprofile
