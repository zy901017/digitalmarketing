import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Locale } from './i18n'

export interface CaseStudyMetric {
  label: string
  value: string
}

export interface CaseStudyFrontmatter {
  slug: string
  lang: 'en' | 'zh'
  title: string
  summary: string
  industry: string
  services: string[]
  date: string
  featured: boolean
  metrics: CaseStudyMetric[]
  coverImage?: string
}

export interface CaseStudy extends CaseStudyFrontmatter {
  content: string
}

const contentDirectory = path.join(process.cwd(), 'content/case-studies')

export function getAllCaseStudies(locale?: Locale): CaseStudy[] {
  const files = fs.readdirSync(contentDirectory)
  
  const caseStudies = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(contentDirectory, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)
      
      return {
        ...data,
        content,
      } as CaseStudy
    })
    .filter(study => !locale || study.lang === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return caseStudies
}

export function getCaseStudyBySlug(slug: string, locale: Locale): CaseStudy | null {
  const caseStudies = getAllCaseStudies(locale)
  return caseStudies.find(study => study.slug === slug) || null
}

export function getFeaturedCaseStudies(locale: Locale, limit: number = 3): CaseStudy[] {
  return getAllCaseStudies(locale)
    .filter(study => study.featured)
    .slice(0, limit)
}

export function getIndustries(locale: Locale): string[] {
  const caseStudies = getAllCaseStudies(locale)
  const industries = new Set(caseStudies.map(study => study.industry))
  return Array.from(industries)
}

export function getServices(locale: Locale): string[] {
  const caseStudies = getAllCaseStudies(locale)
  const services = new Set(caseStudies.flatMap(study => study.services))
  return Array.from(services)
}
