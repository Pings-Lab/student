import './alert.css'
import {Stars, Check} from 'lucide-react'
import { useAlertStore } from '../store/alertStore'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Alerts = () => {
  const {alerts, got, error, fetchAlerts, markAlert}=useAlertStore();
  useEffect(() => {
        fetchAlerts();
      }, []);

  const markread=async(x: string)=>{
     const res = await markAlert(x);
     if (!res){
       toast("something went wrong")
     }
     else{
      fetchAlerts()
     }
  }
  return (
    <div className="panelpage">
        <h3>Alerts</h3>
        {!got && (
          <div className="alert">{error}</div>
        )}
        <ul className="note-box">
          {got && (
           alerts.map(a => (
          <li key={a.id} className="notify">
           <p>
            <Stars /> &nbsp;&nbsp;&nbsp;
               {a.message}
          </p>
          {!a.read && (
            <button onClick={()=>markread(a.id)}><Check /></button>
          )}
          
         </li>
          ))
      )}

        
            
        </ul>
        <ToastContainer/>
    </div>
  )
}

export default Alerts