import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  showValue?: boolean;
  lightMode?: boolean;
}

export function Rating({ rating, reviewCount, showValue = true, lightMode = false }: RatingProps) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rounded);
          const half = !filled && star - 0.5 <= rounded;
          return (
            <Star
              key={star}
              className={`w-3.5 h-3.5 ${
                filled
                  ? 'fill-[#4F8CFF] text-[#4F8CFF]'
                  : half
                    ? 'fill-[#4F8CFF]/50 text-[#4F8CFF]'
                    : lightMode
                      ? 'text-slate-300'
                      : 'text-[#293241]'
              }`}
              aria-hidden="true"
            />
          );
        })}
      </div>
      {showValue && (
        <span className={`text-xs font-medium ${lightMode ? 'text-slate-600' : 'text-[#A5ADBA]'}`}>
          {rating.toFixed(1)}
          {reviewCount !== undefined && <span className="ml-1">({reviewCount})</span>}
        </span>
      )}
    </div>
  );
}
