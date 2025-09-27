import { useNavigate } from "react-router";
import { FaDollarSign } from "react-icons/fa";

const MembershipPage = () => {
  const navigate = useNavigate();

  const handlePay = () => {
    navigate("/payment");
  };

  return (
    <div className="p-4">
      <button
        onClick={handlePay}
        className="btn btn-sm btn-outline btn-success flex items-center gap-1"
      >
        <FaDollarSign /> Payment
      </button>
    </div>
  );
};

export default MembershipPage;
