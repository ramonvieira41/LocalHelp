import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewsCount?: number;
}

export function StarRating({ rating, size = 16, showValue = false, reviewsCount }: StarRatingProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFull = i < full;
          const isHalf = i === full && hasHalf;
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              {(!isFull && !isHalf) && (
                <Star size={size} className="absolute inset-0 text-gray-300 dark:text-gray-600" />
              )}
              {isFull && (
                <Star size={size} className="absolute inset-0 fill-amber-400 text-amber-400" />
              )}
              {isHalf && (
                <>
                  <Star size={size} className="absolute inset-0 text-gray-300 dark:text-gray-600" />
                  <span className="absolute inset-0 overflow-hidden" style={{ width: size / 2 }}>
                    <Star size={size} className="fill-amber-400 text-amber-400" />
                  </span>
                </>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {rating.toFixed(1)}
          {reviewsCount !== undefined && (
            <span className="text-gray-600 dark:text-gray-400 font-normal"> ({reviewsCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
