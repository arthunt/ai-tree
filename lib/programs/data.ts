/**
 * Program Data
 * 
 * Static data for all training programs
 */

import { Program } from './types';

export const PROGRAMS: Record<string, Program> = {
  aiki: {
    id: 'aiki',
    slug: 'aiki',
    name: { et: 'AIKI', en: 'AIKI' },
    fullName: { 
      et: 'AI Instruktori Baasprogramm', 
      en: 'AI Instructor Foundation Program' 
    },
    tagline: { 
      et: 'Saa AI koolitajaks 6 nädalaga', 
      en: 'Become an AI instructor in 6 weeks' 
    },
    description: {
      et: 'Põhjalik programm neile, kes soovivad omandada AI kasutamise ja õpetamise oskused. Lõpetajad saavad tunnistuse ja on valmis töötama AI koolitajana.',
      en: 'Comprehensive program for those who want to master AI usage and teaching skills. Graduates receive a certificate and are ready to work as AI instructors.'
    },
    
    color: '#6366f1',  // Indigo
    icon: 'GraduationCap',
    
    duration: {
      weeks: 6,
      academicHours: 90,
      weeklyHours: 15,
      format: 'hybrid'
    },
    
    pricing: {
      price: 1590,
      earlyBirdDiscount: 200
    },
    
    features: [
      {
        icon: 'Brain',
        title: { et: 'AI meisterlikkus', en: 'AI Mastery' },
        description: { 
          et: 'Omanda T-V-A-P mudel ja promptimise tehnikad sügavuti', 
          en: 'Master the T-V-A-P model and prompting techniques in depth' 
        }
      },
      {
        icon: 'Users',
        title: { et: '4C õpetamismeetod', en: '4C Teaching Method' },
        description: { 
          et: 'Õpi struktureeritud meetodit AI teemade edastamiseks', 
          en: 'Learn a structured method for teaching AI topics' 
        }
      },
      {
        icon: 'Briefcase',
        title: { et: 'Portfoolio', en: 'Portfolio' },
        description: { 
          et: 'Loo 3 tunnikava ja õppematerjalid tööle kandideerimiseks', 
          en: 'Create 3 lesson plans and materials for job applications' 
        }
      },
      {
        icon: 'Award',
        title: { et: 'Tunnistus', en: 'Certificate' },
        description: { 
          et: 'Ametlik tunnistus AI instruktori pädevuse kohta', 
          en: 'Official certificate confirming AI instructor competency' 
        }
      }
    ],
    
    curriculum: [
      {
        week: 0,
        title: { et: 'Ettevalmistus', en: 'Preparation' },
        topics: [
          { et: 'Tööriistad ja keskkond', en: 'Tools and environment' },
          { et: 'Esimesed AI vestlused', en: 'First AI conversations' },
          { et: '4C meetodi tutvustus', en: '4C method introduction' }
        ],
        hours: 10,
        type: 'self-study'
      },
      {
        week: 1,
        title: { et: 'Promptimise alused', en: 'Prompting Basics' },
        topics: [
          { et: 'RICE raamistik', en: 'RICE framework' },
          { et: 'Efektiivsed promptid', en: 'Effective prompts' },
          { et: 'Esimene õpetamise kogemus', en: 'First teaching experience' }
        ],
        hours: 15,
        type: 'group'
      },
      {
        week: 2,
        title: { et: 'Edasijõudnud promptimine', en: 'Advanced Prompting' },
        topics: [
          { et: 'Süsteemipromptid', en: 'System prompts' },
          { et: 'Custom Instructions', en: 'Custom Instructions' },
          { et: 'Isikupärastatud assistendid', en: 'Personalized assistants' }
        ],
        hours: 15,
        type: 'group'
      },
      {
        week: 3,
        title: { et: 'AI seadistamine', en: 'AI Configuration' },
        topics: [
          { et: 'RAG ja NotebookLM', en: 'RAG and NotebookLM' },
          { et: 'Teadmusbaasid', en: 'Knowledge bases' },
          { et: 'AI igapäevatöös', en: 'AI in daily work' }
        ],
        hours: 15,
        type: 'group'
      },
      {
        week: 4,
        title: { et: 'Õpetamise praktika', en: 'Teaching Practice' },
        topics: [
          { et: 'Mitu õpetamise vooru', en: 'Multiple teaching rounds' },
          { et: '4C meetodi süvendamine', en: '4C method deepening' },
          { et: 'Tagasiside andmine ja saamine', en: 'Giving and receiving feedback' }
        ],
        hours: 15,
        type: 'practice'
      },
      {
        week: 5,
        title: { et: 'Sertifitseerimine ja lõpetamine', en: 'Certification & Graduation' },
        topics: [
          { et: 'Lõpueksam', en: 'Final exam' },
          { et: 'Portfoolio ülevaatus', en: 'Portfolio review' },
          { et: 'CV ja LinkedIn', en: 'CV and LinkedIn' },
          { et: 'Tööotsingud', en: 'Job search' }
        ],
        hours: 20,
        type: 'assessment'
      }
    ],
    
    outcomes: [
      { et: 'Sertifitseeritud AI instruktor', en: 'Certified AI instructor' },
      { et: 'Professionaalne portfoolio', en: 'Professional portfolio' },
      { et: 'Uuendatud CV ja LinkedIn', en: 'Updated CV and LinkedIn' },
      { et: 'Valmis tööle kandideerima', en: 'Ready to apply for jobs' }
    ],
    
    prerequisites: [
      { et: 'Eelnev AI kogemus pole vajalik', en: 'No prior AI experience required' },
      { et: 'Arvuti ja internet', en: 'Computer and internet' },
      { et: 'Inglise keel B2 tasemel', en: 'English at B2 level' }
    ],
    
    targetAudience: [
      { et: 'Karjäärivahetajad', en: 'Career changers' },
      { et: 'Koolitajad ja õpetajad', en: 'Trainers and teachers' },
      { et: 'HR spetsialistid', en: 'HR specialists' },
      { et: 'AI-huvilised', en: 'AI enthusiasts' }
    ],
    
    certificate: {
      type: 'tunnistus',
      title: { 
        et: 'AI Instruktor (Baastase)', 
        en: 'AI Instructor (Foundation Level)' 
      }
    },
    
    maxParticipants: 20
  },
  
  aivo: {
    id: 'aivo',
    slug: 'aivo',
    name: { et: 'AIVO', en: 'AIVO' },
    fullName: { 
      et: 'AI Automatiseerimise Moodul', 
      en: 'AI Automation Module' 
    },
    tagline: { 
      et: 'Automatiseeri töövood AI-ga', 
      en: 'Automate workflows with AI' 
    },
    description: {
      et: 'Praktiline moodul töövoogude automatiseerimiseks Zapier, Make ja OpenAI API abil. Ideaalne AIKI lõpetajatele ja automatiseerimishuvilistele.',
      en: 'Practical module for workflow automation using Zapier, Make, and OpenAI API. Ideal for AIKI graduates and automation enthusiasts.'
    },
    
    color: '#10b981',  // Emerald
    icon: 'Workflow',
    
    duration: {
      weeks: 4,
      academicHours: 60,
      weeklyHours: 15,
      format: 'online'
    },
    
    pricing: {
      price: 990,
      graduateDiscount: {
        percent: 40,
        forGraduatesOf: 'aiki'
      }
    },
    
    features: [
      {
        icon: 'Zap',
        title: { et: 'Zapier & Make', en: 'Zapier & Make' },
        description: { 
          et: 'Loo automatiseeritud töövoogusid ilma koodita', 
          en: 'Create automated workflows without code' 
        }
      },
      {
        icon: 'Code',
        title: { et: 'OpenAI API', en: 'OpenAI API' },
        description: { 
          et: 'Integreeri AI oma töövoogudesse', 
          en: 'Integrate AI into your workflows' 
        }
      },
      {
        icon: 'FileJson',
        title: { et: 'API integratsioonid', en: 'API Integrations' },
        description: { 
          et: 'Ühenda erinevaid rakendusi ja teenuseid', 
          en: 'Connect various apps and services' 
        }
      },
      {
        icon: 'HandCoins',
        title: { et: 'Konsultatsioonioskused', en: 'Consulting Skills' },
        description: { 
          et: 'Õpi pakkuma automatiseerimise teenuseid', 
          en: 'Learn to offer automation services' 
        }
      }
    ],
    
    curriculum: [
      {
        week: 0,
        title: { et: 'Ettevalmistus', en: 'Preparation' },
        topics: [
          { et: 'Automatiseerimise põhimõtted', en: 'Automation principles' },
          { et: 'Tööriistade ülevaade', en: 'Tools overview' }
        ],
        hours: 8,
        type: 'self-study'
      },
      {
        week: 1,
        title: { et: 'Zapier meistriklass', en: 'Zapier Masterclass' },
        topics: [
          { et: 'Zapid ja töövood', en: 'Zaps and workflows' },
          { et: 'Triggerid ja tegevused', en: 'Triggers and actions' },
          { et: 'Mitmesammuline loogika', en: 'Multi-step logic' }
        ],
        hours: 15,
        type: 'group'
      },
      {
        week: 2,
        title: { et: 'Make (Integromat)', en: 'Make (Integromat)' },
        topics: [
          { et: 'Stsenaariumid', en: 'Scenarios' },
          { et: 'Andmete töötlemine', en: 'Data processing' },
          { et: 'Keerulised töövood', en: 'Complex workflows' }
        ],
        hours: 15,
        type: 'group'
      },
      {
        week: 3,
        title: { et: 'AI integratsioonid', en: 'AI Integrations' },
        topics: [
          { et: 'OpenAI API kasutamine', en: 'Using OpenAI API' },
          { et: 'AI töövoogudes', en: 'AI in workflows' },
          { et: 'Praktilised projektid', en: 'Practical projects' }
        ],
        hours: 15,
        type: 'practice'
      },
      {
        week: 4,
        title: { et: 'Lõpuprojekt', en: 'Final Project' },
        topics: [
          { et: 'Kliendiprojekti simuleerimine', en: 'Client project simulation' },
          { et: 'Portfoolio täiendamine', en: 'Portfolio update' },
          { et: 'Teenuse pakkumine', en: 'Service offering' }
        ],
        hours: 7,
        type: 'assessment'
      }
    ],
    
    outcomes: [
      { et: 'Automatiseerimise portfoolio', en: 'Automation portfolio' },
      { et: 'Konsultatsioonivalmidus', en: 'Consulting readiness' },
      { et: 'API integreerimise oskused', en: 'API integration skills' }
    ],
    
    prerequisites: [
      { et: 'Soovituslik: AIKI lõpetamine', en: 'Recommended: AIKI completion' },
      { et: 'Arvuti ja internet', en: 'Computer and internet' },
      { et: 'Huvi automatiseerimise vastu', en: 'Interest in automation' }
    ],
    
    targetAudience: [
      { et: 'AIKI lõpetajad', en: 'AIKI graduates' },
      { et: 'Automatiseerimishuvilised', en: 'Automation enthusiasts' },
      { et: 'Vabakutselised konsultandid', en: 'Freelance consultants' }
    ],
    
    certificate: {
      type: 'tunnistus',
      title: { 
        et: 'AI Instruktor (Automatiseerimine)', 
        en: 'AI Instructor (Automation)' 
      }
    },
    
    prerequisiteProgram: 'aiki',
    maxParticipants: 15
  },
  
  aime: {
    id: 'aime',
    slug: 'aime',
    name: { et: 'AIME', en: 'AIME' },
    fullName: { 
      et: 'AI Meistri Pakett', 
      en: 'AI Master Bundle' 
    },
    tagline: { 
      et: 'Täielik AI kompetents ühes paketis', 
      en: 'Complete AI competency in one package' 
    },
    description: {
      et: 'AIKI ja AIVO ühendatud 10-nädalane intensiivprogramm. Säästad €290 võrreldes eraldi ostmisega ja saad täieliku AI instruktori ja automatiseerija ettevalmistuse.',
      en: 'AIKI and AIVO combined 10-week intensive program. Save €290 compared to buying separately and get complete AI instructor and automation preparation.'
    },
    
    color: '#8b5cf6',  // Violet
    icon: 'Crown',
    
    duration: {
      weeks: 10,
      academicHours: 150,
      weeklyHours: 15,
      format: 'hybrid'
    },
    
    pricing: {
      price: 2290,
      bundleSavings: 290,
      earlyBirdDiscount: 200
    },
    
    features: [
      {
        icon: 'Package',
        title: { et: 'AIKI + AIVO ühes', en: 'AIKI + AIVO combined' },
        description: { 
          et: 'Mõlemad programmid sujuva ühtse teekonnana', 
          en: 'Both programs as a smooth unified journey' 
        }
      },
      {
        icon: 'PiggyBank',
        title: { et: 'Säästad €290', en: 'Save €290' },
        description: { 
          et: 'Parimad tingimused pühendunutele', 
          en: 'Best terms for the committed' 
        }
      },
      {
        icon: 'Target',
        title: { et: 'Täielik kompetents', en: 'Complete competency' },
        description: { 
          et: 'AI õpetamine + automatiseerimine', 
          en: 'AI teaching + automation' 
        }
      },
      {
        icon: 'TrendingUp',
        title: { et: 'Maksimaalne karjäärivõimalus', en: 'Maximum career opportunity' },
        description: { 
          et: 'Laiem teenuste valik tööturul', 
          en: 'Wider service range in the job market' 
        }
      }
    ],
    
    curriculum: [], // Combines AIKI + AIVO curricula
    
    outcomes: [
      { et: 'AI instruktori ja automatiseerija tunnistus', en: 'AI instructor and automator certificate' },
      { et: 'Laiendatud portfoolio', en: 'Extended portfolio' },
      { et: 'Maksimaalne konkurentsivõime', en: 'Maximum competitiveness' }
    ],
    
    prerequisites: [
      { et: 'Eelnev AI kogemus pole vajalik', en: 'No prior AI experience required' },
      { et: 'Pühendumus 10-nädalaseks programmiks', en: 'Commitment to 10-week program' }
    ],
    
    targetAudience: [
      { et: 'Tõsised karjäärivahetajad', en: 'Serious career changers' },
      { et: 'Ettevõtjad', en: 'Entrepreneurs' },
      { et: 'Maksimaalset väärtust otsivad', en: 'Those seeking maximum value' }
    ],
    
    certificate: {
      type: 'tunnistus',
      title: { 
        et: 'AI Meister', 
        en: 'AI Master' 
      }
    },
    
    includedPrograms: ['aiki', 'aivo'],
    maxParticipants: 15
  },
  
  automation: {
    id: 'automation',
    slug: 'automation',
    name: { et: 'Automatiseerimine', en: 'Automation' },
    fullName: { 
      et: 'AI Automatiseerimise Lühimoodul', 
      en: 'AI Automation Short Module' 
    },
    tagline: { 
      et: 'Kiire sissejuhatus automatiseerimisse', 
      en: 'Quick introduction to automation' 
    },
    description: {
      et: 'Kompaktne 2-nädalane moodul neile, kes soovivad kiiresti omandada automatiseerimise põhitõed. Sobib ka ilma AIKI-ta.',
      en: 'Compact 2-week module for those who want to quickly master automation basics. Suitable even without AIKI.'
    },
    
    color: '#f59e0b',  // Amber
    icon: 'Cog',
    
    duration: {
      weeks: 2,
      academicHours: 30,
      weeklyHours: 15,
      format: 'online'
    },
    
    pricing: {
      price: 590
    },
    
    features: [
      {
        icon: 'Clock',
        title: { et: 'Kiire ja kompaktne', en: 'Quick and compact' },
        description: { 
          et: 'Ainult 2 nädalat intensiivset õpet', 
          en: 'Only 2 weeks of intensive learning' 
        }
      },
      {
        icon: 'Rocket',
        title: { et: 'Kohene rakendatavus', en: 'Immediate applicability' },
        description: { 
          et: 'Alusta automatiseerimist kohe pärast moodulit', 
          en: 'Start automating immediately after the module' 
        }
      }
    ],
    
    curriculum: [
      {
        week: 1,
        title: { et: 'Zapier ja Make', en: 'Zapier and Make' },
        topics: [
          { et: 'Põhitöövood', en: 'Basic workflows' },
          { et: 'Populaarsed integratsioonid', en: 'Popular integrations' }
        ],
        hours: 15,
        type: 'group'
      },
      {
        week: 2,
        title: { et: 'AI töövoogudes', en: 'AI in Workflows' },
        topics: [
          { et: 'OpenAI integratsioon', en: 'OpenAI integration' },
          { et: 'Praktilised projektid', en: 'Practical projects' }
        ],
        hours: 15,
        type: 'practice'
      }
    ],
    
    outcomes: [
      { et: 'Automatiseerimise põhioskused', en: 'Basic automation skills' },
      { et: 'Valmis projektid portfooliosse', en: 'Ready projects for portfolio' }
    ],
    
    prerequisites: [
      { et: 'Eelnev kogemus pole vajalik', en: 'No prior experience required' }
    ],
    
    targetAudience: [
      { et: 'Kiire tulemuse otsijad', en: 'Those seeking quick results' },
      { et: 'Automatiseerimishuvilised', en: 'Automation enthusiasts' }
    ],
    
    certificate: {
      type: 'tõend',
      title: { 
        et: 'AI Automatiseerimise Tõend', 
        en: 'AI Automation Certificate' 
      }
    },
    
    maxParticipants: 20
  }
};

// Helper functions
export function getProgram(id: string): Program | undefined {
  return PROGRAMS[id];
}

export function getAllPrograms(): Program[] {
  return Object.values(PROGRAMS);
}

export function getProgramsByIds(ids: string[]): Program[] {
  return ids.map(id => PROGRAMS[id]).filter(Boolean);
}

// Price helpers
export function formatPrice(price: number, locale: string = 'et'): string {
  return new Intl.NumberFormat(locale === 'et' ? 'et-EE' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export function calculateDiscount(
  program: Program, 
  hasAIKICertificate: boolean = false
): { finalPrice: number; discount: number; discountType?: string } {
  let finalPrice = program.pricing.price;
  let discount = 0;
  let discountType: string | undefined;
  
  // Check for graduate discount (AIVO for AIKI grads)
  if (hasAIKICertificate && program.pricing.graduateDiscount) {
    discount = Math.round(program.pricing.price * program.pricing.graduateDiscount.percent / 100);
    finalPrice = program.pricing.price - discount;
    discountType = 'graduate';
  }
  
  return { finalPrice, discount, discountType };
}
