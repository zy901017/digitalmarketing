import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'primary'
  spacing?: 'sm' | 'md' | 'lg'
}

export function Section({ children, className = '', background = 'white', spacing = 'lg' }: SectionProps) {
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-slate-50',
    primary: 'bg-primary-50',
  }
  
  const spacingStyles = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20 md:py-24',
  }
  
  return (
    <section className={`${bgStyles[background]} ${spacingStyles[spacing]} ${className}`}>
      {children}
    </section>
  )
}
