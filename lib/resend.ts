import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export interface LeadData {
  name: string
  email: string
  company?: string
  phone?: string
  website?: string
  budget?: string
  services?: string[]
  goal?: string
  message?: string
}

export async function sendLeadNotification(data: LeadData): Promise<void> {
  if (!resend) {
    console.warn('Resend not configured. Logging lead data:', data)
    return
  }
  
  const emailFrom = process.env.EMAIL_FROM || 'noreply@example.com'
  const emailTo = process.env.EMAIL_TO || 'hello@example.com'
  
  const htmlContent = `
    <h2>New Lead Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    ${data.website ? `<p><strong>Website:</strong> ${data.website}</p>` : ''}
    ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
    ${data.goal ? `<p><strong>Goal:</strong> ${data.goal}</p>` : ''}
    ${data.services && data.services.length > 0 ? `<p><strong>Services:</strong> ${data.services.join(', ')}</p>` : ''}
    ${data.message ? `<p><strong>Message:</strong></p><p>${data.message}</p>` : ''}
  `
  
  await resend.emails.send({
    from: emailFrom,
    to: emailTo,
    subject: `New Lead: ${data.name} - ${data.company || data.email}`,
    html: htmlContent,
  })
}
