const fs = require('fs');

try {
    // Dynamically discover locales from paraglide runtime
    const runtimeSrc = fs.readFileSync('paraglide/runtime.js', 'utf8');
    const match = runtimeSrc.match(/availableLanguageTags\s*=\s*\/\*\*.*?\*\/\s*\(\[([^\]]+)\]\)/);
    const locales = match
        ? match[1].split(',').map(s => s.trim().replace(/"/g, ''))
        : ['en', 'et'];

    // Flatten keys and sanitize: metadata.title -> metadata_title, gpt-1 -> gpt_1
    function flatten(obj, prefix = '') {
        let acc = {};
        for (const k in obj) {
            if (typeof obj[k] === 'object' && obj[k] !== null) {
                Object.assign(acc, flatten(obj[k], prefix + k + '_'));
            } else {
                const cleanKey = (prefix + k).replace(/[^a-zA-Z0-9_]/g, '_');
                acc[cleanKey] = obj[k];
            }
        }
        return acc;
    }

    function generateLocaleCode(flat) {
        return `/* eslint-disable */
${Object.keys(flat).map(k => {
            let val = String(flat[k])
                .replace(/\\/g, '\\\\')
                .replace(/\n/g, '\\n')
                .replace(/`/g, '\\`'); // Escape backticks for template literal

            // Detect {param} pattern
            if (val.match(/\{[a-zA-Z0-9_]+\}/)) {
                // Replace {param} with ${params?.param}
                const interpolated = val.replace(/\{([a-zA-Z0-9_]+)\}/g, '${params?.$1}');
                return `export const ${k} = (params) => \`${interpolated}\``;
            } else {
                return `export const ${k} = () => \`${val}\``;
            }
        }).join('\n')}
`;
    }

    if (!fs.existsSync('paraglide/messages')) {
        fs.mkdirSync('paraglide/messages', { recursive: true });
    }

    // Load and generate code for each locale
    const flatLocales = {};
    for (const locale of locales) {
        const raw = JSON.parse(fs.readFileSync(`messages/${locale}.json`, 'utf8'));
        flatLocales[locale] = flatten(raw);
        fs.writeFileSync(`paraglide/messages/${locale}.js`, generateLocaleCode(flatLocales[locale]));
    }

    // Use en keys as the canonical set
    const allKeys = Object.keys(flatLocales['en']);

    const imports = locales.map(l => `import * as ${l} from "./messages/${l}.js";`).join('\n');
    const messagesObj = `{ ${locales.join(', ')} }`;

    const entryCode = `/* eslint-disable */
import { languageTag } from "./runtime.js";
${imports}

const messages = ${messagesObj};

${allKeys.map(k => `export const ${k} = (params) => messages[languageTag()]?.${k}?.(params) ?? messages['en'].${k}(params)`).join('\n')}
`;

    fs.writeFileSync('paraglide/messages.js', entryCode);

    console.log(`Generated ${allKeys.length} message functions for ${locales.join(' + ')}.`);
} catch (e) {
    console.error("Failed to generate messages:", e);
    process.exit(1);
}
