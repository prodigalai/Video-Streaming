import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, ScrollText, Calendar, ShieldCheck, Scale, Globe } from "lucide-react";

export default function TermsPage() {
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
              <div className="mx-auto h-20 w-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-glow-sm">
                <Scale className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-gradient">
                Terms of Use
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
                Fans on Chain (FOC) Platform Agreement. Please read these terms carefully as they govern your use of our services.
              </CardDescription>
            </CardHeader>

            <CardContent className="prose prose-invert max-w-none px-6 sm:px-12 pb-20">
              <div className="space-y-12">
                {/* Introduction */}
                <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    1. INTRODUCTION
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms of Use (“Terms”) govern your access to and use of the FansOnChain platform (the “Platform”) and form a legally binding agreement between you and Fans On Chain Limited (“FansOnChain”, “FOC”, “we”, “us”, “our”).
                  </p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    {[
                      "We may update these Terms at any time as permitted by law.",
                      "Subscriptions may automatically renew unless you cancel.",
                      "Legal rights may vary depending on your location.",
                      "Disputes require mediation attempt before legal action."
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 font-bold text-primary">
                    If you do not agree to these Terms, do not use the Platform.
                  </p>
                </section>

                {/* Definitions */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">2. DEFINITIONS & INTERPRETATION</h2>
                  <div className="grid gap-4">
                    {[
                      { term: "Platform", desc: "FansOnChain, including any website, app, or related services operated by us." },
                      { term: "User", desc: "Any person who accesses or uses the Platform." },
                      { term: "Fan", desc: "A User who purchases access to Creator Content." },
                      { term: "Creator", desc: "A User who uploads Content and monetises it on the Platform." },
                      { term: "Business User", desc: "Creators, Agents, and those using the Platform for commercial purposes." },
                      { term: "Policies", desc: "Acceptable Use, Community Guidelines, Privacy, and other referenced policies." },
                      { term: "Platform Fee", desc: "The fee retained by FansOnChain for providing the Platform: 15%." },
                      { term: "Conversion Fee", desc: "Fee for crypto conversion or settlement: 3%." }
                    ].map((item, i) => (
                      <div key={i} className="group bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-xl border border-white/5">
                        <span className="font-bold text-primary mr-2">{item.term}:</span>
                        <span className="text-muted-foreground">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Who We Are */}
                <section className="border-t border-white/10 pt-12">
                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Globe className="h-6 w-6 text-primary" />
                    3. WHO WE ARE & CONTACT
                  </h2>
                  <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-2xl border border-primary/20">
                    <div className="space-y-3">
                      <p className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-muted-foreground">Legal Name</span>
                        <span className="font-semibold">Fans on Chain Limited</span>
                      </p>
                      <p className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-muted-foreground">Company Number</span>
                        <span className="font-semibold">16838958</span>
                      </p>
                      <p className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-muted-foreground">Registered Office</span>
                        <span className="font-semibold text-right max-w-[200px] sm:max-w-none">1 Allied Business Centre, Coldharbour Lane, Harpenden, England, AL5 4UT</span>
                      </p>
                      <p className="flex justify-between pt-2">
                        <span className="text-muted-foreground">Support Email</span>
                        <span className="font-semibold text-primary">support@fansonchain.com</span>
                      </p>
                    </div>
                  </div>
                </section>

                {/* Account Registration */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">6. ACCOUNT REGISTRATION & ELIGIBILITY</h2>
                  <p className="text-muted-foreground">To use the Platform, you must meet the following requirements:</p>
                  <ul className="list-none space-y-3 pl-0">
                    {[
                      "Be at least 18 years old",
                      "Have legal capacity to enter a binding contract",
                      "Be legally permitted to access the Platform in your location",
                      "Not be convicted of committing a serious crime",
                      "Agree to pay for Creator Interactions as per Platform terms"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                           <span className="text-primary font-bold">{i+1}</span>
                        </div>
                        <span className="font-medium text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Content Rules */}
                <section className="space-y-6 pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold flex items-center gap-3">
                    <ScrollText className="h-6 w-6 text-primary" />
                    8. CONTENT GENERAL RULES
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>By uploading Content, you acknowledge that once made available to Fans, we cannot guarantee it will not be copied or redistributed outside the Platform.</p>
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-200/80 text-sm">
                      <strong>Creator Responsibility:</strong> You are legally responsible for all Content uploaded via your account. Our contractual relationship is solely with you.
                    </div>
                  </div>
                </section>

                {/* Fan Subscriptions */}
                <section className="space-y-6">
                   <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">9. FAN SUBSCRIPTIONS AND PURCHASES</h2>
                   <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                    <h3 className="text-lg font-bold mb-4">9.1 Contract between Fan and Creator</h3>
                    <p className="text-muted-foreground">
                      Creator Interactions are governed by a contract between the Fan and the relevant Creator. FansOnChain facilitates the infrastructure but is <strong>not a party to this contract</strong>.
                    </p>
                   </div>
                   <div className="grid sm:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-3">
                        <h4 className="font-bold">9.8 Auto-Renewal</h4>
                        <p className="text-sm text-muted-foreground">Subscriptions automatically renew at the current price plus taxes unless cancelled before renewal date.</p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-bold">9.10 Refunds</h4>
                        <p className="text-sm text-muted-foreground">Blockchain transactions are irreversible. Unjustified refund requests or bad-faith disputes may result in account termination.</p>
                      </div>
                   </div>
                </section>

                {/* Payouts */}
                <section className="space-y-8 pt-12 border-t border-white/10">
                  <h2 className="text-2xl font-bold">10. CREATOR PAYOUT & EARNINGS</h2>
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl border border-primary/20">
                      <div>
                        <p className="text-sm text-muted-foreground uppercase font-black">Platform Fee</p>
                        <p className="text-3xl font-black text-white">15%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground uppercase font-black">Conversion Fee</p>
                        <p className="text-3xl font-black text-white">3%</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      Deductions apply to each Fan Payment before Creator Earnings are calculated.
                    </p>
                  </div>
                </section>

                {/* Full Terms Mention */}
                <div className="text-center pt-16 border-t border-white/10">
                  <p className="text-muted-foreground mb-8">
                    This is a summarized presentation of the Fans on Chain Terms of Use. For the complete legal text including all sections (Tax Compliance, Moderation, Intellectual Property, etc.), please download the official document.
                  </p>
                  <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow group" asChild>
                    <a href="/FOC Terms of Service .pages" download>
                      Download Full Terms (PDF/PAGES)
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <div className="text-center pb-20">
            <p className="text-muted-foreground mb-4">Questions about our terms?</p>
            <Button variant="outline" asChild className="rounded-full px-6">
              <Link to="/contact">Contact Legal Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
