'use client'

import React, { useState } from 'react'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Select } from './ui/Select'
import { Button } from './ui/Button'
import { useI18n } from './I18nProvider'

export function ContactForm() {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    budget: '',
    service: '',
    website: '',
    message: '',
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
          company: formData.company,
          phone: formData.phone,
          budget: formData.budget,
          service: formData.service,
          website: formData.website,
          message: formData.message,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || t('contactForm.error'))

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        budget: '',
        service: '',
        website: '',
        message: '',
        honeypot: '',
      })
    } catch (error: any) {
      setStatus('error')
      setErrorMessage(error.message || t('contactForm.error'))
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h3 className="text-green-800 font-semibold text-lg mb-2">{t('contactForm.successTitle')}</h3>
        <p className="text-green-700">{t('contactForm.successMessage')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input label={t('contactForm.name')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <Input label={t('contactForm.email')} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input label={t('contactForm.company')} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
        <Input label={t('contactForm.phone')} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Select label={t('contactForm.budget')} value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })}>
          <option value="">{t('contactForm.selectBudget')}</option>
          <option value="under-1k">{t('contactForm.budgets.under1k')}</option>
          <option value="1k-3k">{t('contactForm.budgets.1k-3k')}</option>
          <option value="3k-5k">{t('contactForm.budgets.3k-5k')}</option>
          <option value="5k-10k">{t('contactForm.budgets.5k-10k')}</option>
          <option value="10k+">{t('contactForm.budgets.10k+')}</option>
        </Select>

        <Select label={t('contactForm.service')} value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
          <option value="">{t('contactForm.selectService')}</option>
          <option value="google-ads">{t('contactForm.services.googleAds')}</option>
          <option value="meta-ads">{t('contactForm.services.metaAds')}</option>
          <option value="tracking">{t('contactForm.services.tracking')}</option>
          <option value="seo">{t('contactForm.services.seo')}</option>
          <option value="cro">{t('contactForm.services.cro')}</option>
        </Select>
      </div>

      <Input label={t('contactForm.website')} value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />

      <Textarea label={t('contactForm.message')} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} required />

      {status === 'error' && <p className="text-red-600 text-sm">{errorMessage}</p>}

      <Button type="submit" loading={status === 'loading'} className="w-full">
        {t('contactForm.submit')}
      </Button>
    </form>
  )
}
