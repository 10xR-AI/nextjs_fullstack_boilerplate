import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { SubscriptionCard } from "@/components/billing/subscription-card"
import { Button } from "@/components/ui/button"
import { ContentBlock, ContentBlockDescription, ContentBlockHeader, ContentBlockTitle } from "@/components/ui/content-block"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db/mongoose"
import { Subscription } from "@/lib/models/billing"

export default async function BillingPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect("/login")
  }

  await connectDB()

  // Get user's subscription
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscription = await (Subscription as any).findOne({
    userId: session.user.id,
    status: "active",
  })

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="space-y-0.5">
        <h1 className="text-lg font-semibold">Billing & Subscription</h1>
        <p className="mt-0.5 text-sm text-foreground">Manage your subscription and billing</p>
      </div>

      <SubscriptionCard currentPlan={subscription?.planId} />

      {subscription && (
        <ContentBlock>
          <ContentBlockHeader>
            <ContentBlockTitle>Current Subscription</ContentBlockTitle>
          </ContentBlockHeader>
          <div className="space-y-2">
            <p className="text-sm text-foreground">
              <strong>Plan:</strong> {subscription.planId}
            </p>
            <p className="text-sm text-foreground">
              <strong>Status:</strong> {subscription.status}
            </p>
            <p className="text-sm text-foreground">
              <strong>Renews:</strong>{" "}
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
          </div>
          <form action="/api/billing/portal" method="POST" className="pt-4">
            <Button type="submit" size="sm">
              Manage Subscription
            </Button>
          </form>
        </ContentBlock>
      )}
    </div>
  )
}

