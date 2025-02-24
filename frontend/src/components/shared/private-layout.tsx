import React from "react";

const PrivateLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`no-scrollbar flex h-full w-full flex-col overflow-auto lg:p-6 px-2 ${className}`}
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
  <div ref={ref} className={`h-full ${className}`} {...props} />
));

export { PrivateLayout, PrivateHeader, PrivateTitle, PrivateContent };
