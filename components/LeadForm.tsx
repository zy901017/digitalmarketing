'use client'

import React, { useState } from 'react'
import { Input } from './ui/Input'
import { Select } from './ui/Select'
import { Button } from './ui/Button'

interface LeadFormProps {
  t: (key: string) => string
  compact?: boolean
}

export function LeadForm({ t, compact = false }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    goal: '',
    honeypot: '', // Anti-spam field
  })
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Honeypot check
    if (formData.honeypot) {
      return
    }
    
    setStatus('loading')
    setErrorMessage('')
    
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          website: formData.website,
          goal: formData.goal,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      
      setStatus('success')
      setFormData({ name: '', email: '', website: '', goal: '', honeypot: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    }
  }
  
  const goalOptions = [
    { value: '', label: t('form.selectGoal') },
    { value: 'leads', label: t('form.goals.leads') },
    { value: 'sales', label: t('form.goals.sales') },
    { value: 'tracking', label: t('form.goals.tracking') },
    { value: 'ads', label: t('form.goals.ads') },
  ]
  
  if (status === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center animate-scale-in">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-xl font-semibold text-green-900 mb-2">
          {t('form.success.title')}
        </h3>
        <p className="text-green-700 mb-4">{t('form.success.message')}</p>
        <p className="text-sm text-green-600">{t('form.success.response')}</p>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <Input
          label={compact ? undefined : t('form.name')}
          placeholder={t('form.name')}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={status === 'loading'}
        />
        
        <Input
          label={compact ? undefined : t('form.email')}
          type="email"
          placeholder={t('form.email')}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={status === 'loading'}
        />
      </div>
      
      <div className={compact ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <Input
          label={compact ? undefined : t('form.website')}
          type="url"
          placeholder={t('form.website')}
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          disabled={status === 'loading'}
        />
        
        <Select
          label={compact ? undefined : t('form.goal')}
          options={goalOptions}
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          required
          disabled={status === 'loading'}
        />
      </div>
      
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website_url"
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
        disabled={status === 'loading'}
      >
        {status === 'loading' ? t('form.sending') : t('form.submit')}
      </Button>
    </form>
  )
}
