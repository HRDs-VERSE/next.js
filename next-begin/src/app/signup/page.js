"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios  from "axios"
import toast from "react-hot-toast"

const signup = () => {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })

  const [btnDisabled, setBtnDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
      setBtnDisabled(false)
    } else{
      setBtnDisabled(true)
    }
  }, [user])


  const handleSignup = async () => {
    setLoading(true)
      try {
        const res = await axios.post("api/users/signup", user)
        const data = await res.data
        console.log(data)
        router.push("/login")

      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "signup"}</h1>
      <label htmlFor="username">username</label>
      <input 
        className="text-black outline-none p-2 border-none mb-4 rounded-lg "
        id="username"
        type="text" 
        value={user.username}
        onChange={(e) => setUser({...user, username : e.target.value })}
        placeholder="username"

        />
      <label htmlFor="email">email</label>
      <input 
        className="text-black outline-none p-2 border-none mb-4 rounded-lg "
        id="email"
        type="email" 
        value={user.email}
        onChange={(e) => setUser({...user, email : e.target.value })}
        placeholder="email"

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
          onClick={handleSignup}
          disabled={btnDisabled}
          className="p-2 bg-white rounded-lg mb-4 text-black">{btnDisabled ? "Fill Values" : "SignUp"}
        </button>
        <Link href={"login"}>To login</Link>
    </div>
  )
}

export default signup
