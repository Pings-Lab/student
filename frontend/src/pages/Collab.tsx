import { useEffect } from 'react'
import { useProfileStore } from '../store/profileStore'
import { useNavigate } from 'react-router-dom'
import { useProjectStore } from '../store/projectStore'
import { Users, ListOrdered, Filter, Search, ShieldAlert, Rocket } from 'lucide-react'

const Collab = () => {
    const { verified } = useProfileStore()
    const { f_err, fetchProjects, projects } = useProjectStore()
    const nav = useNavigate()

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-10 animate-in fade-in duration-700">
            {/* Verification Banner */}
            {!verified && (
                <div 
                    onClick={() => nav("/verify")}
                    className="mb-8 flex items-center justify-between p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl cursor-pointer hover:bg-orange-500/20 transition-all"
                >
                    <div className="flex items-center gap-3 text-orange-400">
                        <ShieldAlert className="animate-pulse" size={20} />
                        <span className="font-bold tracking-tight text-sm uppercase">Access Restricted: Verification Required to Join Squads</span>
                    </div>
                </div>
            )}

            {/* Header Area */}
            <div className="mb-10">
                <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2">
                    Collaboration <span className="text-blue-500">Hub</span>
                </h3>
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Open Source & Team-Based Initiatives</p>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-10 p-2 bg-zinc-950 border border-zinc-900 rounded-3xl">
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-2xl text-zinc-400 text-xs font-bold uppercase">
                    <ListOrdered size={16} /> Sort
                </div>

                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="SEARCH_PROJECT_DATABASE..."
                        className="w-full h-12 bg-black border border-zinc-900 rounded-2xl pl-12 pr-4 text-sm font-mono focus:outline-none focus:border-blue-500 transition-all"
                    />
                </div>

                <div className="flex items-center gap-3 bg-zinc-900 rounded-2xl px-4 py-2 border border-zinc-800">
                    <Filter size={16} className="text-zinc-500" />
                    <select className="bg-transparent text-xs font-bold text-zinc-300 focus:outline-none uppercase cursor-pointer">
                        <option value="all">Status: All</option>
                        <option value="pub">Status: Open</option>
                        <option value="pub">Status: Closed</option>
                    </select>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.filter((item) => item.type === "public").map((item) => (
                    <div 
                        key={item.id} 
                        className="group bg-zinc-950 border border-zinc-900 rounded-[2rem] p-6 hover:border-blue-500/50 transition-all duration-500 relative overflow-hidden"
                    >
                        {/* Status Tags */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg text-[10px] font-black uppercase">
                                <Users size={12}/> 30 SQUAD_MEMBERS
                            </div>
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
                                DEPLOYED: {item.created}
                            </span>
                        </div>

                        {/* Content */}
                        <h4 className="text-xl font-bold italic uppercase tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                            {item.name}
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-8">
                            <span className="px-2 py-1 bg-zinc-900 rounded text-[10px] font-mono text-blue-400 uppercase">
                                {item.domain}
                            </span>
                            <span className="px-2 py-1 bg-zinc-900 rounded text-[10px] font-mono text-cyan-400 uppercase">
                                {item.concept}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3 mt-auto relative z-10">
                            <button className="flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl text-[10px] font-black uppercase transition-all">
                                View Dossier
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 bg-white text-black hover:bg-blue-600 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all group/btn">
                                <Rocket size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" /> 
                                Dive In
                            </button>
                        </div>

                        {/* Subtle Background Glow */}
                        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/5 blur-[50px] group-hover:bg-blue-500/10 transition-all pointer-events-none" />
                    </div>
                ))}
            </div>

            {/* Error State */}
            {f_err && (
                <div className="mt-10 p-4 border border-red-500/20 bg-red-500/5 rounded-2xl text-red-500 text-center font-mono text-xs uppercase">
                    Transmission Error: {f_err}
                </div>
            )}
        </div>
    )
}

export default Collab;