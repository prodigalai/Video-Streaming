import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { FileText, Download, ArrowLeft } from "lucide-react";

// Mapping of route IDs to file names in public folder
const DOCUMENT_MAP: Record<string, { title: string; file: string; description: string }> = {
  "terms": {
    title: "Terms of Service",
    file: "/FOC Terms of Service .pages",
    description: "The general terms and conditions for using Fans on Chain."
  },
  "privacy": {
    title: "Privacy Policy",
    file: "/Privacy Policy FOC.pages",
    description: "How we handle your data and privacy."
  },
  "aup": {
    title: "Acceptable Use Policy",
    file: "/Acceptable Use Policy FOC.pages",
    description: "Rules for content and conduct on the platform."
  },
  "dmca": {
    title: "DMCA Takedown Policy",
    file: "/DMCA Takedown Policy FOC.pages",
    description: "Copyright infringement and takedown procedures."
  },
  "compliance": {
    title: "Compliance & Record-Keeping",
    file: "/18 U.S.C. §2257 Compliance & Record-Keeping Disclosure FOC.pages",
    description: "Legal compliance disclosures and record-keeping information."
  },
  "creator-agreement": {
    title: "Creator Agreement",
    file: "/Contract between Fan & Creator .pages",
    description: "Terms governing the relationship between creators and fans."
  },
  "agent-agreement": {
    title: "Platform to Business Terms",
    file: "/Platform to business regulation terms.pages",
    description: "Terms for business users and agents."
  },
  "cookies": {
    title: "Cookie Policy",
    file: "/Privacy Policy FOC.pages", // Fallback or if bundled
    description: "Information about cookies (See Privacy Policy)."
  },
  "uk-vat": {
    title: "UK VAT Policy",
    file: "/UK VAT Policy - FOC.pages",
    description: "Value Added Tax information for UK users."
  },
  "crypto-terms": {
    title: "Crypto Card Terms",
    file: "/Crypto Card Terms & Acceptable Use Policy FOC.pages",
    description: "Terms specific to crypto card usage."
  },
  "anti-slavery": {
    title: "Anti-Slavery Statement",
    file: "/Anti-Slavery & Anti-Trafficking Statement FOC.pages",
    description: "Our commitment to preventing modern slavery."
  },
  "complaints": {
    title: "Complaints Policy",
    file: "/Complaints Policy FOC.pages",
    description: "How to file a complaint and our resolution process."
  },
  "appeals": {
    title: "Appeals Policy",
    file: "/Appeals Policy FOC.pages",
    description: "Process for appealing content moderation decisions."
  }
};

export default function LegalDocumentPage() {
  const { docId } = useParams();
  const doc = docId ? DOCUMENT_MAP[docId] : null;

  if (!doc) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Document Not Found</h1>
            <p className="mb-8">The requested legal document could not be found.</p>
            <Button asChild>
                <Link to="/legal">Return to Legal Center</Link>
            </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
        <div className="container max-w-3xl">
          <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
            <Link to="/legal" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Legal Center
            </Link>
          </Button>

          <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-border/50 pb-8">
                <div className="mx-auto h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
                    {doc.title}
                </CardTitle>
                <CardDescription className="text-lg">
                    {doc.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 text-center space-y-8">
                <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
                    <p className="text-muted-foreground mb-4">
                        This document is available for download in its official format.
                    </p>
                    <Button size="lg" className="font-bold gap-2" asChild>
                        <a href={doc.file} download>
                            <Download className="h-4 w-4" />
                            Download Official Document
                        </a>
                    </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                    For any questions regarding this document, please contact <Link to="/contact" className="text-primary hover:underline">Legal Support</Link>.
                </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
