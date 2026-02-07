import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Shield, Scale, Book, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const legalDocuments = [
  {
    id: "terms",
    title: "Terms of Service",
    description: "The rules and regulations for using our platform.",
    icon: Scale,
    lastUpdated: "February 2026"
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal data.",
    icon: Lock,
    lastUpdated: "February 2026"
  },
  {
    id: "aup",
    title: "Acceptable Use Policy",
    description: "Guidelines on what content is allowed and prohibited.",
    icon: Shield,
    lastUpdated: "January 2026"
  },
  {
    id: "creator-agreement",
    title: "Creator Agreement",
    description: "Terms specifically for content creators on our platform.",
    icon: FileText,
    lastUpdated: "February 2026"
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    description: "Information about how we use cookies and tracking technologies.",
    icon: Book,
    lastUpdated: "December 2025"
  },
  {
    id: "agent-agreement",
    title: "Agent Agreement",
    description: "Terms for managed accounts and agency relationships.",
    icon: FileText,
    lastUpdated: "January 2026"
  }
];

export default function LegalPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background py-12 md:py-20">
        <div className="container max-w-4xl px-4 md:px-6">
          
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Legal Center
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparency is key. Here you can find all the legal documents and policies that govern the use of our platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {legalDocuments.map((doc) => {
              const Icon = doc.icon;
              return (
                <Card key={doc.id} className="group hover:border-primary/50 transition-all hover:shadow-glow hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      Updated: {doc.lastUpdated}
                    </span>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{doc.title}</CardTitle>
                      <CardDescription className="text-base">
                        {doc.description}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" className="w-full justify-between hover:bg-primary hover:text-primary-foreground group-hover:pl-4 transition-all">
                      Read Document
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center space-y-4">
            <h3 className="text-lg font-bold">Have questions about our policies?</h3>
            <p className="text-muted-foreground">
              Our support team is here to help clarify any aspect of our terms and policies.
            </p>
            <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/10">
              <Link to="/help">Contact Support</Link>
            </Button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
