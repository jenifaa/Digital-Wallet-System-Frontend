
import { 
  Sparkles, 
  Send, 
  TrendingUp, 

  Coins, 
  Fingerprint, 
  Smartphone 
} from "lucide-react";

export default function AppFeaturesGrid() {


  return (
    <section className="relative overflow-hidden bg-[#0F1225] py-24 text-white">
      {/* Tailwind v4.0 optimized arbitrary grid spacing standard */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]bg-size-[70px_70px] opacity-2" />
      
      {/* Ambient background lighting structures */}
      <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 h-[500px] w-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl">
        
        {/* Header Layout Component */}
        <div className="mb-20 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#8B90D0] uppercase">
            <Sparkles className="size-3.5 text-[#8B90D0]" /> Premium Fintech Features
          </span>
          <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl leading-tight">
            Easy to use mobile app that supports on <br />
            <span className="bg-linear-to-r from-[#D6D2F0] via-[#8B90D0] to-[#6C72B8] bg-clip-text text-transparent">
              Android and iOS
            </span>
          </h2>
        </div>

        {/* The 3-Column Feature Grid */}
        <div className="grid gap-8 lg:grid-cols-3">

          {/* ================= PANEL 1: TOKEN SUPPORT ================= */}
          <div className="flex flex-col justify-between rounded-[36px] bg-[#151933] border border-white/5 p-8 sm:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-16 -top-16 size-48 bg-indigo-500/10 blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <span className="text-2xl font-black tracking-tight text-white">
                  Token <br />Support
                </span>
                <span className="text-3xl text-white/20 font-serif select-none group-hover:text-[#8B90D0]/40 transition-colors">∗</span>
              </div>
              <p className="text-sm text-[#B6BCD3]/60 font-medium leading-relaxed mb-12">
                Accelerate processing workflows with universal native token settlements layer support built directly into your wallet cores.
              </p>
            </div>

            {/* Custom UI Graphic Asset (3D-like Tilted Interactive Stack) */}
            <div className="relative h-64 w-full mt-auto flex items-center justify-center">
              <div className="absolute w-11/12 h-48 rounded-2xl bg-linear-to-br from-indigo-500/20 to-purple-600/5 border border-white/10 p-5 transform -rotate-6 translate-y-4 group-hover:-rotate-3 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Fingerprint className="size-4 text-[#8B90D0]" />
                  </div>
                  <div className="h-2 w-20 bg-white/10 rounded-full" />
                </div>
                <div className="mt-8 space-y-2">
                  <div className="h-3 w-full bg-white/5 rounded-md" />
                  <div className="h-3 w-2/3 bg-white/5 rounded-md" />
                </div>
              </div>

              <div className="absolute w-11/12 h-48 rounded-2xl bg-[#1F2340] border border-white/10 p-5 shadow-xl transform rotate-6 -translate-y-2 group-hover:rotate-3 transition-transform duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                      <Coins className="size-5 text-[#8B90D0]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black tracking-tight">Multi-Asset</h4>
                      <p className="text-[10px] text-[#B6BCD3]/40 font-medium">Core Ledger</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Active</span>
                </div>
                
                <div className="mt-8 space-y-3">
                  <div className="flex justify-between text-xs font-mono text-[#B6BCD3]/60">
                    <span>STK // WALLET_IQ</span>
                    <span className="text-white font-bold">99.8%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-linear-to-r from-[#6C72B8] to-[#8B90D0] h-full w-[88%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= PANEL 2: QUICK SEND ================= */}
          <div className="flex flex-col justify-between rounded-[36px] bg-[#151933] border border-white/5 p-8 sm:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -left-16 -bottom-16 size-48 bg-emerald-500/5 blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <span className="text-2xl font-black tracking-tight text-white">
                  Quick <br />Send
                </span>
                <Send className="size-5 text-[#8B90D0]" />
              </div>
              <p className="text-sm text-[#B6BCD3]/60 font-medium leading-relaxed mb-12">
                Instantly process global outbound transactions with multi-currency smart routing features that lower processing friction.
              </p>
            </div>

            {/* Custom Interactive UI Asset: Layered Quick-Action Modules */}
            <div className="relative h-64 w-full mt-auto flex items-end justify-center">
              {/* Back Card Element */}
              <div className="absolute top-4 w-full bg-[#1F2340]/40 rounded-2xl border border-white/5 p-4 transform scale-95 opacity-60 transition duration-300 group-hover:translate-y-1" />
              
              {/* Front Card Element */}
              <div className="w-full bg-[#1F2340] rounded-2xl border border-white/10 p-5 shadow-2xl relative z-10 transition duration-300 group-hover:-translate-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#B6BCD3]/40">Recent Transfers</p>
                
                <div className="mt-4 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-linear-to-tr from-[#6C72B8] to-[#8B90D0] flex items-center justify-center text-xs font-black text-slate-950">AM</div>
                      <div>
                        <h5 className="text-xs font-black">Alex Morgan</h5>
                        <p className="text-[10px] text-emerald-400 font-bold mt-0.5">Completed</p>
                      </div>
                    </div>
                    <span className="text-sm font-black tracking-tight">$1,250.00</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-black text-white">JW</div>
                      <div>
                        <h5 className="text-xs font-black">James Wilson</h5>
                        <p className="text-[10px] text-[#B6BCD3]/40 font-medium mt-0.5">Processing</p>
                      </div>
                    </div>
                    <span className="text-sm font-black tracking-tight text-[#B6BCD3]/80">$380.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= PANEL 3: DASHBOARD PERSONALIZED ================= */}
          <div className="flex flex-col justify-between rounded-[36px] bg-[#151933] border border-white/5 p-8 sm:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-16 -bottom-16 size-48 bg-[#6C72B8]/10 blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <span className="text-2xl font-black tracking-tight text-white">
                  Dashboard <br />
                  <span className="text-emerald-400">Personalized</span>
                </span>
                <Smartphone className="size-5 text-[#8B90D0]" />
              </div>
              <p className="text-sm text-[#B6BCD3]/60 font-medium leading-relaxed mb-12">
                Tailor interface widgets completely around your business needs. Pin graphs, track logs, and control pipelines seamlessly.
              </p>
            </div>

            {/* Custom UI Graphic Asset: Financial Metrics Chart Board */}
            <div className="relative h-64 w-full mt-auto flex items-center justify-center">
              <div className="w-full bg-[#0F1225] rounded-2xl border border-white/5 p-5 shadow-inner relative overflow-hidden group-hover:border-white/10 transition duration-300">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-[9px] font-bold text-[#B6BCD3]/40 uppercase tracking-wider">Account Overview</p>
                    <h4 className="text-base font-black mt-0.5">$24,840.00</h4>
                  </div>
                  <TrendingUp className="size-4 text-emerald-400" />
                </div>

                {/* Simulated Graph Vector Shapes */}
                <div className="flex items-end gap-2.5 h-20 pt-2 border-b border-white/5">
                  {[35, 60, 45, 90, 55, 75, 100].map((height, idx) => (
                    <div key={idx} className="flex-1 relative group/bar cursor-pointer">
                      <div 
                        className="w-full rounded-t-sm bg-linear-to-t from-[#6C72B8]/40 to-[#8B90D0] transition-all duration-500 group-hover:to-emerald-400"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-[#B6BCD3]/40">
                  <span>MON</span>
                  <span>SUN</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Centralized "Always There" Footer Sub-Text Layout */}
        <div className="text-center mt-16 select-none pointer-events-none">
          <span className="text-6xl sm:text-7xl font-black uppercase tracking-tighter opacity-5 bg-linear-to-b from-white to-transparent bg-clip-text text-transparent">
            Always There
          </span>
        </div>

      </div>
    </section>
  );
}