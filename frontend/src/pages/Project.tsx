import { useEffect, useState } from 'react'
import { useProfileStore } from '../store/profileStore'
import { useNavigate } from 'react-router-dom'
import { useProjectStore } from '../store/projectStore'
import { Lock, Users, Plus, Filter, Search, X, FolderCode, Terminal, Info } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify';
import { useInternshipStore } from "../store/internStore";
import { useAlertStore } from "../store/alertStore";

const Project = () => {
  const { verified } = useProfileStore()
  const { c_err, fetchProjects, projects, new_project, createProject, setNewProjectState } = useProjectStore()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate()
  const { internships} = useInternshipStore();
  const { fetchAlerts } = useAlertStore()

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createProject();
    if (!res) {
      toast.error(c_err || "Authorization Failed");
    } else {
      toast.success("Project Node Initialized");
      setIsModalOpen(false);
      fetchProjects();
      fetchAlerts();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">
      <ToastContainer theme="dark" />
      
      {!verified && (
        <div 
          onClick={() => nav("/verify")}
          className="mb-8 flex items-center justify-between p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl cursor-pointer hover:bg-orange-500/20 transition-all"
        >
          <div className="flex items-center gap-3 text-orange-400">
            <Info className="animate-pulse" />
            <span className="font-bold tracking-tight text-sm uppercase">Verification required to initialize new repositories</span>
          </div>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white">
              <X size={24} />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-1">New Repository</h3>
              <p className="text-zinc-500 font-mono text-[10px] tracking-[0.2em]">PROTOCOL: PROJECT_INIT_v4.0</p>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Project Name</label>
                  <input 
                    type="text" 
                    placeholder="E.g. Neural_Net_Alpha"
                    className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all"
                    value={new_project.name}
                    onChange={(e) => setNewProjectState({ ...new_project, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Visibility</label>
                  <select 
                    className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all"
                    value={new_project.type}
                    onChange={(e) => setNewProjectState({ ...new_project, type: e.target.value })}
                  >
                    <option value="private">Private (Locked)</option>
                    <option value="public">Public (Collaborative)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Domain</label>
                  <select 
                    className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all"
                    value={new_project.domain}
                    onChange={(e) => setNewProjectState({ ...new_project, domain: e.target.value })}
                  >
                    {internships.map((internship) => (
                      <option value={internship.id}>{internship.type} - {internship.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Concept</label>
                  <input 
                    type="text" 
                    placeholder="MVP, Beta, Production..."
                    className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                    value={new_project.concept}
                    onChange={(e) => setNewProjectState({ ...new_project, concept: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Summary</label>
                <textarea 
                  placeholder="Define project scope and deliverables..."
                  className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:border-blue-500 outline-none"
                  value={new_project.summary}
                  onChange={(e) => setNewProjectState({ ...new_project, summary: e.target.value })}
                />
              </div>

              <button className="w-full py-4 bg-white text-black font-black uppercase text-sm rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                <Plus size={18} /> Create Repository
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MAIN VIEW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <h3 className="text-3xl font-black italic tracking-tighter uppercase">Project <span className="text-blue-500">Inventory</span></h3>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
          >
            <Plus size={16} /> New_Project
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col lg:flex-row gap-4 mb-10 p-2 bg-zinc-950 border border-zinc-900 rounded-3xl">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500" size={18} />
          <input 
            type="text" 
            placeholder="FILTER_DATABASE_ID..."
            className="w-full h-12 bg-black border border-zinc-900 rounded-2xl pl-12 pr-4 text-xs font-mono focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-3 bg-zinc-900 rounded-2xl px-4 py-2">
          <Filter size={16} className="text-zinc-500" />
          <select className="bg-transparent text-xs font-bold uppercase focus:outline-none">
            <option value="all">Filter: All</option>
            <option value="private">Private Only</option>
            <option value="public">Public Only</option>
          </select>
        </div>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(item => (
          <div key={item.id} className="group bg-zinc-950 border border-zinc-900 rounded-[2rem] p-6 hover:border-zinc-700 transition-all relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                item.type === 'public' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
              }`}>
                {item.type === 'public' ? <Users size={12}/> : <Lock size={12}/>}
                {item.type}
              </div>
              <span className="text-[10px] font-mono text-zinc-600">{item.created}</span>
            </div>

            <h4 className="text-xl font-bold italic uppercase mb-4 truncate">{item.name}</h4>
            
            <div className="flex gap-2 mb-8">
              <span className="px-2 py-1 bg-zinc-900 rounded text-[10px] font-mono text-zinc-400 uppercase">{item.domain}</span>
              <span className="px-2 py-1 bg-zinc-900 rounded text-[10px] font-mono text-zinc-400 uppercase">{item.concept}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
              <button className="py-3 bg-zinc-900 hover:bg-zinc-800 text-[10px] font-black uppercase rounded-xl transition-all">Audit</button>
              <button className="py-3 bg-white text-black hover:bg-blue-600 hover:text-white text-[10px] font-black uppercase rounded-xl transition-all flex items-center justify-center gap-2">
                <Terminal size={12}/> Dive In
              </button>
            </div>
            
            <FolderCode className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Project;