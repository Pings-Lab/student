import './dashboard.css'
import { useEffect } from 'react'
import {useProfileStore} from '../store/profileStore'
const Land = () => {
    const fetchProfile = useProfileStore((s) => s.fetchProfile);
  const profile = useProfileStore((s) => s);
  
  useEffect(() => {
    fetchProfile();
  }, []);
  if (profile.loading) return <p>Loading...</p>;
  if (profile.error) return <p>{profile.error}</p>;
  return (
    <div className="panelpage">
        <div id="l_wel">
            Hi {profile.f_name}, Welcome Back!
            
        </div>
        {!profile.verified && <div className="alert">Verify your account</div>}
        
    </div>
  )
}

export default Land