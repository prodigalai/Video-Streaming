import { useState } from "react";
import { Copy, Radio, Settings, Shield, MessageSquare, Heart, Share2, Play, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function LiveStreamingPage() {
  const [streamKey, setStreamKey] = useState("live_834720124_xY92kzLmPQ182_aB3");
  const [showKey, setShowKey] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Live Streaming Control Room</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
            </span>
            Waiting for stream...
          </p>
        </div>
        <Button 
          className="rounded-lg bg-live text-white hover:bg-live/90 shadow-[0_0_20px_rgba(239,68,68,0.2)] px-6 h-11 font-bold animate-pulse"
          onClick={() => toast.error("Hardware encoder not found! Please check OBS settings.")}
        >
          GO LIVE NOW
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Preview & Console */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stream Preview Area */}
          <div className="glass-card aspect-video rounded-xl relative overflow-hidden bg-black/40 group border-primary/10 shadow-glow-sm">
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all group-hover:bg-black/20">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                   <Radio className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Stream Preview</h3>
                <p className="text-muted-foreground max-w-sm">Connect your streaming software to get started. Use the stream key provided in the panel.</p>
             </div>
             <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Badge variant="outline" className="bg-black/60 backdrop-blur-md border-white/10 px-3 py-1 text-xs">OFFLINE</Badge>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="h-9 w-9 bg-black/60 backdrop-blur-md rounded-lg hover:bg-primary/20 transition-all" onClick={() => toast.info("Stream settings opened")}><Settings className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="h-9 w-9 bg-black/60 backdrop-blur-md rounded-lg hover:bg-primary/20 transition-all" onClick={() => toast.success("Share link copied!")}><Share2 className="h-4 w-4" /></Button>
                </div>
             </div>
          </div>

          {/* Stream Settings */}
          <div className="glass-card p-6 rounded-xl border-primary/5">
             <Tabs defaultValue="setup">
                <TabsList className="bg-muted/30 p-1 rounded-lg mb-6">
                   <TabsTrigger value="setup" className="rounded-md h-9 px-6 data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-semibold transition-all">Stream Setup</TabsTrigger>
                   <TabsTrigger value="info" className="rounded-md h-9 px-6 data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-semibold transition-all">Stream Info</TabsTrigger>
                   <TabsTrigger value="health" className="rounded-md h-9 px-6 data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-semibold transition-all">Stream Health</TabsTrigger>
                </TabsList>
                
                <TabsContent value="setup" className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm font-semibold text-muted-foreground">Stream URL</label>
                         <div className="flex gap-2">
                            <Input readOnly value="rtmp://stream.vault.live/app" className="bg-muted/30 border-border/50 rounded-lg h-11" />
                            <Button variant="outline" size="icon" onClick={() => copyToClipboard('rtmp://stream.vault.live/app', 'URL')} className="h-11 w-11 rounded-lg shrink-0"><Copy className="h-4 w-4" /></Button>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-semibold text-muted-foreground">Stream Key</label>
                         <div className="flex gap-2">
                            <Input 
                               type={showKey ? "text" : "password"} 
                               readOnly 
                               value={streamKey} 
                               className="bg-muted/30 border-border/50 rounded-lg h-11" 
                            />
                            <Button variant="outline" size="icon" onClick={() => setShowKey(!showKey)} className="h-11 w-11 rounded-lg shrink-0 flex items-center justify-center p-0">
                               {showKey ? <Eye className="h-4 w-4" /> : <div className="h-1 w-4 bg-muted-foreground/50 rounded-full" />}
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => copyToClipboard(streamKey, 'Stream Key')} className="h-11 w-11 rounded-lg shrink-0"><Copy className="h-4 w-4" /></Button>
                         </div>
                      </div>
                   </div>
                   <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                      <p className="text-sm text-primary/90 font-medium">Important: Do not share your stream key with anyone. It can allow others to stream to your channel.</p>
                   </div>
                </TabsContent>

                <TabsContent value="info" className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-muted-foreground">Stream Title</label>
                      <Input placeholder="Enter your stream title..." className="bg-muted/30 border-border/50 rounded-lg h-11" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-sm font-semibold text-muted-foreground">Category</label>
                         <Input placeholder="Gaming, Music, Art..." className="bg-muted/30 border-border/50 rounded-lg h-11" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-semibold text-muted-foreground">Access</label>
                         <Input value="Public" readOnly className="bg-muted/30 border-border/50 rounded-lg h-11" />
                      </div>
                   </div>
                   <Button className="bg-primary rounded-lg h-11 px-8 font-bold" onClick={() => toast.success("Stream info updated successfully")}>Save Changes</Button>
                </TabsContent>
                
                <TabsContent value="health" className="py-8 text-center text-muted-foreground">
                    <p>No active stream detected.</p>
                    <Button variant="outline" className="mt-4" onClick={() => toast.info("Checking server connection...")}>Run Test</Button>
                </TabsContent>
             </Tabs>
          </div>
        </div>

        {/* Right Column: Interaction Control */}
        <div className="space-y-8">
           {/* Chat Control */}
           <div className="glass-card flex flex-col h-[500px] rounded-xl overflow-hidden shadow-glow-sm">
              <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/20">
                 <h2 className="font-bold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" /> Live Chat Control
                 </h2>
                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg outline-none focus:ring-0" onClick={() => toast.info("Chat settings")}>
                    <Settings className="h-4 w-4" />
                 </Button>
              </div>
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                 <div className="h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                 </div>
                 <h3 className="font-semibold mb-1">Chat is ready</h3>
                 <p className="text-xs text-muted-foreground">Messages will appear here once you go live.</p>
              </div>
              <div className="p-4 border-t border-border/50 bg-muted/20 space-y-3">
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Enable Chat</span>
                    <Switch defaultChecked onCheckedChange={(c) => toast(c ? "Chat Enabled" : "Chat Disabled")} />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Slow Mode (10s)</span>
                    <Switch onCheckedChange={(c) => toast(c ? "Slow Mode On" : "Slow Mode Off")} />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Paid Emojis & Stickers</span>
                    <Switch defaultChecked />
                 </div>
              </div>
           </div>

           {/* Moderation Tool */}
           <div className="glass-card p-6 rounded-xl border-primary/5">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                 <Shield className="h-4 w-4 text-success" /> Moderation Tools
              </h2>
              <div className="space-y-3">
                 <Button variant="outline" className="w-full justify-start rounded-lg h-11 text-xs font-semibold gap-3 hover:bg-primary/5 border-border/50" onClick={() => toast.info("Opening mod view...")}>
                    <Users className="h-4 w-4" /> Manage Moderators (1)
                 </Button>
                 <Button variant="outline" className="w-full justify-start rounded-lg h-11 text-xs font-semibold gap-3 hover:bg-primary/5 border-border/50" onClick={() => toast.info("Ban list empty")}>
                    <Shield className="h-4 w-4" /> Banned Users (0)
                 </Button>
                 <Button variant="outline" className="w-full justify-start rounded-lg h-11 text-xs font-semibold gap-3 hover:bg-primary/5 border-border/50" onClick={() => toast.info("Blocked words list")}>
                    <Heart className="h-4 w-4 text-destructive" /> Block List Words
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
