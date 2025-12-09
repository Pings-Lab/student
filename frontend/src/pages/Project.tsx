import './project.css'
import { useEffect, useState } from 'react'
import { useProfileStore } from '../store/profileStore'
import { useNavigate } from 'react-router-dom'
import { useProjectStore } from '../store/projectStore'
import { Lock, Users, Plus, Filter, Search, X } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify';

const Project = () => {
    const {verified} = useProfileStore()
    const {c_err, fetchProjects, projects, new_project, createProject} =useProjectStore()
    useEffect(() => {
            fetchProjects();
          }, []);
    const nav=useNavigate()
    const [pcreate, setCreate] = useState(false);
    const opencreate =()=>{
      setCreate(!pcreate);
    }
    const createNewPro= async (e: any)=>{
     e.preventDefault()
     const res= await createProject();
     if(!res)
     {
      toast(c_err)
     }
     else{
      toast("Project Created Successfully")
      setCreate(!pcreate)
      fetchProjects()
     }
    }
  return (
   <div className='panelpage relate'>
    {!verified && <div className="alert" onClick={() => nav("/verify")}>Verify your account</div>}
     {pcreate && (
      <div id='create_pro_slide'>
      
        <X onClick={opencreate} style={{cursor:'pointer'}}/> 
        <h3>Create Project</h3>
        <form onSubmit={(e)=>createNewPro} style={{padding:'0% 0%',height: '80%', width:'80%', margin:'2% auto', background:'transparent', display: 'flex', alignItems:'center', justifyContent:'space-evenly', flexDirection:'column', boxShadow:'none'}}>
          <div>
            <input type="text" placeholder='Project Name' value={new_project.name} onChange={(e)=>e.target.value}/>
            <select value={new_project.type} onChange={(e)=>e.target.value}>
              <option value="">Type</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>
          <div>
             <select value={new_project.domain} onChange={(e)=>e.target.value}>
              <option value="private">Domain</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
             <select value={new_project.concept} onChange={(e)=>e.target.value}>
              <option value="private">Concept</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>
         
          <div>
            <textarea name="summary" id="summary" placeholder='Summary of the project' value={new_project.summary} onChange={(e)=>e.target.value}>

            </textarea>
          </div>
          <div>
            <button style={{width:'15%', height:'60%', fontSize:'1.1em'}} >Create</button>
          </div>
        </form>
     </div>
     )}
     
    <h3>Projects</h3>
    <div id="projectbar">
                <div onClick={opencreate} style={{cursor:'pointer'}}>
                  <Plus/>New
                </div>
                <div style={{width: '60%'}}>
                  
                  <input type="text" style={{height: '100%', width:'100%', fontSize:'1em', background: 'linear-gradient(gray,black)', border:'none', color: 'white', textAlign: 'center', outline: 'none'}} />
                  <button style={{outline: 'none', background: 'linear-gradient(gray,black)', border:'none', color: 'white'}}>
                    <Search/>
                  </button>
                
                </div>
                <div>
                  <Filter/> <select style={{height: '100%', width:'60%', fontSize:'1em', border:'none', color: 'white', textAlign: 'center', outline: 'none', background: 'linear-gradient(gray,black)'}}>
                      <option value="all">All</option>
                      <option value="da">Private</option>
                      <option value="dd">Public</option>
                      <option value="pub">Open</option>
                      <option value="pub">Closed</option>
                  </select>
                </div>

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
   <ToastContainer/>
   </div>
  )
}

export default Project