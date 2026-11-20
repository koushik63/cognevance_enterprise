import { calculateDiscountedPrice, formatCurrency } from '../../utils/formatters';

interface PriceDisplayProps {
  price: number;
  discountPercentage?: number;
  size?: 'sm' | 'md' | 'lg';
  lightMode?: boolean;
}

export function PriceDisplay({
  price,
  discountPercentage = 0,
  size = 'md',
  lightMode = false,
}: PriceDisplayProps) {
  const hasDiscount = discountPercentage > 0;
  const finalPrice = calculateDiscountedPrice(price, discountPercentage);

  const mainSize =
    size === 'lg' ? 'text-3xl font-bold' : size === 'sm' ? 'text-base font-semibold' : 'text-lg font-semibold';

  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={`${mainSize} font-heading ${lightMode ? 'text-[#0B0D12]' : 'text-white'}`}>
        {formatCurrency(finalPrice)}
      </span>
      {hasDiscount && (
        <>
          <span className={`text-xs line-through ${lightMode ? 'text-slate-500' : 'text-[#A5ADBA]'}`}>
            {formatCurrency(price)}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#4F8CFF]/15 text-[#8AB4FF] border border-[#4F8CFF]/30">
            -{Math.round(discountPercentage)}%
          </span>
        </>
      )}
    </div>
  );
}
