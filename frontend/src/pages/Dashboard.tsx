import Navbar from '../components/Navbar'
import "./dashboard.css"
import Land from './Land'
import useTabState from '../store/tab'
import Profile from './Profile'
const Dashboard = () => {
  const {tab} = useTabState();
  return (
    <div id="dashbody">
        
    <Navbar/> 
    
    <div id="panel">
      {tab === 0 && <Land/>}
      {tab === 1 && <Profile/>}
    </div>
    
    
    </div>
  )
}

export default Dashboard