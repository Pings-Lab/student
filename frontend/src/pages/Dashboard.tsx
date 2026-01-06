import Navbar from '../components/Navbar'
import Land from './Land'
import useTabState from '../store/tab'
import Profile from './Profile'
import Internship from './Internship'
import Alerts from './Alerts'
import Project from './Project'
import Collab from './Collab'
import Tasks from './Tasks'
import { useState } from 'react'

const Dashboard = () => {
  const { tab } = useTabState();
  // We need to know if the sidebar is collapsed to adjust the margin on PC
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const getTabTitle = () => {
    switch (tab) {
      case 0: return "Command Center";
      case 1: return "Personnel Dossier";
      case 2: return "Internship Labs";
      case 3: return "Collaboration Hub";
      case 4: return "Project Repositories";
      case 5: return "Active Tasks";
      case 7: return "System Alerts";
      default: return "Dashboard";
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-white font-sans overflow-hidden transition-colors duration-300">
      
      {/* 1. SIDEBAR */}
      <Navbar onCollapse={setIsSidebarCollapsed} /> 

      {/* 2. MAIN CONTENT AREA */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 
        ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'} ml-0`}>
        
        {/* Persistent Top Bar 
            FIXTURE: Added border-zinc-200 for light mode and refined text colors
        */}
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-900 bg-white/70 dark:bg-black/50 backdrop-blur-md flex items-center justify-between px-6 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            {/* Mobile Spacer */}
            <div className="w-10 lg:hidden" /> 
            
            <div className="w-1 h-4 bg-blue-500 rounded-full hidden xs:block" />
            <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400 truncate">
              {getTabTitle()}
            </h2>
          </div>
          
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span className="hidden sm:inline text-zinc-500 dark:text-zinc-400 opacity-70">
                SYSTEM_STATUS: <span className="text-green-600 dark:text-green-500 font-bold">OPTIMAL</span>
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          </div>
        </header>

        {/* 3. SCROLLABLE PANEL */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-full">
                {tab === 0 && <Land />}
                {tab === 1 && <Profile />}
                {tab === 2 && <Internship />}
                {tab === 3 && <Collab />}
                {tab === 4 && <Project />}
                {tab === 5 && <Tasks />}
                {tab === 7 && <Alerts />}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard