import './alert.css'
import {Check, AlarmClock} from 'lucide-react'
import { useAlertStore } from '../store/alertStore'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Tasks = () => {
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
        <h3>Daily Tasks</h3>
        {!got && (
          <div className="alert">{error}</div>
        )}
        <ul className="note-box">
          {got && (
           alerts.map(a => (
          <li key={a.id} className="notify" style={{boxShadow:'0px 0px 10px 1px lightblue', width:'95%', margin:'2% auto'}}>
           <p style={{color:'white'}}>
            <AlarmClock color='red'/> &nbsp;&nbsp;&nbsp;{a.recdate}&nbsp;&nbsp;
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

export default Tasks