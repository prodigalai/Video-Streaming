import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, Shield, Hand, AlertCircle, Info, ClipboardCheck, Users, Search, Mail, Calendar, CheckSquare } from "lucide-react";

export default function AntiSlaveryPage() {
  const lastUpdated = "February 09, 2026";
  const complianceEmail = "compliance@fansonchain.com";

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

          <Card className="border-blue-500/20 bg-card/40 backdrop-blur-xl mb-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
            
            <CardHeader className="text-center pb-12 pt-16 relative">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-indigo-900 rounded-2xl flex items-center justify-center mb-6 shadow-glow-sm shadow-blue-500/20">
                <Hand className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-gradient from-white via-white to-blue-400 uppercase">
                Anti-Slavery Statement
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground font-medium">
                Modern Slavery and Human Trafficking Prevention Policy.
              </CardDescription>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <Shield className="h-3 w-3" />
                Zero Tolerance Commitment
              </div>
            </CardHeader>

            <CardContent className="prose prose-invert max-w-none px-6 sm:px-12 pb-20">
              <div className="space-y-12">
                {/* Introduction */}
                <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                    <Info className="h-6 w-6 text-blue-400" />
                    1. INTRODUCTION
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Fans On Chain Limited is committed to preventing modern slavery and human trafficking in all its forms. This statement is made pursuant to the <strong>UK Modern Slavery Act 2015</strong> and reflects our values, policies, and actions to prevent exploitation within our operations, platform, and supply chain.
                  </p>
                </section>

                {/* Risk Assessment */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-4 uppercase tracking-tight text-white">5. RISK ASSESSMENT</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Workforce",
                        desc: "Direct risk is considered low, focused on skilled professional staff and contractors.",
                        icon: Users
                      },
                      {
                        title: "Platform",
                        desc: "Monitoring user-generated content for indicators of exploitation or coercion.",
                        icon: Search
                      },
                      {
                        title: "Supply Chain",
                        desc: "Assessing third-party providers for ethical and legal compliance via due diligence.",
                        icon: ClipboardCheck
                      }
                    ].map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                        <item.icon className="h-6 w-6 text-blue-400" />
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Mitigation Measures */}
                <section className="space-y-6 pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold flex items-center gap-3 text-blue-400">
                    <Shield className="h-6 w-6" />
                    6. RISK MITIGATION MEASURES
                  </h2>
                  <div className="space-y-4">
                    {[
                      { h: "Creator Verification", p: "Rigorous identity and age verification for all content creators to ensure autonomy." },
                      { h: "Content Moderation", p: "Combination of AI tools and human review to identify and remove exploitative material." },
                      { h: "Reporting & Escalation", p: "Prioritised response systems for reports relating to trafficking or exploitation." },
                      { h: "Third-Party Oversight", p: "Contractual obligations for ethical standards across all service provider relationships." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                          <CheckSquare className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">{step.h}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{step.p}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Reporting */}
                <section className="bg-blue-500/5 rounded-2xl p-6 sm:p-8 border border-blue-500/10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                    <Mail className="h-6 w-6 text-blue-400" />
                    9. REPORTING CONCERNS
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    We encourage anyone who suspects modern slavery, human trafficking, or exploitation connected to our platform to report concerns confidentially.
                  </p>
                  <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/20 text-center">
                    <p className="text-xs text-blue-400 font-black uppercase mb-1 tracking-widest">Confidential Compliance Email</p>
                    <p className="text-xl font-black text-white">{complianceEmail}</p>
                  </div>
                  <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10 flex gap-3 items-start">
                    <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground font-medium uppercase leading-relaxed">
                      Retaliation against whistleblowers is strictly prohibited. Reports are reviewed in good faith and handled responsibly.
                    </p>
                  </div>
                </section>

                {/* Final Button */}
                <div className="text-center pt-16 border-t border-white/10">
                  <p className="text-muted-foreground mb-8 text-sm max-w-xl mx-auto italic">
                    This Statement has been approved by the Board of Fans On Chain Limited. We remain committed to continuous improvement in our prevention measures.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white group" asChild>
                      <a href="/FOC Anti-Slavery Statement.pages" download>
                        Download Official Statement (PAGES)
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto font-black border-blue-500/20 hover:bg-blue-500/10" asChild>
                       <Link to="/contact">Help Center</Link>
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
