import './project.css'
import { useEffect } from 'react'
import { useProfileStore } from '../store/profileStore'
import { useNavigate } from 'react-router-dom'
import { useProjectStore } from '../store/projectStore'
import {  Users, ListOrdered, Filter, Search } from 'lucide-react'

const Collab = () => {
    const {verified} = useProfileStore()
    const {f_err, fetchProjects, projects} =useProjectStore()
    useEffect(() => {
            fetchProjects();
          }, []);
    const nav=useNavigate()
  return (
   <div className='panelpage'>
    {!verified && <div className="alert" onClick={() => nav("/verify")}>Verify your account</div>}
    <h3>Collab</h3>
    <div id="projectbar">
                <div>
                  <ListOrdered/>Sort By
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
            <p style={{background: 'green'}}><Users size={15}/>30</p>
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

export default Collab