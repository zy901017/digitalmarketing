'use client'

import React, { useState } from 'react'
import { Input } from './ui/Input'
import { Select } from './ui/Select'
import { Button } from './ui/Button'
import { useI18n } from './I18nProvider'

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    goal: '',
    honeypot: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.honeypot) return

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
        throw new Error(data.error || t('form.error'))
      }

      setStatus('success')
      setFormData({ name: '', email: '', website: '', goal: '', honeypot: '' })
    } catch (error: any) {
      setStatus('error')
      setErrorMessage(error.message || t('form.error'))
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 font-semibold mb-2">{t('form.successTitle')}</div>
        <p className="text-green-700 text-sm">{t('form.successMessage')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${compact ? 'max-w-md' : ''}`}>
      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className={compact ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <Input
          label={t('form.name')}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder={t('form.namePlaceholder')}
        />
        <Input
          label={t('form.email')}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          placeholder={t('form.emailPlaceholder')}
        />
      </div>

      <Input
        label={t('form.website')}
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        placeholder={t('form.websitePlaceholder')}
      />

      <Select
        label={t('form.goal')}
        value={formData.goal}
        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
        required
      >
        <option value="">{t('form.selectGoal')}</option>
        <option value="leads">{t('form.goals.leads')}</option>
        <option value="sales">{t('form.goals.sales')}</option>
        <option value="tracking">{t('form.goals.tracking')}</option>
        <option value="ads">{t('form.goals.ads')}</option>
      </Select>

      {status === 'error' && <p className="text-red-600 text-sm">{errorMessage}</p>}

      <Button type="submit" loading={status === 'loading'} className="w-full">
        {t('form.submit')}
      </Button>
    </form>
  )
}
