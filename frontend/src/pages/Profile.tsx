import './dashboard.css'
import { useProfileStore } from '../store/profileStore'
import { useAlertStore } from '../store/alertStore';
import { useEffect, useState } from 'react';
import logo from '../assets/ping.jpg'
import { ShieldCheck, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
    const {f_name, l_name, username, gender, country, edu, verified, dob, created, mobile, email, pin} = useProfileStore();
    const fetchProfile = useProfileStore((s) => s.fetchProfile);
   
    const {fetchAlerts}=useAlertStore()
    const nav = useNavigate()  
      useEffect(() => {
        fetchProfile();
      }, []);
    const {setDob, setEdu, setGender, setMobile, setPin, setUsername, changeUsername, changeProfile} =useProfileStore()
    const [edit1, setedit1]= useState(true);
    const [edit2, setedit2]= useState(true);
    
    const handleForm1 = async (e: any) => {
            e.preventDefault();

            const msg = await changeUsername();   // wait until API finishes

           
              toast(msg);
              fetchAlerts();

          
          setedit1(true);
         };
    const handleForm2= async (e: any)=>{
       e.preventDefault();

            const msg = await changeProfile();   // wait until API finishes

           
              toast(msg);
             

          
          setedit2(true);
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
                    <input type="text" value={username} disabled={edit1} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                   
                <div>
                    {edit1 ? (
                     <button onClick={() => setedit1(false)}>
                       <Pencil />
                    </button>
               ) : (
                 <button 
                    type="button"
                    onClick={(e) => { 
                  e.stopPropagation(); 
                  handleForm1(e);
                  }}>
                   Update
                 </button>
                )}

                </div>
            </form>
            

            
                <form id="proscreen1">
                
                <div>
                    <p>DOB: </p>
                    <input type="date" value={dob} disabled={edit2} onChange={(e) => setDob(e.target.value)}/>
                </div>
                <div>
                    <p>Mobile: </p>
                    <input type="text" value={mobile} disabled={edit2} onChange={(e) => setMobile(e.target.value)}/>
                </div>
                <div>
                    <p>Gender:</p>
<select value={gender} disabled={edit2} onChange={(e) => setGender(e.target.value)}>
    <option value="">Select gender</option>
    <option value="m">Male</option>
    <option value="f">Female</option>
    <option value="o">Other</option>
</select>

                </div>
                <div>
                    <p>PIN: </p>
                    <input type="text" value={pin} disabled={edit2} onChange={(e) => setPin(e.target.value)}/>
                </div>
                <div>
                    <p>College: </p>
                    <input type="text" value={edu} disabled={edit2} onChange={(e) => setEdu(e.target.value)}/>
                </div>
               
                <div>
                    {edit2 ? (
                     <button onClick={() => setedit2(false)}>
                       <Pencil />
                    </button>
               ) : (
                 <button 
                    type="button"
                    onClick={(e) => { 
                  e.stopPropagation(); 
                  handleForm2(e);
                  }}>
                   Update
                 </button>
                )}

                </div>
            </form>
            
            </div>
            )}
            
           
            
            
        </div>
        <ToastContainer />
    </div>
  )
}

export default Profile