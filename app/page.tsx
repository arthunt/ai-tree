import { redirect } from 'next/navigation';
import { sourceLanguageTag as defaultLocale } from '@/paraglide/runtime';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
