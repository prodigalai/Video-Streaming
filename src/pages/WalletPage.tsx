import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Wallet, 
  Plus, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft,
  Bitcoin,
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Coins,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

// Mock data
const walletData = {
  balance: 1250,
  pending: 50,
};

const transactions = [
  { id: 1, type: "purchase", description: "Video Unlock - Business Strategy", amount: -75, status: "completed", date: "Today, 2:30 PM" },
  { id: 2, type: "tip", description: "Tip to Luna_Live", amount: -100, status: "completed", date: "Today, 1:15 PM" },
  { id: 3, type: "deposit", description: "Credit Purchase", amount: 500, status: "completed", date: "Yesterday" },
  { id: 4, type: "subscription", description: "Monthly Subscription - GamerPro", amount: -199, status: "completed", date: "Jan 28, 2025" },
  { id: 5, type: "deposit", description: "Credit Purchase", amount: 1000, status: "pending", date: "Jan 27, 2025" },
  { id: 6, type: "refund", description: "Refund - Cancelled Subscription", amount: 99, status: "completed", date: "Jan 25, 2025" },
];

const creditPackages = [
  { credits: 100, price: 9.99, popular: false },
  { credits: 500, price: 39.99, popular: true, bonus: 50 },
  { credits: 1000, price: 74.99, popular: false, bonus: 150 },
  { credits: 2500, price: 174.99, popular: false, bonus: 500 },
];

const paymentMethods = [
  { id: "card", name: "Credit / Debit Card", icon: CreditCard, description: "Visa, Mastercard, Amex" },
  { id: "bank", name: "Bank Transfer", icon: Building2, description: "Direct bank transfer" },
  { id: "crypto", name: "Cryptocurrency", icon: Bitcoin, description: "BTC, ETH, USDT" },
];

export default function WalletPage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "success" | "failed">("idle");

  const handlePurchase = () => {
    setPaymentStatus("pending");
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus(Math.random() > 0.2 ? "success" : "failed");
    }, 2000);
  };

  const resetPayment = () => {
    setPaymentStatus("idle");
    setSelectedPackage(null);
    setSelectedPaymentMethod(null);
  };

  return (
    <MainLayout>
      <div className="container py-4 sm:py-6 px-4 sm:px-6 space-y-4 sm:space-y-6 pb-safe">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2 truncate">
              <Wallet className="h-6 w-6 sm:h-7 sm:w-7 text-primary shrink-0" />
              Wallet
            </h1>
            <p className="text-sm text-muted-foreground">Manage your credits and payments</p>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6 md:p-8 relative">
            <div className="flex flex-col md:flex-row items-center md:justify-between text-center md:text-left gap-6">
              <div className="flex flex-col items-center md:items-start">
                <p className="text-primary-foreground/70 mb-1">Available Balance</p>
                <div className="flex items-baseline gap-2">
                  <Coins className="h-8 w-8" />
                  <span className="text-4xl md:text-5xl font-bold">{walletData.balance.toLocaleString()}</span>
                  <span className="text-xl">credits</span>
                </div>
                {walletData.pending > 0 && (
                  <p className="text-primary-foreground/70 mt-2 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {walletData.pending} credits pending
                  </p>
                )}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Credits
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg w-[calc(100vw-2rem)] max-h-[90dvh] overflow-y-auto">
                  {paymentStatus === "idle" && (
                    <>
                      <DialogHeader>
                        <DialogTitle>Add Credits</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        {/* Credit Packages */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {creditPackages.map((pkg, i) => (
                            <button
                              key={pkg.credits}
                              onClick={() => setSelectedPackage(i)}
                              className={cn(
                                "relative p-4 rounded-xl border-2 transition-all text-left",
                                selectedPackage === i
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              {pkg.popular && (
                                <Badge className="absolute -top-2 right-2 bg-primary">Popular</Badge>
                              )}
                              <div className="flex items-center gap-1 mb-1">
                                <Coins className="h-5 w-5 text-primary" />
                                <span className="text-xl font-bold">{pkg.credits}</span>
                              </div>
                              {pkg.bonus && (
                                <p className="text-xs text-success mb-1">+{pkg.bonus} bonus</p>
                              )}
                              <p className="text-lg font-semibold">${pkg.price}</p>
                            </button>
                          ))}
                        </div>

                        {/* Payment Methods */}
                        {selectedPackage !== null && (
                          <div className="space-y-3">
                            <p className="font-medium">Payment Method</p>
                            {paymentMethods.map((method) => (
                              <button
                                key={method.id}
                                onClick={() => setSelectedPaymentMethod(method.id)}
                                className={cn(
                                  "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                                  selectedPaymentMethod === method.id
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                )}
                              >
                                <method.icon className="h-6 w-6 text-primary" />
                                <div className="text-left">
                                  <p className="font-medium">{method.name}</p>
                                  <p className="text-sm text-muted-foreground">{method.description}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        <Button
                          className="w-full glow-primary-sm"
                          disabled={selectedPackage === null || selectedPaymentMethod === null}
                          onClick={handlePurchase}
                        >
                          Purchase {selectedPackage !== null && creditPackages[selectedPackage].credits} Credits
                        </Button>
                      </div>
                    </>
                  )}

                  {paymentStatus === "pending" && (
                    <div className="py-12 text-center">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Clock className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Processing Payment</h3>
                      <p className="text-muted-foreground">Please wait...</p>
                    </div>
                  )}

                  {paymentStatus === "success" && (
                    <div className="py-12 text-center">
                      <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-success" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
                      <p className="text-muted-foreground mb-6">
                        {selectedPackage !== null && creditPackages[selectedPackage].credits} credits have been added to your wallet.
                      </p>
                      <Button onClick={resetPayment}>Done</Button>
                    </div>
                  )}

                  {paymentStatus === "failed" && (
                    <div className="py-12 text-center">
                      <div className="h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
                        <XCircle className="h-8 w-8 text-destructive" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Payment Failed</h3>
                      <p className="text-muted-foreground mb-6">
                        Something went wrong. Please try again.
                      </p>
                      <Button onClick={resetPayment} variant="secondary">Try Again</Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-2 p-3 sm:p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors min-w-0"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center",
                      tx.amount > 0 ? "bg-success/20" : "bg-muted"
                    )}>
                      {tx.amount > 0 ? (
                        <ArrowDownLeft className="h-5 w-5 text-success" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{tx.description}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn(
                      "font-semibold",
                      tx.amount > 0 ? "text-success" : "text-foreground"
                    )}>
                      {tx.amount > 0 ? "+" : ""}{tx.amount}
                    </p>
                    {tx.status === "pending" && (
                      <Badge variant="secondary" className="bg-warning/20 text-warning">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
