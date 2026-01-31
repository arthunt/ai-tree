/**
 * Migration Script: Convert current tree-concepts.json to i18n structure
 *
 * Usage: ts-node MIGRATION_SCRIPT_EXAMPLE.ts
 *
 * This script:
 * 1. Reads the current Estonian data/tree-concepts.json
 * 2. Splits it into organized locale-specific JSON files
 * 3. Prepares structure for English translations
 * 4. Validates the output
 */

import * as fs from 'fs/promises';
import * as path from 'path';

// --- TYPE DEFINITIONS ---

interface OldMetadata {
  title: string;
  description: string;
  created: string;
  language: string;
}

interface OldLevel {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  order: number;
}

interface OldConcept {
  id: string;
  level: string;
  title: string;
  simpleName: string;
  explanation: string;
  metaphor: string;
  icon: string;
  complexity: 1 | 2 | 3;
}

interface OldTreeData {
  version: string;
  metadata: OldMetadata;
  levels: OldLevel[];
  concepts: OldConcept[];
}

interface NewLevelsData {
  metadata: {
    title: string;
    description: string;
    subtitle: string;
    footerTagline: string;
  };
  levels: Record<string, {
    name: string;
    subtitle: string;
    description: string;
  }>;
}

interface NewConceptsData {
  concepts: Array<{
    id: string;
    title: string;
    simpleName: string;
    explanation: string;
    metaphor: string;
  }>;
}

interface NewCommonData {
  viewFullSize: string;
  currentlyHere: string;
  or: string;
  clickHere: string;
  close: string;
  back: string;
  next: string;
  previous: string;
  loading: string;
}

interface NewNavigationData {
  treeView: string;
  classicView: string;
  classicViewDesc: string;
  treeViewDesc: string;
  startFromRoots: string;
  version: string;
}

interface GlossaryTerm {
  term: string;
  keep_original: boolean;
  translated?: boolean;
  expanded?: string;
  short_explanation: string;
  example?: string;
}

interface NewGlossaryData {
  terms: Record<string, GlossaryTerm>;
  complexity_levels: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
}

// --- CONFIGURATION ---

const SOURCE_FILE = './data/tree-concepts.json';
const OUTPUT_BASE = './locales';
const LEVEL_IDS = ['roots', 'trunk', 'branches', 'leaves'] as const;

// --- UTILITY FUNCTIONS ---

