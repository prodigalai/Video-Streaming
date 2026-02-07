import { useState } from "react";
import { 
  ShieldCheck, 
  Upload, 
  User, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type KYCStep = 'start' | 'identity' | 'document' | 'selfie' | 'pending';

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState<KYCStep>('start');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleNext = (next: KYCStep) => {
    setCurrentStep(next);
    window.scrollTo(0, 0);
  };

  const simulateUpload = (next: KYCStep) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          handleNext(next);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
             <ShieldCheck className="h-8 w-8 text-primary shadow-glow-sm" />
             Creator Verification (KYC)
          </h1>
          <p className="text-muted-foreground mt-2">Verify your identity to unlock payouts and premium features.</p>
        </div>
        {currentStep !== 'start' && currentStep !== 'pending' && (
           <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Progress</span>
              <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: currentStep === 'identity' ? '33%' : currentStep === 'document' ? '66%' : '100%' }} 
                 />
              </div>
           </div>
        )}
      </div>

      {currentStep === 'start' && (
        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
           <Card className="bg-[#0f0f13] border-border/50 p-8 flex flex-col items-center text-center space-y-6">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                 <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                 <h3 className="text-xl font-bold mb-2">Individual Creator</h3>
                 <p className="text-sm text-muted-foreground">For single creators, influencers, and artists.</p>
              </div>
              <ul className="text-left w-full space-y-3 text-sm">
                 <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Government ID Required
                 </li>
                 <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Facial Verification
                 </li>
                 <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Tax Info (W-9 / W-8BEN)
                 </li>
              </ul>
              <Button className="w-full glow-primary h-12 font-bold" onClick={() => handleNext('identity')}>
                 Start Identity Verification
                 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
           </Card>

           <Card className="bg-[#0f0f13]/50 border-white/5 p-8 flex flex-col items-center text-center space-y-6 opacity-80">
              <div className="h-20 w-20 rounded-2xl bg-muted/10 flex items-center justify-center">
                 <FileText className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                 <h3 className="text-xl font-bold mb-2">Business/Studio</h3>
                 <p className="text-sm text-muted-foreground">For agencies, media houses, and companies.</p>
              </div>
              <ul className="text-left w-full space-y-3 text-sm">
                 <li className="flex items-center gap-3 text-muted-foreground italic">
                    <Clock className="h-4 w-4" /> Coming Soon
                 </li>
              </ul>
              <Button variant="outline" className="w-full h-12 border-dashed" disabled>
                 Apply as Business
              </Button>
           </Card>
        </div>
      )}

      {currentStep === 'identity' && (
         <Card className="bg-[#0f0f13] border-border/50 animate-fade-in">
            <CardHeader>
               <CardTitle>Personal Information</CardTitle>
               <CardDescription>Legal name as it appears on your government-issued ID.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <Label>First Name</Label>
                     <Input placeholder="John" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                     <Label>Last Name</Label>
                     <Input placeholder="Doe" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                     <Label>Date of Birth</Label>
                     <Input type="date" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                     <Label>Country of Residence</Label>
                     <Input placeholder="United States" className="bg-white/5 border-white/10" />
                  </div>
               </div>
               <div className="space-y-2">
                  <Label>Address Line 1</Label>
                  <Input placeholder="123 Creator Way" className="bg-white/5 border-white/10" />
               </div>
               <Button className="w-full h-12 font-bold glow-primary" onClick={() => handleNext('document')}>
                  Continue to Document Upload
               </Button>
            </CardContent>
         </Card>
      )}

      {currentStep === 'document' && (
         <Card className="bg-[#0f0f13] border-border/50 animate-fade-in overflow-hidden">
            <CardHeader>
               <CardTitle>Government Issued ID</CardTitle>
               <CardDescription>Upload a clear photo of your Passport, Driver's License, or National ID.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
               <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer group bg-white/[0.02]">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                     <p className="font-bold text-lg">Click to upload or drag & drop</p>
                     <p className="text-sm text-muted-foreground mt-1">PNG, JPG or PDF (MAX. 5MB)</p>
                  </div>
                  <Input type="file" className="hidden" />
               </div>

               {uploadProgress > 0 && (
                  <div className="space-y-2">
                     <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <span>Uploading ID Front...</span>
                        <span>{uploadProgress}%</span>
                     </div>
                     <Progress value={uploadProgress} className="h-2" />
                  </div>
               )}

               <div className="flex gap-4">
                  <Button variant="ghost" className="flex-1" onClick={() => handleNext('identity')}>Back</Button>
                  <Button className="flex-[2] h-12 font-bold glow-primary" onClick={() => simulateUpload('selfie')}>
                     Verify Document
                  </Button>
               </div>
            </CardContent>
         </Card>
      )}

      {currentStep === 'selfie' && (
         <Card className="bg-[#0f0f13] border-border/50 animate-fade-in">
            <CardHeader className="text-center">
               <CardTitle className="text-2xl">Facial Verification</CardTitle>
               <CardDescription>Position your face in the center and ensure your environment is well lit.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-8">
               <div className="h-64 w-64 rounded-full border-4 border-primary/20 bg-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
                  <Camera className="h-12 w-12 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                  {/* Scan Line Effect */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary/50 blur-[2px] animate-[scan_2s_linear_infinite]" />
               </div>

               <div className="space-y-4 w-full">
                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3">
                     <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0" />
                     <p className="text-xs text-yellow-500/90 leading-relaxed font-medium">
                        Ensure you are not wearing a hat, glasses, or anything that obscures your face.
                     </p>
                  </div>
                  <Button className="w-full h-12 font-bold glow-primary" onClick={() => simulateUpload('pending')}>
                     Confirm Facial Scan
                  </Button>
               </div>
            </CardContent>
         </Card>
      )}

      {currentStep === 'pending' && (
         <Card className="bg-[#0f0f13] border-border/50 animate-fade-in p-12 text-center">
            <div className="relative inline-block mb-8">
               <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Clock className="h-12 w-12 text-primary" />
               </div>
               <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center">
                  <span className="text-xs font-black animate-spin">/</span>
               </div>
            </div>
            <h2 className="text-3xl font-black mb-4 uppercase italic tracking-tighter">Verification <span className="text-gradient">In Progress</span></h2>
            <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
               We are currently processing your identity verification and reviewing your documents. This usually takes between <strong>2 and 24 hours</strong>.
            </p>
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-4">
               <Button variant="outline" className="h-11 border-white/10" onClick={() => toast.info("Status manually refreshed")}>Refresh Status</Button>
               <Button variant="ghost" onClick={() => handleNext('start')}>Back to Dashboard</Button>
            </div>
         </Card>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}} />
    </div>
  );
}
