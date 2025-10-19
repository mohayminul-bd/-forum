import React, { useContext, useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Users, Smile, Cpu, LayoutGrid } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../../../context/AuthContext";

const stats = [
  {
    id: 1,
    icon: <Users className="w-8 h-8 text-indigo-600" />,
    number: 1200,
    label: "Happy Clients",
  },
  {
    id: 2,
    icon: <Smile className="w-8 h-8 text-green-500" />,
    number: 50,
    label: "Countries Served",
  },
  {
    id: 3,
    icon: <Cpu className="w-8 h-8 text-yellow-500" />,
    number: 320,
    label: "Projects Completed",
  },
  {
    id: 4,
    icon: <LayoutGrid className="w-8 h-8 text-pink-500" />,
    number: 45,
    label: "Awards Won",
  },
];

const GlobalCommunity = () => {
  const { darkMode } = useContext(AuthContext);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="max-w-6xl  mx-auto  " ref={ref}>
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Our Global Community
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Celebrating our happy clients and the milestones we've achieved
          together.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            data-aos="flip-up"
            className={`dark:bg-slate-800 border  border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg p-6 flex flex-col items-center text-center ${
              darkMode
                ? " bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg"
                : "bg-base-100"
            }`}
          >
            <div className="mb-4">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-bold text-indigo-600">
              {inView ? (
                <CountUp start={0} end={stat.number} duration={2} />
              ) : (
                0
              )}
            </div>
            <div className="mt-2 text-sm font-medium text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GlobalCommunity;