async function ensureDirectory(dir: string): Promise<void> {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Failed to create directory ${dir}:`, error);
    throw error;
  }
}

async function writeJsonFile(filePath: string, data: any): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log(`✅ Created: ${filePath}`);
  } catch (error) {
    console.error(`Failed to write ${filePath}:`, error);
    throw error;
  }
}

// --- TRANSLATION HELPERS ---

/**
 * Extract common UI strings from Estonian
 * These will need manual English translation
 */
function createCommonTranslations(locale: string): NewCommonData {
  if (locale === 'et') {
    return {
      viewFullSize: 'Vaata täismõõtus',
      currentlyHere: 'Praegu siin',
      or: 'või',
      clickHere: 'Kliki siia',
      close: 'Sulge',
      back: 'Tagasi',
      next: 'Järgmine',
      previous: 'Eelmine',
      loading: 'Laadimine...'
    };
  } else {
    // English placeholder - needs professional translation
    return {
      viewFullSize: 'View full size',
      currentlyHere: 'Currently here',
      or: 'or',
      clickHere: 'Click here',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      loading: 'Loading...'
    };
  }
}

/**
 * Create navigation translations
 */
function createNavigationTranslations(locale: string): NewNavigationData {
  if (locale === 'et') {
    return {
      treeView: 'Puu Vaade',
      classicView: 'Klassikaline Vaade',
      classicViewDesc: 'Keritav tasandite vaade detailse sisuga',
      treeViewDesc: 'Interaktiivne puu kõigi kontseptsioonidega',
      startFromRoots: 'Alusta juurtest ja liigu ülespoole või keri vabalt',
      version: 'Versioon'
    };
  } else {
    return {
      treeView: 'Tree View',
      classicView: 'Classic View',
      classicViewDesc: 'Scrollable level view with detailed content',
      treeViewDesc: 'Interactive tree with all concepts',
      startFromRoots: 'Start from roots and move upward or scroll freely',
      version: 'Version'
    };
  }
}

/**
 * Create glossary of technical terms
 */
function createGlossary(locale: string): NewGlossaryData {
  if (locale === 'et') {
    return {
      terms: {
        tokens: {
          term: 'Tokens',
          keep_original: true,
          short_explanation: 'Teksti väikseimad ühikud, mida AI töötleb',
          example: 'Sõna "banaan" jaguneb 3 tokeniks'
        },
        embeddings: {
          term: 'Embeddings',
          keep_original: true,
          short_explanation: 'Vektorid, mis esindavad sõnade tähendusi numbriliselt'
        },
        rag: {
          term: 'RAG',
          expanded: 'Retrieval-Augmented Generation',
          keep_original: true,
          short_explanation: 'AI tehnika, mis otsib asjakohast infot enne vastuse genereerimist'
        },
        lora: {
          term: 'LoRA',
          expanded: 'Low-Rank Adaptation',
          keep_original: true,
          short_explanation: 'Mudeli tõhus peenhäälestamise meetod'
        },
        mcp: {
          term: 'MCP',
          expanded: 'Model Context Protocol',
          keep_original: true,
          short_explanation: 'Standardiseeritud protokoll mudelite ja tööriistade ühendamiseks'
        },
        agi: {
          term: 'AGI',
          expanded: 'Artificial General Intelligence',
          keep_original: true,
          short_explanation: 'Üldine tehisintellekt inimtasemel'
        },
        asi: {
          term: 'ASI',
          expanded: 'Artificial Superintelligence',
          keep_original: true,
          short_explanation: 'Superintellekt, mis ületab inimvõimeid'
        },
        context: {
          term: 'Kontekst',
          keep_original: false,
          translated: true,
          short_explanation: 'Ümbritsev informatsioon, mis annab promptile tähenduse'
        },
        agent: {
          term: 'Agent',
          keep_original: true,
          translated: false,
          short_explanation: 'Autonoomne AI süsteem, mis suudab kasutada tööriistu'
        }
      },
      complexity_levels: {
        beginner: 'Algaja',
        intermediate: 'Keskmine',
        advanced: 'Keeruline'
      }
    };
  } else {
    return {
      terms: {
        tokens: {
          term: 'Tokens',
          keep_original: true,
          short_explanation: 'Smallest units of text processed by AI models',
          example: 'The word "banana" is split into 3 tokens'
        },
        embeddings: {
          term: 'Embeddings',
          keep_original: true,
          short_explanation: 'Vectors that represent word meanings numerically'
        },
        rag: {
          term: 'RAG',
          expanded: 'Retrieval-Augmented Generation',
          keep_original: true,
          short_explanation: 'AI technique that retrieves relevant information before generating responses'
        },
        lora: {
          term: 'LoRA',
          expanded: 'Low-Rank Adaptation',
          keep_original: true,
          short_explanation: 'Efficient method for fine-tuning models'
        },
        mcp: {
          term: 'MCP',
          expanded: 'Model Context Protocol',
          keep_original: true,
          short_explanation: 'Standardized protocol for connecting models and tools'
        },
        agi: {
          term: 'AGI',
          expanded: 'Artificial General Intelligence',
          keep_original: true,
          short_explanation: 'General intelligence at human level'
        },
        asi: {
          term: 'ASI',
          expanded: 'Artificial Superintelligence',
          keep_original: true,
          short_explanation: 'Superintelligence that exceeds human capabilities'
        },
        context: {
          term: 'Context',
          keep_original: true,
          translated: false,
          short_explanation: 'Surrounding information that gives meaning to a prompt'
        },
        agent: {
          term: 'Agent',
          keep_original: true,
          translated: false,
          short_explanation: 'Autonomous AI system that can use tools'
        }
      },
      complexity_levels: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
      }
    };
  }
}

// --- MAIN MIGRATION FUNCTIONS ---

/**
 * Create levels.json for a locale
 */
async function createLevelsFile(
  oldData: OldTreeData,
  locale: string,
  outputDir: string
): Promise<void> {
  const levelsData: NewLevelsData = {
    metadata: {
      title: locale === 'et'
        ? 'AI Teadmiste Puu'
        : 'AI Knowledge Tree',
      description: locale === 'et'
        ? oldData.metadata.description
        : 'A comprehensive framework for teaching AI concepts',
      subtitle: locale === 'et'
        ? 'Terviklik raamistik AI kontseptide õpetamiseks – alates fundamentaalsetest mehaanikate põhimõtetest kuni kõige uuemate uuringuteni.'
        : 'A complete framework for teaching AI concepts – from fundamental mechanics to cutting-edge research.',
      footerTagline: locale === 'et'
        ? 'AI Teadmiste Puu – Interaktiivne õppevahend AI kontseptide mõistmiseks'
        : 'AI Knowledge Tree – Interactive learning tool for understanding AI concepts'
    },
    levels: {}
  };

  for (const level of oldData.levels) {
    levelsData.levels[level.id] = {
      name: level.name,
      subtitle: level.subtitle,
      description: level.description
    };
  }

  await writeJsonFile(path.join(outputDir, 'levels.json'), levelsData);
}

/**
 * Create concept files split by level
 */
async function createConceptFiles(
  oldData: OldTreeData,
  locale: string,
  outputDir: string
): Promise<void> {
  const conceptsDir = path.join(outputDir, 'concepts');
  await ensureDirectory(conceptsDir);

  for (const levelId of LEVEL_IDS) {
    const levelConcepts = oldData.concepts.filter(c => c.level === levelId);

    const conceptsData: NewConceptsData = {
      concepts: levelConcepts.map(c => ({
        id: c.id,
        title: c.title,
        simpleName: c.simpleName,
        explanation: c.explanation,
        metaphor: c.metaphor
      }))
    };

    await writeJsonFile(
      path.join(conceptsDir, `${levelId}.json`),
      conceptsData
    );
  }
}

/**
 * Main migration function
 */
async function migrateToI18n(): Promise<void> {
  console.log('🚀 Starting i18n migration...\n');

  try {
    // 1. Read source file
    console.log('📖 Reading source file...');
    const sourceContent = await fs.readFile(SOURCE_FILE, 'utf-8');
    const oldData: OldTreeData = JSON.parse(sourceContent);
    console.log(`✅ Loaded ${oldData.concepts.length} concepts and ${oldData.levels.length} levels\n`);

    // 2. Process Estonian (original language)
    console.log('🇪🇪 Processing Estonian translations...');
    const etDir = path.join(OUTPUT_BASE, 'et');
    await ensureDirectory(etDir);

    await createLevelsFile(oldData, 'et', etDir);
    await createConceptFiles(oldData, 'et', etDir);
    await writeJsonFile(path.join(etDir, 'common.json'), createCommonTranslations('et'));
    await writeJsonFile(path.join(etDir, 'navigation.json'), createNavigationTranslations('et'));
    await writeJsonFile(path.join(etDir, 'glossary.json'), createGlossary('et'));

    console.log('');

    // 3. Process English (with placeholder translations)
    console.log('🇬🇧 Processing English translations (placeholders)...');
    const enDir = path.join(OUTPUT_BASE, 'en');
    await ensureDirectory(enDir);

    await createLevelsFile(oldData, 'en', enDir);
    await createConceptFiles(oldData, 'en', enDir); // Note: Concepts need manual translation
    await writeJsonFile(path.join(enDir, 'common.json'), createCommonTranslations('en'));
    await writeJsonFile(path.join(enDir, 'navigation.json'), createNavigationTranslations('en'));
    await writeJsonFile(path.join(enDir, 'glossary.json'), createGlossary('en'));

    console.log('');

    // 4. Create locale config
    console.log('⚙️  Creating locale configuration...');
    const configContent = `/**
 * Locale configuration for i18n
 * Auto-generated by migration script
 */

export type Locale = 'en' | 'et';

export interface LocaleConfig {
  code: Locale;
  name: string;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  flag: string;
}

export const localeConfig: Record<Locale, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    flag: '🇬🇧'
  },
  et: {
    code: 'et',
    name: 'Eesti',
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    flag: '🇪🇪'
  }
} as const;

