export function calculatePrice(quantity: number): number {
  if (quantity <= 0 || !Number.isFinite(quantity)) return 0;

  let unitPrice: number;
  if (quantity >= 100) unitPrice = 68 / 100;
  else if (quantity >= 70) unitPrice = 50 / 70;
  else if (quantity >= 30) unitPrice = 24 / 30;
  else if (quantity >= 15) unitPrice = 13 / 15;
  else unitPrice = 9 / 10;

  return Math.round(quantity * unitPrice * 100) / 100;
}
