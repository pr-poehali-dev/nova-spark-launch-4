import { ReactNode } from 'react'
import { Squares } from "./squares-background"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-[#040810] relative">
      <div className="absolute inset-0 z-10">
        <Squares
          direction="diagonal"
          speed={0.4}
          squareSize={50}
          borderColor="#1a2a4a"
          hoverFillColor="#0d1f3c"
        />
      </div>
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  )
}
