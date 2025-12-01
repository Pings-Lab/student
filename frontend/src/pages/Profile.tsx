import './dashboard.css'
import { useProfileStore } from '../store/profileStore'
import { useEffect, useState } from 'react';
import logo from '../assets/ping.jpg'
import { ShieldCheck, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const {f_name, l_name, username, gender, country, edu, verified, dob, created, mobile, email, pin} = useProfileStore();
    const fetchProfile = useProfileStore((s) => s.fetchProfile);
    const profile = useProfileStore((s) => s);
    const nav = useNavigate()  
      useEffect(() => {
        fetchProfile();
      }, []);

    const [edit, setedit]= useState(true);
    const handleForm=(e: any)=>{
       e.preventDefault();
       setedit(!edit);
    }
  return (
    <div className="panelpage">
        <div id="l_wel">
            Profile
        </div>
        <div id="proscreen">
             {!verified && <div className="alert" onClick={() => nav("/verify")}>Verify your account</div>}
            {verified && (
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
                    <p>Email: </p>
                    <input type="text" value={email} readOnly/>
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
            )}
            {verified && (
                <div id="proedit">
                 
                <form id="proscreen1">
                
                <div>
                    <p>Username: </p>
                    <input type="text" value={username} disabled={edit}/>
                </div>
            
                <div>
                    <button onClick={handleForm}>
                        {!edit && (
                           "Update"
                        )}
                        {edit && (
                            <Pencil/> 
                        )}
                    </button>
                </div>
            </form>
            

            
                <form id="proscreen1">
                
                <div>
                    <p>DOB: </p>
                    <input type="date" value={dob} disabled={edit}/>
                </div>
                <div>
                    <p>Mobile: </p>
                    <input type="text" value={mobile} disabled={edit}/>
                </div>
                <div>
                    <p>Gender: </p>
                    <input type="text" value={gender} disabled={edit}/>
                </div>
                <div>
                    <p>PIN: </p>
                    <input type="text" value={pin} disabled={edit}/>
                </div>
                <div>
                    <p>College: </p>
                    <input type="text" value={edu} disabled={edit}/>
                </div>
                <div>
                    <button onClick={handleForm}>
                        {!edit && (
                           "Update"
                        )}
                        {edit && (
                            <Pencil/> 
                        )}
                    </button>
                </div>
            </form>
            
            </div>
            )}
            
           
            
            
        </div>
    </div>
  )
}

export default Profile