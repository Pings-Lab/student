import './dashboard.css'
import { useProfileStore } from '../store/profileStore'
import { useEffect } from 'react';
import logo from '../assets/ping.jpg'

const Profile = () => {
    const {f_name, l_name, username, gender, country, edu, dob} = useProfileStore();
    const fetchProfile = useProfileStore((s) => s.fetchProfile);
      const profile = useProfileStore((s) => s);
      
      useEffect(() => {
        fetchProfile();
      }, []);
  return (
    <div className="panelpage">
        <div id="l_wel">
            Profile
        </div>
        <div id="proscreen">
            <form id="proscreen1">
                <img src={logo} alt="" />
                <div>
                    <p>First Name: </p>
                    <input type="text" value={f_name}/>
                </div>
                <div>
                    <p>Last Name: </p>
                    <input type="text"value={l_name}/>
                </div>
                <div>
                    <p>Username: </p>
                    <input type="text" value={username} />
                </div>
                <div>
                    <p>Gender: </p>
                    <input type="text" value={gender}/>
                </div>
                <div>
                    <p>Country: </p>
                    <input type="text" value={country}/>
                </div>
                <div>
                    <p>College: </p>
                    <input type="text" value={edu}/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Profile