import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Shield, Scale, Book, Lock, CreditCard, RotateCcw, Hand, ShieldAlert, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

const legalDocuments = [
  {
    id: "terms",
    title: "Terms of Service",
    description: "The official terms and conditions governing the use of Fans on Chain.",
    icon: Scale,
    lastUpdated: "February 2026"
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "Our commitment to protecting your personal data and privacy.",
    icon: Lock,
    lastUpdated: "February 2026"
  },
  {
    id: "aup",
    title: "Acceptable Use Policy",
    description: "The mandatory standards for content safety and user conduct.",
    icon: ShieldAlert,
    lastUpdated: "February 2026"
  },
  {
    id: "creator-agreement",
    title: "Contract between Fan & Creator",
    description: "Standard terms for transactions between creators and their fans.",
    icon: FileText,
    lastUpdated: "February 2026"
  },
  {
    id: "dmca",
    title: "DMCA Takedown Policy",
    description: "Procedures for reporting copyright infringement on our platform.",
    icon: Shield,
    lastUpdated: "February 2026"
  },
  {
    id: "compliance",
    title: "Compliance & Record-Keeping",
    description: "18 U.S.C. §2257 Compliance & Record-Keeping Disclosure.",
    icon: FileText,
    lastUpdated: "February 2026"
  },
  {
    id: "p2b",
    title: "Platform to Business Terms",
    description: "Regulation (EU) 2019/1150 – Promoting fairness and transparency for business users.",
    icon: Scale,
    lastUpdated: "February 2026"
  },
  {
    id: "uk-vat",
    title: "UK VAT Policy",
    description: "Important Value Added Tax information for UK-based users.",
    icon: Book,
    lastUpdated: "February 2026"
  },
  {
    id: "crypto-terms",
    title: "Crypto Card & AUP",
    description: "Acceptable Use Policy and terms for crypto-linked payment cards.",
    icon: CreditCard,
    lastUpdated: "February 2026"
  },
  {
    id: "anti-slavery",
    title: "Anti-Slavery Statement",
    description: "Our commitment and actions to prevent modern slavery and human trafficking.",
    icon: Hand,
    lastUpdated: "February 2026"
  },
  {
    id: "complaints",
    title: "Complaints Policy",
    description: "How to lodge a complaint and our formal resolution process.",
    icon: Book,
    lastUpdated: "February 2026"
  },
  {
    id: "appeals",
    title: "Appeals Policy",
    description: "Formal procedure for seeking review of account restrictions or content decisions.",
    icon: RotateCcw,
    lastUpdated: "February 2026"
  },
  {
    id: "record-keeping",
    title: "2257 Record-Keeping",
    description: "Statement regarding record-keeping compliance for visual depictions.",
    icon: ClipboardList,
    lastUpdated: "February 2026"
  }
];

export default function LegalPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background py-8 sm:py-12 md:py-20 px-4 sm:px-6">
        <div className="container max-w-4xl">
          
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Legal Center
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparency is key. Here you can find all the legal documents and policies that govern the use of our platform.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            {legalDocuments.map((doc) => {
              const Icon = doc.icon;
              return (
                <Card key={doc.id} className="group hover:border-primary/50 transition-all hover:shadow-glow hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 gap-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium shrink-0">
                      Updated: {doc.lastUpdated}
                    </span>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="space-y-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl">{doc.title}</CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        {doc.description}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" asChild className="w-full justify-between hover:bg-primary hover:text-primary-foreground group-hover:pl-4 transition-all min-h-[44px] touch-manipulation">
                      <Link to={`/legal/${doc.id}`} className="flex items-center justify-between w-full">
                        View Details
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center space-y-4">
            <h3 className="text-base sm:text-lg font-bold">Have questions about our policies?</h3>
            <p className="text-sm text-muted-foreground">
              Our support team is here to help clarify any aspect of our terms and policies.
            </p>
            <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/10 min-h-[44px] touch-manipulation">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
