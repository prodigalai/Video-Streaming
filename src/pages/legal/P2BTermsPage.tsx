import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, Scale, ShieldCheck, BarChart3, MessageSquare, Info, Calendar, Gavel, Globe } from "lucide-react";

export default function P2BTermsPage() {
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

          <Card className="border-primary/20 bg-card/40 backdrop-blur-xl mb-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            
            <CardHeader className="text-center pb-12 pt-16 relative">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-2xl flex items-center justify-center mb-6 shadow-glow-sm">
                <Scale className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-gradient uppercase">
                Platform-to-Business (P2B) Terms
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
                Regulation (EU) 2019/1150 – Promoting fairness and transparency for business users.
              </CardDescription>
            </CardHeader>

            <CardContent className="prose prose-invert max-w-none px-6 sm:px-12 pb-20">
              <div className="space-y-12">
                {/* Introduction */}
                <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Info className="h-6 w-6 text-primary" />
                    1. INTRODUCTION
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These Platform-to-Business Regulation Terms (“P2B Terms”) explain how Creators may be ranked, promoted, or recommended; how eligible Business Users may submit complaints; and the mediation options available.
                  </p>
                  <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 text-xs text-muted-foreground italic">
                    These terms supplement the FansOnChain Terms of Use where legally required by Regulation (EU) 2019/1150.
                  </div>
                </section>

                {/* Applicability */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">3. APPLICABILITY & JURISDICTION</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-400" />
                        EU Business Users
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Applies to Creators who qualify as Business Users established or resident in an EU member state.
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/10">
                      <h4 className="font-bold mb-2 flex items-center gap-2 text-yellow-500/80">
                        <AlertTriangle className="h-4 w-4" />
                        UK Position
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Following Brexit, the P2B Regulation does not formally apply to UK-established Business Users.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Ranking */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    5. RANKING, PROMOTION & VISIBILITY
                  </h2>
                  <p className="text-muted-foreground">The principal parameters influencing ranking and visibility include:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "User engagement & interaction signals",
                      "Subscription activity & retention",
                      "Content compliance history",
                      "Account trust & verification indicators",
                      "Platform performance metrics",
                      "Geographic & language relevance"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-xs text-muted-foreground italic">
                      <strong>No Paid Ranking:</strong> Payment of platform fees does not guarantee enhanced ranking or visibility.
                    </p>
                  </div>
                </section>

                {/* Complaints */}
                <section className="space-y-6 pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    8. COMPLAINT HANDLING
                  </h2>
                  <p className="text-muted-foreground">Eligible Business Users may submit a complaint relating specifically to P2B obligations or technological issues.</p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/10">
                    <div className="space-y-1 text-center sm:text-left">
                      <p className="text-sm font-bold">Submit via Email</p>
                      <p className="text-lg font-black text-primary">support@fansonchain.com</p>
                    </div>
                    <p className="text-xs text-muted-foreground max-w-[200px] text-center sm:text-right">
                      Please clearly state that the complaint is made under the Platform-to-Business Regulation.
                    </p>
                  </div>
                </section>

                {/* Mediation */}
                <section className="space-y-6 pt-12 border-t border-white/10">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Gavel className="h-6 w-6 text-primary" />
                    9. MEDIATION
                  </h2>
                  <p className="text-muted-foreground">If a complaint is not resolved internally, we are willing to engage in mediation with approved providers.</p>
                  <div className="grid gap-3">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                      <span className="font-bold text-sm">Centre for Effective Dispute Resolution (CEDR)</span>
                      <span className="text-[10px] uppercase font-bold text-primary px-2 py-1 bg-primary/10 rounded">Primary</span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center opacity-70">
                      <span className="font-bold text-sm">International Chamber of Commerce (ICC)</span>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground px-2 py-1 bg-white/10 rounded">Secondary</span>
                    </div>
                  </div>
                </section>

                {/* Footer Disclaimer */}
                <div className="text-center pt-16 border-t border-white/10">
                  <p className="text-muted-foreground mb-8">
                    These terms exist to ensure transparency for our creators using Fans on Chain for business purposes in the EU.
                  </p>
                  <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow group" asChild>
                    <a href="/FOC P2B Terms.pages" download>
                      Download Full P2B Regulation Document
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

const AlertTriangle = (props: any) => (
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
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);
