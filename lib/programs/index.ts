/**
 * Programs Module
 * 
 * Export all program-related types, data, and utilities
 */

// Types
export type {
  ProgramId,
  Locale,
  LocalizedString,
  Program,
  ProgramFeature,
  CurriculumWeek,
  ProgramCohort,
  ProgramLead,
  ProgramApplication,
  LeadCaptureForm,
  ApplicationForm,
  ProgramCTA
} from './types';

// Data
export {
  PROGRAMS,
  getProgram,
  getAllPrograms,
  getProgramsByIds,
  formatPrice,
  calculateDiscount
} from './data';
