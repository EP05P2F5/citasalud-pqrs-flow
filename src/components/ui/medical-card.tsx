import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const medicalCardVariants = cva(
  "rounded-lg border bg-card text-card-foreground",
  {
    variants: {
      variant: {
        default: "shadow-md",
        elevated: "shadow-lg",
        interactive: "shadow-md hover:shadow-lg transition-shadow cursor-pointer",
        success: "border-success/20 bg-success/5",
        warning: "border-warning/20 bg-warning/5",
        error: "border-destructive/20 bg-destructive/5",
        gradient: "bg-gradient-surface shadow-lg",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const MedicalCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof medicalCardVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(medicalCardVariants({ variant, size, className }))}
    {...props}
  />
));
MedicalCard.displayName = "MedicalCard";

const MedicalCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));
MedicalCardHeader.displayName = "MedicalCardHeader";

const MedicalCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
MedicalCardTitle.displayName = "MedicalCardTitle";

const MedicalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
MedicalCardDescription.displayName = "MedicalCardDescription";

const MedicalCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-4", className)} {...props} />
));
MedicalCardContent.displayName = "MedicalCardContent";

const MedicalCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4 border-t border-border/50", className)}
    {...props}
  />
));
MedicalCardFooter.displayName = "MedicalCardFooter";

export {
  MedicalCard,
  MedicalCardHeader,
  MedicalCardTitle,
  MedicalCardDescription,
  MedicalCardContent,
  MedicalCardFooter,
};