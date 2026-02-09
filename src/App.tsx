import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import AgentDashboardPage from "./pages/agent/DashboardPage";
import FanOnboardingPage from "./pages/onboarding/FanOnboardingPage";
import CreatorOnboardingPage from "./pages/onboarding/CreatorOnboardingPage";
import NotificationsPage from "./pages/NotificationsPage";
import MessagesPage from "./pages/MessagesPage";
import LegalPage from "./pages/LegalPage";
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import UKVatPolicyPage from "./pages/legal/UKVatPolicyPage";
import P2BTermsPage from "./pages/legal/P2BTermsPage";
import DMCAPage from "./pages/legal/DMCAPage";
import CryptoTermsPage from "./pages/legal/CryptoTermsPage";
import CreatorFanContractPage from "./pages/legal/CreatorFanContractPage";
import ComplaintsPage from "./pages/legal/ComplaintsPage";
import AppealsPage from "./pages/legal/AppealsPage";
import AntiSlaveryPage from "./pages/legal/AntiSlaveryPage";
import AUPPage from "./pages/legal/AUPPage";
import RecordKeepingPage from "./pages/legal/RecordKeepingPage";
import LegalDocumentPage from "./pages/legal/LegalDocumentPage";
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

// Agent Imports
import AgentRosterPage from "./pages/agent/RosterPage";
import AgentInboxPage from "./pages/agent/InboxPage";
import AgentEarningsPage from "./pages/agent/EarningsPage";
import AgentKycPage from "./pages/agent/KYCPage";
import AgentSettingsPage from "./pages/agent/SettingsPage";
import CreatorManagementPage from "./pages/agent/CreatorManagementPage";
import AgentOnboardingPage from "./pages/agent/OnboardingPage";
import AgentProfilePage from "./pages/agent/ProfilePage";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const CreatorGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || user?.role !== "creator") {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
};

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
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
            <ScrollToTop />
            <Routes>
            {/* Auth Routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

            {/* Onboarding Routes */}
            <Route path="/onboarding/fan" element={<FanOnboardingPage />} />
            <Route path="/onboarding/creator" element={<CreatorOnboardingPage />} />
            <Route path="/onboarding/agent" element={<AgentOnboardingPage />} />

            {/* Viewer Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/live" element={<LivePage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/legal/terms" element={<TermsPage />} />
            <Route path="/legal/privacy" element={<PrivacyPage />} />
            <Route path="/legal/uk-vat" element={<UKVatPolicyPage />} />
            <Route path="/legal/p2b" element={<P2BTermsPage />} />
            <Route path="/legal/dmca" element={<DMCAPage />} />
            <Route path="/legal/creator-agreement" element={<CreatorFanContractPage />} />
            <Route path="/legal/crypto-terms" element={<CryptoTermsPage />} />
            <Route path="/legal/complaints" element={<ComplaintsPage />} />
            <Route path="/legal/appeals" element={<AppealsPage />} />
            <Route path="/legal/anti-slavery" element={<AntiSlaveryPage />} />
            <Route path="/legal/aup" element={<AUPPage />} />
            <Route path="/legal/record-keeping" element={<RecordKeepingPage />} />
            <Route path="/legal/:docId" element={<LegalDocumentPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/creators" element={<CreatorsPage />} />
            <Route path="/creator/:id" element={<CreatorProfilePage />} />
            <Route path="/watch/live/:id" element={<LiveWatchPage />} />
            <Route path="/watch/video/:id" element={<VideoWatchPage />} />
            <Route path="/wallet" element={<RequireAuth><WalletPage /></RequireAuth>} />
            <Route path="/subscriptions" element={<RequireAuth><SubscriptionsPage /></RequireAuth>} />
            <Route path="/following" element={<FollowingPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/history" element={<RequireAuth><HistoryPage /></RequireAuth>} />
            <Route path="/library" element={<RequireAuth><LibraryPage /></RequireAuth>} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            


            {/* Agent Routes */}
            <Route path="/agent/onboarding" element={<AgentOnboardingPage />} />
            <Route path="/agent/dashboard" element={<AgentDashboardPage />} />
            <Route path="/agent/roster" element={<AgentRosterPage />} />
            <Route path="/agent/inbox" element={<AgentInboxPage />} />
            <Route path="/agent/earnings" element={<AgentEarningsPage />} />
            <Route path="/agent/profile" element={<AgentProfilePage />} />
            <Route path="/agent/settings" element={<AgentSettingsPage />} />
            <Route path="/agent/creator/:id" element={<CreatorManagementPage />} />

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
                      <Route path="messages" element={<CommentsPage />} />
                      <Route path="comments" element={<CommentsPage />} />
                      <Route path="subscribers" element={<SubscribersPage />} />
                      <Route path="wallet" element={<StudioWalletPage />} />
                      <Route path="kyc" element={<KYCPage />} />
                      <Route path="profile" element={<StudioSettingsPage />} />
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