export const defaultLocale: Locale = 'et';

export const locales = Object.keys(localeConfig) as Locale[];
`;

    await fs.writeFile(path.join(OUTPUT_BASE, 'config.ts'), configContent);
    console.log(`✅ Created: ${OUTPUT_BASE}/config.ts\n`);

    // 5. Validation
    console.log('🔍 Validating output...');
    const etConceptsCount = (await fs.readdir(path.join(etDir, 'concepts'))).length;
    const enConceptsCount = (await fs.readdir(path.join(enDir, 'concepts'))).length;

    if (etConceptsCount !== LEVEL_IDS.length || enConceptsCount !== LEVEL_IDS.length) {
      throw new Error('Concept files count mismatch!');
    }

    console.log('✅ Validation passed\n');

    // 6. Summary
    console.log('📊 Migration Summary:');
    console.log('━'.repeat(50));
    console.log(`Source concepts: ${oldData.concepts.length}`);
    console.log(`Source levels: ${oldData.levels.length}`);
    console.log(`Output locales: 2 (et, en)`);
    console.log(`Files per locale: ${5 + LEVEL_IDS.length}`);
    console.log(`Total files created: ${2 * (5 + LEVEL_IDS.length) + 1}`);
    console.log('━'.repeat(50));

    console.log('\n⚠️  IMPORTANT NEXT STEPS:');
    console.log('1. Review generated English translations in locales/en/');
    console.log('2. Hire professional translator for concepts (high priority)');
    console.log('3. Validate technical term translations in glossary.json');
    console.log('4. Test with next-intl integration');
    console.log('5. Run validation script: npm run validate-translations');

    console.log('\n✨ Migration completed successfully!');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// --- VALIDATION SCRIPT ---

/**
 * Validate translation structure
 */
async function validateTranslations(): Promise<void> {
  console.log('🔍 Validating translations...\n');

  const locales = ['et', 'en'];
  const requiredFiles = [
    'common.json',
    'navigation.json',
    'levels.json',
    'glossary.json',
    ...LEVEL_IDS.map(l => `concepts/${l}.json`)
  ];

  for (const locale of locales) {
    console.log(`Checking ${locale}...`);
    const localeDir = path.join(OUTPUT_BASE, locale);

    for (const file of requiredFiles) {
      const filePath = path.join(localeDir, file);
      try {
        await fs.access(filePath);
        const content = await fs.readFile(filePath, 'utf-8');
        JSON.parse(content); // Validate JSON
        console.log(`  ✅ ${file}`);
      } catch (error) {
        console.error(`  ❌ ${file} - MISSING OR INVALID`);
        throw error;
      }
    }
    console.log('');
  }

  console.log('✅ All translations are valid!');
}

// --- CLI INTERFACE ---

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'migrate':
    migrateToI18n();
    break;
  case 'validate':
    validateTranslations();
    break;
  default:
    console.log(`
AI Tree i18n Migration Script

Usage:
  ts-node MIGRATION_SCRIPT_EXAMPLE.ts <command>

Commands:
  migrate   - Convert tree-concepts.json to i18n structure
  validate  - Validate existing translation files

Examples:
  ts-node MIGRATION_SCRIPT_EXAMPLE.ts migrate
  ts-node MIGRATION_SCRIPT_EXAMPLE.ts validate
    `);
    process.exit(0);
}
