import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'
import logo from '../assets/ping.jpg';
import useAuth from '../store/authStore';
const Auth = () => {
   const navigate = useNavigate();
   const {
    email,
    password,
    message,
    loading,
    isAuthenticated,
    setEmail,
    setPassword,
    loginUser,
  } = useAuth();

    useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const Submitform=(e: any) =>{
    e.preventDefault();
    loginUser();
     
  }

  return (
    <div id="body">
        <div id="page">
          <form onSubmit={Submitform}>
            <img src={logo} alt="" />
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
            <button disabled={loading}>
                     {loading ? "Logging in..." : "Login"}
              </button>
              {message && <p style={{color: "red"}}>{message}</p>}
            <p>Don't have an account?</p>
            <button>Sign Up</button>
          </form>
        </div>
    </div>
  )
}

export default Auth