import { User, Mail, Camera, Save, Globe, Twitter, Instagram, Youtube, Link as LinkIcon, Lock, Moon, Bell, Shield, LogOut, MessageSquare, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { useLocation } from "react-router-dom";

export default function StudioSettingsPage() {
  const location = useLocation();
  const defaultTab = location.pathname.includes("settings") ? "account" : "profile";

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in relative pb-20">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <User className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
             </div>
             <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                {defaultTab === 'account' ? 'Channel Settings' : 'Channel Profile'}
             </h1>
          </div>
          <p className="text-xs md:text-sm font-medium text-muted-foreground">Manage your channel {defaultTab === 'account' ? 'preferences and security' : 'branding and information'}</p>
        </div>
        <Button className="h-10 md:h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg w-full sm:w-auto">
            <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Main Settings Area */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
           <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto scrollbar-hide bg-transparent p-0 border-b border-border/50 mb-6 md:mb-8">
                 <TabsTrigger value="profile" className="data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-4 md:px-6 py-2 md:py-3 font-bold text-muted-foreground data-[state=active]:text-foreground transition-all">Profile</TabsTrigger>
                 <TabsTrigger value="account" className="data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-4 md:px-6 py-2 md:py-3 font-bold text-muted-foreground data-[state=active]:text-foreground transition-all">Account</TabsTrigger>
                 <TabsTrigger value="notifications" className="data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-4 md:px-6 py-2 md:py-3 font-bold text-muted-foreground data-[state=active]:text-foreground transition-all">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6 md:space-y-8 mt-0 focus-visible:ring-0">
                 {/* Branding */}
                 <div className="space-y-4 md:space-y-6 bg-card p-4 md:p-8 rounded-xl border border-border/50 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                       <div className="relative group cursor-pointer">
                          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-xl">
                             <AvatarImage src="https://github.com/shadcn.png" />
                             <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <Camera className="h-8 w-8 text-white" />
                          </div>
                       </div>
                       <div className="flex-1 space-y-4 w-full text-center md:text-left">
                          <div className="space-y-1">
                             <h3 className="text-lg font-bold text-foreground">Profile Picture</h3>
                             <p className="text-xs text-muted-foreground">Recommended 800x800 px. JPG or PNG.</p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3">
                             <Button variant="outline" size="sm" className="font-bold">Upload New</Button>
                             <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold">Remove</Button>
                          </div>
                       </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="space-y-2">
                             <Label htmlFor="channelName">Channel Name</Label>
                             <Input id="channelName" defaultValue="Creative Studio" className="bg-muted/30 border-border/50" />
                          </div>
                          <div className="space-y-2">
                             <Label htmlFor="handle">Handle</Label>
                             <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">@</span>
                                <Input id="handle" defaultValue="creative_studio" className="pl-8 bg-muted/30 border-border/50" />
                             </div>
                          </div>
                       </div>
                       
                       <div className="space-y-2">
                          <Label htmlFor="bio">Channel Bio</Label>
                          <Textarea id="bio" placeholder="Tell viewers about your channel..." className="bg-muted/30 border-border/50 min-h-[120px]" />
                          <p className="text-xs text-muted-foreground text-right">0 / 500</p>
                       </div>
                    </div>
                 </div>

                 {/* Social Links */}
                 <div className="space-y-4 md:space-y-6 bg-card p-4 md:p-8 rounded-xl border border-border/50 shadow-sm">
                    <h3 className="text-lg font-bold text-foreground">Social Links</h3>
                    <div className="space-y-4">
                       {[
                          { icon: Globe, label: "Website", placeholder: "https://your-site.com" },
                          { icon: Twitter, label: "Twitter", placeholder: "https://twitter.com/..." },
                          { icon: Instagram, label: "Instagram", placeholder: "https://instagram.com/..." },
                          { icon: Youtube, label: "YouTube", placeholder: "https://youtube.com/..." },
                       ].map((link, i) => (
                          <div key={i} className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center shrink-0">
                                <link.icon className="h-5 w-5 text-muted-foreground" />
                             </div>
                             <Input placeholder={link.placeholder} className="flex-1 bg-muted/30 border-border/50" />
                          </div>
                       ))}
                       <Button variant="outline" className="w-full font-bold border-dashed border-2">
                          <LinkIcon className="h-4 w-4 mr-2" /> Add Link
                       </Button>
                    </div>
                 </div>
              </TabsContent>

              <TabsContent value="account" className="space-y-6 md:space-y-8 mt-0 focus-visible:ring-0">
                 {/* Security Settings */}
                 <div className="space-y-4 md:space-y-6 bg-card p-4 md:p-8 rounded-xl border border-border/50 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Security</h3>
                            <p className="text-xs text-muted-foreground">Manage your password and security settings</p>
                        </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" defaultValue="ash@example.com" readOnly className="bg-muted/30 border-border/50" />
                        </div>
                        <div className="space-y-2">
                             <Label>Two-Factor Authentication</Label>
                             <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50">
                                <span className="text-sm font-medium text-muted-foreground">Enable 2FA</span>
                                <Switch />
                             </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4 pt-4">
                        <p className="text-sm font-bold">Change Password</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input type="password" placeholder="Current Password" className="bg-muted/30 border-border/50" />
                            <Input type="password" placeholder="New Password" className="bg-muted/30 border-border/50" />
                            <Input type="password" placeholder="Confirm Password" className="bg-muted/30 border-border/50" />
                        </div>
                        <Button variant="outline" className="font-bold">Update Password</Button>
                    </div>
                 </div>

                 {/* Connected Accounts */}
                 <div className="bg-card p-4 md:p-8 rounded-xl border border-border/50 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-foreground">Connected Accounts</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Google", connected: true, icon: Globe },
                            { name: "Discord", connected: false, icon: MessageSquare },
                            { name: "Twitch", connected: false, icon:  Video },
                        ].map((account, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/50">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                        <account.icon className="h-5 w-5 text-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-foreground">{account.name}</p>
                                        <p className="text-xs text-muted-foreground">{account.connected ? "Connected" : "Not connected"}</p>
                                    </div>
                                </div>
                                <Button variant={account.connected ? "outline" : "default"} size="sm" className="font-bold">
                                    {account.connected ? "Disconnect" : "Connect"}
                                </Button>
                            </div>
                        ))}
                    </div>
                 </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 md:space-y-8 mt-0 focus-visible:ring-0">
                 {/* Email Notifications */}
                 <div className="bg-card p-4 md:p-8 rounded-xl border border-border/50 shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Email Notifications</h3>
                            <p className="text-xs text-muted-foreground">Manage what you receive via email</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { label: "New Subscriber Alerts", desc: "Get notified when someone subscribes", default: true },
                            { label: "Comment Notifications", desc: "When someone comments on your video", default: true },
                            { label: "Weekly Performance Digest", desc: "Summary of your channel's performance", default: true },
                            { label: "Product Updates", desc: "News about new features and updates", default: false },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-bold">{item.label}</Label>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                                <Switch defaultChecked={item.default} />
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* Push Notifications */}
                 <div className="bg-card p-4 md:p-8 rounded-xl border border-border/50 shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Push Notifications</h3>
                            <p className="text-xs text-muted-foreground">Manage mobile and browser alerts</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { label: "Live Stream Alerts", desc: "Notify when accounts you follow go live", default: true },
                            { label: "Direct Messages", desc: "When you receive a new message", default: true },
                            { label: "Mentions", desc: "When someone mentions you", default: true },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-bold">{item.label}</Label>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                                <Switch defaultChecked={item.default} />
                            </div>
                        ))}
                    </div>
                 </div>
              </TabsContent>
           </Tabs>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8">
           {/* Privacy */}
           <div className="bg-card p-6 md:p-8 rounded-xl border border-border/50 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                 <Lock className="h-4 w-4" /> Privacy & Safety
              </h3>
              <div className="space-y-4">
                 {[
                    { label: "Private Channel", desc: "Only subscribers can see content" },
                    { label: "Hide Subscriber Count", desc: "Don't show on profile" },
                    { label: "Allow Comments", desc: "Enable comments on videos" },
                 ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="space-y-0.5">
                          <Label className="text-sm font-bold">{item.label}</Label>
                          <p className="text-xs text-muted-foreground pr-2">{item.desc}</p>
                       </div>
                       <Switch />
                    </div>
                 ))}
              </div>
           </div>

           {/* Danger Zone */}
           <div className="bg-red-500/5 p-6 md:p-8 rounded-xl border border-red-500/20 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
                 <Shield className="h-4 w-4" /> Danger Zone
              </h3>
              <p className="text-xs text-red-400/80 font-medium">
                 Irreversible actions for your channel. Proceed with caution.
              </p>
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10 font-bold">
                 <LogOut className="h-4 w-4 mr-2" /> Delete Channel
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
