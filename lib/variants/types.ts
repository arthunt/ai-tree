export interface ContentVariant {
  id: string;
  content_key: string;
  locale: string;
  variant_name: string;
  content: string;
  weight: number;
}

export interface VariantSelection {
  content: string;
  variant_name: string;
  content_key: string;
  locale: string;
}

export type VariantStrategy = 'weighted_random' | 'highest_weight' | 'round_robin';
