import { Stars, Check, BellOff, Info } from 'lucide-react'
import { useAlertStore } from '../store/alertStore'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Alerts = () => {
  const { alerts, got, error, fetchAlerts, markAlert } = useAlertStore();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const markread = async (x: string) => {
    const res = await markAlert(x);
    if (!res) {
      toast.error("Protocol Error: Could not mark as read", {
        theme: "dark",
      });
    } else {
      fetchAlerts();
    }
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 border-b border-zinc-900 pb-6">
          <div>
            <h3 className="text-3xl font-black italic tracking-tighter uppercase">
              System <span className="text-blue-500">Alerts</span>
            </h3>
            <p className="text-zinc-500 text-xs font-mono mt-1 uppercase tracking-widest">
              Event Log / Incoming Transmissions
            </p>
          </div>
          <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-mono text-zinc-400">
            {alerts.filter(a => !a.read).length} UNREAD_NOTIFICATIONS
          </div>
        </div>

        {/* Error Handling */}
        {!got && error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm italic">
            <Info className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Empty State */}
        {got && alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
            <BellOff className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-mono text-sm tracking-widest uppercase">No active alerts in buffer</p>
          </div>
        )}

        {/* Alerts List */}
        <div className="space-y-3">
          {got && alerts.map((a, index) => (
            <div 
              key={a.id} 
              className={`group relative flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 
                ${a.read 
                  ? 'bg-zinc-950/50 border-zinc-900 opacity-60' 
                  : 'bg-zinc-900 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.05)]'
                }`}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-lg ${a.read ? 'bg-zinc-800 text-zinc-500' : 'bg-blue-500/10 text-blue-400'}`}>
                  <Stars className="w-4 h-4" />
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-tighter">
                      [{a.recdate}]
                    </span>
                    {!a.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${a.read ? 'text-zinc-400' : 'text-zinc-100 font-medium'}`}>
                    {a.message}
                  </p>
                </div>
              </div>

              {/* Action Area */}
              {!a.read && (
                <button 
                  onClick={() => markread(a.id)}
                  className="p-3 rounded-xl bg-white text-black hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center gap-2 text-xs font-bold"
                >
                  <Check className="w-4 h-4" />
                  <span className="hidden md:inline uppercase tracking-tighter">Dismiss</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ backgroundColor: "#09090b", border: "1px solid #18181b", color: "#fff", borderRadius: "12px" }}
      />
    </div>
  )
}

export default Alerts