import { PageContainer } from '@/widgets/app-shell';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/ui/card';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { Info } from 'lucide-react';
import { billingInfoContent } from '@/shared/config/infoconfig';

export default function BillingPage() {
  return (
    <PageContainer
      infoContent={billingInfoContent}
      pageTitle='Billing & Plans'
      pageDescription='Manage your subscription and usage limits'
    >
      <div className='space-y-6'>
        <Alert>
          <Info className='h-4 w-4' />
          <AlertDescription>
            This is a development template. Billing features can be integrated
            with your preferred payment provider (Stripe, Paddle, etc.).
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>
              Choose a plan that fits your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4 md:grid-cols-3'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Free</CardTitle>
                  <CardDescription>$0/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className='text-muted-foreground space-y-2 text-sm'>
                    <li>Basic features</li>
                    <li>1 project</li>
                    <li>Community support</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className='border-primary'>
                <CardHeader>
                  <CardTitle className='text-lg'>Pro</CardTitle>
                  <CardDescription>$19/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className='text-muted-foreground space-y-2 text-sm'>
                    <li>All Free features</li>
                    <li>Unlimited projects</li>
                    <li>Priority support</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Enterprise</CardTitle>
                  <CardDescription>Contact us</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className='text-muted-foreground space-y-2 text-sm'>
                    <li>All Pro features</li>
                    <li>Custom integrations</li>
                    <li>Dedicated support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
