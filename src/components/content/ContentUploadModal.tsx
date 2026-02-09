import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Video, DollarSign, Lock, Globe, Eye, CheckCircle2, AlertCircle } from "lucide-react";
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ContentUploadModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ContentType = 'free' | 'sub' | 'ppv';

export function ContentUploadModal({ children, open, onOpenChange }: ContentUploadModalProps) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Metadata State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState<ContentType>('free');
  const [price, setPrice] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setStep(2); // Move to details step
    }
  };

  const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          const selectedFile = e.dataTransfer.files[0];
          setFile(selectedFile);
          setPreviewUrl(URL.createObjectURL(selectedFile));
          setStep(2);
      }
  };

  const validateForm = () => {
      if (!title.trim()) return false;
      if (contentType === 'ppv' && (!price || parseFloat(price) <= 0)) return false;
      return true;
  };

  const handleUpload = () => {
    if (!validateForm()) {
        toast.error("Please fill in all required fields.");
        return;
    }

    setIsUploading(true);
    
    // Simulate high-fidelity upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      setUploadProgress(Math.round(progress));

      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
            setIsUploading(false);
            toast.success("Content published successfully!");
            resetForm();
            onOpenChange(false);
        }, 500);
      }
    }, 400);
  };

  const resetForm = () => {
      setStep(1);
      setFile(null);
      setPreviewUrl(null);
      setTitle("");
      setDescription("");
      setContentType('free');
      setPrice("");
      setUploadProgress(0);
  };

  const handleOpenChangeInternal = (newOpen: boolean) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChangeInternal}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-[#0f0f13] border-white/10 text-white p-0 gap-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-6 border-b border-white/5 bg-white/5 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {step === 1 ? <Upload className="h-5 w-5 text-primary" /> : <CheckCircle2 className="h-5 w-5 text-primary" />}
            {step === 1 ? "Upload New Content" : "Post Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-0">
          {/* STEP 1: UPLOAD */}
          {step === 1 && (
            <div 
                className="p-12 border-2 border-dashed border-white/10 m-6 rounded-2xl flex flex-col items-center justify-center gap-6 hover:border-primary/50 hover:bg-white/5 transition-all text-center cursor-pointer bg-black/20"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                onChange={handleFileSelect}
                accept="image/*,video/*"
              />
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center ring-4 ring-primary/5">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Drag & drop or click to upload</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Upload high-quality photos or videos. We preserve original quality for your fans.
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full">
                      <ImageIcon className="h-3.5 w-3.5" /> Photos
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full">
                      <Video className="h-3.5 w-3.5" /> Videos
                  </div>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 2 && (file || isUploading) && (
            <div className="flex flex-col h-[600px] md:h-auto overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] h-full">
                    
                    {/* LEFT: Preview */}
                    <div className="bg-black/40 p-6 border-r border-white/5 flex flex-col gap-4">
                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Preview</Label>
                        <div className="aspect-[4/5] w-full bg-black rounded-xl overflow-hidden border border-white/10 relative shadow-lg group">
                            {file?.type.startsWith('video/') ? (
                                <video src={previewUrl!} className="w-full h-full object-cover" controls />
                            ) : (
                                <img src={previewUrl!} alt="Preview" className="w-full h-full object-cover" />
                            )}
                            
                            {/* Quality Badge */}
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                                Original Quality
                            </div>

                            {/* Type Overlay */}
                             <div className="absolute bottom-3 left-3">
                                 <div className={cn(
                                   "px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-lg",
                                   contentType === 'free' ? "bg-green-500 text-black" : 
                                   contentType === 'sub' ? "bg-primary text-black" : "bg-yellow-500 text-black"
                                 )}>
                                    {contentType === 'free' ? "Free For All" : contentType === 'sub' ? "Subscribers Only" : "Pay-Per-View"}
                                 </div>
                             </div>
                        </div>
                        <div className="text-xs text-muted-foreground break-all">
                            {file?.name} ({(file!.size / (1024 * 1024)).toFixed(2)} MB)
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className="p-6 space-y-6">
                        {/* Title & Desc */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-white">Post Title <span className="text-red-500">*</span></Label>
                                <Input 
                                    id="title" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Give your post a catchy title..." 
                                    className="bg-white/5 border-white/10 h-10 focus:border-primary/50 font-medium" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="desc">Description / Caption</Label>
                                <Textarea 
                                    id="desc" 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Tell your fans about this post..." 
                                    className="bg-white/5 border-white/10 resize-none h-24 focus:border-primary/50" 
                                />
                            </div>
                        </div>

                        {/* Monetization Selector */}
                        <div className="space-y-3 pt-2">
                            <Label className="text-white">Who can view this?</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <button 
                                  onClick={() => setContentType('free')}
                                  className={cn(
                                    "relative p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all h-24",
                                    contentType === 'free' 
                                        ? "bg-green-500/10 border-green-500 text-white shadow-[0_0_15px_-3px_rgba(34,197,94,0.3)]" 
                                        : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/20"
                                  )}
                                >
                                    <Globe className={cn("h-6 w-6", contentType === 'free' ? "text-green-500" : "text-muted-foreground")} />
                                    <div className="text-center">
                                        <div className="text-sm font-bold">Free</div>
                                        <div className="text-[10px] opacity-70">Publicly visible</div>
                                    </div>
                                    {contentType === 'free' && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-green-500" />}
                                </button>

                                <button 
                                  onClick={() => setContentType('sub')}
                                  className={cn(
                                    "relative p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all h-24",
                                    contentType === 'sub' 
                                        ? "bg-primary/10 border-primary text-white shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]" 
                                        : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/20"
                                  )}
                                >
                                    <Lock className={cn("h-6 w-6", contentType === 'sub' ? "text-primary" : "text-muted-foreground")} />
                                    <div className="text-center">
                                        <div className="text-sm font-bold">Subscribers</div>
                                        <div className="text-[10px] opacity-70">Only active subs</div>
                                    </div>
                                    {contentType === 'sub' && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />}
                                </button>

                                <button 
                                  onClick={() => setContentType('ppv')}
                                  className={cn(
                                    "relative p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all h-24",
                                    contentType === 'ppv' 
                                        ? "bg-yellow-500/10 border-yellow-500 text-white shadow-[0_0_15px_-3px_rgba(234,179,8,0.3)]" 
                                        : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/20"
                                  )}
                                >
                                    <DollarSign className={cn("h-6 w-6", contentType === 'ppv' ? "text-yellow-500" : "text-muted-foreground")} />
                                    <div className="text-center">
                                        <div className="text-sm font-bold">Pay-Per-View</div>
                                        <div className="text-[10px] opacity-70">Purchase required</div>
                                    </div>
                                    {contentType === 'ppv' && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-yellow-500" />}
                                </button>
                            </div>
                        </div>

                         {/* PPV Price Input */}
                         {contentType === 'ppv' && (
                             <div className="animate-in fade-in slide-in-from-top-4 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                                 <Label className="text-yellow-400 mb-2 block">Set Price (Credits) <span className="text-red-500">*</span></Label>
                                 <div className="relative">
                                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-500" />
                                     <Input 
                                        type="number" 
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="e.g. 50" 
                                        className="pl-9 bg-black/20 border-yellow-500/30 focus:border-yellow-500 text-yellow-500 font-bold placeholder:text-yellow-500/30" 
                                     />
                                 </div>
                                 <p className="text-[10px] text-yellow-500/70 mt-2 flex items-center gap-1">
                                     <AlertCircle className="h-3 w-3" /> Minimum 5 credits required.
                                 </p>
                             </div>
                         )}

                         {/* Upload Progress */}
                         {isUploading && (
                             <div className="space-y-2 pt-4 animate-in fade-in">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    <span>Uploading Media...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                     <div 
                                        className="h-full bg-gradient-to-r from-primary to-purple-400 transition-all duration-300" 
                                        style={{ width: `${uploadProgress}%` }} 
                                     />
                                </div>
                             </div>
                         )}

                    </div>
                </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 bg-white/5 flex items-center justify-between">
            {step === 2 ? (
                <Button 
                    variant="ghost" 
                    onClick={() => { setStep(1); setFile(null); setPreviewUrl(null); }}
                    disabled={isUploading}
                    className="hover:bg-white/5 hover:text-white"
                >
                    Back
                </Button>
            ) : (
                <div /> // Spacer
            )}
            
            {step === 2 && (
                <div className="flex gap-3">
                     <Button 
                        variant="ghost" 
                        onClick={() => handleOpenChangeInternal(false)}
                        disabled={isUploading}
                    >
                        Cancel
                    </Button>
                     <Button 
                        onClick={handleUpload} 
                        disabled={isUploading || !validateForm()} 
                        className={cn(
                            "min-w-[140px] font-bold shadow-lg shadow-primary/20",
                            isUploading ? "opacity-90" : "hover:scale-105 transition-transform"
                        )}
                    >
                        {isUploading ? "Publishing..." : "Publish Post"}
                    </Button>
                </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
