const fs = require('fs');

try {
    const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
    const et = JSON.parse(fs.readFileSync('messages/et.json', 'utf8'));

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
${Object.keys(flat).map(k => `export const ${k} = () => "${String(flat[k]).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/"/g, '\\"')}"`).join('\n')}
`;
    }

    const flatEn = flatten(en);
    const flatEt = flatten(et);

    if (!fs.existsSync('paraglide/messages')) {
        fs.mkdirSync('paraglide/messages', { recursive: true });
    }

    fs.writeFileSync('paraglide/messages/en.js', generateLocaleCode(flatEn));
    fs.writeFileSync('paraglide/messages/et.js', generateLocaleCode(flatEt));

    // Use en keys as the canonical set (et may have same or subset)
    const allKeys = Object.keys(flatEn);

    const entryCode = `/* eslint-disable */
import { languageTag } from "./runtime.js";
import * as en from "./messages/en.js";
import * as et from "./messages/et.js";

const messages = { en, et };

${allKeys.map(k => `export const ${k} = (params) => messages[languageTag()]?.${k}?.(params) ?? messages['en'].${k}(params)`).join('\n')}
`;

    fs.writeFileSync('paraglide/messages.js', entryCode);

    console.log(`Generated ${allKeys.length} message functions for en + et.`);
} catch (e) {
    console.error("Failed to generate messages:", e);
    process.exit(1);
}
