import React from "react";
import { FaPenFancy, FaComments, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router";

const PostSystem = () => {
  return (
    <section className="md:px-12  ">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        ✍️ How You Can Create a Post Here
      </h2>

      <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-10">
        Posting in our forum is super easy! Just follow the simple steps below
        to share your thoughts or ask your questions.
      </p>

      <div data-aos="flip-up" className="grid md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-xl shadow hover:-translate-y-2 hover:shadow-lg transition duration-300">
          <div className="flex justify-center mb-4 text-4xl text-emerald-600">
            <FaPenFancy />
          </div>
          <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">
            Step 1: Login or Register
          </h3>
          <p className="text-gray-600 text-center">
            First, log in to your account. If you’re new here, register and
            complete your profile to get started.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-6 rounded-xl shadow hover:-translate-y-2 hover:shadow-lg transition duration-300">
          <div className="flex justify-center mb-4 text-4xl text-blue-600">
            <FaComments />
          </div>
          <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">
            Step 2: Create Your Post
          </h3>
          <p className="text-gray-600 text-center">
            Go to the “Add Post” page, write your post title, description, and
            choose a tag to make your post more visible.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-6 rounded-xl shadow hover:-translate-y-2 hover:shadow-lg transition duration-300">
          <div className="flex justify-center mb-4 text-4xl text-yellow-600">
            <FaThumbsUp />
          </div>
          <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">
            Step 3: Engage with Others
          </h3>
          <p className="text-gray-600 text-center">
            After posting, others can comment, upvote, and join the discussion
            on your post. Stay active and connect with the community!
          </p>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link to="/addPost">
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-md hover:bg-emerald-700 transition font-semibold">
            Create Your First Post
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PostSystem;
