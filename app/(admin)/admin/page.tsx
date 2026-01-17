import { headers } from "next/headers"
import { ContentBlock, ContentBlockDescription, ContentBlockHeader, ContentBlockTitle } from "@/components/ui/content-block"
import { Metric, MetricGrid } from "@/components/ui/metric"
import { getAuditLogs } from "@/lib/audit/logger"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db/mongoose"
import { prisma } from "@/lib/db/prisma"

export default async function AdminDashboard() {
  await auth.api.getSession({ headers: await headers() })
  await connectDB()

  // Get stats
  const userCount = await prisma.user.count()
  let orgCount = 0
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orgCount = await (prisma as any).organization?.count() || 0
  } catch {
    // Organization model might not exist yet
  }

  const { Subscription } = await import("@/lib/models/billing")
  const subscriptionCount = await Subscription.countDocuments({
    status: "active",
  })

  const recentActivity = await getAuditLogs({ limit: 10 })

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="space-y-0.5">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <p className="mt-0.5 text-sm text-foreground">Platform administration and monitoring</p>
      </div>

      <MetricGrid>
        <Metric
          label="Users"
          value={userCount}
          description="Total registered users"
        />
        <Metric
          label="Organizations"
          value={orgCount}
          description="Total organizations"
        />
        <Metric
          label="Active Subscriptions"
          value={subscriptionCount}
          description="Currently active subscriptions"
        />
      </MetricGrid>

      <ContentBlock>
        <ContentBlockHeader>
          <ContentBlockTitle>Recent Activity</ContentBlockTitle>
          <ContentBlockDescription>Latest audit log entries</ContentBlockDescription>
        </ContentBlockHeader>
        <div className="space-y-2">
          {recentActivity.map((log) => (
            <div key={log._id.toString()} className="flex justify-between text-sm">
              <span className="text-foreground">
                {log.action} {log.resource}
              </span>
              <span className="text-muted-foreground">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </ContentBlock>
    </div>
  )
}

