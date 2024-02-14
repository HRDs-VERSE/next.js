"use client"
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import  axios  from "axios"
import toast from "react-hot-toast"

const Login = () => {

  const router = useRouter()
  const [loading, setLoading] = useState()

  const [user, setUser] = useState({
    credential: "",
    password: "",
  })


  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await axios.post("api/users/login", user)
      const data = await res.data
      console.log(data)
      router.push(`/profile/${data?.user?.username}`)

    } catch (error) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing.." : "login"}</h1>
      <label htmlFor="username">username or email</label>
      <input 
        className="text-black outline-none p-2 border-none mb-4 rounded-lg "
        id="credential"
        type="text" 
        value={user.credential}
        onChange={(e) => setUser({...user, credential : e.target.value })}
        placeholder="username or email"

        />
      <label htmlFor="password">password</label>
      <input 
        className="text-black outline-none p-2 border-none mb-4 rounded-lg "
        id="password"
        type="password" 
        value={user.password}
        onChange={(e) => setUser({...user, password : e.target.value })}
        placeholder="password"

        />

        <button 
          onClick={handleLogin}
          className="p-2 bg-white rounded-lg mb-4 text-black">signup
        </button>
        <Link href={"signup"}>To SignUp</Link>
    </div>
  )
}

export default Login
