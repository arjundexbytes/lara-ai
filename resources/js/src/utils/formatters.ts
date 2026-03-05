export const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n || 0);
export const formatPercent = (n: number) => `${Math.round((n || 0) * 100)}%`;
export const truncate = (text: string, len = 60) => (text?.length > len ? `${text.slice(0, len)}...` : text || '');
