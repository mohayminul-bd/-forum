import React from "react";
import useAuth from "../../../hooks/useAuth";

// Badge components
const BronzeBadge = () => (
  <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold shadow-sm text-sm sm:text-base">
    <span className="text-xl">🥉</span> <span>Bronze</span>
  </div>
);

const GoldBadge = () => (
  <div className="flex items-center gap-2 bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-semibold shadow-md text-sm sm:text-base">
    <span className="text-xl">🥇</span> <span>Gold</span>
  </div>
);

const UserCard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <img
          src={user.photoURL || "/default-profile.png"}
          alt={user.displayName}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-yellow-200 shadow-sm"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {user.displayName}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>

          <div className="mt-2 sm:mt-3 flex justify-center sm:justify-start space-x-3">
            {user.isMember ? <GoldBadge /> : <BronzeBadge />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
