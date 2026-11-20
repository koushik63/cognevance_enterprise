export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculateDiscountedPrice(price: number, discountPercentage: number): number {
  if (!discountPercentage || discountPercentage <= 0) return price;
  const discounted = price * (1 - discountPercentage / 100);
  return Math.round(discounted * 100) / 100;
}

export function formatDate(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

export function generateDemoOrderReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-5);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NX-DEMO-${timestamp}-${random}`;
}
