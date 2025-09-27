import { useNavigate } from "react-router";
import { FaDollarSign } from "react-icons/fa";

const MembershipPage = () => {
  const navigate = useNavigate();

  const handlePay = () => {
    navigate("/payment");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 min-h-[280px] bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl shadow-lg text-center space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        Become a Gold Member
      </h2>
      <p className="text-white/90 text-base md:text-lg leading-relaxed px-2 md:px-6">
        Unlock the full power of{" "}
        <span className="font-semibold">Talk Sphere</span>. For just{" "}
        <span className="font-bold">৳99 / $1</span>, you can post unlimited
        content and earn a shiny{" "}
        <span className="text-yellow-300 font-bold">Gold badge!</span>
      </p>
      <button
        onClick={handlePay}
        className="btn btn-success btn-md md:btn-lg px-6 md:px-8 flex items-center justify-center gap-2 rounded-full shadow-md hover:shadow-xl transition"
      >
        <FaDollarSign className="text-lg md:text-xl" /> Payment Bank Card
      </button>
    </div>
  );
};

export default MembershipPage;
