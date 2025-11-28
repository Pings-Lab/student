import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'
import logo from '../assets/ping.jpg';
import useAuth from '../store/authStore';
const Auth = () => {
   const [type, setType] = useState(true);
   const navigate = useNavigate();
   const {
    message,
    loading,
    isAuthenticated,
    setEmail,
    setPassword,
    loginUser,
    setF_name,
    setL_name,
    setMobile,
    signupUser,
  } = useAuth();

    useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const Submitform=(e: any) =>{
    e.preventDefault();
    if (type) {
      signupUser();
      return;
    }
    else {
      loginUser();
      return;
    }

   
     
  }

  return (
    <div id="body">
        <div id="page">
          <form onSubmit={Submitform}>
            <img src={logo} alt="" />
            {type && <><input type="text" placeholder='Last Name' onChange={(e) => setL_name(e.target.value)} required/>
            <input type="text" placeholder='First Name' onChange={(e) => setF_name(e.target.value)} required/>
            <input type="text" placeholder='Mobile' onChange={(e) => setMobile(e.target.value)} required/></>}
            
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
            <button disabled={loading}>
                     {type ? "Sign Up" :"Login" }
                     
              </button>
              {message && <p style={{color: "red"}}>{message}</p>}
            <p>{type ? "Alredy have an account?" : "Don't have an account?"}</p>
            <button onClick={() => setType(!type)}>{type ? "Login" : "Sign Up"}</button>
          </form>
          
        </div>
    </div>
  )
}

export default Auth