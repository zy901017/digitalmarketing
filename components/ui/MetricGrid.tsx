import React from 'react'

interface Metric {
  label: string
  value: string
}

interface MetricGridProps {
  metrics: Metric[]
  columns?: 2 | 3 | 4
}

export function MetricGrid({ metrics, columns = 3 }: MetricGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }
  
  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="text-center p-6 bg-white rounded-xl shadow-md animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 font-display">
            {metric.value}
          </div>
          <div className="text-sm md:text-base text-slate-600 font-medium">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  )
}
