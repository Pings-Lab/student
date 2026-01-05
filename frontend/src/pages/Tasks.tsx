import { Check, AlarmClock, ClipboardCheck, Info, ListChecks } from 'lucide-react'
import { useAlertStore } from '../store/alertStore'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Tasks = () => {
  const { alerts, got, error, fetchAlerts, markAlert } = useAlertStore();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const markread = async (x: string) => {
    const res = await markAlert(x);
    if (!res) {
      toast.error("Task Update Failed", { theme: "dark" });
    } else {
      toast.success("Task Synchronized", { theme: "dark" });
      fetchAlerts();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-zinc-900 pb-8">
          <div>
            <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
              Daily <span className="text-blue-500">Objectives</span>
            </h3>
            <p className="text-zinc-500 font-mono text-[10px] mt-2 uppercase tracking-[0.3em]">
              Cycle_Status: Active // Tasks_Pending: {alerts.filter(a => !a.read).length}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-mono text-zinc-400">
              ID: INTERN_{new Date().toLocaleDateString().replace(/\//g, '')}
            </div>
          </div>
        </div>

        {/* Status Messaging */}
        {!got && error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-mono italic">
            <Info size={18} /> {error}
          </div>
        )}

        {/* Task Feed */}
        <div className="space-y-4">
          {got && alerts.map((a) => (
            <div 
              key={a.id} 
              className={`group relative flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] border transition-all duration-500 
                ${a.read 
                  ? 'bg-zinc-950/30 border-zinc-900 opacity-60' 
                  : 'bg-zinc-950 border-zinc-800 hover:border-blue-500/50 shadow-xl'
                }`}
            >
              <div className="flex items-start gap-5">
                {/* Visual Indicator */}
                <div className={`mt-1 p-3 rounded-2xl transition-colors ${
                  a.read ? 'bg-zinc-900 text-zinc-600' : 'bg-red-500/10 text-red-500 animate-pulse'
                }`}>
                  <AlarmClock size={20} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
                      Timestamp: {a.recdate}
                    </span>
                    {a.read ? (
                      <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">Completed</span>
                    ) : (
                      <span className="text-[9px] font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded uppercase">Immediate Action</span>
                    )}
                  </div>
                  <p className={`text-sm md:text-base leading-relaxed ${a.read ? 'text-zinc-500 italic line-through' : 'text-zinc-200 font-medium'}`}>
                    {a.message}
                  </p>
                </div>
              </div>

              {/* Task Action */}
              <div className="mt-4 md:mt-0 flex justify-end">
                {!a.read ? (
                  <button 
                    onClick={() => markread(a.id)}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-xs uppercase rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 group/btn"
                  >
                    <Check size={16} className="group-hover/btn:scale-125 transition-transform" />
                    Submit Task
                  </button>
                ) : (
                  <div className="p-3 text-emerald-500/50">
                    <ClipboardCheck size={24} />
                  </div>
                )}
              </div>

              {/* Decorative ID tag */}
              <div className="absolute top-2 right-6 text-[8px] font-mono text-zinc-800 select-none">
                OBJ_DATA_SEQ_{a.id.slice(-4)}
              </div>
            </div>
          ))}

          {got && alerts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-700">
                <ListChecks size={32} />
              </div>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">No tasks assigned for this cycle.</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Tasks