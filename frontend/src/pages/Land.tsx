
import { useEffect } from 'react'
import {useProfileStore} from '../store/profileStore'
import { useNavigate } from 'react-router-dom'
const Land = () => {
    const fetchProfile = useProfileStore((s) => s.fetchProfile);
  const profile = useProfileStore((s) => s);
  const nav = useNavigate();
  
  useEffect(() => {
    fetchProfile();
  }, []);
  if (profile.loading) return <p >Loading...</p>;
  if (profile.error) return <p className="alert" onClick={() => nav("/verify")}>{profile.error}</p>;
  return (
    <div className="panelpage">
        <div id="l_wel">
            Hi {profile.f_name}, Welcome Back!
            
        </div>
       
        
    </div>
  )
}

export default Land