import React, { useEffect, useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "../../routes"
import NavBar from "../navBar"
import axios from "axios"
import { AuthProvider } from "../../utils/context/Auth"

function logInRequest() {
    return axios.post(`/auth/login`, {
        user: {
            email: "JamesSmith_mascotas@gmail.com",
            password: "1234"
        }
    })
}

function App() {
    const [auth, setAuth] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const result = await logInRequest()
            setAuth(result.data)
        }
        fetchData()
    }, [])

    return (
        <AuthProvider value={auth}>
            <Router>
                <div>
                    <NavBar>
                        <Routes />
                    </NavBar>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
