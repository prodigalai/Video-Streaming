import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, ShieldAlert, Ban, AlertTriangle, Users2, HeartOff, Landmark, Ghost, Zap, Calendar, Info, Globe, ShieldCheck } from "lucide-react";

export default function AUPPage() {
  const lastUpdated = "February 09, 2026";

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#0a0a0f] py-12 px-4 sm:px-6">
        <div className="container max-w-4xl">
          {/* Breadcrumbs & Navigation */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary group">
              <Link to="/legal" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
                Back to Legal Center
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Calendar className="h-3 w-3" />
              Last Updated: {lastUpdated}
            </div>
          </div>

          <Card className="border-red-500/20 bg-card/40 backdrop-blur-xl mb-12 overflow-hidden shadow-2xl shadow-red-500/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
            
            <CardHeader className="text-center pb-12 pt-16 relative">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center mb-6 shadow-glow-sm shadow-red-500/20">
                <ShieldAlert className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-gradient from-white via-white to-red-400 uppercase">
                Acceptable Use Policy
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground font-medium">
                Our binding standards for content and conduct. Zero-tolerance safety framework for all Fans on Chain users.
              </CardDescription>
              <div className="mt-6 p-4 bg-red-500/10 rounded-xl border border-red-500/20 max-w-lg mx-auto">
                 <p className="text-xs text-red-200 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <Ban className="h-4 w-4" />
                    Strict Enforcement Warning
                 </p>
                 <p className="text-[10px] text-red-100/60 mt-2 leading-relaxed italic">
                   Breach of this AUP may result in immediate account termination, reversal of earnings, and referral to law enforcement.
                 </p>
              </div>
            </CardHeader>

            <CardContent className="prose prose-invert max-w-none px-6 sm:px-12 pb-20">
              <div className="space-y-16">
                
                {/* Section 1: Zero Tolerance */}
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                      <Zap className="h-6 w-6 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight m-0">1. ZERO-TOLERANCE CONTENT</h2>
                  </div>

                  <div className="grid gap-6">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 group hover:border-red-500/30 transition-all">
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Users2 className="h-5 w-5 text-red-400" />
                        1.1 Minors & Verification
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Strict prohibition on content featuring persons under 18, or appearing to be under 18 (real or AI-simulated). All subjects must complete FOC verification.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 group hover:border-red-500/30 transition-all">
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <HeartOff className="h-5 w-5 text-red-400" />
                        1.2 Sexual Violence & Coercion
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Depiction of non-consensual acts, coercion, trafficking, or exploitation is strictly forbidden. Consent must be clear, enthusiastic, and ongoing.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 group hover:border-red-500/30 transition-all">
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Ghost className="h-5 w-5 text-red-400" />
                        1.4 Non-Consensual Deepfakes
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        AI-generated or synthetic sexual content depicting real persons without explicit written consent or intended for impersonation is a material breach.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 4: Bodily Fluids */}
                <section className="pt-12 border-t border-white/10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                      <AlertTriangle className="h-6 w-6 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight m-0">4. BODILY FLUIDS BAN</h2>
                  </div>
                  <div className="p-6 bg-orange-500/5 rounded-2xl border border-orange-500/10">
                    <p className="text-sm text-orange-200/80 font-bold mb-4 uppercase tracking-widest text-center">No Exceptions Apply</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                       {["Urine", "Faeces", "Blood", "Vomit", "Fetish Saliva", "Waste Products"].map((item, i) => (
                         <div key={i} className="py-2 text-center bg-white/5 rounded-lg text-xs font-mono border border-white/5">
                            {item}
                         </div>
                       ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-4 text-center italic">
                      This ban applies regardless of consent, role-play, or artistic framing.
                    </p>
                  </div>
                </section>

                {/* Section 8: Payments & Meetings */}
                <section className="pt-12 border-t border-white/10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <Landmark className="h-6 w-6 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight m-0">8. PLATFORM INTEGRITY</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none" />
                      <h4 className="font-bold text-white mb-2">8.1 Off-Platform Payments</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Do not share wallet addresses, ENS, or payment links to bypass platform fees. Any attempt to move creator interactions off-platform is a material breach.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none" />
                      <h4 className="font-bold text-white mb-2">8.2 In-Person Meetings</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Arranging or facilitating in-person sexual services, escorting, or physical meetings via FOC is strictly prohibited.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 11: Enforcement */}
                <section className="pt-12 border-t border-white/10">
                  <div className="bg-gradient-to-br from-red-600/10 via-transparent to-transparent p-8 rounded-3xl border border-white/10">
                    <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">ENFORCEMENT ACTIONS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Immediate Content Removal",
                        "Permanent Account Suspension",
                        "Forfeiture of Creator Earnings",
                        "Referral to Law Enforcement",
                        "AI-Powered Automated Detection",
                        "Global ID Blacklisting"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-red-500 shrink-0" />
                          <span className="text-xs font-semibold text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="text-center pt-16">
                  <p className="text-muted-foreground mb-8 text-sm">
                    Reports of violations are prioritised. Please maintain the safety of the Fans on Chain ecosystem.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow shadow-red-500/20 bg-red-600 hover:bg-red-700 text-white" asChild>
                      <a href="/FOC Acceptable Use Policy.pages" download>
                        Download Policy (PAGES)
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto font-black border-white/10" asChild>
                      <Link to="/contact">Report a Violation</Link>
                    </Button>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

const CheckCircle = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
