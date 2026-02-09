import { AgentLayout } from "@/components/layout/agent/AgentLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AgentEarningsPage() {
  const transactions = [
    { id: "tx_123", creator: "Luna Live", amount: "$50.00", commission: "$5.00", type: "Tip", status: "Completed", date: "2024-05-12" },
    { id: "tx_124", creator: "GamerPro", amount: "$150.00", commission: "$15.00", type: "Subscription", status: "Completed", date: "2024-05-12" },
    { id: "tx_125", creator: "Chef Maria", amount: "$25.00", commission: "$2.50", type: "Content Unlock", status: "Processing", date: "2024-05-11" },
  ];

  return (
    <AgentLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-foreground">Earnings & Payouts</h1>
          <p className="text-muted-foreground">Detailed breakdown of your agency commissions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue Generated</CardTitle>
            <CardDescription className="text-2xl font-bold text-foreground">$125,430.00</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Agency Commission (Total)</CardTitle>
            <CardDescription className="text-2xl font-bold text-green-500">$18,814.50</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-card">
           <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payout</CardTitle>
            <CardDescription className="text-2xl font-bold text-orange-500">$4,200.00</CardDescription>
          </CardHeader> 
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Most recent earnings from your managed creators.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Commission (10%)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.id}</TableCell>
                  <TableCell>{tx.creator}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell className="font-bold text-green-500">{tx.commission}</TableCell>
                  <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {tx.status}
                      </span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{tx.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AgentLayout>
  );
}
