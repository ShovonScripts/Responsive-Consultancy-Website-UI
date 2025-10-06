import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CreditCard, Info } from 'lucide-react';

export function DemoPaymentInfo() {
  return (
    <Card className="p-4 bg-blue-500/5 border-blue-500/20">
      <div className="flex gap-3">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">Demo Payment Mode</span>
            <Badge variant="outline" className="text-xs">Testing</Badge>
          </div>
          <p className="text-muted-foreground">
            This is a demonstration checkout. No real payments will be processed.
          </p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <CreditCard className="w-3 h-3" />
              Use any card number (e.g., 4242 4242 4242 4242)
            </p>
            <p>• Any future expiry date (MM/YY format)</p>
            <p>• Any 3-4 digit CVV</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
