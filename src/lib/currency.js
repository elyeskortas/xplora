export function formatCurrency(value) {
  const n = typeof value === 'number' ? value : Number(value || 0)
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'TND',
    maximumFractionDigits: 2,
  }).format(n)
}
