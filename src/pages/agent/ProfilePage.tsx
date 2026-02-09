import { AgentLayout } from "@/components/layout/agent/AgentLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  LogOut, 
  CreditCard, 
  AlertTriangle 
} from "lucide-react";

export default function AgentProfilePage() {
  return (
    <AgentLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-black text-foreground">My Profile</h1>
          <p className="text-muted-foreground">Manage your agent account settings.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" /> Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="name" defaultValue="Alex Agent" className="pl-10" />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" defaultValue="alex@agency.com" className="pl-10" />
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" /> Security
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                        <p className="font-medium">Password</p>
                        <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">Reset Password</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
                    <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-500" />
                        <div>
                            <p className="font-medium">2-Factor Authentication</p>
                            <p className="text-xs text-muted-foreground">Enabled via Authenticator App</p>
                        </div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-500">Active</Badge>
                </div>
            </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-500/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                    <AlertTriangle className="h-5 w-5" /> Restrictions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        You cannot change payout settings.
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        You cannot delete creator accounts.
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        KYC verification is handled by the agency owner.
                    </li>
                </ul>
            </CardContent>
        </Card>

        <div className="pt-4">
            <Separator className="mb-6" />
            <Button variant="destructive" className="w-full gap-2">
                <LogOut className="h-4 w-4" /> Sign Out
            </Button>
        </div>
      </div>
    </AgentLayout>
  );
}
