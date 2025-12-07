import './project.css'
import { useEffect } from 'react'
import { useProfileStore } from '../store/profileStore'
import { useNavigate } from 'react-router-dom'
import { useProjectStore } from '../store/projectStore'
import { Lock, Users } from 'lucide-react'

const Project = () => {
    const {verified} = useProfileStore()
    const {f_err, fetchProjects, projects} =useProjectStore()
    useEffect(() => {
            fetchProjects();
          }, []);
    const nav=useNavigate()
  return (
   <div className='panelpage'>
    {!verified && <div className="alert" onClick={() => nav("/verify")}>Verify your account</div>}
    <h3>Projects</h3>
    <div id="submenu">
                <button  style={{boxShadow:"0px 0px 3px 0px rgb(255, 255, 255)"}}>AIML</button>
                <button  style={{boxShadow:"0px 0px 3px 0px rgb(255, 255, 255)"}}>CyberSecurity</button>
                <button  style={{boxShadow:"0px 0px 3px 0px rgb(255, 255, 255)"}}>Data Analytics</button>
                <button  style={{boxShadow:"0px 0px 3px 0px rgb(255, 255, 255)"}}>DBMS</button>
                <button  style={{boxShadow:"0px 0px 3px 0px rgb(255, 255, 255)"}}>Programming</button>
                <button  style={{boxShadow:"0px 0px 3px 0px rgb(255, 255, 255)"}}>Web Frontend</button>
                <button  style={{boxShadow:"0px 0px 3px 0px rgb(255, 255, 255)"}}>Web Backend</button>
                <button  style={{boxShadow:"0px 0px 3px 0px rgb(255, 255, 255)"}}>Others</button>

            </div>
    <div id="projectpage">
         <div className="pro_slide" >
                {projects
  .map(item => (
    <div key={item.id} className="box">
        <div className="ptype">
            <p style={{background:item.type === 'public'? 'green': 'blue'}}>{item.type === 'public' && (<Users size={15}/>)}{item.type === 'private' && (<Lock size={15}/>)}{item.type}</p>
            <p style={{width:'fit-content'}}>{item.created}</p>

        </div>
      <h4>{item.name}</h4>
      <div className="iinfos">
        <p style={{color: "greenyellow", fontSize: '1.2em'}}>{item.domain}</p>
        <p style={{color: "skyblue", fontSize: '1.2em', textAlign: 'center'}}>{item.concept}</p> </div>
        <p style={{display: 'flex',justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <button>View</button>
            <button>Dive In</button>
        </p>
    </div>
    
  ))
  
}
   


            </div>
    </div>
    
   </div>
  )
}

export default Project