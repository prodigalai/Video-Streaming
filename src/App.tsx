import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MiniPlayerProvider } from "@/contexts/MiniPlayerContext";
import { MiniPlayer } from "@/components/player/MiniPlayer";
import Index from "./pages/Index";
import LivePage from "./pages/LivePage";
import TrendingPage from "./pages/TrendingPage";
import SearchPage from "./pages/SearchPage";
import CreatorProfilePage from "./pages/CreatorProfilePage";
import LiveWatchPage from "./pages/LiveWatchPage";
import VideoWatchPage from "./pages/VideoWatchPage";
import WalletPage from "./pages/WalletPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import LibraryPage from "./pages/LibraryPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotificationsPage from "./pages/NotificationsPage";
import MessagesPage from "./pages/MessagesPage";
import LegalPage from "./pages/LegalPage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import RewardsPage from "./pages/RewardsPage";
import CreatorsPage from "./pages/CreatorsPage";
import FollowingPage from "./pages/FollowingPage";
import ExplorePage from "./pages/ExplorePage";
import HistoryPage from "./pages/HistoryPage";

// Studio Imports
import { StudioLayout } from "./components/layout/studio/StudioLayout";
import DashboardPage from "./pages/studio/DashboardPage";
import ContentPage from "./pages/studio/ContentPage";
import LiveStreamingPage from "./pages/studio/LiveStreamingPage";
import AnalyticsPage from "./pages/studio/AnalyticsPage";
import MonetizationPage from "./pages/studio/MonetizationPage";
import CommentsPage from "./pages/studio/CommentsPage";
import SubscribersPage from "./pages/studio/SubscribersPage";
import StudioWalletPage from "./pages/studio/StudioWalletPage";
import StudioSettingsPage from "./pages/studio/StudioSettingsPage";
import KYCPage from "./pages/studio/KYCPage";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const CreatorGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || user?.role !== "creator") {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <MiniPlayerProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            {/* Auth Routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />

            {/* Viewer Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/live" element={<LivePage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/legal/:docId" element={<LegalPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/creators" element={<CreatorsPage />} />
            <Route path="/creator/:id" element={<CreatorProfilePage />} />
            <Route path="/watch/live/:id" element={<LiveWatchPage />} />
            <Route path="/watch/video/:id" element={<VideoWatchPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/following" element={<FollowingPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Creator Studio Routes */}
            <Route
              path="/studio/*"
              element={
                <CreatorGuard>
                  <StudioLayout>
                    <Routes>
                      <Route index element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<DashboardPage />} />
                      <Route path="content" element={<ContentPage />} />
                      <Route path="live" element={<LiveStreamingPage />} />
                      <Route path="analytics" element={<AnalyticsPage />} />
                      <Route path="monetization" element={<MonetizationPage />} />
                      <Route path="comments" element={<CommentsPage />} />
                      <Route path="subscribers" element={<SubscribersPage />} />
                      <Route path="wallet" element={<StudioWalletPage />} />
                      <Route path="kyc" element={<KYCPage />} />
                      <Route path="settings" element={<StudioSettingsPage />} />
                    </Routes>
                  </StudioLayout>
                </CreatorGuard>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <MiniPlayer />
        </BrowserRouter>
      </MiniPlayerProvider>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
