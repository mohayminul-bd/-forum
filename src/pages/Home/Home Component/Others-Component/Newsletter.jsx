import React from "react";

const Newsletter = () => {
  return (
    <section
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
      className=" bg-gradient-to-r from-teal-300 to-emerald-600 text-white   py-8 mb-4 rounded-2xl shadow-md text-center"
    >
      <h2 className="text-3xl font-bold mb-4">
        📩 Stay Updated with Our Forum
      </h2>
      <p className="text-lg mb-8 text-emerald-100 max-w-2xl mx-auto">
        Subscribe to our newsletter to get updates on new posts, announcements,
        and trending discussions right in your inbox!
      </p>

      <form className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-5 py-3 rounded-lg  shadow shadow-blue-400 text-emerald-700 w-full focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-white text-emerald-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Subscribe
        </button>
      </form>

      <p className="text-sm text-emerald-100 mt-6">
        🔒 We respect your privacy. No spam, ever.
      </p>
    </section>
  );
};

export default Newsletter;
