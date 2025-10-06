import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Star, Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export function UIKitPage() {
  return (
    <div className="py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            NDG Component Library
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive UI kit with Light & Dark theme variants
          </p>
        </div>

        <div className="space-y-16">
          {/* Colors */}
          <section>
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Brand Colors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Card className="p-6 text-center border-border">
                <div className="w-16 h-16 rounded-lg mx-auto mb-3" style={{ backgroundColor: 'var(--accent)' }} />
                <div className="font-medium mb-1">Accent</div>
                <div className="text-xs text-muted-foreground">#16A34A</div>
              </Card>
              <Card className="p-6 text-center border-border">
                <div className="w-16 h-16 rounded-lg mx-auto mb-3" style={{ backgroundColor: 'var(--accent2)' }} />
                <div className="font-medium mb-1">Accent 2</div>
                <div className="text-xs text-muted-foreground">#0F74FF</div>
              </Card>
              <Card className="p-6 text-center border-border">
                <div className="w-16 h-16 rounded-lg mx-auto mb-3" style={{ backgroundColor: 'var(--gold)' }} />
                <div className="font-medium mb-1">Gold</div>
                <div className="text-xs text-muted-foreground">#D4AF37</div>
              </Card>
              <Card className="p-6 text-center border-border">
                <div className="w-16 h-16 rounded-lg mx-auto mb-3 bg-foreground" />
                <div className="font-medium mb-1">Ink</div>
                <div className="text-xs text-muted-foreground">Foreground</div>
              </Card>
              <Card className="p-6 text-center border-border">
                <div className="w-16 h-16 rounded-lg mx-auto mb-3 bg-muted" />
                <div className="font-medium mb-1">Muted</div>
                <div className="text-xs text-muted-foreground">Secondary</div>
              </Card>
            </div>
          </section>

          {/* Typography */}
          <section>
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Typography
            </h2>
            <Card className="p-8 border-border space-y-6">
              <div>
                <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>Heading 1 - Poppins</h1>
                <p className="text-sm text-muted-foreground">2.25rem / 36px</p>
              </div>
              <div>
                <h2 style={{ fontFamily: 'Poppins, sans-serif' }}>Heading 2 - Poppins</h2>
                <p className="text-sm text-muted-foreground">1.875rem / 30px</p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif' }}>Heading 3 - Poppins</h3>
                <p className="text-sm text-muted-foreground">1.5rem / 24px</p>
              </div>
              <div>
                <p style={{ fontFamily: 'Inter, sans-serif' }}>
                  Body text - Inter. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-sm text-muted-foreground">1rem / 16px</p>
              </div>
            </Card>
          </section>

          {/* Buttons */}
          <section>
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Buttons
            </h2>
            <Card className="p-8 border-border">
              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Primary Buttons</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white">
                      Primary
                    </Button>
                    <Button className="bg-[var(--accent2)] hover:bg-[var(--accent2-hover)] text-white">
                      Accent 2
                    </Button>
                    <Button className="bg-[var(--gold)] hover:bg-[var(--gold-hover)] text-white">
                      Gold
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="mb-3 block">Secondary & Outline</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="mb-3 block">Sizes</Label>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Form Elements */}
          <section>
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Form Elements
            </h2>
            <Card className="p-8 border-border">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="input-demo">Input</Label>
                  <Input id="input-demo" placeholder="Enter text..." className="bg-input-background border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="select-demo">Select</Label>
                  <Select>
                    <SelectTrigger id="select-demo" className="bg-input-background border-border">
                      <SelectValue placeholder="Choose..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Option 1</SelectItem>
                      <SelectItem value="2">Option 2</SelectItem>
                      <SelectItem value="3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="textarea-demo">Textarea</Label>
                  <Textarea id="textarea-demo" placeholder="Enter longer text..." className="bg-input-background border-border" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox-demo" />
                  <Label htmlFor="checkbox-demo">Checkbox option</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="switch-demo" />
                  <Label htmlFor="switch-demo">Switch toggle</Label>
                </div>
              </div>
            </Card>
          </section>

          {/* Badges */}
          <section>
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Badges & Labels
            </h2>
            <Card className="p-8 border-border">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-[var(--accent)] text-white">Accent</Badge>
                <Badge className="bg-[var(--accent2)] text-white">Accent 2</Badge>
                <Badge className="bg-[var(--gold)] text-white">Gold</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </Card>
          </section>

          {/* Progress & Loading */}
          <section>
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Progress & Loading
            </h2>
            <Card className="p-8 border-border space-y-8">
              <div>
                <Label className="mb-3 block">Progress Bar</Label>
                <Progress value={65} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">65% complete</p>
              </div>
              <Separator />
              <div>
                <Label className="mb-3 block">Skeleton Loading</Label>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </Card>
          </section>

          {/* Alerts */}
          <section>
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Alerts
            </h2>
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>This is an informational alert message.</AlertDescription>
              </Alert>
              <Alert className="border-[var(--accent)] bg-[var(--accent)]/5">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your action was completed successfully.</AlertDescription>
              </Alert>
              <Alert className="border-yellow-500 bg-yellow-500/5">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Please review this important information.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </Alert>
            </div>
          </section>

          {/* Tabs */}
          <section>
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Tabs
            </h2>
            <Tabs defaultValue="tab1">
              <TabsList className="bg-muted/30">
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <Card className="p-6 border-border">
                  <p>Content for Tab 1</p>
                </Card>
              </TabsContent>
              <TabsContent value="tab2">
                <Card className="p-6 border-border">
                  <p>Content for Tab 2</p>
                </Card>
              </TabsContent>
              <TabsContent value="tab3">
                <Card className="p-6 border-border">
                  <p>Content for Tab 3</p>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* Accordion */}
          <section>
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Accordion
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-1" className="border border-border rounded-lg px-6">
                <AccordionTrigger>What is included?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Full access to all courses, live sessions, and community resources.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-border rounded-lg px-6">
                <AccordionTrigger>How does billing work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You'll be charged monthly or annually depending on your plan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-border rounded-lg px-6">
                <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time from your dashboard.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Cards */}
          <section>
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Cards
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-border">
                <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Basic Card</h3>
                <p className="text-sm text-muted-foreground">
                  Simple card with border and padding.
                </p>
              </Card>
              <Card className="p-6 border-border hover:shadow-lg transition-shadow">
                <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Hover Card</h3>
                <p className="text-sm text-muted-foreground">
                  Card with hover shadow effect.
                </p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent2)]/5 border-border">
                <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Gradient Card</h3>
                <p className="text-sm text-muted-foreground">
                  Card with gradient background.
                </p>
              </Card>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}