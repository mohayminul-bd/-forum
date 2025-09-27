import React from "react";
import { Cpu, LayoutGrid, ShieldCheck, Zap, Users, Smile } from "lucide-react";
import "aos/dist/aos.css";

const Platform1 = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Why Choose Our Platform
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          We provide innovative solutions across Technology, Health, Education,
          and Business sectors.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div
          data-aos="flip-up"
          className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg p-5 flex flex-col"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
              <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Advanced Technology</h3>
              <p className="text-sm text-muted-foreground mt-1">
                AI · Cloud · IoT
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm flex-1">
            Leveraging cutting-edge tech solutions to transform businesses and
            education.
          </p>
        </div>

        {/* Card 2 */}
        <div
          data-aos="flip-up"
          className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg p-5 flex flex-col"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
              <LayoutGrid className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Health & Wellness</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Telemedicine · Fitness · Nutrition
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm flex-1">
            Accessible health solutions and wellness programs to improve lives.
          </p>
        </div>

        {/* Card 3 */}
        <div
          data-aos="flip-up"
          className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg p-5 flex flex-col"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
              <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Education & Learning</h3>
              <p className="text-sm text-muted-foreground mt-1">
                e-Learning · Courses · Workshops
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm flex-1">
            Empowering students and professionals with modern educational tools.
          </p>
        </div>

        {/* Card 4 */}
        <div
          data-aos="flip-up"
          className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg p-5 flex flex-col"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
              <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Business Solutions</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Strategy · Growth · Analytics
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm flex-1">
            Helping businesses scale efficiently with reliable solutions.
          </p>
        </div>

        {/* Card 5 */}
        <div
          data-aos="flip-up"
          className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg p-5 flex flex-col"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
              <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Fast & Efficient</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Quick Solutions · High Performance
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm flex-1">
            Delivering fast, reliable results across all sectors we serve.
          </p>
        </div>

        {/* Card 6 */}
        <div
          data-aos="flip-up"
          className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg p-5 flex flex-col"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
              <Smile className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Dedicated Support</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Help · Guidance
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm flex-1">
            Expert support to ensure growth and smooth adoption of our platform.
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="mt-10 text-center">
        <a
          href="#"
          className="inline-block rounded-2xl px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-semibold shadow-md hover:opacity-95"
        >
          Get Started — It's Free
        </a>
      </div>
    </section>
  );
};

export default Platform1;
