import { MainLayout } from "@/components/layout/MainLayout";
import { HomeFeed } from "@/components/feed/HomeFeed";

const Index = () => {
  return (
    <MainLayout>
        <div className="relative overflow-x-hidden min-h-screen bg-transparent">
          {/* Ambient background orbs & Particles */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="cosmos-particles" />
            <div className="ambient-orb orb-primary w-[600px] h-[600px] -top-[200px] -left-[200px] opacity-10" />
            <div className="ambient-orb orb-secondary w-[400px] h-[400px] top-[50%] -right-[100px] opacity-10" />
          </div>

          {/* Central Feed */}
          <div className="relative z-10 pt-safe pb-safe">
             <HomeFeed />
          </div>
        </div>
    </MainLayout>
  );
};

export default Index;
