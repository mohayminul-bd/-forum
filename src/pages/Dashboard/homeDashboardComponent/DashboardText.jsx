import React from "react";
import { FaTrophy, FaChartBar } from "react-icons/fa";

const DashboardText = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg space-y-6">
      {/* Achievements Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FaTrophy className="text-yellow-500" size={24} />
          <h2 className="text-2xl font-bold">Your Achievements</h2>
        </div>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Earned the "Active Contributor" badge for posting regularly.</li>
          <li>Increased your community reputation by 20% in the last month.</li>
          <li>Featured in the "Top 5 Posts" section twice this month.</li>
        </ul>
      </div>

      {/* Dashboard Tips Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FaChartBar className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold">Dashboard Tips</h2>
        </div>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Stay consistent with your posts for better visibility.</li>
          <li>Upgrade to members status to unlock more features.</li>
          <li>Engage with others by commenting and voting.</li>
          <li>
            Consider creating tutorials or guides to help others in the
            community.
          </li>
          <li>
            Make use of hashtags and tags to increase the reach of your posts.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardText;
