import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Code, 
  Terminal, 
  Zap, 
  Sparkles, 
  Rocket, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Laptop
} from "lucide-react";
import heroImage from "./assets/avatar.png"; // Ensure path is correct

const philosophyItems = [
  {
    icon: Code,
    title: "Industry Standards",
    description: "Learn to write production-grade code that follows global engineering patterns."
  },
  {
    icon: Laptop,
    title: "Project-Based",
    description: "No boring lectures. Build real-world applications that solve actual problems."
  },
  {
    icon: Zap,
    title: "Vite & React",
    description: "Master the fastest modern frontend ecosystem and high-performance tools."
  },
  {
    icon: Sparkles,
    title: "Innovation First",
    description: "Access the 'Lab' mindset—experiment with AI integration and new tech."
  }
];

const stats = [
  { value: "500+", label: "Interns Placed" },
  { value: "50+", label: "Industry Partners" },
  { value: "12 wks", label: "Program Length" },
  { value: "24/7", label: "Mentor Access" }
];

export default function Index() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-blue-500/30 font-sans">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-white/5">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Tech background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                <Rocket className="h-4 w-4" />
                Ping's Lab Internship 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8 italic uppercase">
              Build Your Career,
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                One Sprint at a Time
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
              Skip the theoretical fluff. Join Ping's Lab—a high-intensity internship portal 
              designed to turn students into production-ready engineers through immersive building.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/auth" className="group h-14 px-8 bg-white text-black font-bold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-xs">
                Apply Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/curriculum" className="h-14 px-8 border border-zinc-800 flex items-center hover:bg-zinc-900 transition-all rounded-xs font-mono text-sm text-zinc-400">
                View Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-zinc-950/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-white group-hover:text-blue-500 transition-colors duration-500 mb-2 italic">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-zinc-900 text-zinc-400 text-xs font-mono mb-6 uppercase tracking-widest border border-zinc-800">
              <Users className="h-3.5 w-3.5" />
              The Lab Mindset
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tighter uppercase leading-none">
              Why Learn <span className="text-blue-500">With Us?</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
              We approach engineering with rigor and curiosity. Our goal is to 
              bridge the gap between academia and the professional industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {philosophyItems.map((item) => (
              <div
                key={item.title}
                className="group p-8 rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-blue-500/50 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 text-blue-500">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 italic tracking-tight">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden border-t border-zinc-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter leading-none uppercase">
            Ready to Build <br />
            <span className="text-blue-500">Something Real?</span>
          </h2>
          <p className="text-zinc-400 mb-12 text-lg">
            Applications for the Spring 2026 cohort are now open. 
            Limited seats are available in the Laboratory.
          </p>
          <Link to="/auth" className="inline-flex h-14 px-12 bg-white text-black font-bold items-center gap-3 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-xs uppercase tracking-tighter text-sm">
            Enter The Lab
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-zinc-900/50 text-center">
        <div className="font-black italic text-xl tracking-tighter mb-4">PING'S LAB.</div>
        <p className="text-[10px] font-mono text-zinc-600 tracking-[0.3em] uppercase">
          © 2026 // ALL SYSTEMS OPERATIONAL
        </p>
      </footer>
    </div>
  );
}