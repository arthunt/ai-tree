/**
 * Program Types
 * 
 * Type definitions for AIKI, AIVO, and AIME programs
 * 
 * PRICING (Updated 2026-01-30):
 * - AIKI: €1590 (6 weeks, 60h)
 * - AIVO: €1290 full / €900 for AIKI grads (30% off)
 * - AIME: €2490 (bundle = AIKI + AIVO grad price)
 */

export type ProgramId = 'aiki' | 'aivo' | 'aime';
export type Locale = 'et' | 'en';

export interface LocalizedString {
  et: string;
  en: string;
}

export interface InstallmentPlan {
  count: number;           // Number of payments
  amount: number;          // Amount per payment
  total: number;           // Total with fee
  fee: number;             // Additional fee
  feePercent: number;      // Fee as percentage
}

export interface GraduateDiscount {
  percent: number;         // Discount percentage (30)
  amount: number;          // Discount amount in EUR (390)
  finalPrice: number;      // Final price after discount (900)
  forGraduatesOf: ProgramId;
}

export interface ProgramPricing {
  price: number;           // Base price in EUR
  
  // Optional discounts
  graduateDiscount?: GraduateDiscount;
  
  // Bundle specific
  comparedToSeparate?: number;  // What it would cost separately
  bundleSavings?: number;       // Amount saved with bundle
  
  // Payment options
  installments?: InstallmentPlan;
}

export interface Program {
  id: ProgramId;
  slug: string;
  name: LocalizedString;
  fullName: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  
  // Visual
  color: string;
  icon: string;  // Lucide icon name
  
  // Duration
  duration: {
    weeks: number;
    academicHours: number;
    weeklyHours: number;
    format: 'online' | 'hybrid' | 'in-person';
  };
  
  // Pricing
  pricing: ProgramPricing;
  
  // Content
  features: ProgramFeature[];
  curriculum: CurriculumWeek[];
  outcomes: LocalizedString[];
  prerequisites: LocalizedString[];
  targetAudience: LocalizedString[];
  
  // Certification
  certificate: {
    type: 'tunnistus' | 'tõend';
    title: LocalizedString;
    accreditation?: string;
  };
  
  // Relationships
  prerequisiteProgram?: ProgramId;
  includedPrograms?: ProgramId[];  // For bundles like AIME
  
  // Schedule
  maxParticipants: number;
}

export interface ProgramFeature {
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface CurriculumWeek {
  week: number;
  title: LocalizedString;
  topics: LocalizedString[];
  hours: number;
  type: 'group' | 'self-study' | 'practice' | 'assessment';
}

// Database types (from Supabase)
export interface ProgramCohort {
  id: string;
  program: ProgramId;
  name: string;
  start_date: string;
  end_date: string;
  registration_deadline?: string;
  max_participants: number;
  current_participants: number;
  price_cents: number;
  early_bird_price_cents?: number;
  early_bird_deadline?: string;
  locale: Locale;
  is_active: boolean;
}

export interface ProgramLead {
  id: string;
  session_id?: string;
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  programs: ProgramId[];
  message?: string;
  source?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  status: 'new' | 'contacted' | 'qualified' | 'enrolled' | 'declined' | 'lost';
  score: number;
  locale: Locale;
  created_at: string;
}

export interface ProgramApplication {
  id: string;
  lead_id?: string;
  cohort_id?: string;
  program: ProgramId;
  full_name: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  current_role?: string;
  company?: string;
  linkedin_url?: string;
  experience_level?: 'none' | 'beginner' | 'intermediate' | 'advanced';
  motivation?: string;
  goals?: string;
  how_heard?: string;
  can_commit_schedule: boolean;
  has_required_equipment: boolean;
  special_requirements?: string;
  has_aiki_certificate: boolean;
  aiki_certificate_date?: string;
  status: 'draft' | 'submitted' | 'reviewing' | 'accepted' | 'enrolled' | 'declined' | 'withdrawn';
  payment_method?: 'full' | 'installments' | 'company' | 'scholarship';
  payment_status: 'pending' | 'partial' | 'completed';
  discount_code?: string;
  discount_percent: number;
  final_price_cents?: number;
  created_at: string;
  submitted_at?: string;
}

// Form types
export interface LeadCaptureForm {
  email: string;
  name?: string;
  phone?: string;
  programs: ProgramId[];
  message?: string;
}

export interface ApplicationForm {
  // Step 1: Personal
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  
  // Step 2: Background
  current_role: string;
  company: string;
  linkedin_url: string;
  experience_level: string;
  
  // Step 3: Motivation
  motivation: string;
  goals: string;
  how_heard: string;
  
  // Step 4: Logistics
  preferred_cohort_id: string;
  can_commit_schedule: boolean;
  has_required_equipment: boolean;
  special_requirements: string;
  
  // Step 5: AIKI Certificate (for AIVO)
  has_aiki_certificate: boolean;
  aiki_certificate_date: string;
  
  // Step 6: Payment
  payment_method: 'full' | 'installments' | 'company';
  discount_code: string;
}

// CTA types
export interface ProgramCTA {
  program: ProgramId;
  trigger: 'dna_complete' | 'concept_automation' | 'time_on_site' | 'return_visit';
  message: LocalizedString;
  cta: LocalizedString;
  style: 'banner' | 'popup' | 'inline';
}

// Price calculation result
export interface PriceCalculation {
  finalPrice: number;
  discount: number;
  discountPercent: number;
  discountType?: 'graduate' | 'bundle';
  installments?: InstallmentPlan;
}
