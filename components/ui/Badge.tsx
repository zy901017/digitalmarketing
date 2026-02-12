import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'neutral'
  className?: string
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-700 border-primary-200',
    
    // NEW
    secondary: 'bg-gray-100 text-gray-700 border-gray-200',
    
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  }
  
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
