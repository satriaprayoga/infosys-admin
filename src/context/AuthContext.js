import React from "react";

export const AuthContext=React.createContext({
    isLoggedIn:false,
    token:null,
    user:null,
    login:()=>{},
    logout:()=>{}
})