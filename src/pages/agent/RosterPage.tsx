import { AgentLayout } from "@/components/layout/agent/AgentLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, UserPlus, Settings, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

import { AddTalentModal } from "@/components/agent/modals/AddTalentModal"; // Import Modal

export default function AgentRosterPage() {
  const creators = [
    { name: "Luna Live", username: "@luna_live", status: "Online", type: "Exclusive", revenue: "$12,450", avatar: "luna" },
    { name: "GamerPro", username: "@gamerpro", status: "Offline", type: "Non-Exclusive", revenue: "$8,230", avatar: "gamer" },
    { name: "Chef Maria", username: "@chef_maria", status: "Online", type: "Exclusive", revenue: "$5,600", avatar: "maria" },
    { name: "Music Mike", username: "@music_mike", status: "Offline", type: "Trial", revenue: "$3,400", avatar: "mike" },
  ];

  return (
    <AgentLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-foreground">My Roster</h1>
          <p className="text-muted-foreground">Manage accounts, permissions, and contracts.</p>
        </div>
        
        <AddTalentModal>
            <Button className="font-bold gap-2">
                <UserPlus className="h-4 w-4" /> Add Talent
            </Button>
        </AddTalentModal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {creators.map((creator, i) => (
          <Link to={`/agent/creator/${creator.username.replace('@', '')}`} key={i} className="block group">
            <Card className="hover:border-primary/50 transition-all cursor-pointer h-full group-hover:shadow-md">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex gap-4">
                    <Avatar className="h-12 w-12 border-2 border-background group-hover:border-primary transition-colors">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.avatar}`} />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                    <CardTitle className="text-lg">{creator.name}</CardTitle>
                    <CardDescription>{creator.username}</CardDescription>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.preventDefault()}>
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Manage Contract</DropdownMenuItem>
                    <DropdownMenuItem>Analytics</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Remove from Roster</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={creator.status === 'Online' ? 'default' : 'secondary'}>
                        {creator.status}
                    </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Contract Type</span>
                    <span className="font-medium">{creator.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Revenue</span>
                    <span className="font-bold text-green-500">{creator.revenue}</span>
                    </div>
                    
                    <div className="pt-4 flex gap-2">
                        <Button variant="outline" className="flex-1 text-xs">
                            <Settings className="h-3.5 w-3.5 mr-2" /> Settings
                        </Button>
                        <Button variant="secondary" className="flex-1 text-xs">
                            <ExternalLink className="h-3.5 w-3.5 mr-2" /> Login As
                        </Button>
                    </div>
                </div>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AgentLayout>
  );
}
