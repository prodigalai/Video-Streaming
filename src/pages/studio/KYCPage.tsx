import { ShieldCheck, Check, Upload, FileText, AlertCircle, ScanLine, UserCheck, Shield, ChevronRight, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { id: 1, title: "Identity", status: "completed" },
  { id: 2, title: "Documents", status: "current" },
  { id: 3, title: "Review", status: "pending" },
];

export default function KYCPage() {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in relative pb-20">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-cyan-600 flex items-center justify-center shadow-lg">
                <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-white" />
             </div>
             <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Identity Verification
             </h1>
          </div>
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Complete KYC to unlock full platform features</p>
        </div>
        
        <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-lg w-fit">
           <AlertCircle className="h-4 w-4 text-yellow-500" />
           <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Verification Pending</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
           {/* Steps Progress */}
           <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted/50 -z-10" />
              <div className="flex justify-between max-w-lg mx-auto md:mx-0">
                 {steps.map((step, i) => (
                    <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2 relative z-10 first:pl-0 last:pr-0">
                       <div className={cn(
                          "h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center border-2 transition-all font-bold text-xs md:text-sm shadow-sm",
                          step.status === 'completed' ? "bg-cyan-600 border-cyan-600 text-white" :
                          step.status === 'current' ? "bg-background border-cyan-600 text-cyan-600 ring-4 ring-cyan-500/10" : "bg-muted border-muted-foreground/20 text-muted-foreground"
                       )}>
                          {step.status === 'completed' ? <Check className="h-4 w-4 md:h-5 md:w-5" /> : step.id}
                       </div>
                       <span className={cn(
                          "text-[10px] md:text-xs font-bold uppercase tracking-wider",
                          step.status === 'current' ? "text-cyan-600" : "text-muted-foreground"
                       )}>{step.title}</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Step Content */}
           <div className="bg-card p-6 md:p-8 rounded-xl md:rounded-2xl border border-border/50 shadow-sm space-y-6 md:space-y-8">
              <div className="space-y-2">
                 <h2 className="text-xl md:text-2xl font-bold text-foreground">Upload Documents</h2>
                 <p className="text-sm text-muted-foreground font-medium max-w-md">Please provide a valid government-issued ID to verify your identity. We accept Passport, Driver's License, or National ID.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                 {/* Upload Box 1 */}
                 <div className="border-2 border-dashed border-border/50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center space-y-4 hover:bg-muted/30 hover:border-cyan-500/50 transition-all cursor-pointer group">
                    <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto group-hover:bg-cyan-500/10 transition-colors">
                       <ScanLine className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground group-hover:text-cyan-500" />
                    </div>
                    <div className="space-y-1">
                       <p className="font-bold text-foreground text-sm md:text-base">Front of ID</p>
                       <p className="text-xs text-muted-foreground font-medium">Drag & drop or click to upload</p>
                    </div>
                 </div>

                 {/* Upload Box 2 */}
                 <div className="border-2 border-dashed border-border/50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center space-y-4 hover:bg-muted/30 hover:border-cyan-500/50 transition-all cursor-pointer group">
                    <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto group-hover:bg-cyan-500/10 transition-colors">
                       <ScanLine className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground group-hover:text-cyan-500" />
                    </div>
                    <div className="space-y-1">
                       <p className="font-bold text-foreground text-sm md:text-base">Back of ID</p>
                       <p className="text-xs text-muted-foreground font-medium">Drag & drop or click to upload</p>
                    </div>
                 </div>
              </div>

              {/* Data Safety Notice */}
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl border border-border/50">
                 <Shield className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                 <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">Your data is secure</p>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                       We use bank-grade encryption to store your documents. Your information is only used for verification purposes and is never shared with third parties.
                    </p>
                 </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-border/50">
                 <Button variant="ghost" className="w-full sm:w-auto font-bold text-muted-foreground hover:text-foreground">Back</Button>
                 <Button className="w-full sm:w-auto ml-auto bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow-lg shadow-cyan-500/20" onClick={() => toast.success("Documents submitted")}>
                    Submit Documents <ChevronRight className="h-4 w-4 ml-2" />
                 </Button>
              </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8">
           {/* Requirements */}
           <div className="bg-card p-6 md:p-8 rounded-xl border border-border/50 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                 <FileText className="h-4 w-4" /> Requirements
              </h3>
              <ul className="space-y-3">
                 {[
                    { text: "Valid Government ID", check: true },
                    { text: "Proof of Address", check: true },
                    { text: "Selfie Verification", check: false },
                    { text: "Address Verification", check: false },
                 ].map((req, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                       <div className={cn(
                          "h-5 w-5 rounded-full flex items-center justify-center shrink-0 border",
                          req.check ? "bg-green-500 border-green-500 text-white" : "border-border/50 bg-muted/30"
                       )}>
                          {req.check && <Check className="h-3 w-3" />}
                       </div>
                       <span className={cn(req.check ? "text-foreground font-bold" : "text-muted-foreground")}>{req.text}</span>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Help */}
           <div className="bg-card p-6 md:p-8 rounded-xl border border-border/50 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Need Help?</h3>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-2">
                 If you're having trouble uploading your documents or have questions about the process, our support team is here to help.
              </p>
              <Button variant="outline" className="w-full font-bold">Contact Support</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
