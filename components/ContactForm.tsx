'use client'

import React, { useState } from 'react'
import { Input } from './ui/Input'
import { Select } from './ui/Select'
import { Textarea } from './ui/Textarea'
import { Button } from './ui/Button'

interface ContactFormProps {
  t: (key: string) => string
}

export function ContactForm({ t }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    budget: '',
    services: [] as string[],
    message: '',
    honeypot: '',
  })
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.honeypot) {
      return
    }
    
    setStatus('loading')
    setErrorMessage('')
    
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        website: '',
        budget: '',
        services: [],
        message: '',
        honeypot: '',
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    }
  }
  
  const budgetOptions = [
    { value: '', label: t('contactForm.selectBudget') },
    { value: 'under-1k', label: t('contactForm.budget.under1k') },
    { value: '1k-3k', label: t('contactForm.budget.1k3k') },
    { value: '3k-5k', label: t('contactForm.budget.3k5k') },
    { value: '5k-10k', label: t('contactForm.budget.5k10k') },
    { value: 'over-10k', label: t('contactForm.budget.over10k') },
  ]
  
  const servicesList = [
    'Google Ads',
    'Facebook/Meta Ads',
    'SEO',
    'Google Analytics',
    'Landing Pages',
    'CRO',
  ]
  
  const handleServiceToggle = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(service)
        ? formData.services.filter(s => s !== service)
        : [...formData.services, service],
    })
  }
  
  if (status === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center animate-scale-in">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-semibold text-green-900 mb-3">
          {t('form.success.title')}
        </h3>
        <p className="text-green-700 mb-4">{t('form.success.message')}</p>
        <p className="text-green-600 mb-6">{t('form.success.response')}</p>
        <a
          href="https://calendly.com/yourdomain"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          {t('contactForm.bookCall')}
        </a>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t('form.name')}
          placeholder={t('form.name')}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={status === 'loading'}
        />
        
        <Input
          label={t('form.email')}
          type="email"
          placeholder={t('form.email')}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={status === 'loading'}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t('contactForm.company')}
          placeholder={t('contactForm.company')}
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          disabled={status === 'loading'}
        />
        
        <Input
          label={t('contactForm.phone')}
          type="tel"
          placeholder={t('contactForm.phone')}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          disabled={status === 'loading'}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t('form.website')}
          type="url"
          placeholder={t('form.website')}
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          disabled={status === 'loading'}
        />
        
        <Select
          label={t('contactForm.budget')}
          options={budgetOptions}
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          disabled={status === 'loading'}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          {t('contactForm.servicesInterested')}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {servicesList.map((service) => (
            <label
              key={service}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                formData.services.includes(service)
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-slate-300 hover:border-primary-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.services.includes(service)}
                onChange={() => handleServiceToggle(service)}
                className="sr-only"
                disabled={status === 'loading'}
              />
              <span className="text-sm font-medium">{service}</span>
            </label>
          ))}
        </div>
      </div>
      
      <Textarea
        label={t('contactForm.message')}
        placeholder={t('contactForm.messagePlaceholder')}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={6}
        disabled={status === 'loading'}
      />
      
      <input
        type="text"
        name="company_url"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}
      
      <Button
        type="submit"
        fullWidth
        size="lg"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? t('form.sending') : t('contactForm.submit')}
      </Button>
    </form>
  )
}
