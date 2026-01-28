'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: 'python' | 'javascript' | 'typescript';
  explanation: string;
}

const languageLabels = {
  python: 'Python',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
};

const languageColors = {
  python: 'bg-blue-500',
  javascript: 'bg-yellow-500',
  typescript: 'bg-blue-600',
};

export function CodeBlock({ code, language, explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="space-y-3">
      {/* Code container */}
      <div className="relative group">
        {/* Language badge and copy button */}
        <div className="flex items-center justify-between mb-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${languageColors[language]}`}
          >
            {languageLabels[language]}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label={copied ? 'Kopeeritud!' : 'Kopeeri kood'}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Kopeeritud!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Kopeeri</span>
              </>
            )}
          </button>
        </div>

        {/* Code block */}
        <div className="relative rounded-xl overflow-hidden bg-gray-900 dark:bg-black border border-gray-700 dark:border-gray-800">
          <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
            <code className="text-gray-100 font-mono">
              {code.split('\n').map((line, index) => (
                <div key={index} className="min-h-[1.5rem]">
                  <span className="select-none text-gray-500 mr-4 inline-block w-8 text-right">
                    {index + 1}
                  </span>
                  <span className={getLineStyle(line)}>{line || ' '}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* Explanation */}
      {explanation && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-900 dark:text-green-100 leading-relaxed">
            <span className="font-semibold">💡 Selgitus: </span>
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}

// Simple syntax highlighting using CSS classes
function getLineStyle(line: string): string {
  const trimmed = line.trim();

  // Comments
  if (trimmed.startsWith('#') || trimmed.startsWith('//')) {
    return 'text-gray-500 italic';
  }

  // Strings
  if (trimmed.includes('"') || trimmed.includes("'")) {
    return 'text-green-400';
  }

  // Keywords
  const keywords = [
    'import', 'from', 'def', 'class', 'return', 'if', 'else', 'elif', 'for', 'while',
    'const', 'let', 'var', 'function', 'async', 'await', 'new', 'try', 'catch',
    'export', 'default', 'interface', 'type', 'extends', 'implements'
  ];

  const hasKeyword = keywords.some(keyword =>
    trimmed.startsWith(keyword + ' ') ||
    trimmed.includes(' ' + keyword + ' ') ||
    trimmed.startsWith(keyword + '(')
  );

  if (hasKeyword) {
    return 'text-purple-400';
  }

  // Function calls
  if (trimmed.includes('(') && trimmed.includes(')')) {
    return 'text-blue-400';
  }

  return 'text-gray-100';
}
