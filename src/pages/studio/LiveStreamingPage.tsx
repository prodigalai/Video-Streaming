import { useState } from "react";
import { Copy, Radio, Settings, Shield, MessageSquare, Heart, Share2, Play, Users, Eye, Signal, Zap, Activity, Terminal, FileText, Lock, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveStreamingPage() {
  const [streamKey, setStreamKey] = useState("live_834720124_xY92kzLmPQ182_aB3");
  const [showKey, setShowKey] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in relative pb-20">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg">
                <Radio className="h-4 w-4 md:h-5 md:w-5 text-white" />
             </div>
             <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Live Control Center
             </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </div>
            <p className="text-xs md:text-sm font-medium text-muted-foreground">Status: <span className="text-foreground font-bold">Ready to Stream</span></p>
          </div>
        </div>
        
        <Button 
          className="h-10 md:h-12 px-6 md:px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 active:scale-95 transition-all w-full sm:w-auto"
          onClick={() => toast.error("Hardware encoder missing. Please check OBS settings.")}
        >
          GO LIVE
          <Play className="ml-2 h-4 w-4 fill-current" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Visual Engine & Console */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          {/* Stream Visual Matrix Area */}
          <div className="bg-card aspect-video rounded-xl md:rounded-2xl border border-border/50 relative overflow-hidden shadow-sm group">
             <div className="absolute inset-0 bg-black/90 z-10" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 z-20 space-y-4 md:space-y-6">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-muted/10 border border-white/10 flex items-center justify-center transition-all group-hover:scale-110 shadow-lg">
                   <Monitor className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground group-hover:text-red-500 transition-colors" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-white">Preview Offline</h3>
                    <p className="text-xs md:text-sm font-medium text-white/40 max-w-xs mx-auto">Connect your streaming software to see the preview here.</p>
                </div>
             </div>

             {/* HUD Overlays */}
             <div className="absolute top-4 left-4 z-30">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                    <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="text-[10px] font-bold text-white">OFFLINE</span>
                 </div>
             </div>
             
             <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="icon" className="h-10 w-10 rounded-xl bg-black/60 border border-white/10 text-white hover:bg-black/80">
                    <Settings className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="h-10 w-10 rounded-xl bg-black/60 border border-white/10 text-white hover:bg-black/80" onClick={() => toast.success("Stream link copied")}>
                    <Share2 className="h-4 w-4" />
                </Button>
             </div>
          </div>

          {/* Sync Configuration Terminal */}
          <div className="bg-card p-4 md:p-8 rounded-xl md:rounded-2xl border border-border/50 shadow-sm">
             <Tabs defaultValue="setup" className="relative z-10">
                <TabsList className="h-auto bg-transparent p-0 gap-6 w-full justify-start overflow-x-auto scrollbar-hide border-b border-border/50 mb-6 md:mb-8">
                    {[
                        { id: "setup", label: "Stream Setup", icon: Signal },
                        { id: "info", label: "Stream Info", icon: FileText },
                        { id: "health", label: "Stream Health", icon: Activity }
                    ].map((tab) => (
                    <TabsTrigger 
                        key={tab.id}
                        value={tab.id}
                        className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary rounded-none px-0 pb-3 text-xs md:text-sm font-bold text-muted-foreground transition-all hover:text-foreground relative border-b-2 border-transparent data-[state=active]:border-primary"
                    >
                        <tab.icon className="h-4 w-4 mr-2" />
                        {tab.label}
                    </TabsTrigger>
                    ))}
                </TabsList>
                
                <TabsContent value="setup" className="space-y-6 md:space-y-8 mt-0 focus-visible:ring-0">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Server URL</label>
                         <div className="flex gap-2">
                            <Input readOnly value="rtmp://stream.vault.live/app" className="bg-muted/30 border-border/50 font-mono text-xs md:text-sm" />
                            <Button variant="outline" size="icon" onClick={() => copyToClipboard('rtmp://stream.vault.live/app', 'URL')} className="shrink-0"><Copy className="h-4 w-4" /></Button>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Stream Key</label>
                         <div className="flex gap-2">
                            <Input 
                               type={showKey ? "text" : "password"} 
                               readOnly 
                               value={streamKey} 
                               className="bg-muted/30 border-border/50 font-mono text-xs md:text-sm" 
                            />
                            <Button variant="outline" size="icon" onClick={() => setShowKey(!showKey)} className="shrink-0">
                               {showKey ? <Eye className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => copyToClipboard(streamKey, 'Stream Key')} className="shrink-0"><Copy className="h-4 w-4" /></Button>
                         </div>
                      </div>
                   </div>
                   <div className="p-4 md:p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start md:items-center gap-4">
                      <Shield className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5 md:mt-0" />
                      <p className="text-xs md:text-sm text-yellow-500 font-medium leading-relaxed">Never share your stream key. Anyone with this key can stream to your channel.</p>
                   </div>
                </TabsContent>

                <TabsContent value="info" className="space-y-6 mt-0 focus-visible:ring-0">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Title</label>
                      <Input placeholder="Enter your stream title..." className="bg-muted/30 border-border/50" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Category</label>
                         <Input placeholder="Gaming, Music, Talk Show..." className="bg-muted/30 border-border/50" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Visibility</label>
                         <Input value="Public" readOnly className="bg-muted/30 border-border/50 text-muted-foreground" />
                      </div>
                   </div>
                   <Button className="w-full md:w-auto px-8 font-bold" onClick={() => toast.success("Stream info updated")}>Update Info</Button>
                </TabsContent>
                
                <TabsContent value="health" className="py-12 text-center space-y-4 mt-0 focus-visible:ring-0">
                    <div className="h-16 w-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto">
                        <Activity className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-muted-foreground">No active stream detected.</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Checking connection...")}>Check Connection</Button>
                </TabsContent>
             </Tabs>
          </div>
        </div>

        {/* Interaction Sidebar */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8">
           {/* Chat Box */}
           <div className="bg-card h-[500px] md:h-[600px] rounded-xl md:rounded-2xl border border-border/50 shadow-sm relative overflow-hidden flex flex-col">
              <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/10">
                 <h2 className="text-sm font-bold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" /> Live Chat
                 </h2>
                 <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                 </Button>
              </div>
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
                 <div className="h-16 w-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-2">
                    <MessageSquare className="h-8 w-8 text-muted-foreground/50" />
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-base font-bold">Chat Unavailable</h3>
                    <p className="text-xs text-muted-foreground font-medium">Chat will appear here when you go live.</p>
                 </div>
              </div>
              <div className="p-4 border-t border-border/50 bg-muted/10 space-y-3">
                 {[
                    { label: 'Chat Enabled', active: true },
                    { label: 'Slow Mode', active: false },
                    { label: 'Followers Only', active: false }
                 ].map((toggle, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <p className="text-xs font-bold text-muted-foreground">{toggle.label}</p>
                       <Switch defaultChecked={toggle.active} onCheckedChange={(c) => toast(c ? `${toggle.label} On` : `${toggle.label} Off`)} />
                    </div>
                 ))}
              </div>
           </div>

           {/* Moderation Tools */}
           <div className="bg-card p-4 md:p-6 rounded-xl md:rounded-2xl border border-border/50 shadow-sm space-y-4">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-2">
                 <Shield className="h-4 w-4 text-green-500" /> Moderation
              </h2>
              <div className="space-y-2">
                 {[
                    { label: 'Moderators', icon: Users, count: 1 },
                    { label: 'Banned Users', icon: Shield, count: 0 },
                    { label: 'Blocked Terms', icon: Heart, count: 12 }
                 ].map((tool, i) => (
                    <Button key={i} variant="outline" className="w-full justify-between h-10 font-medium">
                        <div className="flex items-center gap-3">
                           <tool.icon className="h-4 w-4 text-muted-foreground" />
                           {tool.label}
                        </div>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-md">{tool.count}</span>
                    </Button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
