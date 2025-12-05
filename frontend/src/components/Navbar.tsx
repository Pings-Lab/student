import './navbar.css'
import { useState, useEffect } from 'react'
import { LayoutDashboard, User2Icon, Users, BriefcaseBusiness, SquareKanban, ClipboardList, Trophy, Bell, LogOut } from 'lucide-react'
import logo from '../assets/ping.jpg'
import { SquareMenu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../store/authStore'
import useTab from '../store/tab'
import { useAlertStore } from '../store/alertStore'

const Navbar = () => {
    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    const {tab ,setTab} = useTab();
    const {newcount, fetchAlerts}= useAlertStore();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleClick = () => {

      setClicked(!clicked);
    }
    const handleLogout = () => {
      logout();
      navigate("/");
    }

    const changetab = (v: any) => {
      setTab(v);
    }
    useEffect(() => {
            fetchAlerts();
          }, []);
  return (
    <div id='nav'>
        <table >
            <tr style={{ width: clicked ? "3vw" : "15vw" }}>
  <td
    className="icon"
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{ position: "relative", transition: "all 1s ease" }}
  >

    {/* IMAGE (default) */}
    <img
      src={logo}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "50%",
        position: "absolute",
        inset: 0,
        opacity: hover ? 0 : 1,
        transition: "opacity 0.6s ease"
      }}
    />

    {/* ICON (on hover) */}
            <SquareMenu
              color="white"
              onClick={handleClick}
              style={{
                 width: "100%",
                 height: "100%",
                 position: "absolute",
                 inset: 0,
                 opacity: hover ? 1 : 0,
                transition: "opacity 0.6s ease"
            }}
            />

            </td>

             <td className="name" id="logo" style={{ display: clicked ? "none" : "flex" }}>
              Ping's Lab
            </td>
           </tr>

            
            <tr style={{width: clicked ? "3vw" : "15vw"}} onClick={() => changetab(0)}
>
                <td className='icon'><LayoutDashboard color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Dashboard</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}} onClick={() => changetab(1)}
>
                <td className='icon'><User2Icon color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Profile</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}} onClick={() => changetab(2)}>
                <td className='icon'><BriefcaseBusiness color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Internship</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}} onClick={() => changetab(3)}>
                <td className='icon'><Users color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Collab</td>
            </tr>
            
            <tr style={{width: clicked ? "3vw" : "15vw"}} onClick={() => changetab(4)}>
                <td className='icon'><SquareKanban color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Projects</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}} onClick={() => changetab(5)}>
                <td className='icon'><ClipboardList color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Tasks</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}} onClick={() => changetab(6)}>
                <td className='icon'><Trophy color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Leadboard</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}} onClick={() => changetab(7)}>
                <td className='icon'><Bell style={{ width: '100%', height: '100%', color: newcount > 0 ? "red": "aqua"}}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Notifications</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw", marginTop: "auto"}} onClick={handleLogout}>
                <td className='icon'><LogOut color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Logout</td>
            </tr>
        </table>
    </div>
  )
}

export default Navbar