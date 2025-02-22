import {Star, StarHalf} from 'lucide-react'

const ReviewCard = (props) => {
    const fullStars = Math.floor(props.rating);
    const hasHalfStar = props.rating % 1 !== 0;

    return (
        <div className="max-w-lg p-6 bg-white rounded-2xl shadow-md transition-all hover:shadow-xl">
        <p className="text-lg italic text-gray-700">"{props.text}"</p>

        <div className="mt-3 flex items-center">
            {[...Array(fullStars)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-500" />
            ))}
            {hasHalfStar && <StarHalf className="w-5 h-5 text-yellow-500" />}
        </div>

        <div className="mt-4">
            <h3 className="text-md font-bold">{props.author}</h3>
            <p className="text-sm text-gray-500">{props.date}</p>
        </div>
        </div>
    );
}

export default ReviewCard