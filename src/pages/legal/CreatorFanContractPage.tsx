import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, Users, FileText, Scale, ShieldCheck, Heart, Zap, Calendar, AlertCircle, Coins } from "lucide-react";

export default function CreatorFanContractPage() {
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
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-glow-sm">
                <Users className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-gradient uppercase">
                Contract between Fan & Creator
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
                Standard terms for individual transactions and interactions between Creators and their Fans.
              </CardDescription>
            </CardHeader>

            <CardContent className="prose prose-invert max-w-none px-6 sm:px-12 pb-20">
              <div className="space-y-12">
                {/* Visual Relationship Map */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-12">
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                      <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                      <p className="font-bold text-white">The Fan</p>
                      <p className="text-[10px] text-muted-foreground uppercase mt-1">Purchaser</p>
                   </div>
                   <div className="flex justify-center flex-col items-center">
                      <Zap className="h-6 w-6 text-primary animate-pulse" />
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent my-2" />
                      <p className="text-[10px] font-black text-primary uppercase tracking-tighter">Direct Contract</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                      <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                      <p className="font-bold text-white">The Creator</p>
                      <p className="text-[10px] text-muted-foreground uppercase mt-1">Content Owner</p>
                   </div>
                </div>

                {/* Introduction */}
                <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    1. INTRODUCTION
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This Agreement governs each Creator Interaction entered into on the FansOnChain platform. Each time a Fan initiates or completes a Creator Interaction (Subscription, PPV, Tip), this Agreement is formed automatically and is legally binding between the two parties.
                  </p>
                  <p className="mt-4 text-sm font-bold text-primary">
                    Fans On Chain Ltd is NOT a party to this agreement.
                  </p>
                </section>

                {/* Payments */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4 uppercase tracking-tight">5. PRICING & PAYMENTS</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">All payments must occur on the Platform. The Fan agrees to pay the interaction fee plus applicable taxes.</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                       <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <p className="font-bold text-white text-sm mb-1">Fan Payment</p>
                          <p className="text-xs text-muted-foreground">Original amount paid via FansOnChain secure settlement.</p>
                       </div>
                       <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <p className="font-bold text-white text-sm mb-1">Creator Earnings</p>
                          <p className="text-xs text-muted-foreground">Net portion after platform fees and commissions.</p>
                       </div>
                    </div>
                  </div>
                </section>

                {/* Licence */}
                <section className="space-y-6 pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    7. LICENCE TO CONTENT
                  </h2>
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h3 className="font-bold mb-3">Limited Personal Licence</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The Creator grants the Fan a <strong>personal, non-exclusive, non-transferable</strong> licence to access content for lawful, private use via the platform only. No ownership is transferred.
                    </p>
                  </div>
                  <div className="flex gap-4 p-4 bg-red-500/5 rounded-xl border border-red-500/10 items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-200/80">
                      <strong>Prohibited:</strong> You must not copy, record, distribute, or exploit content outside the platform.
                    </p>
                  </div>
                </section>

                {/* Subscriptions */}
                <section className="space-y-6">
                   <h2 className="text-2xl font-bold border-l-4 border-primary pl-4 uppercase tracking-tight">6. AUTOMATIC RENEWAL</h2>
                   <p className="text-muted-foreground text-sm">
                     Subscriptions automatically renew at the current price unless auto-renew is disabled by the Fan before the renewal date. No separate renewal notice is required.
                   </p>
                </section>

                {/* Refunds */}
                <section className="pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Coins className="h-6 w-6 text-primary" />
                    10. CANCELLATIONS & REFUNDS
                  </h2>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h4 className="font-bold mb-2">Digital Content Waiver</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      By entering a Creator Interaction, the Fan acknowledges that access to digital content begins immediately and waives any statutory right to cancel once access has been provided.
                    </p>
                  </div>
                </section>

                {/* Liability */}
                <section className="space-y-4 pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Scale className="h-6 w-6 text-primary" />
                    13. LIMITATION OF LIABILITY
                  </h2>
                  <p className="text-sm text-muted-foreground italic">
                    The Creator's liability is limited to the amount paid for the specific interaction giving rise to the claim. The Creator is not liable for indirect or consequential losses.
                  </p>
                </section>

                {/* Final Button */}
                <div className="text-center pt-16 border-t border-white/10">
                  <p className="text-muted-foreground mb-8 text-sm">
                    This Agreement is governed by the laws of England and Wales. For the full text including definition tables and severability clauses, download the official document.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow group" asChild>
                      <a href="/Contract between Fan & Creator FOC.pages" download>
                        Download Contract (PAGES)
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto font-black" asChild>
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
