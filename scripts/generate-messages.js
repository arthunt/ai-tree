const fs = require('fs');

try {
    const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

    // Flatten keys: metadata.title -> metadata_title
    function flatten(obj, prefix = '') {
        let acc = {};
        for (const k in obj) {
            if (typeof obj[k] === 'object' && obj[k] !== null) {
                Object.assign(acc, flatten(obj[k], prefix + k + '_'));
            } else {
                acc[prefix + k] = obj[k]; // simplified, values are strings
            }
        }
        return acc;
    }

    const flat = flatten(en);

    // Paraglide v2/standard generates functions for messages
    const code = `/* eslint-disable */
${Object.keys(flat).map(k => `export const ${k} = () => "${String(flat[k]).replace(/\n/g, '\\n').replace(/"/g, '\\"')}"`).join('\n')}
`;

    if (!fs.existsSync('paraglide/messages')) {
        fs.mkdirSync('paraglide/messages', { recursive: true });
    }

    fs.writeFileSync('paraglide/messages/en.js', code);

    // Also create et.js (mocked with en content for now to prevent crash)
    fs.writeFileSync('paraglide/messages/et.js', code);

    // Update messages.js to export from en (source)
    const entryCode = `
import { languageTag } from "./runtime.js";
import * as en from "./messages/en.js";
import * as et from "./messages/et.js";

const messages = {
    en,
    et
};

${Object.keys(flat).map(k => `export const ${k} = (params) => messages[languageTag()]?.${k}(params) ?? messages['en'].${k}(params)`).join('\n')}
`;

    fs.writeFileSync('paraglide/messages.js', entryCode);

    console.log("Successfully generated dummy message files.");
} catch (e) {
    console.error("Failed to generate messages:", e);
}
