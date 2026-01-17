import * as React from "react"
import { cn } from "@/lib/utils"

interface ContentBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ContentBlock = React.forwardRef<HTMLDivElement, ContentBlockProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-muted/30 p-6",
          className
        )}
        {...props}
      />
    )
  }
)
ContentBlock.displayName = "ContentBlock"

interface ContentBlockHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ContentBlockHeader = React.forwardRef<HTMLDivElement, ContentBlockHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-0.5 pb-4", className)}
        {...props}
      />
    )
  }
)
ContentBlockHeader.displayName = "ContentBlockHeader"

interface ContentBlockTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const ContentBlockTitle = React.forwardRef<HTMLHeadingElement, ContentBlockTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("text-sm font-semibold", className)}
        {...props}
      />
    )
  }
)
ContentBlockTitle.displayName = "ContentBlockTitle"

interface ContentBlockDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const ContentBlockDescription = React.forwardRef<HTMLParagraphElement, ContentBlockDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-xs text-foreground opacity-85", className)}
        {...props}
      />
    )
  }
)
ContentBlockDescription.displayName = "ContentBlockDescription"

export {
  ContentBlock,
  ContentBlockHeader,
  ContentBlockTitle,
  ContentBlockDescription,
}
