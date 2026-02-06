import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Share2, 
  Pencil, 
  User, 
  Search, 
  Facebook, 
  Twitter, 
  Copy, 
  Code,
  MoreVertical,
  Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/MainLayout";
import { LiveChat } from "@/components/live/LiveChat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("home");
  const username = "AshN0408";

  // Mock data matching the screenshot
  const isOffline = true;
  const followers = 0;

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin">
          
          {/* Banner Section */}
          <div className="relative w-full h-64 md:h-80 bg-green-500 overflow-hidden group">
            {/* Pattern Background matching screenshot */}
            <div className="absolute inset-0 opacity-100" 
                 style={{
                   backgroundImage: 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)',
                   backgroundSize: '20px 20px',
                   backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                   backgroundColor: '#00ff00' // Bright green base
                 }} 
            />
            
            {/* Offline Badge Overlay */}
            {isOffline && (
              <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-md px-4 py-3 rounded-md flex items-center gap-3 border border-white/10 shadow-xl z-10">
                 <div className="bg-white text-black text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">
                   Offline
                 </div>
                 <span className="text-white font-bold text-lg">{username} is offline</span>
              </div>
            )}

            {/* Edit Banner Button */}
            <Button size="icon" variant="secondary" className="absolute top-4 right-4 h-9 w-9 bg-black/50 hover:bg-black/70 text-white border-none backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>

          {/* Profile Header Bar */}
          <div className="bg-[#0f0f13] border-b border-white/5 p-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative -mt-16 rounded-full p-1.5 bg-[#0f0f13]">
                <Avatar className="h-24 w-24 ring-4 ring-[#0f0f13] shadow-2xl">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback className="bg-primary text-black text-2xl font-bold">AN</AvatarFallback>
                </Avatar>
                {isOffline && (
                   <div className="absolute bottom-2 right-2 h-5 w-5 bg-[#0f0f13] rounded-full flex items-center justify-center">
                     <div className="h-3 w-3 bg-gray-500 rounded-full border-2 border-[#0f0f13]" />
                   </div>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">{username}</h1>
                </div>
                <p className="text-muted-foreground text-sm font-medium">{followers} followers</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-auto mb-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 gap-2 text-white/80 hover:text-white hover:bg-white/10">
                    <Share2 className="h-4 w-4" />
                    Share via
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-0 bg-[#18181b] border-white/10 text-white">
                  <div className="p-4 border-b border-white/10">
                    <h4 className="font-bold mb-4">Share via</h4>
                    <div className="flex justify-between gap-2">
                      <Button variant="ghost" className="flex-1 flex flex-col gap-2 h-auto py-3 hover:bg-white/5">
                        <div className="h-10 w-10 rounded-full bg-[#1877f2] flex items-center justify-center">
                          <Facebook className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xs text-muted-foreground">Facebook</span>
                      </Button>
                      <Button variant="ghost" className="flex-1 flex flex-col gap-2 h-auto py-3 hover:bg-white/5">
                        <div className="h-10 w-10 rounded-full bg-black border border-white/20 flex items-center justify-center">
                          <Twitter className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xs text-muted-foreground">X</span>
                      </Button>
                      <Button variant="ghost" className="flex-1 flex flex-col gap-2 h-auto py-3 bg-white/10 border border-white/20">
                         <div className="h-10 w-10 rounded-full bg-transparent border border-white/20 flex items-center justify-center relative">
                           <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
                           <Copy className="h-5 w-5 text-white z-10" />
                         </div>
                         <span className="text-xs font-bold text-white">Copy</span>
                      </Button>
                       <Button variant="ghost" className="flex-1 flex flex-col gap-2 h-auto py-3 hover:bg-white/5">
                        <div className="h-10 w-10 rounded-full bg-transparent border border-white/20 flex items-center justify-center">
                          <Code className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xs text-muted-foreground">Embed</span>
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="h-9 w-9 text-white/80 hover:text-white hover:bg-white/10">
                <MoreVertical className="h-4 w-4" />
              </Button>
              
              <Button size="icon" variant="ghost" className="h-9 w-9 text-white/80 hover:text-white hover:bg-white/10">
                 <User className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="px-6 md:px-12 mt-2">
            <Tabs defaultValue="home" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="h-auto bg-transparent p-0 gap-6 border-b border-transparent w-full justify-start rounded-none">
                {["Home", "About", "Videos", "Clips"].map((tab) => (
                  <TabsTrigger 
                    key={tab}
                    value={tab.toLowerCase()}
                    className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 text-base font-medium text-muted-foreground data-[state=active]:text-primary transition-all hover:text-white"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 md:p-12 flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-md">
               <div className="h-24 w-24 rounded-lg bg-white/5 flex items-center justify-center mb-2">
                 <Search className="h-10 w-10 text-white/20" />
               </div>
               <h3 className="text-xl font-bold text-white">No content available</h3>
               <p className="text-muted-foreground">This channel doesn't have any content yet</p>
            </div>
          </div>

        </div>

        {/* Right Sidebar - Chat */}
        <div className="w-[340px] border-l border-white/5 bg-[#0f0f13] hidden lg:block">
           <LiveChat />
        </div>

      </div>
    </MainLayout>
  );
}
