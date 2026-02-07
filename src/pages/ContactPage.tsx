import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="container max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Contact Support</h1>
            <p className="text-xl text-muted-foreground">We're here to help.</p>
          </div>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="Your name" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
            </div>

            <Button size="lg" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
