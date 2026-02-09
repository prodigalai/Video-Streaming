import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, Book, Landmark, Calculator, AlertTriangle, FileText, Calendar, ExternalLink, Coins } from "lucide-react";

export default function UKVatPolicyPage() {
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
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-primary/30 rounded-2xl flex items-center justify-center mb-6 shadow-glow-sm">
                <Landmark className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-gradient">
                UK VAT Policy
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
                Important Value Added Tax information for Creators established in the United Kingdom.
              </CardDescription>
            </CardHeader>

            <CardContent className="prose prose-invert max-w-none px-6 sm:px-12 pb-20">
              <div className="space-y-12">
                {/* Introduction */}
                <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Book className="h-6 w-6 text-primary" />
                    1. INTRODUCTION
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This Policy explains how UK Value Added Tax (“VAT”) may apply to transactions on the FansOnChain Platform for UK-established Creators only. 
                  </p>
                  <div className="mt-6 flex items-start gap-4 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-200/80">
                      <strong>No Tax Advice:</strong> Nothing in this Policy constitutes tax, legal, or accounting advice. You are solely responsible for obtaining independent professional advice regarding your VAT obligations.
                    </p>
                  </div>
                </section>

                {/* Platform Position */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4 uppercase tracking-tight">2. PLATFORM VAT POSITION</h2>
                  <div className="grid gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                       <p className="text-sm text-muted-foreground">• FansOnChain operates as an online intermediation platform.</p>
                       <p className="text-sm text-muted-foreground">• FansOnChain is not the supplier of Creator Content to Fans.</p>
                       <p className="text-sm text-muted-foreground">• Creators remain responsible for the supply of their Content and services.</p>
                    </div>
                  </div>
                </section>

                {/* Applicability */}
                <section className="border-t border-white/10 pt-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Calculator className="h-6 w-6 text-primary" />
                    3. UK-ESTABLISHED CREATORS
                  </h2>
                  <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20">
                    <p className="text-muted-foreground leading-relaxed">
                      This Policy applies only if you are a Creator <strong>established in the United Kingdom</strong> and are registered for UK VAT, or required to be registered.
                    </p>
                  </div>
                </section>

                {/* VAT Treatment */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold border-l-4 border-primary pl-4 uppercase tracking-tight">4. VAT TREATMENT OF EARNINGS</h2>
                  <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h3 className="text-lg font-bold text-white mb-4">4.1 Deemed supply to FansOnChain</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        For UK VAT purposes only, Creators are treated as supplying their services to FansOnChain, not directly to Fans. The value of that supply is the Creator Earnings (currently 85% of Fan Payments).
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h3 className="text-lg font-bold text-white mb-4">4.2 VAT on Creator Earnings</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        If you are registered for UK VAT, you are treated as charging FansOnChain your Creator Earnings plus UK VAT at the prevailing rate.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Conditions */}
                <section className="pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-primary">
                    <Landmark className="h-6 w-6" />
                    5. CONDITIONS FOR VAT PAYMENT
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    FansOnChain will only release any VAT Amount where you have met these conditions:
                  </p>
                  <div className="grid gap-3">
                    {[
                      { l: "a", t: "Provided a valid UK VAT registration number." },
                      { l: "b", t: "Submitted a valid VAT invoice addressed to FansOnChain." },
                      { l: "c", t: "Confirmed submission of a corresponding VAT return to HMRC." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-primary font-black uppercase">{item.l}</span>
                        <span className="text-sm text-muted-foreground">{item.t}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Crypto Assets */}
                <section className="space-y-6">
                   <h2 className="text-2xl font-bold border-l-4 border-primary pl-4 uppercase tracking-tight">9. CRYPTO ASSETS & VAT</h2>
                   <div className="p-6 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-2xl border border-indigo-500/20">
                    <div className="flex items-center gap-4 mb-4">
                      <Coins className="h-6 w-6 text-indigo-400" />
                      <h3 className="text-lg font-bold text-white">Digital Settlement</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      VAT is calculated by reference to the <strong>GBP value</strong> of the transaction at the time of supply. Volatility of Crypto Assets does not alter your VAT liability.
                    </p>
                   </div>
                </section>

                {/* HMRC Links */}
                <section className="pt-12 border-t border-white/10">
                  <h2 className="text-2xl font-bold mb-6">HMRC GUIDANCE</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <a href="https://www.gov.uk/vat-registration/when-to-register" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-primary/20 transition-all group">
                       <span className="text-sm font-semibold">When to register</span>
                       <ExternalLink className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="https://www.gov.uk/guidance/vat-digital-services-and-online-marketplaces" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-primary/20 transition-all group">
                       <span className="text-sm font-semibold">Digital Services Guidance</span>
                       <ExternalLink className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </section>

                {/* Final Button */}
                <div className="text-center pt-16 border-t border-white/10">
                  <p className="text-muted-foreground mb-8">
                    By using the Platform, you agree to this UK VAT Policy. For full record-keeping, audit, and non-compliance terms, please download the official document.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow group" asChild>
                      <a href="/FOC UK VAT Policy.pages" download>
                        Download Full Policy (PAGES)
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto font-black" asChild>
                       <Link to="/contact">Contact Compliance Team</Link>
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
