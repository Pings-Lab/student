import Navbar from '../components/Navbar'
import "./dashboard.css"
import Land from './Land'
const Dashboard = () => {
  return (
    <div id="dashbody">
        
    <Navbar/> 
    
    <div id="panel">
      <Land/>
    </div>
    
    
    </div>
  )
}

export default Dashboard