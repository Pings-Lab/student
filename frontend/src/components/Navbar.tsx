import './navbar.css'
import { useState } from 'react'
import { LayoutDashboard, User2Icon, Users, BriefcaseBusiness, SquareKanban, ClipboardList, Trophy, Bell } from 'lucide-react'
import logo from '../assets/ping.jpg'
import { SquareMenu } from 'lucide-react'
const Navbar = () => {
    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {

      setClicked(!clicked);
    }
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

            <hr style={{"width": "100%", "margin": "5% auto"}}/>
            <tr style={{width: clicked ? "3vw" : "15vw"}}>
                <td className='icon'><LayoutDashboard color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Dashboard</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}}>
                <td className='icon'><User2Icon color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Profile</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}}>
                <td className='icon'><Users color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Collab</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}}>
                <td className='icon'><BriefcaseBusiness color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Internship</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}}>
                <td className='icon'><SquareKanban color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Projects</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}}>
                <td className='icon'><ClipboardList color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Tasks</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}}>
                <td className='icon'><Trophy color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Leadboard</td>
            </tr>
            <tr style={{width: clicked ? "3vw" : "15vw"}}>
                <td className='icon'><Bell color='aqua' style={{ width: '100%', height: '100%' }}/></td>
                <td className='name' style={{display: clicked ? "none" : "flex"}}>Notifications</td>
            </tr>
        </table>
    </div>
  )
}

export default Navbar