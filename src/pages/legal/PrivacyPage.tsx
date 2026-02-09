import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { ArrowLeft, Lock, ShieldCheck, Eye, Database, Globe, UserCheck, FileText, Calendar } from "lucide-react";

export default function PrivacyPage() {
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
                <Lock className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-gradient">
                Privacy Policy
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
                Fans on Chain (FOC) Privacy Commitment. We value your privacy and are committed to protecting your personal data.
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
                    Fans On Chain Ltd (“FansOnChain”, “FOC”, “we”, “us”, “our”) respects your privacy and is committed to protecting the Personal Data that we process. This Policy explains how we collect, use, store, disclose, and otherwise process Personal Data relating to our platform users.
                  </p>
                  <div className="mt-6 flex items-center gap-4 p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <Database className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-sm text-primary-foreground font-medium">
                      Fans On Chain Ltd acts as a data controller in respect of the Personal Data processed in connection with the Services.
                    </p>
                  </div>
                </section>

                {/* What is Personal Data */}
                <section>
                  <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4 uppercase tracking-tight">2. WHAT IS PERSONAL DATA</h2>
                  <p className="text-muted-foreground mb-6">
                    “Personal Data” means any information that identifies, relates to, describes, or concerns an identifiable individual, directly or indirectly.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Eye, title: "Identifiers", text: "Names, usernames, email addresses, IP addresses." },
                      { icon: UserCheck, title: "Verification", text: "Biometric or verification data, account info." },
                      { icon: Globe, title: "Technical", text: "Device identifiers, wallet addresses." },
                      { icon: Lock, title: "Sensitive", text: "Transaction references, payment details." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <item.icon className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="font-bold text-sm text-white">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Applicability */}
                <section className="border-t border-white/10 pt-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-red-500" />
                    4. APPLICABILITY (18+ ONLY)
                  </h2>
                  <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                    <p className="text-red-200 font-bold mb-2">Strict Age Restriction</p>
                    <p className="text-sm text-red-100/70 leading-relaxed">
                      Our Services are strictly limited to individuals who are at least eighteen (18) years of age. Anyone under 18 is expressly prohibited from accessing the Platform. We do not knowingly collect data from minors.
                    </p>
                  </div>
                </section>

                {/* Data Categories */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold border-l-4 border-primary pl-4 uppercase tracking-tight">8. CATEGORIES OF PERSONAL DATA</h2>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h3 className="text-lg font-bold text-primary mb-4">User Data</h3>
                      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground list-none pl-0">
                        <li>• Full Legal Name</li>
                        <li>• Residential Address</li>
                        <li>• Email & Telephone</li>
                        <li>• Government ID copies</li>
                        <li>• Verification Selfies</li>
                        <li>• Social Media Handles</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <h3 className="text-lg font-bold text-primary mb-4">Financial & Transaction Data</h3>
                      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground list-none pl-0">
                        <li>• Payout Information</li>
                        <li>• Wallet Balances</li>
                        <li>• Earnings Records</li>
                        <li>• Tax Identifiers (W-9, etc.)</li>
                        <li>• Transaction History</li>
                        <li>• Tokenised Card Refs</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Onboarding */}
                <section className="pt-12 border-t border-white/10">
                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <UserCheck className="h-6 w-6 text-primary" />
                    9. ONBOARDING & VERIFICATION
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Failure to complete, maintain, or pass required verification may result in restricted access, suspension of features, or account termination.
                  </p>
                  <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                    <h4 className="font-bold mb-3">Third-Party Verification</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We use regulated third-party service providers (like SumSub or equivalent) to conduct age and identity verification. They may use biometric comparison technology. We do not store or access raw biometric data.
                    </p>
                  </div>
                </section>

                {/* How we use data */}
                <section>
                   <h2 className="text-2xl font-bold border-l-4 border-primary pl-4 uppercase tracking-tight">10. USAGE & LAWFUL BASIS</h2>
                   <div className="grid gap-4 mt-6">
                      {[
                        { title: "Consent", desc: "For biometric processing and specific tracking." },
                        { title: "Contract", desc: "To manage your account and process payments." },
                        { title: "Legitimate Interests", desc: "Safety, security, and platform improvement." },
                        { title: "Legal Obligations", desc: "Tax, AML/KYC, and regulatory reporting." }
                      ].map((basis, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-xl">
                          <span className="font-bold text-primary">{basis.title}</span>
                          <span className="text-sm text-muted-foreground">{basis.desc}</span>
                        </div>
                      ))}
                   </div>
                </section>

                {/* Rights */}
                <section className="pt-12 border-t border-white/10 space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    14. YOUR RIGHTS
                  </h2>
                  <p className="text-muted-foreground">Subject to applicable law, you have the following rights:</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Right to Access Data",
                      "Right to Rectification",
                      "Right to Erasure",
                      "Right to Object",
                      "Right to Data Portability",
                      "Right to Withdraw Consent"
                    ].map((right, i) => (
                      <div key={i} className="flex gap-3 items-center bg-white/5 p-3 rounded-lg border border-white/5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium">{right}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Contact */}
                <div className="text-center pt-16 border-t border-white/10">
                  <p className="text-muted-foreground mb-8">
                    For a full understanding of all sections including International Transfers, Retention, and US State Privacy Disclosures, please download the official document.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full px-8 py-6 h-auto font-black shadow-glow group" asChild>
                      <a href="/Privacy Policy FOC.pages" download>
                        Download Full Policy (PAGES)
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto font-black" asChild>
                       <Link to="/contact">Contact Privacy Team</Link>
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
