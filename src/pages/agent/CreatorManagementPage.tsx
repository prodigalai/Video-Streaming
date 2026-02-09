import { AgentLayout } from "@/components/layout/agent/AgentLayout";
import { useParams, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { 
  DollarSign, 
  Users, 
  MessageSquare, 
  Image as ImageIcon, 
  Unlock, 
  Settings,
  MoreVertical,
  Upload,
  BarChart2,
  Lock
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock Data
const CREATOR = {
  id: "luna",
  name: "Luna Live",
  username: "@luna_live",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
  stats: {
    subscribers: 2450,
    revenue: 12450,
    tips: 3200,
    messages: 12
  }
};

export default function CreatorManagementPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "feed");

  // Sync tab with URL
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setSearchParams({ tab: val });
  };
  
  // In a real app, fetch creator by ID. Using mock for now.
  
  return (
    <AgentLayout>
      <div className="bg-blue-500/10 border-b border-blue-500/20 p-2 text-center text-xs font-medium text-blue-500 mb-6 -mx-4 md:-mx-8 -mt-8 sticky top-0 z-10 backdrop-blur-md">
         <span className="flex items-center justify-center gap-2">
            <Lock className="h-3 w-3" />
            Agent View Mode: Managing {CREATOR.name}
         </span>
      </div>

      {/* Creator Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-card border border-border rounded-xl mb-8 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary ring-4 ring-primary/10">
            <AvatarImage src={CREATOR.avatar} />
            <AvatarFallback>{CREATOR.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight">{CREATOR.name}</h1>
                <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Online</Badge>
            </div>
            <p className="text-muted-foreground font-medium text-sm flex items-center gap-2 mt-1">
                <Users className="h-3 w-3" /> Managed by You • Exclusive Contract
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none">
                <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
            <Button className="flex-1 md:flex-none font-bold" onClick={() => handleTabChange('dms')}>
                <MessageSquare className="h-4 w-4 mr-2" /> Open DMs
            </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full space-y-6">
        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-none">
            <TabsList className="bg-muted/50 p-1 h-auto inline-flex w-auto">
                <TabsTrigger value="feed" className="px-4 py-2">Feed</TabsTrigger>
                <TabsTrigger value="subs" className="px-4 py-2">Subscribers</TabsTrigger>
                <TabsTrigger value="dms" className="px-4 py-2">Messages</TabsTrigger>
                <TabsTrigger value="wallet" className="px-4 py-2">Earnings</TabsTrigger>
            </TabsList>
        </div>
        
        {/* FEED MANAGEMENT */}
        <TabsContent value="feed" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Content Management</h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Upload className="h-4 w-4" /> Upload New Post
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">Upload Content as Agent</h3>
                            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                                <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm">Drag and drop media</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Caption</Label>
                                <Textarea placeholder="What's on your mind?" />
                            </div>
                            <div className="space-y-2">
                                <Label>Availability</Label>
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="sm" className="flex-1">Free</Button>
                                    <Button variant="default" size="sm" className="flex-1">Subscribers</Button>
                                    <Button variant="secondary" size="sm" className="flex-1">PPV</Button>
                                </div>
                            </div>
                            <Button className="w-full">Publish to Feed</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((post) => (
                    <Card key={post} className="overflow-hidden group">
                        <div className="aspect-video bg-muted relative">
                           {/* Placeholder for media */}
                           <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                               <ImageIcon className="h-8 w-8" />
                           </div>
                           <div className="absolute top-2 right-2">
                               <Badge variant="secondary" className="backdrop-blur-md bg-black/50 text-white">
                                   {post % 2 === 0 ? <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Sub Only</span> : "Free"}
                               </Badge>
                           </div>
                        </div>
                        <CardContent className="p-4">
                            <p className="text-sm line-clamp-2 mb-2">Just a sneak peek of the new set! 📸 felt cute might delete later...</p>
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <span>2 hours ago</span>
                                <div className="flex gap-2">
                                    <span className="flex items-center gap-1"><BarChart2 className="h-3 w-3" /> 1.2k</span>
                                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> $450</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>

        {/* SUBSCRIBERS */}
        <TabsContent value="subs" className="space-y-6 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Subscriber List</CardTitle>
                    <CardDescription>2,450 Active Subscribers</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: "John Doe", since: "2 months", status: "Active", tier: "VIP" },
                            { name: "Alex Smith", since: "5 days", status: "Active", tier: "Standard" },
                            { name: "Sarah Connor", since: "1 year", status: "Expired", tier: "Standard" },
                        ].map((sub, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>{sub.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-sm">{sub.name}</p>
                                        <p className="text-xs text-muted-foreground">Joined {sub.since} ago</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant={sub.status === 'Active' ? 'default' : 'destructive'} className="text-xs h-5">
                                        {sub.status}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground mt-1">{sub.tier} Tier</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        {/* MESSAGES */}
        <TabsContent value="dms" className="space-y-6 mt-6">
            <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg flex items-center gap-3 text-sm text-primary mb-4">
                <div className="bg-primary text-primary-foreground p-1 rounded-full">
                    <Users className="h-3 w-3" />
                </div>
                <strong>Agent Mode Active:</strong> You are replying to messages as <span className="underline">{CREATOR.name}</span>.
            </div>
            
            <Card className="h-[500px] flex items-center justify-center bg-muted/10 border-dashed relative overflow-hidden">
                <div className="text-center p-8">
                    <div className="bg-background p-4 rounded-full inline-block shadow-sm mb-4">
                        <MessageSquare className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Unified Fan Inbox</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        Manage all direct messages, tip requests, and media unlocks for {CREATOR.name} from a single interface.
                    </p>
                    <Button size="lg" className="font-bold">
                        Open Secure Inbox
                    </Button>
                </div>
            </Card>
        </TabsContent>

        {/* WALLET */}
        <TabsContent value="wallet" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card className="opacity-90">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-sm text-muted-foreground">Total Balance</CardTitle>
                        <Badge variant="outline" className="text-[10px] uppercase">Read Only</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,450.00</div>
                        <p className="text-xs text-muted-foreground mt-1">Available for withdrawal by Owner</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">+$2,450.00</div>
                    </CardContent>
                </Card>
                <Card className="border-orange-500/20 bg-orange-500/5 md:col-span-2 xl:col-span-1">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-orange-500 flex items-center gap-2">
                            <Lock className="h-3 w-3" /> Restricted Access
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            As an agent, you have <strong>view-only</strong> access to wallet stats. Withdrawal controls are restricted to the account owner.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </AgentLayout>
  );
}
