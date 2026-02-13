import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  
  const hoverStyle = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''
  
  return (
    <div className={`bg-white rounded-xl shadow-md ${paddingStyles[padding]} ${hoverStyle} ${className}`}>
      {children}
    </div>
  )
}
