import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";

const Reviews = () => {
  const { darkMode } = useContext(AuthContext);
  const reviews = [
    {
      id: 1,
      name: "John Smith",
      image: "https://i.pravatar.cc/100?img=1",
      text: "This forum is an amazing platform to share knowledge and ideas. The community is super friendly!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Lee",
      image: "https://i.pravatar.cc/100?img=5",
      text: "A great place for developers! I’ve learned a lot just by reading others’ posts and comments.",
      rating: 4,
    },
    {
      id: 3,
      name: "Michael Brown",
      image: "https://i.pravatar.cc/100?img=3",
      text: "User-friendly interface and active discussions make this site one of the best communities online!",
      rating: 5,
    },
  ];

  return (
    <section className="my-20 px-8  ">
      <h2 className="text-3xl font-bold text-center mb-10 ">
        💬 What Our Users Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            data-aos="zoom-in-up"
            key={review.id}
            className={`p-6 rounded-xl shadow hover:-translate-y-2 hover:shadow-lg transition duration-300 text-center ${
              darkMode
                ? " bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg"
                : "bg-base-100 text-black"
            }`}
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-emerald-500"
            />
            <h3 className="text-lg font-semibold  mb-2">{review.name}</h3>
            <p
              className={` mb-3 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              "{review.text}"
            </p>
            <div className="flex justify-center text-yellow-500">
              {Array.from({ length: review.rating }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
