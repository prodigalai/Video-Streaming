import { AgentLayout } from "@/components/layout/agent/AgentLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BadgeCheck, Upload } from "lucide-react";

export default function AgentKycPage() {
  return (
    <AgentLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-foreground">Verification & KYC</h1>
          <p className="text-muted-foreground">Complete your agency profile verification to process payouts.</p>
        </div>

        <Card className="border-green-500/20 bg-green-500/5">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-green-500/20 p-3 rounded-full">
                    <BadgeCheck className="h-6 w-6 text-green-500" />
                </div>
                <div>
                    <CardTitle className="text-green-500">Identity Verified</CardTitle>
                    <CardDescription>Your personal identity has been confirmed.</CardDescription>
                </div>
            </CardHeader>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Business Documents</CardTitle>
                <CardDescription>Please upload your agency registration documents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, JPG or PNG (max. 10MB)</p>
                </div>
                <div className="flex justify-end">
                    <Button>Submit for Review</Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </AgentLayout>
  );
}
