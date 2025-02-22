'use client'
import { reviews } from "@/providers/ReviewItems"
import ReviewCard from "./ReviewCard";

const ReviewList = () => {
    return (
        <section className="w-full bg-white py-16 px-8 lg:px-20">
        <div className="lg:mx-20 md:mx-10 sm:mx-5 font-sans">
          <h2 className="text-6xl text-left text-gray-700 mb-6 font-light">What People Say</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        </div>
        </section>
      );
}

export default ReviewList