import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background py-8 sm:py-12 md:py-16 px-4 sm:px-6 pb-safe">
        <div className="container max-w-2xl space-y-6 sm:space-y-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Contact Support</h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">We're here to help.</p>
          </div>
          
          <form className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="Your name" className="min-h-[44px] touch-manipulation" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="your@email.com" className="min-h-[44px] touch-manipulation" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px] sm:min-h-[150px]" />
            </div>

            <Button size="lg" className="w-full min-h-[48px] touch-manipulation">Send Message</Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
