import React from "react";

const PrivateLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex h-full w-full flex-col p-6 ${className}`}
    {...props}
  />
));

const PrivateHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`py-2 ${className}`} {...props} />
));

const PrivateTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-2xl font-bold leading-none tracking-tight ${className}`}
    {...props}
  />
));

const PrivateContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`h-full py-6 ${className}`} {...props} />
));

export { PrivateLayout, PrivateHeader, PrivateTitle, PrivateContent };
