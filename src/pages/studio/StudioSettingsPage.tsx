import { useState } from "react";
import { User, Shield, Bell, CreditCard, Radio, Globe, Camera, Save, Settings as SettingsIcon, Link as LinkIcon, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function StudioSettingsPage() {
  const [activeTab, setActiveTab] = useState("channel");

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Channel Settings</h1>
          <p className="text-muted-foreground mt-1">Customize your channel profile, branding, and preferences.</p>
        </div>
        <Button className="rounded-lg bg-primary hover:shadow-glow transition-all px-8 h-11 font-bold gap-2" onClick={() => toast.success("All changes saved successfully!")}>
           <Save className="h-4 w-4" /> Save All Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         {/* Settings Navigation */}
         <div className="w-full lg:w-72 flex-shrink-0 space-y-1">
            {[
               { id: 'channel', label: 'Channel Info', icon: User },
               { id: 'branding', label: 'Branding', icon: Camera },
               { id: 'notifications', label: 'Notifications', icon: Bell },
               { id: 'privacy', label: 'Privacy & Security', icon: Shield },
               { id: 'payouts', label: 'Payments & Tax', icon: CreditCard },
               { id: 'stream', label: 'Stream Preferences', icon: Radio },
            ].map((tab) => (
               <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); toast.info(`Switched to ${tab.label} settings`); }}
                  className={cn(
                     "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-semibold",
                     activeTab === tab.id 
                        ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(168,85,247,0.1)] border border-primary/20" 
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
               >
                  <tab.icon className={cn("h-4 w-4", activeTab === tab.id ? "text-primary" : "text-muted-foreground")} />
                  {tab.label}
               </button>
            ))}
         </div>

         {/* Settings Content Area */}
         <div className="flex-1 glass-card p-8 rounded-2xl shadow-glow-sm border-primary/5">
             {activeTab === 'channel' && (
                <div className="space-y-8 animate-fade-in">
                   <div className="flex items-center gap-6 pb-8 border-b border-border/50">
                      <div className="relative group cursor-pointer" onClick={() => toast.info("Avatar upload dialog opened")}>
                         <Avatar className="h-24 w-24 border-2 border-primary/20 group-hover:border-primary transition-all duration-500">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=creator" />
                            <AvatarFallback>C</AvatarFallback>
                         </Avatar>
                         <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="h-6 w-6 text-white" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-xl font-bold">Channel Avatar</h3>
                         <p className="text-sm text-muted-foreground">Recommend 800x800px. PNG or JPG only.</p>
                         <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-9 rounded-lg px-4 border-border/50" onClick={() => toast.info("Change Avatar")}>Change</Button>
                            <Button size="sm" variant="ghost" className="h-9 rounded-lg px-4 text-destructive hover:bg-destructive/10" onClick={() => toast.error("Avatar removed")}>Remove</Button>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                            Channel Name <Badge variant="outline" className="h-4 text-[9px] uppercase font-black tracking-tighter">Required</Badge>
                         </label>
                         <Input defaultValue="Creator Studio" className="h-12 bg-muted/20 border-border/50 rounded-xl focus:border-primary/50" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-sm font-bold text-muted-foreground">Handle</label>
                         <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">@</span>
                            <Input defaultValue="creator_pro" className="h-12 pl-10 bg-muted/20 border-border/50 rounded-xl focus:border-primary/50" />
                         </div>
                      </div>
                      <div className="md:col-span-2 space-y-3">
                         <label className="text-sm font-bold text-muted-foreground">About / Description</label>
                         <Textarea 
                            placeholder="Tell your audience about your channel..." 
                            className="min-h-[120px] bg-muted/20 border-border/50 rounded-xl focus:border-primary/50 resize-none p-4"
                            defaultValue="Welcome to my official StreamVault channel! Here I post daily content about design, development, and high-performance coding. Don't forget to subscribe!"
                         />
                      </div>
                   </div>

                   <div className="pt-4 space-y-6">
                      <h3 className="font-bold flex items-center gap-2">
                         <LinkIcon className="h-4 w-4 text-primary" /> Social Links
                      </h3>
                      <div className="space-y-4">
                         {['Twitter', 'Instagram', 'Personal Website'].map((link) => (
                            <div key={link} className="flex gap-4">
                               <div className="w-40 flex-shrink-0 flex items-center px-4 bg-muted/30 rounded-lg border border-border/50 text-xs font-bold text-muted-foreground">{link}</div>
                               <Input placeholder={`https://${link.toLowerCase()}.com/you`} className="h-11 bg-muted/20 border-border/50 rounded-lg flex-1" />
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             )}

             {activeTab === 'stream' && (
                <div className="space-y-8 animate-fade-in">
                   <div className="space-y-6">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                         <Radio className="h-5 w-5 text-primary" /> Stream Default Preferences
                      </h3>
                      <div className="space-y-6">
                         <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/50">
                            <div>
                               <p className="font-bold text-sm">Ultra Low Latency</p>
                               <p className="text-xs text-muted-foreground mt-1">Optimized for real-time interaction (Best for Q&A)</p>
                            </div>
                            <Switch defaultChecked onCheckedChange={(c) => toast.info(`Latency mode: ${c ? 'Ultra Low' : 'Standard'}`)} />
                         </div>
                         <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/50">
                            <div>
                               <p className="font-bold text-sm">Auto-Archive Streams</p>
                               <p className="text-xs text-muted-foreground mt-1">Automatically save live streams as VODs after ending</p>
                            </div>
                            <Switch defaultChecked onCheckedChange={(c) => toast.info(`Auto-archive: ${c ? 'Enabled' : 'Disabled'}`)} />
                         </div>
                         <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/50">
                            <div>
                               <p className="font-bold text-sm">Enable DVR</p>
                               <p className="text-xs text-muted-foreground mt-1">Allow viewers to pause and seek back in live streams</p>
                            </div>
                            <Switch defaultChecked onCheckedChange={(c) => toast.info(`DVR: ${c ? 'Enabled' : 'Disabled'}`)} />
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {activeTab === 'privacy' && (
                <div className="space-y-8 animate-fade-in">
                   <h3 className="text-xl font-bold flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" /> Privacy & Access
                   </h3>
                   <div className="grid grid-cols-1 gap-6">
                      <div className="p-6 rounded-xl border border-border/50 bg-muted/10 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                               <Lock className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                               <p className="font-bold">Two-Factor Authentication</p>
                               <p className="text-xs text-muted-foreground mt-1">Keep your creator account secure with 2FA.</p>
                            </div>
                         </div>
                         <Button variant="outline" className="rounded-lg h-10 border-primary/20 text-primary font-bold" onClick={() => toast.success("2FA setup initiated")}>Enable Now</Button>
                      </div>
                   </div>
                </div>
             )}
         </div>
      </div>
    </div>
  );
}


