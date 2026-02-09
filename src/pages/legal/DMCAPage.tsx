import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, Shield, Mail, Scale, AlertTriangle, FileText, Calendar, Send, ClipboardCheck, Globe } from "lucide-react";

export default function DMCAPage() {
  const lastUpdated = "February 09, 2026";
  const companyAddress = "1 Allied Business Centre, Coldharbour Lane, Harpenden, England, AL5 4UT";
  const dmcaEmail = "copyright@fansonchain.com";

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

          <Card className="border-red-500/20 bg-card/40 backdrop-blur-xl mb-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
            
            <CardHeader className="text-center pb-12 pt-16 relative">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center mb-6 shadow-glow-sm shadow-red-500/20">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-gradient from-white via-white to-red-400">
                DMCA Takedown Policy
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
                Notice & Takedown Framework for Copyright Infringement.
              </CardDescription>
            </CardHeader>

            <CardContent className="prose prose-invert max-w-none px-6 sm:px-12 pb-20">
              <div className="space-y-12">
                {/* Introduction */}
                <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-red-500" />
                    1. INTRODUCTION
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This DMCA Takedown Policy applies solely to reports of alleged copyright infringement relating to content made available on the Platform. We respect the intellectual property rights of copyright holders worldwide.
                  </p>
                </section>

                {/* Framework */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-500 pl-4 uppercase tracking-tight">2. DMCA FRAMEWORK</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Fans on Chain Ltd voluntarily complies with the notice-and-takedown provisions of the U.S. Digital Millennium Copyright Act (“DMCA”), 17 U.S.C. §512. We qualify as a “Service Provider” and rely on safe harbour protections.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                      <p className="text-xs text-muted-foreground mt-0.5">We prohibit account holders from infringing the copyrights of others.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex gap-3">
                      <Shield className="h-5 w-5 text-red-500 shrink-0" />
                      <p className="text-xs text-muted-foreground mt-0.5">We reserve the right to terminate repeat infringers.</p>
                    </div>
                  </div>
                </section>

                {/* Requirements */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <ClipboardCheck className="h-6 w-6 text-red-500" />
                    3. NOTICE REQUIREMENTS
                  </h2>
                  <p className="text-muted-foreground">Valid notices must contain all of the following:</p>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-muted-foreground list-none pl-0">
                    {[
                      { l: "(a)", t: "Physical or electronic signature of owner/agent" },
                      { l: "(b)", t: "Identification of the copyrighted work" },
                      { l: "(c)", t: "Location of infringing material (Specific URLs)" },
                      { l: "(d)", t: "Full contact details (Address, Phone, Email)" },
                      { l: "(e)", t: "Good-faith belief statement" },
                      { l: "(f)", t: "Statement of accuracy under penalty of perjury" }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                        <span className="font-black text-red-500">{item.l}</span>
                        <span>{item.t}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Designated Agent */}
                <section className="pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Send className="h-6 w-6 text-red-500" />
                    4. DESIGNATED AGENT
                  </h2>
                  <div className="bg-gradient-to-br from-red-500/10 to-transparent p-6 rounded-2xl border border-red-500/20 space-y-4">
                    <p className="text-sm font-bold text-white uppercase tracking-wider">Send notices to:</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <Mail className="h-5 w-5 text-red-500" />
                        <span className="font-medium text-white">{dmcaEmail}</span>
                      </div>
                      <div className="flex items-start gap-4 text-muted-foreground">
                        <Landmark className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                        <span className="font-medium leading-relaxed">{companyAddress}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground italic border-t border-red-500/10 pt-4">
                      * Only DMCA notices and counter-notifications will be processed at this address.
                    </p>
                  </div>
                </section>

                {/* Counter-Notification */}
                <section className="space-y-6 pt-12 border-t border-white/10">
                  <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-4 uppercase tracking-tight">7. COUNTER-NOTIFICATION</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    If you believe your content was removed due to mistake or misidentification, you may submit a counter-notification stating your good-faith belief and consenting to the jurisdiction of the U.S. Federal District Court.
                  </p>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-xs text-muted-foreground">
                    <strong>Jurisdiction:</strong> You must consent to the jurisdiction of the judicial district in which you reside (or any district in which the Service Provider may be found if outside the U.S.).
                  </div>
                </section>

                {/* Language Requirement */}
                <section className="space-y-4 border-t border-white/10 pt-12">
                   <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Globe className="h-6 w-6 text-red-500" />
                    9. LANGUAGE REQUIREMENT
                  </h2>
                  <p className="text-muted-foreground">
                    All DMCA notices and counter-notifications must be submitted in <strong>English</strong>. Notices in other languages may be disregarded.
                  </p>
                </section>

                {/* Final Button */}
                <div className="text-center pt-16 border-t border-white/10">
                  <p className="text-muted-foreground mb-8">
                    Submitting false or bad-faith notices may result in legal liability under 17 U.S.C. §512(f). Please ensure all information is accurate.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow shadow-red-500/20 bg-red-600 hover:bg-red-700 text-white group" asChild>
                      <a href="/DMCA Takedown Policy FOC.pages" download>
                        Download Policy (PAGES)
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto font-black border-red-500/20 hover:bg-red-500/10" asChild>
                       <Link to="/contact">Contact Support</Link>
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

const Landmark = (props: any) => (
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
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7 12 2" />
  </svg>
);
