"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Profile = () => {
  const router = useRouter()
  const [data , setData] = useState("")

  useEffect(()=>{
    (async () => {
      const res = await axios.get("/api/users/me")
      setData(res.data)
    })()
  },[])

  const handleLogout = async () => {
    try {
      
      await axios.get("api/users/logout")
      router.push("/login")

    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  return (
    <div className=' flex items-center justify-center min-h-screen flex-col'>
        <h1>Profile Page</h1>
        <Link href={`/profile/${data._id}`}>

        <h2>{data ? data._id : "Nothing"}</h2>
        </Link>
  
        <p className='text-4xl'>Welcome hello world</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile
