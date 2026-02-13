import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

export function Textarea({ label, error, fullWidth = true, className = '', ...props }: TextareaProps) {
  const widthStyle = fullWidth ? 'w-full' : ''
  
  return (
    <div className={widthStyle}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${widthStyle} ${error ? 'border-red-500' : ''} ${className}`}
        rows={4}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
