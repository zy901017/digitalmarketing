import React from 'react'
import { Card } from './Card'

interface TestimonialProps {
  quote: string
  author: string
  role: string
  company: string
  rating?: number
}

export function Testimonial({ quote, author, role, company, rating = 5 }: TestimonialProps) {
  return (
    <Card hover className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        
        <blockquote className="text-slate-700 mb-6 flex-grow">
          "{quote}"
        </blockquote>
        
        <div>
          <div className="font-semibold text-slate-900">{author}</div>
          <div className="text-sm text-slate-600">
            {role}, {company}
          </div>
        </div>
      </div>
    </Card>
  )
}
