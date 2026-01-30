import * as m from '@/paraglide/messages';

export function useParaglideTranslations(namespace?: string) {
    return (key: string, values?: Record<string, any>) => {
        // Construct the full key: namespace.key
        const fullKey = namespace ? `${namespace}.${key}` : key;

        // Sanitize key to match Paraglide's flattened structure (replace dots and hyphens with underscores)
        // Example: "conceptData.ai-agents.title" -> "conceptData_ai_agents_title"
        const sanitizedKey = fullKey.replace(/[^a-zA-Z0-9_]/g, '_');

        // Retrieve the message function from the messages object
        const fn = (m as any)[sanitizedKey];

        if (typeof fn === 'function') {
            try {
                return fn(values);
            } catch (e) {
                console.warn(`Error formatting message for key: ${fullKey}`, e);
                return fullKey;
            }
        }

        // Fallback if key not found (useful for debugging)
        // console.warn(`Missing translation key: ${sanitizedKey} (original: ${fullKey})`);
        return fullKey;
    };
}

// Mock NextIntlClientProvider to do nothing, for compatibility if needed
export function NextIntlClientProvider({ children }: { children: React.ReactNode;[key: string]: any }) {
    return <>{ children } </>;
}
