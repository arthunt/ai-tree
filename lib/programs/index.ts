/**
 * Programs Module
 * 
 * Export all program-related types, data, and utilities
 * 
 * PRICING (Updated 2026-01-30):
 * - AIKI: €1590 (6 weeks, 60h)
 * - AIVO: €1290 full / €900 for AIKI grads (30% off)
 * - AIME: €2490 (bundle = AIKI + AIVO grad price)
 */

// Types
export type {
  ProgramId,
  Locale,
  LocalizedString,
  InstallmentPlan,
  GraduateDiscount,
  ProgramPricing,
  Program,
  ProgramFeature,
  CurriculumWeek,
  ProgramCohort,
  ProgramLead,
  ProgramApplication,
  LeadCaptureForm,
  ApplicationForm,
  ProgramCTA,
  PriceCalculation
} from './types';

// Data
export {
  PROGRAMS,
  getProgram,
  getAllPrograms,
  getProgramsByIds,
  formatPrice,
  calculateFinalPrice
} from './data';
