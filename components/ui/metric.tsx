import * as React from "react"
import { cn } from "@/lib/utils"

interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  description?: string
}

const Metric = React.forwardRef<HTMLDivElement, MetricProps>(
  ({ className, label, value, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-0.5", className)}
        {...props}
      >
        <h3 className="text-sm font-semibold">{label}</h3>
        {description && (
          <p className="text-xs text-foreground opacity-85">{description}</p>
        )}
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    )
  }
)
Metric.displayName = "Metric"

interface MetricGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const MetricGrid = React.forwardRef<HTMLDivElement, MetricGridProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-4 md:grid-cols-3", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MetricGrid.displayName = "MetricGrid"

export { Metric, MetricGrid }
