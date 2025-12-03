import { useEffect, useState } from "react";
import { useInternshipStore } from "../store/internStore";
import './dashboard.css'
import { TimerReset, BubblesIcon, X, CircleCheckBig } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import { useProfileStore } from '../store/profileStore'
import { useNavigate } from "react-router-dom";

export interface applyInternship {
  id: string;
  name: string;
  type: string;
  cat: number;
  dur: number;
  cost: number;
  view: string;
}

const Internship = () => {
    const { internships, fetchInternships, error2, myintern,myInternships, filterByCategory, error3, setApplyid, applyInternship } = useInternshipStore();
    const {verified} = useProfileStore();
    const[but, setBut] = useState(1);
    const [dom, setDom] =useState("AIML");
    const [got, setgot] = useState(false);
    const [id, setId] = useState("");
    const [selectedItem, setSelectedItem] = useState<applyInternship[]>([]);


    const selectItem = (id: string) => {
             const result = filterByCategory(id);
            setSelectedItem(result);   // triggers UI update
             };


    const arr=["","Beginner", "Intermediate", "Advanced", "professional", "professional"];
    const nav = useNavigate()

    const myinternlist= async ()=>{
      
            const res = await myInternships();   // wait until API finishes
            setgot(res);
           if(!got)
           {
             toast(error2);
           }
           }
              
    useEffect(() => {
        myinternlist();
      }, []);
    const selectInt=(x: number)=>{
      setBut(x);
      if(x === 1)
      {
        setDom("AIML");
      }
      else if(x === 2)
      {
        setDom("Cyber Security")
      }
      else if(x === 3)
      {
        setDom("Data Analytics")
      }
      else if(x === 4)
      {
        setDom("DBMS")
      }
      else if(x === 5)
      {
        setDom("Programming")
      }
      else if(x === 6)
      {
        setDom("Web Frontend")
      }
      else if(x === 7)
      {
        setDom("Web Backend")
      }
      else if(x === 8)
      {
        setDom("other")
      }
    }

  useEffect(() => {
    fetchInternships();
  }, []);

  const applyintern= async (x: string)=>{
       setApplyid(x);
       const res = await applyInternship(x);   // wait until API finishes
            
           if(!res)
           {
             toast(error3);
           }
           else{
            toast("Applied to internship");
            console.log(res)
           }
  }
  return (
    <div id="intscreen">
        
             {!verified && <div className="alert" onClick={() => nav("/verify")}>Verify your account</div>}
            
            {got &&(
              <h3>My internships</h3>
            )}
            {got && (
              <div className="slide">
                
            </div>
            )}
            
            <h3>Enroll Now</h3>
            <div id="submenu">
                <button onClick={()=>selectInt(1)} style={{boxShadow:but === 1? "0px 0px 10px 3px rgba(255, 255, 255, 1)":"0px 0px 3px 0px rgb(255, 255, 255)"}}>AIML</button>
                <button onClick={()=>selectInt(2)} style={{boxShadow:but === 2? "0px 0px 10px 3px rgba(255, 255, 255, 1)":"0px 0px 3px 0px rgb(255, 255, 255)"}}>CyberSecurity</button>
                <button onClick={()=>selectInt(3)} style={{boxShadow:but === 3? "0px 0px 10px 3px rgba(255, 255, 255, 1)":"0px 0px 3px 0px rgb(255, 255, 255)"}}>Data Analytics</button>
                <button onClick={()=>selectInt(4)} style={{boxShadow:but === 4? "0px 0px 10px 3px rgba(255, 255, 255, 1)":"0px 0px 3px 0px rgb(255, 255, 255)"}}>DBMS</button>
                <button onClick={()=>selectInt(5)} style={{boxShadow:but === 5? "0px 0px 10px 3px rgba(255, 255, 255, 1)":"0px 0px 3px 0px rgb(255, 255, 255)"}}>Programming</button>
                <button onClick={()=>selectInt(6)} style={{boxShadow:but === 6? "0px 0px 10px 3px rgba(255, 255, 255, 1)":"0px 0px 3px 0px rgb(255, 255, 255)"}}>Web Frontend</button>
                <button onClick={()=>selectInt(7)} style={{boxShadow:but === 7? "0px 0px 10px 3px rgba(255, 255, 255, 1)":"0px 0px 3px 0px rgb(255, 255, 255)"}}>Web Backend</button>
                <button onClick={()=>selectInt(8)} style={{boxShadow:but === 8? "0px 0px 10px 3px rgba(255, 255, 255, 1)":"0px 0px 3px 0px rgb(255, 255, 255)"}}>Others</button>

            </div>
            <div className="slide" >
                {internships
  .filter(item => item.name === dom)
  .map(item => (
    <div key={item.id} className="box">
      <img src={item.view} alt={item.view} />
      <h4>{item.type}</h4>
      <div className="iinfos">
        <p style={{color: "greenyellow"}}><TimerReset/>{item.dur}month</p>
        <p style={{color: "skyblue"}}><BubblesIcon/>{arr[item.cat]}</p> </div>
        <button onClick={()=>{selectItem(item.id); setId(item.id)}}>View</button>
    </div>
    
  ))
}


            </div>
             <ToastContainer />
             {id !== "" && (
              <div id="apply">
                 <X style={{height: "5%", width: "5%", cursor: "pointer"}} color="white" onClick={()=>setId("")}/>
                    {selectedItem.map(item => (
                      <div className="box">
                       <h3>{item.name}: {item.type}</h3>
                        <div style={{margin:"3% auto","height": "40%", "width": "90%", "display": "flex", "alignItems": "center", "justifyContent": "space-evenly"}}>
                           <img src={item.view} alt={item.view} style={{"height": "100%", "width": "40%", "boxShadow": "0px 0px 5px 1px orange"}}/>
                           <div style={{"height": "100%", "width": "40%", "display": "flex", "alignItems": "center", "justifyContent": "space-evenly", "flexDirection": "column"}}>
                             <p>Level: {arr[item.cat]}</p>
                             <p>Duration: {item.dur} month</p>
                             <p>Projects: {item.dur*2}</p>
                             <p>Attendance + Certificate</p>
                             <p>Price: ₹{item.cost}</p>
                           </div>
                           
                        </div>
                        <div style={{margin:"3% auto","height": "auto", "width": "78%", "overflow": "scroll"}}>
                          <ul>
                            <li >
                              <CircleCheckBig/> &nbsp;
                              Best platform to learn solo and with group. Manage your schedule with flexibility, complete daily tasks and get attendenc.
                            </li>
                            <li>
                               <CircleCheckBig/> &nbsp;
                              Real world projects and ideas with interesting topics and job ready skills.
                            </li>
                            <li>
                               <CircleCheckBig/> &nbsp;
                              Launch your own project, collab with group, contribute to open-source and much more.
                            </li>
                            <li>
                               <CircleCheckBig/> &nbsp;
                              Learners with best projects and attendance will get interesting perks.
                            </li>
                            <li>
                               <CircleCheckBig/> &nbsp;
                              Free courses and roadmaps, interesting daily quiz and batch-wise leadboards.
                            </li>
                            <li>
                               <CircleCheckBig/> &nbsp;
                              Resume and Portfolio tools will soon available for free to the learners throughout the internship.
                            </li>
                            <li>
                               <CircleCheckBig/> &nbsp;
                              Industry jobs, internships, tools-technologies and news posting with 100% transparency.
                            </li>
                            <li>
                               <CircleCheckBig/> &nbsp;
                              MSME & Startup India accredited certification on completion of the internship.
                            </li>
                            <li>
                               <CircleCheckBig/> &nbsp;
                              Supportive community and 24/7 help regarding internship and technical aspects.
                            </li>
                          </ul>
                          <div id="submenu">
                            <button style={{"boxShadow": "0px 0px 8px 0px white"}} onClick={()=>applyintern(item.id)}>Enroll</button>
                            <button style={{"boxShadow": "0px 0px 8px 0px white"}}>View Roadmap</button>
                            <button style={{"boxShadow": "0px 0px 8px 0px white"}}>View Certificate</button>
                            <button style={{"boxShadow": "0px 0px 8px 0px white"}}>Audit</button>
                          </div>
                          </div>
                       </div>
                  ))}
             </div>
             )}
             
        </div>
   
  )
}

export default Internship