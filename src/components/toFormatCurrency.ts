export interface ParamsFormatCurrency {
  value?: string | number;
  locale?: string;
  style?: string;
  currency?: string;
  minimumFractionDigits?: number;
}

export const toFormatCurrency = ({
  value = 0,
  locale = 'es-CO',
  style = 'decimal',
  currency = 'COP',
  minimumFractionDigits = 2,
}: ParamsFormatCurrency = {}): string => {
  return new Intl.NumberFormat(locale, {
    // @ts-ignore
    style,
    currency,
    minimumFractionDigits,
  }).format(value as number);
}