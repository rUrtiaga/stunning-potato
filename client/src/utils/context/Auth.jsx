import { createContext } from "react"

const AuthContext = createContext()
const AuthProvider = AuthContext.Provider
const AuthConsumer = AuthContext.Consumer

export { AuthContext, AuthProvider, AuthConsumer }
