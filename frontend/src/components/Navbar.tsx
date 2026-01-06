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
  SquareMenu,
  Sun,
  Moon,
  X 
} from 'lucide-react'
import logo from '../assets/ping.jpg'
import { useNavigate } from 'react-router-dom'
import useAuth from '../store/authStore'
import useTab from '../store/tab'
import { useAlertStore } from '../store/alertStore'
// 1. Define the shape of the props
interface NavbarProps {
    onCollapse?: (collapsed: boolean) => void;
}

// 2. Apply the interface to the component

   

    // ... rest of your component code
const Navbar = ({ onCollapse }: NavbarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false); // Fix for mobile view
    const [isDark, setIsDark] = useState(true); // Theme state
    
    
    // ... rest of your hooks (useTab, useAlertStore, etc)

    // 3. Sync the local state with the parent Dashboard
    useEffect(() => {
        if (onCollapse) {
            onCollapse(isCollapsed);
        }
    }, [isCollapsed, onCollapse]);
    const { setTab } = useTab();
    const { newcount, fetchAlerts } = useAlertStore();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const toggleTheme = () => {
        setIsDark(!isDark);
        // This toggles the 'light' class on the <html> tag for Tailwind dark: modifiers
        document.documentElement.classList.toggle('light');
    };

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
        <>
            {/* Mobile Toggle Button - Only shows when sidebar is hidden on small screens */}
            <button 
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-zinc-900 rounded-lg border border-zinc-800 text-blue-500"
            >
                <SquareMenu size={24} />
            </button>

            {/* Backdrop for Mobile - Closes sidebar when clicking outside */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside 
                className={`fixed left-0 top-0 h-screen transition-all duration-300 ease-in-out z-[60] flex flex-col
                ${isDark ? 'bg-zinc-950 border-zinc-900 text-white' : 'bg-white border-zinc-200 text-black'}
                border-r
                /* Mobile Logic: Hidden by default, slides in */
                ${isMobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'}
                /* Desktop Logic: Toggle width */
                ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
            >
                {/* Header / Logo Section */}
                <div className="p-4 mb-6 flex items-center justify-between lg:justify-start gap-3">
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

                    {/* Close button for mobile only */}
                    <button onClick={() => setIsMobileOpen(false)} className="lg:hidden p-1">
                        <X size={20} className="text-zinc-500" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-3 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setTab(item.id);
                                if(window.innerWidth < 1024) setIsMobileOpen(false);
                            }}
                            className="w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 group relative"
                        >
                            <item.icon 
                                className={`w-6 h-6 flex-shrink-0 transition-colors
                                ${item.alert ? 'text-red-500' : 'text-blue-500 group-hover:text-blue-400'}`} 
                            />
                            
                            {(!isCollapsed || isMobileOpen) && (
                                <span className="text-sm font-medium opacity-70 group-hover:opacity-100 animate-in slide-in-from-left-2">
                                    {item.label}
                                </span>
                            )}

                            {isCollapsed && !isMobileOpen && (
                                <div className="absolute left-16 px-2 py-1 bg-blue-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Theme & Logout Section */}
                <div className="p-3 border-t border-zinc-200 dark:border-zinc-900 mb-4 space-y-1">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 group"
                    >
                        {isDark ? (
                            <Sun className="w-6 h-6 text-yellow-500" />
                        ) : (
                            <Moon className="w-6 h-6 text-indigo-500" />
                        )}
                        {(!isCollapsed || isMobileOpen) && (
                            <span className="text-sm font-medium opacity-70">
                                {isDark ? 'Light Mode' : 'Dark Mode'}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-red-500/10 group"
                    >
                        <LogOut className="w-6 h-6 text-blue-500 group-hover:text-red-500 transition-colors" />
                        {(!isCollapsed || isMobileOpen) && (
                            <span className="text-sm font-medium opacity-70 group-hover:text-red-500">
                                Logout
                            </span>
                        )}
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Navbar;