import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Save, Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AdminSettingsView() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success('Settings saved successfully');
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Settings
        </h1>
        <p className="text-muted-foreground">Configure your platform settings</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payment Providers</TabsTrigger>
          <TabsTrigger value="email">Email & SMS</TabsTrigger>
          <TabsTrigger value="legal">Legal Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card className="p-6 border-border">
            <h3 className="text-lg mb-4">General Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="Nas Digital Growth" />
              </div>
              <div>
                <Label htmlFor="site-description">Site Description</Label>
                <Input
                  id="site-description"
                  defaultValue="Digital growth consultancy for students and entrepreneurs"
                />
              </div>
              <div>
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="admin@ndg.com" />
              </div>
              <Button onClick={handleSave} disabled={saving} className="bg-[var(--accent)]">
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <div className="space-y-4">
            <Card className="p-6 border-border">
              <h3 className="text-lg mb-4">Stripe</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="stripe-key">Publishable Key</Label>
                  <Input id="stripe-key" type="password" placeholder="pk_test_..." />
                </div>
                <div>
                  <Label htmlFor="stripe-secret">Secret Key</Label>
                  <Input id="stripe-secret" type="password" placeholder="sk_test_..." />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border">
              <h3 className="text-lg mb-4">bKash (Bangladesh)</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bkash-merchant">Merchant Number</Label>
                  <Input id="bkash-merchant" placeholder="01XXXXXXXXX" />
                </div>
                <div>
                  <Label htmlFor="bkash-api">API Key</Label>
                  <Input id="bkash-api" type="password" />
                </div>
              </div>
            </Card>

            <Button onClick={handleSave} disabled={saving} className="bg-[var(--accent)]">
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Payment Settings'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card className="p-6 border-border">
            <h3 className="text-lg mb-4">Email Provider (SMTP)</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input id="smtp-host" placeholder="smtp.gmail.com" />
              </div>
              <div>
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input id="smtp-port" placeholder="587" />
              </div>
              <div>
                <Label htmlFor="smtp-user">Username</Label>
                <Input id="smtp-user" type="email" />
              </div>
              <div>
                <Label htmlFor="smtp-password">Password</Label>
                <Input id="smtp-password" type="password" />
              </div>
              <Button onClick={handleSave} disabled={saving} className="bg-[var(--accent)]">
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Email Settings'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="mt-6">
          <Card className="p-6 border-border">
            <h3 className="text-lg mb-4">Legal Pages</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="privacy-policy">Privacy Policy URL</Label>
                <Input id="privacy-policy" placeholder="/privacy-policy" />
              </div>
              <div>
                <Label htmlFor="terms">Terms of Service URL</Label>
                <Input id="terms" placeholder="/terms-of-service" />
              </div>
              <div>
                <Label htmlFor="refund">Refund Policy URL</Label>
                <Input id="refund" placeholder="/refund-policy" />
              </div>
              <Button onClick={handleSave} disabled={saving} className="bg-[var(--accent)]">
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Legal Settings'}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
