import { AgentLayout } from "@/components/layout/agent/AgentLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AgentSettingsPage() {
  return (
    <AgentLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-foreground">Agency Settings</h1>
          <p className="text-muted-foreground">Configure your dashboard and permissions.</p>
        </div>

        <div className="space-y-6">
            <h2 className="text-lg font-bold">Notifications</h2>
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label className="text-base">New Creator Signups</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts when new creators join your roster.</p>
                </div>
                <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label className="text-base">Payout Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about successful or failed payouts.</p>
                </div>
                <Switch defaultChecked />
            </div>
            
            <h2 className="text-lg font-bold pt-4">Security</h2>
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Secure your account with 2FA.</p>
                </div>
                <Button variant="outline">Enabled</Button>
            </div>
        </div>
      </div>
    </AgentLayout>
  );
}
