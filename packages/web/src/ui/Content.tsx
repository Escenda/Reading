import React from "react"

export const Main: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  className = "",
  ...attributes
}) => {
  return (
    <main
      className={`flex min-h-[90vh] max-h-[90vh] flex-col items-center justify-start p-12 bg-slate-800 space-y-8 ${className}`}
      {...attributes}
    >
      {children}
    </main>
  )
}
