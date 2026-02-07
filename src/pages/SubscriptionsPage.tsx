import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Calendar, RefreshCw, CheckCircle, XCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainLayout } from "@/components/layout/MainLayout";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";

// Mock data
const activeSubscriptions = [
  {
    id: 1,
    creator: {
      id: "luna",
      name: "Luna Live",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
      isLive: true,
    },
    tier: "Premium",
    price: 499,
    renewsAt: "Feb 15, 2025",
    subscribedSince: "Dec 15, 2024",
  },
  {
    id: 2,
    creator: {
      id: "gamer",
      name: "GamerPro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer",
      isLive: false,
    },
    tier: "Standard",
    price: 199,
    renewsAt: "Feb 20, 2025",
    subscribedSince: "Jan 20, 2025",
  },
];

const expiredSubscriptions = [
  {
    id: 3,
    creator: {
      id: "maria",
      name: "ChefMaria",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      isLive: false,
    },
    tier: "Standard",
    price: 199,
    expiredAt: "Jan 10, 2025",
  },
  {
    id: 4,
    creator: {
      id: "beat",
      name: "BeatMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beat",
      isLive: true,
    },
    tier: "Premium",
    price: 399,
    expiredAt: "Dec 25, 2024",
  },
];

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Heart className="h-7 w-7 text-primary fill-primary/20" />
            My Subscriptions
          </h1>
          <p className="text-muted-foreground">Manage your creator subscriptions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">{activeSubscriptions.length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{expiredSubscriptions.length}</p>
              <p className="text-sm text-muted-foreground">Expired</p>
            </CardContent>
          </Card>
          <Card className="xs:col-span-2">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">
                {activeSubscriptions.reduce((sum, s) => sum + s.price, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Monthly Credits</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-md grid grid-cols-2 bg-muted/50">
            <TabsTrigger value="active">
              <CheckCircle className="h-4 w-4 mr-2" />
              Active ({activeSubscriptions.length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              <XCircle className="h-4 w-4 mr-2" />
              Expired ({expiredSubscriptions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            {activeSubscriptions.length > 0 ? (
              <div className="space-y-4">
                {activeSubscriptions.map((sub) => (
                  <Card key={sub.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                        <div className="flex items-center gap-4">
                          <Link to={`/creator/${sub.creator.id}`} className="relative">
                            <Avatar className="h-14 w-14">
                              <AvatarImage src={sub.creator.avatar} />
                              <AvatarFallback>{sub.creator.name[0]}</AvatarFallback>
                            </Avatar>
                            {sub.creator.isLive && (
                              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-live ring-2 ring-card live-pulse" />
                            )}
                          </Link>
                          <div>
                            <Link
                              to={`/creator/${sub.creator.id}`}
                              className="font-semibold hover:text-primary transition-colors"
                            >
                              {sub.creator.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="bg-primary/10 text-primary">
                                <Crown className="h-3 w-3 mr-1" />
                                {sub.tier}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {sub.price} credits/month
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            Renews {sub.renewsAt}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="secondary" size="sm">
                              Manage
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Heart className="h-10 w-10 text-muted-foreground" />}
                title="No Active Subscriptions"
                description="Subscribe to your favorite creators to access exclusive content."
                action={{
                  label: "Discover Creators",
                  onClick: () => {},
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="expired" className="mt-6">
            {expiredSubscriptions.length > 0 ? (
              <div className="space-y-4">
                {expiredSubscriptions.map((sub) => (
                  <Card key={sub.id} className="overflow-hidden opacity-75">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                        <div className="flex items-center gap-4">
                          <Link to={`/creator/${sub.creator.id}`} className="relative">
                            <Avatar className="h-14 w-14 grayscale">
                              <AvatarImage src={sub.creator.avatar} />
                              <AvatarFallback>{sub.creator.name[0]}</AvatarFallback>
                            </Avatar>
                          </Link>
                          <div>
                            <Link
                              to={`/creator/${sub.creator.id}`}
                              className="font-semibold hover:text-primary transition-colors"
                            >
                              {sub.creator.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">
                                {sub.tier}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {sub.price} credits/month
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <XCircle className="h-4 w-4" />
                            Expired {sub.expiredAt}
                          </div>
                          <Button size="sm" className="glow-primary-sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Renew
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Expired Subscriptions"
                description="All your subscriptions are active!"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
