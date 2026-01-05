import Navbar from '../components/Navbar'
import Land from './Land'
import useTabState from '../store/tab'
import Profile from './Profile'
import Internship from './Internship'
import Alerts from './Alerts'
import Project from './Project'
import Collab from './Collab'
import Tasks from './Tasks'

const Dashboard = () => {
  const { tab } = useTabState();

  // Helper to get the title based on the tab index
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
    <div className="flex min-h-screen bg-[#050505] text-white font-sans overflow-hidden">
      
      {/* 1. SIDEBAR (The Navbar we designed earlier) */}
      <Navbar /> 

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ml-20 lg:ml-64">
        
        {/* Persistent Top Bar for Dashboard Context */}
        <header className="h-16 border-b border-zinc-900 bg-black/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="w-1 h-4 bg-blue-500 rounded-full" />
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-400">
              {getTabTitle()}
            </h2>
          </div>
          
          <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600">
            <span className="hidden md:inline">SYSTEM_STATUS: <span className="text-green-500">OPTIMAL</span></span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </header>

        {/* 3. SCROLLABLE PANEL */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {tab === 0 && <Land />}
            {tab === 1 && <Profile />}
            {tab === 2 && <Internship />}
            {tab === 3 && <Collab />}
            {tab === 4 && <Project />}
            {tab === 5 && <Tasks />}
            {tab === 7 && <Alerts />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard