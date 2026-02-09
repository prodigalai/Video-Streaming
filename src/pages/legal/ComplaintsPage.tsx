import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, Book, MessageSquare, ShieldAlert, CheckCircle2, XCircle, Send, Calendar, Landmark, Globe } from "lucide-react";

export default function ComplaintsPage() {
  const lastUpdated = "February 09, 2026";
  const companyAddress = "1 Allied Business Centre, Coldharbour Lane, Harpenden, England, AL5 4UT";
  const supportEmail = "support@fansonchain.com";

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

          <Card className="border-teal-500/20 bg-card/40 backdrop-blur-xl mb-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-50" />
            
            <CardHeader className="text-center pb-12 pt-16 relative">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-teal-500 to-emerald-900 rounded-2xl flex items-center justify-center mb-6 shadow-glow-sm shadow-teal-500/20">
                <Book className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-gradient from-white via-white to-teal-400">
                Complaints Policy
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
                Fans on Chain (FOC) Formal Resolution Process. Learn how we handle platform concerns and reports.
              </CardDescription>
            </CardHeader>

            <CardContent className="prose prose-invert max-w-none px-6 sm:px-12 pb-20">
              <div className="space-y-12">
                {/* Introduction */}
                <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-teal-400" />
                    1. INTRODUCTION
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This Complaints Policy forms part of your legally binding agreement with Fans On Chain Ltd. It explains how we review concerns relating to platform enforcement, illegal content, and regulatory compliance.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                     {[
                       "Information must be accurate and submitted in good faith.",
                       "Submission does not guarantee content removal.",
                       "This is separate from Copyright and Appeals policies."
                     ].map((point, i) => (
                       <div key={i} className="flex gap-3 text-sm text-muted-foreground">
                         <div className="h-5 w-5 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                           <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                         </div>
                         {point}
                       </div>
                     ))}
                  </div>
                </section>

                {/* Scope */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 border-l-4 border-teal-500 pl-4 uppercase tracking-tight">2. SCOPE & EXCLUSIONS</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 text-teal-400">
                        <CheckCircle2 className="h-4 w-4" />
                        What we cover:
                      </h4>
                      <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                        <li>Terms of Use enforcement queries</li>
                        <li>Illegal or harmful platform content</li>
                        <li>Regulatory compliance concerns</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 text-red-400">
                        <XCircle className="h-4 w-4" />
                        What we don't cover:
                      </h4>
                      <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                        <li>Moderation Appeals (Use <Link to="/legal/appeals" className="text-teal-400 underline">Appeals Policy</Link>)</li>
                        <li>Copyright Claims (Use <Link to="/legal/dmca" className="text-teal-400 underline">DMCA Policy</Link>)</li>
                        <li>Creator-Fan Interpersonal Disputes</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Submission */}
                <section className="pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Send className="h-6 w-6 text-teal-400" />
                    6. HOW TO SUBMIT
                  </h2>
                  <div className="grid gap-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-6 items-center">
                      <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="h-6 w-6 text-teal-400" />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="font-bold text-white mb-1">Email Our Team</p>
                        <p className="text-teal-400 font-mono text-lg">{supportEmail}</p>
                      </div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-6 items-center">
                      <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                        <Landmark className="h-6 w-6 text-teal-400" />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="font-bold text-white mb-1">Registered Office</p>
                        <p className="text-muted-foreground text-sm">{companyAddress}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Review Process */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold border-l-4 border-teal-500 pl-4 uppercase tracking-tight">7. REVIEW PROCESS</h2>
                  <div className="p-6 bg-gradient-to-br from-teal-500/10 to-transparent rounded-2xl border border-teal-500/20">
                     <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                       We aim to review and action complaints within <strong>24-48 hours</strong>. High-risk or complex matters may require additional time.
                     </p>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                        <div className="text-center">
                          <p className="text-teal-400 font-black text-xl">24h</p>
                          <p className="text-[10px] text-muted-foreground uppercase">Initial Review</p>
                        </div>
                        <div className="text-center">
                          <p className="text-teal-400 font-black text-xl">2-3d</p>
                          <p className="text-[10px] text-muted-foreground uppercase">Investigation</p>
                        </div>
                        <div className="text-center">
                          <p className="text-teal-400 font-black text-xl">48h</p>
                          <p className="text-[10px] text-muted-foreground uppercase">Resolution</p>
                        </div>
                        <div className="text-center">
                          <p className="text-teal-400 font-black text-xl">Safe</p>
                          <p className="text-[10px] text-muted-foreground uppercase">Outcome</p>
                        </div>
                     </div>
                  </div>
                </section>

                {/* Bad Faith */}
                <section className="bg-red-500/5 rounded-2xl p-6 sm:p-8 border border-red-500/10">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-red-500">
                    <ShieldAlert className="h-6 w-6" />
                    ABUSIVE COMPLAINTS
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We do not tolerate knowingly false, misleading, or vexatious complaints. Abusing the report system may result in account suspension or permanent platform bans.
                  </p>
                </section>

                {/* Regulatory Rights */}
                <section className="pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Globe className="h-6 w-6 text-teal-400" />
                    10. REGULATORY RIGHTS
                  </h2>
                  <div className="grid gap-4">
                    {[
                      { region: "United Kingdom", info: "Rights under Online Safety Act 2023." },
                      { region: "EU / EEA", info: "Rights under the Digital Services Act (DSA)." },
                      { region: "Australia", info: "eSafety Commissioner reporting for online safety." }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                        <span className="font-bold text-white text-sm">{item.region}</span>
                        <span className="text-xs text-muted-foreground text-right">{item.info}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Final Button */}
                <div className="text-center pt-16 border-t border-white/10">
                  <p className="text-muted-foreground mb-8">
                    Need the full legal text for a formal dispute? Download the official policy document below.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow shadow-teal-500/20 bg-teal-600 hover:bg-teal-700 text-white group" asChild>
                      <a href="/Complaints Policy FOC.pages" download>
                        Download Full Policy (PAGES)
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto font-black border-teal-500/20 hover:bg-teal-500/10" asChild>
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
