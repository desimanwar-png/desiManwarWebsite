import { useState } from 'react'
import { Star } from 'lucide-react'

export function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          className={`cursor-pointer transition-colors ${
            (hover || value) >= star
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-muted'
          }`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  )
}
