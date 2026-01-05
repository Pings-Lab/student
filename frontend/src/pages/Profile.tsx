import { useProfileStore } from '../store/profileStore'
import { useAlertStore } from '../store/alertStore';
import { useEffect, useState } from 'react';
import logo from '../assets/ping.jpg'
import { ShieldCheck, Pencil, User, MapPin, Calendar, Mail, Phone, GraduationCap, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
    const profile = useProfileStore();
    const { fetchProfile, setDob, setEdu, setGender, setMobile, setPin, setUsername, changeUsername, changeProfile } = useProfileStore();
    const { fetchAlerts } = useAlertStore();
    const nav = useNavigate();
    
    const [editMode, setEditMode] = useState<'none' | 'username' | 'profile'>('none');

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleUpdateUsername = async (e: React.FormEvent) => {
        e.preventDefault();
        const msg = await changeUsername();
        toast.success(msg, { theme: "dark" });
        fetchAlerts();
        setEditMode('none');
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        const msg = await changeProfile();
        toast.success(msg, { theme: "dark" });
        setEditMode('none');
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-10 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-zinc-900 pb-8">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
                        Personnel <span className="text-blue-500">Dossier</span>
                    </h1>
                    <p className="text-zinc-500 font-mono text-xs mt-2 uppercase tracking-[0.2em]">
                        Access_Level: Intern // UID_{profile.username?.toUpperCase()}
                    </p>
                </div>
                {!profile.verified && (
                    <button 
                        onClick={() => nav("/verify")}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 text-orange-500 rounded-xl text-xs font-bold animate-pulse"
                    >
                        <ShieldCheck size={16} /> VERIFY ACCOUNT REQUIRED
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Immutable Identity */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
                        <div className="relative inline-block mb-4">
                            <img src={logo} alt="Avatar" className="w-24 h-24 rounded-3xl object-cover border-2 border-zinc-800" />
                            {profile.verified && (
                                <div className="absolute -bottom-2 -right-2 bg-black p-1 rounded-full">
                                    <ShieldCheck className="text-green-400 w-6 h-6" />
                                </div>
                            )}
                        </div>
                        <h2 className="text-xl font-bold italic uppercase">{profile.f_name} {profile.l_name}</h2>
                        <p className="text-zinc-500 text-xs font-mono mb-6">{profile.email}</p>
                        
                        <div className="space-y-4 text-left border-t border-zinc-900 pt-6">
                            <div className="flex items-center gap-3 text-zinc-400 text-sm">
                                <MapPin size={16} className="text-blue-500" /> {profile.country || "Not Set"}
                            </div>
                            <div className="flex items-center gap-3 text-zinc-400 text-sm">
                                <Calendar size={16} className="text-blue-500" /> Joined {profile.created}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Editable Records */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* Username Card */}
                    <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 transition-all hover:border-zinc-800">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <User className="text-blue-500" size={20} />
                                <h3 className="font-bold uppercase italic tracking-tight">System Handle</h3>
                            </div>
                            {editMode !== 'username' ? (
                                <button onClick={() => setEditMode('username')} className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-500 hover:text-white transition-all">
                                    <Pencil size={18} />
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button onClick={handleUpdateUsername} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-all"><Save size={18}/></button>
                                    <button onClick={() => setEditMode('none')} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"><X size={18}/></button>
                                </div>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Username</label>
                            <input 
                                type="text" 
                                value={profile.username}
                                disabled={editMode !== 'username'}
                                onChange={(e) => profile.setUsername(e.target.value)}
                                className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-zinc-300 focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Detailed Profile Card */}
                    <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 transition-all hover:border-zinc-800">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <LayersIcon className="text-blue-500" size={20} />
                                <h3 className="font-bold uppercase italic tracking-tight">Personal Records</h3>
                            </div>
                            {editMode !== 'profile' ? (
                                <button onClick={() => setEditMode('profile')} className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-500 hover:text-white transition-all">
                                    <Pencil size={18} />
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button onClick={handleUpdateProfile} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-all"><Save size={18}/></button>
                                    <button onClick={() => setEditMode('none')} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"><X size={18}/></button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field label="Date of Birth" icon={<Calendar size={14}/>}>
                                <input type="date" value={profile.dob} disabled={editMode !== 'profile'} onChange={(e) => setDob(e.target.value)} className="profile-input"/>
                            </Field>
                            <Field label="Mobile Contact" icon={<Phone size={14}/>}>
                                <input type="text" value={profile.mobile} disabled={editMode !== 'profile'} onChange={(e) => setMobile(e.target.value)} className="profile-input"/>
                            </Field>
                            <Field label="Gender Identity" icon={<User size={14}/>}>
                                <select value={profile.gender} disabled={editMode !== 'profile'} onChange={(e) => setGender(e.target.value)} className="profile-input appearance-none">
                                    <option value="">Select gender</option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                    <option value="o">Other</option>
                                </select>
                            </Field>
                            <Field label="Postal PIN" icon={<MapPin size={14}/>}>
                                <input type="text" value={profile.pin} disabled={editMode !== 'profile'} onChange={(e) => setPin(e.target.value)} className="profile-input"/>
                            </Field>
                            <Field label="Educational Institution" icon={<GraduationCap size={14}/>} className="md:col-span-2">
                                <input type="text" value={profile.edu} disabled={editMode !== 'profile'} onChange={(e) => setEdu(e.target.value)} className="profile-input"/>
                            </Field>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    )
}

// Sub-component for clean input fields
const Field = ({ label, children, icon, className = "" }: any) => (
    <div className={`space-y-1.5 ${className}`}>
        <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1 flex items-center gap-2">
            {icon} {label}
        </label>
        {children}
    </div>
)

// Add this to your global CSS or within a <style> tag
const LayersIcon = ({ size, className }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
)

export default Profile;