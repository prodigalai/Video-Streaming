import { MainLayout } from "@/components/layout/MainLayout";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="container max-w-3xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">About StreamVault</h1>
            <p className="text-xl text-muted-foreground">The future of creator monetization.</p>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p>
              StreamVault is built for creators who want to own their audience and their income. 
              We provide a premium, high-performance platform for live streaming, video on demand, and community engagement.
            </p>
            <h3>Our Mission</h3>
            <p>
              To empower creators with professional tools, fair monetization, and direct connection to their fans, 
              without the algorithmic interference found on other platforms.
            </p>
            <h3>Why StreamVault?</h3>
            <ul>
              <li>High-quality live streaming</li>
              <li>Instant payments and transparent earnings</li>
              <li>Premium user experience for fans</li>
              <li>Dedicated support for creators and agents</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
