import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, RotateCcw, AlertCircle, ShieldCheck, ClipboardList, Clock, Send, Scale, Info, Globe, CheckCircle2 } from "lucide-react";

export default function AppealsPage() {
  const lastUpdated = "February 09, 2026";
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
              <Clock className="h-3 w-3" />
              Last Updated: {lastUpdated}
            </div>
          </div>

          <Card className="border-orange-500/20 bg-card/40 backdrop-blur-xl mb-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
            
            <CardHeader className="text-center pb-12 pt-16 relative">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-orange-500 to-red-900 rounded-2xl flex items-center justify-center mb-6 shadow-glow-sm shadow-orange-500/20">
                <RotateCcw className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-gradient from-white via-white to-orange-400">
                Appeals Policy
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
                Fans on Chain (FOC) Formal Enforcement Review. Learn how to appeal account restrictions or content decisions.
              </CardDescription>
            </CardHeader>

            <CardContent className="prose prose-invert max-w-none px-6 sm:px-12 pb-20">
              <div className="space-y-12">
                {/* Introduction */}
                <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Info className="h-6 w-6 text-orange-400" />
                    1. INTRODUCTION
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This Appeals Policy explains which enforcement actions may be appealed, the exclusive procedure for submission, and how we review and decide on these matters.
                  </p>
                  <div className="mt-4 flex items-start gap-4 p-4 bg-orange-500/5 rounded-xl border border-orange-500/10">
                    <AlertCircle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-orange-200/80">
                      <strong>Note:</strong> Submission of an appeal does not automatically suspend enforcement actions unless expressly stated otherwise.
                    </p>
                  </div>
                </section>

                {/* Appealable Decisions */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 border-l-4 border-orange-500 pl-4 uppercase tracking-tight">4. WHAT CAN BE APPEALED</h2>
                  <p className="text-muted-foreground text-sm mb-6">A “Decision” means any enforcement action taken by FansOnChain to:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Account suspension or termination",
                      "Content removal or deactivation",
                      "Issuance of final warnings",
                      "Messaging or discovery restrictions",
                      "Monetisation or payout suspension",
                      "Formal enforcement notices"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        <span className="text-sm font-medium text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Mandatory Procedure */}
                <section className="pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Send className="h-6 w-6 text-orange-400" />
                    6. EXCLUSIVE PROCEDURE
                  </h2>
                  <div className="p-6 bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl border border-orange-500/20">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                      "The only way to appeal a Decision is by submitting a completed Appeal Request through the channel specified."
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                      <div className="text-center sm:text-left">
                        <p className="font-bold text-white mb-1 uppercase tracking-widest text-xs">Primary Contact</p>
                        <p className="text-orange-400 font-black text-xl">{supportEmail}</p>
                      </div>
                      <div className="h-px w-full sm:h-12 sm:w-px bg-white/10" />
                      <div className="text-center sm:text-left">
                        <p className="font-bold text-white mb-1 uppercase tracking-widest text-xs">Time Limit</p>
                        <p className="text-white font-black text-xl">Within 6 Months</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Required Info */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-orange-400">
                    <ClipboardList className="h-6 w-6" />
                    7. REQUIRED INFORMATION
                  </h2>
                  <p className="text-muted-foreground">Only fully completed submissions will be considered. Your appeal must include:</p>
                  <ul className="grid gap-3 list-none pl-0">
                    {[
                      "Affected account username and/or URL.",
                      "Content identifiers or URLs subject to the decision.",
                      "Detailed reasons explaining why you believe the decision was incorrect.",
                      "Reference to specific Terms of Use or AUP clauses.",
                      "Supporting evidence or documentation."
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="h-6 w-6 rounded flex items-center justify-center bg-orange-500/10 text-orange-500 shrink-0">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Outcomes */}
                <section className="pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Scale className="h-6 w-6 text-orange-400" />
                    10. APPEAL OUTCOMES
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-2xl">
                      <p className="font-bold text-green-400 mb-1">Grant</p>
                      <p className="text-[10px] text-muted-foreground uppercase leading-tight">Decisions reversed, actions lifted.</p>
                    </div>
                    <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
                      <p className="font-bold text-orange-400 mb-1">Partial</p>
                      <p className="text-[10px] text-muted-foreground uppercase leading-tight">Some actions reversed, others remain.</p>
                    </div>
                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                      <p className="font-bold text-red-400 mb-1">Deny</p>
                      <p className="text-[10px] text-muted-foreground uppercase leading-tight">Original decisions remain unchanged.</p>
                    </div>
                  </div>
                </section>

                {/* Rights */}
                <section className="space-y-4 border-t border-white/10 pt-12">
                   <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Globe className="h-6 w-6 text-orange-400" />
                    14. EU/EEA ADDITIONAL RIGHTS
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Under the EU Digital Services Act (DSA), EU/EEA users may seek resolution through certified out-of-court dispute settlement bodies. FansOnChain will engage in good faith where legally required.
                  </p>
                </section>

                {/* Final Button */}
                <div className="text-center pt-16 border-t border-white/10">
                  <p className="text-muted-foreground mb-8 text-sm">
                    We aim to provide a fair, non-discriminatory review process for all platform members.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow shadow-orange-500/20 bg-orange-600 hover:bg-orange-700 text-white group" asChild>
                      <a href="/Appeals Policy FOC.pages" download>
                        Download Policy (PAGES)
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto font-black border-orange-500/20 hover:bg-orange-500/10" asChild>
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
