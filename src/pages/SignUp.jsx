import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function Signup() {
  const [user, setUser] = useState({
      email: "",
      password: ""
  })
  const [error, setError] = useState("")

  const {signup} = useAuth()
  const navigate = useNavigate()

  const handleChange = ({target: {name, value}}) => {
    setUser({...user,[name]:value})
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      setError("")
      try {
        await signup(user.email, user.password)
         navigate("/chat")
      }catch (error) {
        setError(error.code)
      }
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <h1>
            Sign Up to
          <Link to="/">Chatty</Link>
          </h1>
          <p>Fill in the form below to create an account.</p>
          <div>
            <input placeholder="Email" name="email" type="email" onChange={handleChange} />
          </div>
          <div>
            <input placeholder="Password" name="password" onChange={handleChange} type="password"></input>
          </div>
          <div>
            {error ? <p>{error}</p> : null}
            <button type="submit">Sign up</button>
          </div>
          <hr></hr>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    </div>
  )
}