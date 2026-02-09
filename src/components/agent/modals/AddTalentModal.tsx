import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function AddTalentModal({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<"invite" | "success">("invite");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInvite = async () => {
      if (!email) return;
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
          setIsLoading(false);
          setInviteLink(`https://viewer.app/invite/agent-ref-${Math.random().toString(36).substr(2, 9)}`);
          setStep("success");
          toast.success("Invitation sent successfully!");
      }, 1500);
  };

  const copyLink = () => {
      navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
      setStep("invite");
      setEmail("");
      setInviteLink("");
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{step === "invite" ? "Add New Talent" : "Invitation Sent"}</DialogTitle>
          <DialogDescription>
            {step === "invite" 
                ? "Invite a creator to join your agency roster. They will receive an email with instructions." 
                : "The creator has been invited. You can also share this direct link with them."}
          </DialogDescription>
        </DialogHeader>

        {step === "invite" ? (
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Creator's Email</Label>
                    <Input 
                        id="email" 
                        placeholder="creator@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="contract">Contract Type</Label>
                    <Select defaultValue="exclusive">
                        <SelectTrigger>
                            <SelectValue placeholder="Select contract type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="exclusive">Exclusive Management (80/20)</SelectItem>
                            <SelectItem value="non-exclusive">Non-Exclusive (90/10)</SelectItem>
                            <SelectItem value="trial">Trial Period (30 Days)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleInvite} disabled={!email || isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Send Invitation
                </Button>
            </div>
        ) : (
            <div className="grid gap-4 py-4">
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">Link</Label>
                        <Input id="link" defaultValue={inviteLink} readOnly className="font-mono text-xs" />
                    </div>
                    <Button size="sm" className="px-3" onClick={copyLink}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy</span>
                    </Button>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground text-center">
                    Waiting for creator to accept...
                </div>
                <Button variant="outline" onClick={() => setStep("invite")}>Send Another Invite</Button>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
