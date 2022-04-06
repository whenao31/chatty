import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await login(user.email, user.password)
            navigate("/chat")
        } catch (error) {
            setError(error.code)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>
                    Login to
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
                    <button type="submit">Login</button>
                </div>
                <hr></hr>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    )
}
