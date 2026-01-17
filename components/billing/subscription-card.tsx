"use client"

import { Check } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ContentBlock } from "@/components/ui/content-block"
import { Spinner } from "@/components/ui/spinner"
import { trackEvent } from "@/lib/analytics/client"

interface Plan {
  id: string
  name: string
  price: string
  features: string[]
  popular?: boolean
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    features: ["Basic features", "Limited usage", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    popular: true,
    features: ["All features", "Unlimited usage", "Priority support", "Advanced analytics"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    features: ["All features", "Custom integrations", "Dedicated support", "SLA guarantee"],
  },
]

export function SubscriptionCard({ currentPlan }: { currentPlan?: string }) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    setLoading(planId)
    trackEvent("subscription_checkout_started", { planId })

    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      })

      const data = (await response.json()) as { url?: string }
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((plan) => (
        <ContentBlock
          key={plan.id}
          className={plan.popular ? "border-primary ring-1 ring-primary/20" : ""}
        >
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{plan.name}</h3>
                {plan.popular && <Badge>Popular</Badge>}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-sm text-foreground">/month</span>}
              </div>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              size="sm"
              className="w-full"
              variant={plan.popular ? "default" : "outline"}
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading === plan.id || currentPlan === plan.id}
            >
              {loading === plan.id ? (
                <>
                  <Spinner className="mr-2 h-3.5 w-3.5" />
                  Loading...
                </>
              ) : currentPlan === plan.id ? (
                "Current Plan"
              ) : plan.price === "Custom" ? (
                "Contact Sales"
              ) : (
                "Subscribe"
              )}
            </Button>
          </ContentBlock>
        ))}
    </div>
  )
}

