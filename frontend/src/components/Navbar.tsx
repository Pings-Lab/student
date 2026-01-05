import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  User2Icon, 
  Users, 
  BriefcaseBusiness, 
  SquareKanban, 
  ClipboardList, 
  Trophy, 
  Bell, 
  LogOut, 
  SquareMenu 
} from 'lucide-react'
import logo from '../assets/ping.jpg'
import { useNavigate } from 'react-router-dom'
import useAuth from '../store/authStore'
import useTab from '../store/tab'
import { useAlertStore } from '../store/alertStore'

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { setTab } = useTab();
    const { newcount, fetchAlerts } = useAlertStore();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    useEffect(() => {
        fetchAlerts();
    }, []);

    const navItems = [
        { id: 0, label: 'Dashboard', icon: LayoutDashboard },
        { id: 1, label: 'Profile', icon: User2Icon },
        { id: 2, label: 'Internship', icon: BriefcaseBusiness },
        { id: 3, label: 'Collab', icon: Users },
        { id: 4, label: 'Projects', icon: SquareKanban },
        { id: 5, label: 'Tasks', icon: ClipboardList },
        { id: 6, label: 'Leaderboard', icon: Trophy },
        { id: 7, label: 'Notifications', icon: Bell, alert: newcount > 0 },
    ];

    return (
        <aside 
            className={`fixed left-0 top-0 h-screen bg-zinc-950 border-r border-zinc-900 transition-all duration-300 ease-in-out z-50 flex flex-col
            ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            {/* Header / Logo Section */}
            <div className="p-4 mb-6 flex items-center gap-3">
                <div 
                    className="relative w-10 h-10 flex-shrink-0 cursor-pointer group"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        className={`w-full h-full rounded-xl object-cover transition-opacity duration-500 
                        ${isCollapsed ? 'group-hover:opacity-0' : 'opacity-100'}`}
                    />
                    <SquareMenu 
                        className={`absolute inset-0 w-full h-full text-blue-500 transition-opacity duration-500
                        ${isCollapsed ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}
                    />
                </div>
                {!isCollapsed && (
                    <span className="font-black italic text-xl tracking-tighter animate-in fade-in duration-500">
                        PING'S LAB
                    </span>
                )}
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-3 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setTab(item.id)}
                        className="w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-zinc-900 group relative"
                    >
                        <item.icon 
                            className={`w-6 h-6 flex-shrink-0 transition-colors
                            ${item.alert ? 'text-red-500' : 'text-cyan-400 group-hover:text-white'}`} 
                        />
                        
                        {!isCollapsed && (
                            <span className="text-sm font-medium text-zinc-400 group-hover:text-white animate-in slide-in-from-left-2">
                                {item.label}
                            </span>
                        )}

                        {/* Tooltip for Collapsed State */}
                        {isCollapsed && (
                            <div className="absolute left-16 px-2 py-1 bg-blue-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                {item.label}
                            </div>
                        )}
                    </button>
                ))}
            </nav>

            {/* Logout Section */}
            <div className="p-3 border-t border-zinc-900 mb-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-red-500/10 group"
                >
                    <LogOut className="w-6 h-6 text-cyan-400 group-hover:text-red-500 transition-colors" />
                    {!isCollapsed && (
                        <span className="text-sm font-medium text-zinc-400 group-hover:text-red-500">
                            Logout
                        </span>
                    )}
                </button>
            </div>
        </aside>
    )
}

export default Navbar;