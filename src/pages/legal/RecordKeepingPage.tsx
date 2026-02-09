import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, ClipboardList, ShieldCheck, Users, Info, Landmark, Search, FileText, Calendar, Lock } from "lucide-react";

export default function RecordKeepingPage() {
  const lastUpdated = "February 09, 2026";
  const companyAddress = "1 Allied Business Centre, Coldharbour Lane, Harpenden, England, AL5 4UT";

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

          <Card className="border-[#2d3748]/50 bg-card/40 backdrop-blur-xl mb-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-50" />
            
            <CardHeader className="text-center pb-12 pt-16 relative">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-glow-sm shadow-slate-500/20">
                <ClipboardList className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-gradient from-white via-white to-slate-400 uppercase">
                2257 Record-Keeping Compliance
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground font-medium">
                18 U.S.C. §2257 – Voluntary Compliance & Record-Keeping Statement.
              </CardDescription>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <ShieldCheck className="h-3 w-3" />
                Voluntary Disclosure
              </div>
            </CardHeader>

            <CardContent className="prose prose-invert max-w-none px-6 sm:px-12 pb-20">
              <div className="space-y-12">
                {/* Introduction */}
                <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                    <Info className="h-6 w-6 text-slate-400" />
                    INTRODUCTION
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Although Fans On Chain Ltd is incorporated in England and Wales, we voluntarily comply with the record-keeping and age verification requirements of <strong>18 U.S.C. §§ 2257</strong>, to the extent applicable under English law. This disclosure is provided in good faith for transparency.
                  </p>
                </section>

                {/* Age Verification */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 border-l-4 border-slate-500 pl-4 uppercase tracking-tight text-white">AGE VERIFICATION</h2>
                  <div className="p-6 bg-slate-500/5 rounded-2xl border border-slate-500/10 space-y-4">
                     <p className="text-sm text-muted-foreground leading-relaxed">
                        All individuals appearing in visual depictions of sexually explicit conduct on the platform were <strong>at least eighteen (18) years of age</strong> at the time such content was created.
                     </p>
                     <div className="grid grid-cols-2 gap-3 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="h-3 w-3 text-slate-400" />
                           Identity Verified
                        </div>
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="h-3 w-3 text-slate-400" />
                           Age Confirmed
                        </div>
                     </div>
                  </div>
                </section>

                {/* Responsibility */}
                <section className="space-y-6 pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-400 m-0 leading-none">
                    <Users className="h-6 w-6" />
                    RECORD-KEEPING RESPONSIBILITY
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Fans On Chain Ltd does not act as the primary producer of user-generated content.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider flex items-center gap-2">
                        <UserCog className="h-4 w-4" />
                        Creator Duty
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed italic">
                        "Each Creator is solely responsible for maintaining all records required under Section 2257 for content they produce or upload."
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Records Custodian
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Such records must be maintained by the appropriate Records Custodian designated by the Creator.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Exclusions */}
                <section className="space-y-6 pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold border-l-4 border-slate-500 pl-4 uppercase tracking-tight text-white leading-none">EXEMPT CONTENT</h2>
                   <ul className="text-sm text-muted-foreground space-y-3 list-none pl-0">
                      {[
                        "Does not depict conduct listed in 18 U.S.C. §2256(2)(A)",
                        "Content produced before March 19, 2009 (2257A)",
                        "Created prior to July 3, 1995",
                        "Fans On Chain Ltd is not considered a 'producer'"
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                           <span className="text-slate-400 font-bold">{i + 1}.</span>
                           <span>{item}</span>
                        </li>
                      ))}
                   </ul>
                </section>

                {/* Inspection */}
                <section className="bg-slate-500/5 rounded-2xl p-6 sm:p-8 border border-slate-500/10 mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                    <Search className="h-6 w-6 text-slate-400" />
                    INSPECTION OF RECORDS
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Any records required to be maintained under Section 2257 must be maintained by the relevant Creator or their designated Records Custodian, <strong>not by Fans On Chain Ltd</strong>. We do not hold primary 2257 records for user-generated content.
                  </p>
                </section>

                {/* Company Contact */}
                <div className="pt-12 border-t border-white/10">
                  <div className="grid sm:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Company Information</h4>
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-white">Fans On Chain Ltd</p>
                        <p className="text-xs text-muted-foreground leading-relaxed max-w-[240px]">
                          {companyAddress}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center sm:justify-end">
                      <div className="h-32 w-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center grayscale opacity-60">
                         <Landmark className="h-12 w-12 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Button */}
                <div className="text-center pt-16">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow shadow-slate-500/20 bg-slate-700 hover:bg-slate-600 text-white" asChild>
                      <a href="/FOC 2257 Compliance Statement.pages" download>
                        Download Statement (PAGES)
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto font-black border-white/10" asChild>
                      <Link to="/contact">Contact Compliance</Link>
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

const UserCog = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M21 15l-3-3" />
    <path d="M18 12l3-3" />
  </svg>
);
