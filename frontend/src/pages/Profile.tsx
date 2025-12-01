import './dashboard.css'
import { useProfileStore } from '../store/profileStore'
import { useEffect } from 'react';
import logo from '../assets/ping.jpg'
import { ShieldCheck, Pencil } from 'lucide-react';

const Profile = () => {
    const {f_name, l_name, username, gender, country, edu, verified, dob, created, mobile, email, pin} = useProfileStore();
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
                {verified && (
                    <ShieldCheck color='greenyellow' style={{height: "calc(1vh + 1vw)", width: "calc(1vh + 1vw)", margin: "0 auto"}}/>
                )}
                <div>
                    <p>First Name: </p>
                    <input type="text" value={f_name} readOnly/>
                </div>
                <div>
                    <p>Last Name: </p>
                    <input type="text"value={l_name} readOnly/>
                </div>
                <div>
                    <p>Gender: </p>
                    <input type="text" value={gender} readOnly/>
                </div>
                <div>
                    <p>Country: </p>
                    <input type="text" value={country} readOnly/>
                </div>
                <div>
                    <p>Joined: </p>
                    <input type="date" value={created} readOnly/>
                </div>
            </form>
            <form id="proscreen1">
                
                <div>
                    <p>Username: </p>
                    <input type="text" value={username}/>
                </div>
                <div>
                    <p>DOB: </p>
                    <input type="date" value={dob}/>
                </div>
                <div>
                    <p>Mobile: </p>
                    <input type="text" value={mobile}/>
                </div>
                <div>
                    <p>email: </p>
                    <input type="text" value={email}/>
                </div>
                <div>
                    <p>PIN: </p>
                    <input type="text" value={pin}/>
                </div>
                <div>
                    <p>College: </p>
                    <input type="text" value={edu}/>
                </div>
                <div>
                    <button>
                        <Pencil/>
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Profile