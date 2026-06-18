/**
 * Filtering utilities for India location matching, frontend job detection,
 * skill tag extraction, experience level detection, and job type detection.
 */

import { FRONTEND_KEYWORDS, INDIA_LOCATIONS, SKILL_TAGS } from '../config';
import { ExperienceLevel, JobType } from '../types';

/**
 * Check if a location string matches India or Indian cities.
 */
export function isIndiaLocation(location: string): boolean {
  if (!location) return false;
  const lower = location.toLowerCase().trim();
  return INDIA_LOCATIONS.some((loc) => lower.includes(loc));
}

/**
 * Check if a job title or description matches frontend keywords.
 */
export function isFrontendJob(title: string, description?: string): boolean {
  const text = `${title} ${description ?? ''}`.toLowerCase();
  return FRONTEND_KEYWORDS.some((kw) => text.includes(kw.toLowerCase()));
}

/**
 * Extract skill tags from a job description.
 */
export function extractTags(text: string): string[] {
  if (!text) return [];
  const lower = text.toLowerCase();
  const found: string[] = [];

  for (const tag of SKILL_TAGS) {
    // Use word boundary-ish matching to avoid false positives
    const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(text) || lower.includes(tag.toLowerCase())) {
      if (!found.includes(tag)) {
        found.push(tag);
      }
    }
  }

  return found;
}

/**
 * Detect experience level from title and description.
 */
export function detectExperienceLevel(
  title: string,
  description?: string,
): ExperienceLevel | null {
  const text = `${title} ${description ?? ''}`.toLowerCase();

  if (/\b(intern|internship)\b/.test(text)) return 'intern';
  if (/\b(principal|distinguished|fellow)\b/.test(text)) return 'principal';
  if (/\b(staff)\b/.test(text)) return 'staff';
  if (/\b(lead|tech lead|team lead|engineering lead)\b/.test(text)) return 'lead';
  if (/\b(senior|sr\.?|iii|level 3|l3)\b/.test(text)) return 'senior';
  if (/\b(junior|jr\.?|entry[- ]level|associate|i\b|level 1|l1)\b/.test(text)) return 'junior';
  if (/\b(mid[- ]?level|intermediate|ii\b|level 2|l2)\b/.test(text)) return 'mid';

  // Check years of experience
  const yearsMatch = text.match(/(\d+)\+?\s*(?:years?|yrs?)\s*(?:of)?\s*(?:experience|exp)/);
  if (yearsMatch) {
    const years = parseInt(yearsMatch[1], 10);
    if (years <= 1) return 'junior';
    if (years <= 3) return 'mid';
    if (years <= 6) return 'senior';
    if (years <= 10) return 'lead';
    return 'principal';
  }

  return null;
}

/**
 * Detect job type from title and description.
 */
export function detectJobType(title: string, description?: string): JobType | null {
  const text = `${title} ${description ?? ''}`.toLowerCase();

  if (/\b(intern|internship)\b/.test(text)) return 'internship';
  if (/\b(contract|contractor|freelance|consulting)\b/.test(text)) return 'contract';
  if (/\b(part[- ]?time)\b/.test(text)) return 'part-time';
  if (/\b(full[- ]?time|permanent|fte)\b/.test(text)) return 'full-time';

  // Default to full-time if not specified
  return 'full-time';
}

/**
 * Clean and normalize a job description (strip excessive whitespace, etc.).
 */
export function cleanDescription(html: string): string {
  if (!html) return '';
  return html
    .replace(/\s+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Normalize a salary string.
 */
export function normalizeSalary(salary: string | null | undefined): string | null {
  if (!salary) return null;
  const cleaned = salary.trim();
  if (cleaned.length === 0) return null;
  return cleaned;
}
