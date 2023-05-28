import { useState } from "react";
import { createContext } from "react";
// import axios from "axios";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  let userID = localStorage.getItem("userID") || false;

  const [isAuth, setIsAuth] = useState(userID ? true : false);
  
  const loginUser = () => {
    setIsAuth(true);
  };

  const logoutUser = () => {
    localStorage.removeItem("userID");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
