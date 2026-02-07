import { useState } from "react";
import { Upload, X, Image as ImageIcon, Video, DollarSign, Lock, Globe, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ContentUploadModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ContentUploadModal({ children, open, onOpenChange }: ContentUploadModalProps) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [contentType, setContentType] = useState<'free' | 'sub' | 'ppv'>('free');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      // Simulate upload start
      handleChangeStep(2);
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        toast.success("Content uploaded successfully!");
        setStep(1);
        setFile(null);
        setPreviewUrl(null);
        setUploadProgress(0);
        onOpenChange?.(false);
      }
    }, 500);
  };

  const handleChangeStep = (newStep: number) => {
    setStep(newStep);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#0f0f13] border-white/10 text-white p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-white/5 bg-white/5">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Content
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-white/5 transition-all text-center cursor-pointer relative">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleFileSelect}
                accept="image/*,video/*"
              />
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Drag & Drop or Click to Upload</h3>
                <p className="text-sm text-muted-foreground">Support for MP4, MOV, PNG, JPG (Max 500MB)</p>
              </div>
            </div>
          )}

          {step === 2 && file && (
            <div className="space-y-6 animate-fade-in">
              {/* Preview & Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Preview */}
                <div className="md:col-span-1 space-y-2">
                   <div className="aspect-video rounded-lg overflow-hidden bg-black border border-white/10 relative">
                      {file.type.startsWith('image/') ? (
                        <img src={previewUrl!} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <video src={previewUrl!} className="w-full h-full object-cover" controls />
                      )}
                      
                      {/* Floating Badge */}
                      <div className="absolute top-2 left-2">
                         <div className={cn(
                           "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider",
                           contentType === 'free' ? "bg-green-500 text-black" : 
                           contentType === 'sub' ? "bg-primary text-black" : "bg-yellow-500 text-black"
                         )}>
                            {contentType === 'free' ? "Free" : contentType === 'sub' ? "Sub Only" : "PPV"}
                         </div>
                      </div>
                   </div>
                   <p className="text-xs text-muted-foreground truncate">{file.name}</p>
                </div>

                {/* Form Fields */}
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Give your post a catchy title..." className="bg-white/5 border-white/10" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="desc">Description</Label>
                    <Textarea id="desc" placeholder="What's this content about?" className="resize-none h-24 bg-white/5 border-white/10" />
                  </div>
                </div>
              </div>

              {/* Monetization Settings */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-4">
                <h4 className="font-bold flex items-center gap-2">
                   <DollarSign className="h-4 w-4 text-green-500" />
                   Monetization Settings
                </h4>
                
                <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setContentType('free')}
                      className={cn(
                        "p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all",
                        contentType === 'free' ? "bg-green-500/10 border-green-500 text-green-500" : "bg-transparent border-white/10 hover:bg-white/5"
                      )}
                    >
                       <Globe className="h-5 w-5" />
                       <span className="text-xs font-bold">Free</span>
                    </button>
                    <button 
                      onClick={() => setContentType('sub')}
                      className={cn(
                        "p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all",
                        contentType === 'sub' ? "bg-primary/10 border-primary text-primary" : "bg-transparent border-white/10 hover:bg-white/5"
                      )}
                    >
                       <Lock className="h-5 w-5" />
                       <span className="text-xs font-bold">Subscribers</span>
                    </button>
                    <button 
                      onClick={() => setContentType('ppv')}
                      className={cn(
                        "p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all",
                        contentType === 'ppv' ? "bg-yellow-500/10 border-yellow-500 text-yellow-500" : "bg-transparent border-white/10 hover:bg-white/5"
                      )}
                    >
                       <DollarSign className="h-5 w-5" />
                       <span className="text-xs font-bold">Pay-Per-View</span>
                    </button>
                </div>

                {contentType === 'ppv' && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <Label className="text-yellow-500">Price (Credits)</Label>
                    <div className="relative mt-1">
                       <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input type="number" placeholder="50" className="pl-9 bg-black/20 border-yellow-500/30 focus:border-yellow-500" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Fans will need to pay this amount to unlock.</p>
                  </div>
                )}
              </div>

              {/* Progress Bar if uploading */}
              {isUploading && (
                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-medium">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                   </div>
                   <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                   </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/5 bg-white/5 flex justify-end gap-3">
          {step === 2 && !isUploading && (
             <Button variant="ghost" onClick={() => { setStep(1); setFile(null); }}>Cancel</Button>
          )}
          {step === 2 && (
             <Button onClick={handleUpload} disabled={isUploading} className="min-w-[100px]">
                {isUploading ? "Uploading..." : "Publish Content"}
             </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
