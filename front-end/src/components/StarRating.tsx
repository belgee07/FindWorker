"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";

interface StarRatingProps {
  onSubmit: (data: { rating: number; comment: string }) => void;
  authId: string; // Add the authId prop type
}

const StarRating: React.FC<StarRatingProps> = ({ onSubmit, authId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [previousRating, setPreviousRating] = useState<number | null>(null);

  // Fetch previous rating and comment if it exists
  useEffect(() => {
    const getRating = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/createReview/${authId}`
        );
        if (data) {
          setRating(data.rating);
          setComment(data.comment || "");
          setPreviousRating(data.rating);
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    if (authId) getRating();
  }, [authId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }
    onSubmit({ rating, comment });
    setPreviousRating(rating);
  };

  return (
    <div className="rating-container" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Ажилтанд үнэлгээ өгөх</h2>
      <div className="stars" style={{ display: "flex", gap: "5px" }}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={index}
              type="button"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
                color: starValue <= (hover || rating) ? "#FFD700" : "#D3D3D3",
              }}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </button>
          );
        })}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
        rows={4}
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      ></textarea>
      <Button onClick={handleSubmit} className="flex mt-6 mb-6">
        Үнэлгээ өгөх
      </Button>

      {previousRating !== null && (
        <p style={{ marginTop: "10px" }}>
          Таны өмнөх үнэлгээ: {previousRating} ★
        </p>
      )}
    </div>
  );
};

// Example usage
const App: React.FC = () => {
  const handleRatingSubmit = async (data: { rating: number; comment: string }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/createReview`,
        {
          rating: data.rating,
          comment: data.comment,
        }
      );
      alert("Үнэлгээ амжилттай илгээгдлээ!");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <StarRating onSubmit={handleRatingSubmit} authId="" />
    </div>
  );
};

export default StarRating;




// import React, { useState } from "react";
// import { Button } from "./ui/button";

// interface StarRatingProps {
//   onSubmit: (data: { rating: number; comment: string }) => void;
// }

// const StarRating: React.FC<StarRatingProps> = ({ onSubmit }) => {
//   const [rating, setRating] = useState<number>(0); // Star rating value
//   const [hover, setHover] = useState<number>(0);  // Star hover effect
//   const [comment, setComment] = useState<string>(""); // Comment text

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (rating === 0) {
//       alert("Please select a rating before submitting.");
//       return;
//     }
//     onSubmit({ rating, comment });
//     setRating(0); // Reset form
//     setComment("");
//   };

//   return (
//     <div className="rating-container" style={{ maxWidth: "400px", margin: "0 auto" }}>
//       <h2>Ажилтанд үнэлгээ өгөх</h2>
//       <div className="stars" style={{ display: "flex", gap: "5px" }}>
//         {[...Array(5)].map((_, index) => {
//           const starValue = index + 1;
//           return (
//             <button
//               key={index}
//               type="button"
//               style={{
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 fontSize: "24px",
//                 color: starValue <= (hover || rating) ? "#FFD700" : "#D3D3D3",
//               }}
//               onClick={() => setRating(starValue)}
//               onMouseEnter={() => setHover(starValue)}
//               onMouseLeave={() => setHover(0)}
//             >
//               ★
//             </button>
//           );
//         })}
//       </div>
//       <textarea
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Leave a comment..."
//         rows={4}
//         style={{
//           width: "100%",
//           marginTop: "10px",
//           padding: "10px",
//           borderRadius: "5px",
//           border: "1px solid #ccc",
//         }}
//       ></textarea>
//       <Button  onClick={handleSubmit} 
//       className=" "> Үнэлгээ өгөх
//       </Button>

//     </div>
//   );

// };

// export default StarRating;
