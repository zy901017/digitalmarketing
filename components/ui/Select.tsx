import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  fullWidth?: boolean
  options: { value: string; label: string }[]
}

export function Select({ label, error, fullWidth = true, options, className = '', ...props }: SelectProps) {
  const widthStyle = fullWidth ? 'w-full' : ''
  
  return (
    <div className={widthStyle}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <select
        className={`px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white ${widthStyle} ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
