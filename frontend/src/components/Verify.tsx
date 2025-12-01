import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../auth/Auth.css'
import logo from '../assets/ping.jpg';
import useAuth from '../store/authStore';
import  {useProfileStore} from '../store/profileStore'


const Verify = () => {
   const [type, setType] = useState(false);
   const navigate = useNavigate();
   const {
    message,
    setOtp,
    emailOtp,
    verifyOtp,
  } = useAuth();

   const {verified, fetchProfile} = useProfileStore();
   useEffect(() => {
  fetchProfile();
}, []);

// Run whenever "verified" changes
useEffect(() => {
  if (verified) {
    navigate("/dashboard");
  }
}, [verified])
  

  const Submitform=(e: any) =>{
   e.preventDefault();
    if (type) {
      verifyOtp()
      return;
    }
    else {
        emailOtp()
      setType(true);
      return;
    }

     
  }

  return (
    <div id="body">
        <div id="page">
          <form onSubmit={Submitform}>
            <img src={logo} alt="" />
            {type && (<input type="text" placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} required/>)}
           
            <button >
                     {type ? "Verify" :"Get OTP" }
                     
              </button>
              {message && <p style={{color: "red"}}>{message}</p>}
            
          </form>
          
        </div>
    </div>
  )
}

export default Verify