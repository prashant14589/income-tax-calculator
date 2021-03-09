import React,{useEffect, useState} from "react";
import {TextInput} from "../Input/TextInput";
const Login = ({handleLoginClick}) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isValidUser, setIsValidUser] = useState(false); 
    
    useEffect(() => {        
        if(username == "A" && password == "B"){
            setIsValidUser(true);
        }
        else{
            setIsValidUser(false);
        }        
    },[username, password]);
return (
    <>
      <h1>Login</h1>
      <TextInput id="username" value={username} onChange={(e) => setUserName(e.target.value)}>Username:</TextInput> 
      <TextInput id="password" value={password} onChange={(e) => setPassword(e.target.value)}>Password:</TextInput> 
      <button disabled = {!isValidUser} onClick= {handleLoginClick}>Login</button>
    </>
  );
}
  export default Login;