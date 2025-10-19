import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiCheckCircle,
  FiTarget,
  FiShield,
  FiClock,
  FiUsers,
  FiCpu,
} from "react-icons/fi";

const cards = [
  {
    id: 1,
    title: "Quality",
    desc: "We maintain coding standards, testing, and reviews to ensure reliable and maintainable software.",
    icon: <FiCheckCircle className="w-6 h-6" />,
    accent: "from-green-400 to-emerald-400",
  },
  {
    id: 2,
    title: "Requirements",
    desc: "Clear requirements, prioritization, and roadmap are defined based on user needs.",
    icon: <FiTarget className="w-6 h-6" />,
    accent: "from-indigo-400 to-violet-400",
  },
  {
    id: 3,
    title: "Reliability",
    desc: "Scalable architecture, backup, and monitoring to keep the service stable 24/7.",
    icon: <FiShield className="w-6 h-6" />,
    accent: "from-yellow-400 to-orange-400",
  },
  {
    id: 4,
    title: "Services",
    desc: "Responsive support, detailed documentation, and custom integration options.",
    icon: <FiUsers className="w-6 h-6" />,
    accent: "from-blue-400 to-cyan-400",
  },
  {
    id: 5,
    title: "Performance",
    desc: "Optimized loading, caching, and fast response to ensure smooth user experience.",
    icon: <FiCpu className="w-6 h-6" />,
    accent: "from-pink-400 to-rose-400",
  },
  {
    id: 6,
    title: "Uptime & Support",
    desc: "Real-time monitoring, SLA commitments, and fast recovery policies.",
    icon: <FiClock className="w-6 h-6" />,
    accent: "from-gray-400 to-slate-500",
  },
];

const CompanyData = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-extrabold text-gray-900">
            Project Overview
          </h3>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            This project or website focuses on Health, Technology, Business, and
            Education. Explore how we ensure quality, reliability, performance,
            and services tailored to these domains.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, idx) => (
            <article
              key={c.id}
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              className="relative transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="overflow-hidden rounded-2xl shadow-lg p-6 bg-white border border-gray-100">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 rounded-lg p-3 bg-gradient-to-br ${c.accent} text-white shadow-md`}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {c.title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    ✅ Best Practices
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    ⚙️ Configurable
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    🔒 Secure
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
                  <span>Deliverable</span>
                  <span className="font-medium text-gray-800">v1.0</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyData;
