import { NextRequest, NextResponse } from 'next/server'
import { sendLeadNotification } from '@/lib/resend'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Rate limit: 5 requests per hour per IP
    const rateLimitResult = rateLimit(ip, 5, 60 * 60 * 1000)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
    
    const body = await request.json()
    
    // Validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    // Send notification
    await sendLeadNotification({
      name: body.name,
      email: body.email,
      company: body.company,
      phone: body.phone,
      website: body.website,
      budget: body.budget,
      services: body.services,
      goal: body.goal,
      message: body.message,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
