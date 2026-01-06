import { useEffect, useState } from "react";
import { useInternshipStore } from "../store/internStore";
import { TimerReset, BubblesIcon, X, CircleCheckBig, BookmarkCheck, ShieldAlert, Rocket, Layers } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import { useProfileStore } from '../store/profileStore'
import { useNavigate } from "react-router-dom";
import { useAlertStore } from "../store/alertStore";

export interface applyInternship {
  id: string;
  name: string;
  type: string;
  cat: number;
  dur: number;
  cost: number;
  view: string;
}

const Internship = () => {
    const { internships, fetchInternships, error2, myintern, myInternships, filterByCategory, error3, setApplyid, applyInternship } = useInternshipStore();
    const { verified } = useProfileStore();
    const [activeCat, setActiveCat] = useState(1);
    const [dom, setDom] = useState("AIML");
    const [got, setGot] = useState(false);
    const [viewId, setViewId] = useState("");
    const [selectedItem, setSelectedItem] = useState<applyInternship[]>([]);
    const { fetchAlerts } = useAlertStore()
    const nav = useNavigate()

    const levels = ["", "Beginner", "Intermediate", "Advanced", "Professional", "Expert"];

    const updateMyInterns = async () => {
        const res = await myInternships();
        setGot(res);
        if (!res) toast.error(error2);
    };

    useEffect(() => {
        updateMyInterns();
        fetchInternships();
    }, []);

    const categories = [
        { id: 1, name: "AIML" },
        { id: 2, name: "Cyber Security" },
        { id: 3, name: "Data Analytics" },
        { id: 4, name: "DBMS" },
        { id: 5, name: "Programming" },
        { id: 6, name: "Web Frontend" },
        { id: 7, name: "Web Backend" },
        { id: 8, name: "other" }
    ];

    const handleApply = async (x: string) => {
        setApplyid(x);
        const res = await applyInternship(x);
        if (!res) {
            toast.error(error3);
        } else {
            toast.success("Deployment Successful: Internship Joined");
            updateMyInterns();
            fetchAlerts();
            setViewId("");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">
            <ToastContainer theme="dark" />

            {/* Verification Alert */}
            {!verified && (
                <div 
                    onClick={() => nav("/verify")}
                    className="mb-8 flex items-center justify-between p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl cursor-pointer hover:bg-orange-500/20 transition-all group"
                >
                    <div className="flex items-center gap-3 text-orange-400">
                        <ShieldAlert className="animate-pulse" />
                        <span className="font-bold tracking-tight">Identity Verification Required</span>
                    </div>
                    <span className="text-xs font-mono group-hover:underline">FIX_NOW →</span>
                </div>
            )}

            {/* Active Subscriptions / My Internships */}
            {got && myintern.length > 0 && (
                <section className="mb-12">
                    <h3 className="text-2xl font-black italic mb-6 flex items-center gap-2 uppercase tracking-tighter">
                        <Layers className="text-blue-500 w-5 h-5" /> My Active Tracks
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {myintern.map(x => {
                            const item = filterByCategory(x.id)[0];
                            if (!item) return null;
                            return (
                                <div key={item.id} className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden hover:border-blue-500/40 transition-all group">
                                    <div className="relative h-32 overflow-hidden">
                                        <img src={item.view} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-bold italic text-lg mb-4">{item.type}</h4>
                                        <div className="flex justify-between text-xs font-mono mb-6">
                                            <span className="text-green-400 flex items-center gap-1"><TimerReset size={14}/> {item.dur}m</span>
                                            <span className="text-blue-400 flex items-center gap-1"><BookmarkCheck size={14}/> {x.status}</span>
                                        </div>
                                        {x.status !== "applied" && (
                                            <div className="w-full bg-zinc-900 h-1.5 rounded-full mb-4">
                                                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${x.progress}%` }} />
                                            </div>
                                        )}
                                        <button 
                                            onClick={() => { setSelectedItem(filterByCategory(item.id)); setViewId(item.id); }}
                                            className="w-full py-2 bg-zinc-900 hover:bg-white hover:text-black transition-colors rounded-xl text-xs font-bold uppercase tracking-widest"
                                        >
                                            Enter Console
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Enrollment Section */}
            <section>
                <h3 className="text-2xl font-black italic mb-6 uppercase tracking-tighter">Explore New Labs</h3>
                
                {/* Domain Selector */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {categories.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => { setActiveCat(cat.id); setDom(cat.name); }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                activeCat === cat.id 
                                ? "bg-white text-black border-white" 
                                : "bg-zinc-950 text-zinc-500 border-zinc-900 hover:border-zinc-700"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Available Internships */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {internships
                        .filter(item => item.name === dom)
                        .map(item => (
                            <div key={item.id} className="bg-zinc-950 border border-zinc-900 rounded-3xl p-5 hover:border-cyan-500/50 transition-all">
                                <img src={item.view} alt={item.type} className="w-full h-40 object-cover rounded-2xl mb-4 grayscale hover:grayscale-0 transition-all duration-500" />
                                <h4 className="font-bold text-lg mb-2 italic tracking-tight">{item.type}</h4>
                                <div className="flex gap-4 text-[10px] font-mono text-zinc-500 mb-6">
                                    <span className="flex items-center gap-1"><TimerReset size={12}/> {item.dur}M</span>
                                    <span className="flex items-center gap-1"><BubblesIcon size={12}/> {levels[item.cat]}</span>
                                </div>
                                <button 
                                    onClick={() => { setSelectedItem(filterByCategory(item.id)); setViewId(item.id); }}
                                    className="w-full py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-white transition-all rounded-xl text-xs font-bold uppercase"
                                >
                                    View Dossier
                                </button>
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* Details Modal */}
            {viewId !== "" && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setViewId("")} />
                    
                    {selectedItem.map(item => (
                        <div key={item.id} className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh] animate-in zoom-in-95 duration-300 shadow-2xl">
                            <button onClick={() => setViewId("")} className="absolute top-6 right-6 z-10 p-2 bg-black rounded-full hover:bg-zinc-800 transition-colors">
                                <X size={20} />
                            </button>

                            {/* Modal Left: Visuals */}
                            <div className="md:w-2/5 p-8 bg-zinc-900/50 border-r border-zinc-900 flex flex-col justify-center">
                                <img src={item.view} className="w-full rounded-3xl shadow-2xl mb-8 border border-zinc-800" />
                                <div className="space-y-4 font-mono text-xs">
                                    <div className="flex justify-between border-b border-zinc-800 pb-2">
                                        <span className="text-zinc-500 uppercase">Track Level</span>
                                        <span className="text-blue-400">{levels[item.cat]}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-zinc-800 pb-2">
                                        <span className="text-zinc-500 uppercase">Duration</span>
                                        <span className="text-blue-400">{item.dur} Months</span>
                                    </div>
                                    <div className="flex justify-between border-b border-zinc-800 pb-2">
                                        <span className="text-zinc-500 uppercase">Project Count</span>
                                        <span className="text-blue-400">{item.dur * 2} Units</span>
                                    </div>
                                    <div className="flex justify-between items-baseline pt-4">
                                        <span className="text-zinc-400 italic">Enrollment Fee</span>
                                        <span className="text-2xl font-black text-white italic">₹{item.cost}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Right: Details */}
                            <div className="md:w-3/5 p-8 md:p-12 overflow-y-auto">
                                <h2 className="text-3xl font-black italic mb-2 tracking-tighter uppercase">{item.name}</h2>
                                <h3 className="text-blue-500 font-mono text-sm mb-8 tracking-widest">{item.type} // LAB_READY</h3>
                                
                                <ul className="space-y-6 mb-10">
                                    {[
                                        "Solo and group collaborative learning environments.",
                                        "Real-world projects with industry-standard tech stacks.",
                                        "Direct contribution to Open Source ecosystems.",
                                        "Performance-based perks and mentor recommendations.",
                                        "MSME & Startup India accredited certification."
                                    ].map((text, i) => (
                                        <li key={i} className="flex gap-4 text-sm text-zinc-400 leading-relaxed">
                                            <CircleCheckBig className="text-blue-500 shrink-0 mt-0.5" size={18} />
                                            {text}
                                        </li>
                                    ))}
                                </ul>

                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => handleApply(item.id)}
                                        className="py-4 bg-white text-black font-black uppercase text-sm rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <Rocket size={18} /> Initialize
                                    </button>
                                    <button className="py-4 bg-zinc-900 text-zinc-400 font-bold uppercase text-xs rounded-2xl hover:text-white transition-all">
                                        View Roadmap
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Internship;