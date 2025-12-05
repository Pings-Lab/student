import Navbar from '../components/Navbar'
import "./dashboard.css"
import Land from './Land'
import useTabState from '../store/tab'
import Profile from './Profile'
import Internship from './Internship'
import Alerts from './Alerts'
const Dashboard = () => {
  const {tab} = useTabState();
  return (
    <div id="dashbody">
        
    <Navbar/> 
    
    <div id="panel">
      {tab === 0 && <Land/>}
      {tab === 1 && <Profile/>}
      {tab === 2 && <Internship/>}
      {tab === 7 && <Alerts/>}
    </div>
    
    
    </div>
  )
}

export default Dashboard