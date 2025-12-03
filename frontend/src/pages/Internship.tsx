import { useEffect, useState } from "react";
import { useInternshipStore } from "../store/internStore";
import './dashboard.css'
import { TimerReset, BubblesIcon } from "lucide-react";

const Internship = () => {
    const { internships, fetchInternships } = useInternshipStore();
    const[but, setBut] = useState(1);
    const [dom, setDom] =useState("AIML");
    const arr=["","Beginner", "Intermediate", "Advanced", "professional", "professional"]

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
  return (
    <div id="intscreen">
        
        
            <h3>My internships</h3>
            <div className="slide">
                
            </div>
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
    </div>
  ))
}


            </div>
        </div>
   
  )
}

export default Internship