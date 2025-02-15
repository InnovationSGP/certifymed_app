import * as React from "react"

const Input =React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={
          `flex h-12 w-full rounded-[12px] border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#F1F1F1] ${className}`
        }
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
