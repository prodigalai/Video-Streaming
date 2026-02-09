import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, CreditCard, ShieldCheck, AlertCircle, Ban, Coins, Calendar, Info, ShieldAlert } from "lucide-react";

export default function CryptoTermsPage() {
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

          <Card className="border-indigo-500/20 bg-card/40 backdrop-blur-xl mb-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
            
            <CardHeader className="text-center pb-12 pt-16 relative">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-indigo-600 to-purple-900 rounded-2xl flex items-center justify-center mb-6 shadow-glow-sm shadow-indigo-500/20">
                <CreditCard className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-gradient from-white via-white to-indigo-400 uppercase">
                Crypto Card & AUP
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
                Acceptable Use Addendum for Creators. This policy governs the use of digital wallets and crypto-linked payment cards.
              </CardDescription>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="h-3 w-3" />
                Creators Only
              </div>
            </CardHeader>

            <CardContent className="prose prose-invert max-w-none px-6 sm:px-12 pb-20">
              <div className="space-y-12">
                {/* Scope */}
                <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Info className="h-6 w-6 text-indigo-400" />
                    1. SCOPE & STATUS
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This Addendum applies to any Creator who is issued, enabled, or permitted to access a digital wallet, virtual card, or physical crypto-linked payment card (the “Crypto Card”).
                  </p>
                  <div className="mt-4 p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-xs text-muted-foreground italic">
                    Access is optional, discretionary, and revocable at any time. No Creator has an entitlement to card access.
                  </div>
                </section>

                {/* Nature of the Card */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 border-l-4 border-indigo-500 pl-4 uppercase tracking-tight">2. NATURE OF THE CARD</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Payout and spending convenience only.",
                      "Not a bank or deposit account.",
                      "Administered by third-party issuers.",
                      "Subject to transaction & merchant limits."
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="h-2 w-2 rounded-full bg-indigo-500" />
                        <span className="text-sm text-muted-foreground font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Permitted Use */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Coins className="h-6 w-6 text-indigo-400" />
                    3. PERMITTED USE
                  </h2>
                  <p className="text-muted-foreground">The Crypto Card may be used only for:</p>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Receiving legitimate Creator payouts.</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Lawful personal or business purchases.</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Transactions permitted by card network rules.</span>
                    </div>
                  </div>
                </section>

                {/* PROHIBITED USES */}
                <section className="bg-red-500/5 rounded-2xl p-6 sm:p-8 border border-red-500/10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-500">
                    <Ban className="h-6 w-6" />
                    4. PROHIBITED USES (MATERIAL BREACH)
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">4.1 Financial Crime & Abuse</h3>
                      <ul className="grid sm:grid-cols-2 gap-4 text-xs text-muted-foreground list-none pl-0">
                        <li className="bg-white/5 p-3 rounded-lg">• Money laundering or structuring</li>
                        <li className="bg-white/5 p-3 rounded-lg">• Sanctions evasion</li>
                        <li className="bg-white/5 p-3 rounded-lg">• Fraud or misrepresentation</li>
                        <li className="bg-white/5 p-3 rounded-lg">• Third-party funds processing</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">4.2 Restricted Activity</h3>
                      <ul className="grid sm:grid-cols-2 gap-4 text-xs text-muted-foreground list-none pl-0">
                        <li className="bg-white/5 p-3 rounded-lg">• Unauthorised adult services</li>
                        <li className="bg-white/5 p-3 rounded-lg">• Gambling where prohibited</li>
                        <li className="bg-white/5 p-3 rounded-lg">• Restricted goods or weapons</li>
                        <li className="bg-white/5 p-3 rounded-lg">• Unlicensed financial services</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">4.3 Platform Circumvention</h3>
                      <ul className="grid sm:grid-cols-2 gap-4 text-xs text-muted-foreground list-none pl-0">
                        <li className="bg-white/5 p-3 rounded-lg">• Bypassing platform fees</li>
                        <li className="bg-white/5 p-3 rounded-lg">• Evasion of controls/limits</li>
                        <li className="bg-white/5 p-3 rounded-lg">• Sharing or reselling cards</li>
                        <li className="bg-white/5 p-3 rounded-lg">• Use as a merchant processor</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-xs text-red-200 font-bold">
                    Violation results in immediate revocation, payout withholding, and account termination.
                  </div>
                </section>

                {/* Compliance */}
                <section className="pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <ShieldAlert className="h-6 w-6 text-indigo-400" />
                    5. MONITORING & ENFORCEMENT
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    We reserve the right to monitor usage, freeze payouts during investigations, and report activity to regulators or card issuers where required by law.
                  </p>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="font-bold mb-2">No Liability</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We are not liable for declined transactions, merchant disputes, or network outages. Losses caused by misuse or unauthorised access remain your sole responsibility.
                    </p>
                  </div>
                </section>

                {/* Final Button */}
                <div className="text-center pt-16 border-t border-white/10">
                  <p className="text-muted-foreground mb-8">
                    By using the Crypto Card, you acknowledge reading and agreeing to these additional terms and the Acceptable Use Policy.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 text-white group" asChild>
                      <a href="/Crypto Card AUP FOC.pages" download>
                        Download Policy (PAGES)
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto font-black border-indigo-500/20 hover:bg-indigo-500/10" asChild>
                       <Link to="/contact">Contact Payout Team</Link>
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
