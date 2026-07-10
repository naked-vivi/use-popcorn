import { useState } from "react";
import Star from "./Star";

interface StarRatingProps {
    maxRating?: number;
    color?: string;
    size?: number;
    className?: string;
}

function StarRating({ maxRating = 5, color = "#fcc419", size = 48, className = "" }: StarRatingProps) {
    const [rating, setRating] = useState(0)
    const [tempRating, setTempRating] = useState(0)

    function handleRating(selectedRating: number) {
        setRating(selectedRating)
    }
    return (
        <div className={`container mx-auto w-100 h-50 flex items-center gap-4 size-14`}>
            <div className="flex gap-2">
                {Array.from({ length: maxRating }, (_, i) =>
                    <Star
                        key={i}
                        onRate={() => handleRating(i + 1)}
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                        onHoverIn={() => setTempRating(i + 1)}
                        onHoverOut={() => setTempRating(0)}
                        color={color}
                        size={size}
                    />
                )}
            </div>
            <p className={`${className}`}>
                {tempRating || rating || 0}
            </p>
        </div>
    )
}

export default StarRating
