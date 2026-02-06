import { useState } from "react";
import { 
  Upload, Pencil, Lock, Shield, Smartphone, Mail, Bell, CreditCard, 
  Globe, Laptop, Key, Plus, Trash2, CheckCircle2, AlertCircle 
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const handleConnect = (platform: string) => {
    toast.info(`Connecting to ${platform}...`);
  };

  return (
    <MainLayout>
      <div className="container py-8 max-w-5xl">
        <h1 className="text-3xl font-black mb-8 px-2">Settings</h1>
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="h-auto bg-transparent p-0 gap-6 border-b border-border/40 w-full justify-start rounded-none mb-8 overflow-x-auto">
            {["Profile", "Security", "Preferences", "Notifications", "Connections", "Developer", "Payment methods"].map((tab) => (
              <TabsTrigger 
                key={tab}
                value={tab.toLowerCase().replace(" ", "-")}
                className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-3 text-sm font-semibold text-muted-foreground data-[state=active]:text-primary transition-all hover:text-white"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* PROFILE TAB */}
          <TabsContent value="profile" className="space-y-8 animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Profile</h2>
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground ml-1">Profile Preview</h3>
              <Card className="bg-[#0f0f13] border-border/50 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="flex-1 flex items-center gap-4">
                     <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                        <AvatarFallback>AN</AvatarFallback>
                     </Avatar>
                     <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-lg text-white">About AshN0408</span>
                           <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded">0 Followers</span>
                        </div>
                        <p className="text-sm text-muted-foreground">AshN0408's Kick Channel</p>
                     </div>
                  </div>
                  <Button variant="secondary" className="bg-white/10 hover:bg-white/15 text-white h-9" onClick={() => toast("Opening avatar editor...")}>
                    Edit Avatar
                  </Button>
                </div>
              </Card>
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground ml-1">Channel Banner</h3>
              <Card className="bg-[#0f0f13] border-border/50 p-6 flex flex-col items-center">
                 <div className="w-full h-32 md:h-40 rounded-lg bg-green-500 overflow-hidden mb-6 relative group">
                    <div className="absolute inset-0 opacity-100" 
                        style={{
                        backgroundImage: 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                        backgroundColor: '#00ff00' 
                        }} 
                    />
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <Button variant="secondary" className="bg-white/10 hover:bg-white/15 text-white" onClick={() => toast("Banner upload dialog opened")}>
                      Update Banner image
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Minimum image size: 1200×134px and less than 4MB
                    </p>
                 </div>
              </Card>
            </section>

             <section className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground ml-1">Offline Stream Banner</h3>
              <Card className="bg-[#0f0f13] border-border/50 p-6 flex flex-col items-center">
                <div className="w-full aspect-video max-h-64 rounded-lg bg-black overflow-hidden relative mb-6 border border-white/5">
                   <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
                      <h1 className="text-6xl font-black text-white/5 tracking-tighter">OFFLINE</h1>
                   </div>
                </div>
                 <div className="flex flex-col items-center gap-2">
                    <Button variant="secondary" className="bg-white/10 hover:bg-white/15 text-white" onClick={() => toast("Offline banner upload started")}>
                       <Upload className="h-4 w-4 mr-2" />
                       Upload Offline Banner
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended size: 1920×1080px and less than 8MB
                    </p>
                 </div>
              </Card>
            </section>
          </TabsContent>

          {/* SECURITY TAB */}
          <TabsContent value="security" className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Security</h2>
            <Card className="bg-[#0f0f13] border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5 text-primary" /> Password</CardTitle>
                <CardDescription>Update your password to keep your account secure.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input id="current" type="password" placeholder="••••••••" className="bg-white/5 border-white/10" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input id="new" type="password" placeholder="Min. 8 characters" className="bg-white/5 border-white/10" />
                </div>
                <Button onClick={handleSave}>Change Password</Button>
              </CardContent>
            </Card>

            <Card className="bg-[#0f0f13] border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-sm text-muted-foreground">Use an app like Google Authenticator or Authy.</p>
                </div>
                <Button variant="outline" onClick={() => toast("2FA Setup Wizard Started")}>Setup 2FA</Button>
              </CardContent>
            </Card>

            <Card className="bg-[#0f0f13] border-border/50">
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center gap-4">
                    <Laptop className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">MacBook Pro • Chrome</p>
                      <p className="text-xs text-green-500 font-bold">Current Device</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-green-500/50 text-green-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center gap-4">
                    <Smartphone className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">iPhone 14 • App</p>
                      <p className="text-xs text-muted-foreground">Last active: 2 hours ago</p>
                    </div>
                  </div>
                   <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10" onClick={() => toast.success("Session revoked")}>Revoke</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PREFERENCES TAB */}
          <TabsContent value="preferences" className="space-y-6 animate-fade-in">
             <h2 className="text-lg font-bold mb-4">Preferences</h2>
             <Card className="bg-[#0f0f13] border-border/50">
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Adjust the appearance of the application.</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => toast("Theme updated")} />
                </div>
                <Separator className="bg-white/5" />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">Autoplay Videos</Label>
                    <p className="text-sm text-muted-foreground">Automatically play videos when browsing.</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={(c) => toast(c ? "Autoplay enabled" : "Autoplay disabled")} />
                </div>
                 <Separator className="bg-white/5" />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">Language</Label>
                    <p className="text-sm text-muted-foreground">Select your preferred language.</p>
                  </div>
                  <Button variant="outline" className="w-[150px] justify-between" onClick={() => toast("Language selector opened")}>
                     English (US)
                     <Globe className="w-4 h-4 ml-2 opacity-50" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NOTIFICATIONS TAB */}
          <TabsContent value="notifications" className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Notifications</h2>
             <Card className="bg-[#0f0f13] border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-primary" /> Email Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Live Stream Alerts", "New Subscribers", "Weekly Digest", "Product Updates"].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <Label>{item}</Label>
                    <Switch defaultChecked onCheckedChange={(c) => toast(`${item} ${c ? "enabled" : "disabled"}`)} />
                  </div>
                ))}
              </CardContent>
            </Card>
             <Card className="bg-[#0f0f13] border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Smartphone className="w-5 h-5 text-primary" /> Push Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Mentions", "ChatMessage", "Stream Status"].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <Label>{item}</Label>
                    <Switch defaultChecked={item !== "ChatMessage"} onCheckedChange={(c) => toast(`${item} ${c ? "enabled" : "disabled"}`)} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONNECTIONS TAB */}
          <TabsContent value="connections" className="space-y-6 animate-fade-in">
             <h2 className="text-lg font-bold mb-4">Connected Accounts</h2>
             <Card className="bg-[#0f0f13] border-border/50">
               <CardContent className="space-y-6 pt-6">
                 {[
                   { name: "Twitch", connected: true, user: "AshN0408" },
                   { name: "YouTube", connected: false },
                   { name: "Discord", connected: true, user: "AshN#1234" },
                   { name: "Twitter / X", connected: false },
                 ].map((app) => (
                   <div key={app.name} className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                         <span className="font-bold text-xs">{app.name[0]}</span>
                       </div>
                       <div>
                         <p className="font-bold">{app.name}</p>
                         {app.connected ? (
                           <p className="text-xs text-green-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Connected as {app.user}</p>
                         ) : (
                           <p className="text-xs text-muted-foreground">Not connected</p>
                         )}
                       </div>
                     </div>
                     <Button 
                        variant={app.connected ? "outline" : "default"} 
                        size="sm"
                        onClick={() => app.connected ? toast.error(`Disconnected from ${app.name}`) : handleConnect(app.name)}
                      >
                       {app.connected ? "Disconnect" : "Connect"}
                     </Button>
                   </div>
                 ))}
               </CardContent>
             </Card>
          </TabsContent>

          {/* DEVELOPER TAB */}
          <TabsContent value="developer" className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Developer Settings</h2>
            <Card className="bg-[#0f0f13] border-border/50">
              <CardHeader>
                 <CardTitle className="flex items-center gap-2"><Key className="w-5 h-5 text-primary" /> API Keys</CardTitle>
                 <CardDescription>Manage your API keys for external integrations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-4 bg-white/5 rounded-md border border-white/5 flex items-center justify-between">
                    <div>
                       <p className="font-mono text-sm text-muted-foreground">sk_live_51M...x28</p>
                       <p className="text-xs text-muted-foreground mt-1">Created on Feb 2, 2026</p>
                    </div>
                    <div className="flex gap-2">
                       <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText("sk_live_51M...x28"); toast("Copied to clipboard"); }}>Copy</Button>
                       <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10" onClick={() => toast.error("Key revoked")}>Revoke</Button>
                    </div>
                 </div>
                 <Button className="w-full" variant="outline" onClick={() => toast.success("New API Key generated")}>
                    <Plus className="w-4 h-4 mr-2" /> Generate New Key
                 </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PAYMENT METHODS TAB */}
           <TabsContent value="payment-methods" className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Payment Methods</h2>
            <div className="grid gap-4 md:grid-cols-2">
               <Card className="bg-primary/10 border-primary/50 relative overflow-hidden">
                 <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-8">
                       <CreditCard className="w-8 h-8 text-primary" />
                       <Badge className="bg-primary text-black hover:bg-primary">Default</Badge>
                    </div>
                    <div className="mb-4">
                       <p className="font-mono text-lg tracking-wider">•••• •••• •••• 4242</p>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                       <span>Expires 12/28</span>
                       <span>Visa</span>
                    </div>
                 </CardContent>
               </Card>
               
               <Button variant="outline" className="h-full min-h-[180px] border-dashed flex flex-col gap-2 hover:bg-white/5" onClick={() => toast("Add payment method modal opened")}>
                  <Plus className="w-8 h-8 opacity-50" />
                  <span>Add Payment Method</span>
               </Button>
            </div>

            <Card className="bg-[#0f0f13] border-border/50 mt-6">
               <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {[
                        { id: "#TX1029", desc: "channel_sub_gift", date: "Feb 01, 2026", amount: "-$5.00", status: "Completed" },
                        { id: "#TX1028", desc: "wallet_topup", date: "Jan 28, 2026", amount: "+$50.00", status: "Completed" },
                        { id: "#TX1027", desc: "stream_donation", date: "Jan 15, 2026", amount: "-$10.00", status: "Completed" },
                     ].map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                           <div>
                              <p className="font-medium text-sm">{tx.desc}</p>
                              <p className="text-xs text-muted-foreground">{tx.date} • {tx.id}</p>
                           </div>
                           <div className="text-right">
                              <p className={tx.amount.startsWith("+") ? "text-green-500 font-bold" : "text-white font-bold"}>{tx.amount}</p>
                              <p className="text-xs text-muted-foreground">{tx.status}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </MainLayout>
  );
}
