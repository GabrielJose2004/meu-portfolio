'use client'

import type { CSSProperties } from 'react'

interface TechBadgeProps {
  label: string
  className?: string
  style?: CSSProperties
}

export function TechBadge({ label, className = '', style }: TechBadgeProps) {
  return (
    <div
      className={`
        inline-flex items-center justify-center
        px-3 py-2
        bg-surface border border-wire rounded-sm
        font-mono text-xs text-ghost
        transition-all duration-200
        hover:border-signal hover:shadow-[0_0_8px_rgba(0,255,135,0.2)]
        hover:text-signal
        ${className}
      `}
      style={style}
    >
      {label}
    </div>
  )
}
