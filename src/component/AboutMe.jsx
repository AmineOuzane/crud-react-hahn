import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaUserGraduate, FaGlobe, FaGithub, FaLinkedin } from 'react-icons/fa';

const items = [
  {
    icon: <FaLaptopCode className="text-5xl text-indigo-600 mb-6" />,
    title: 'Java Full-Stack Developer',
    text: 'I build efficient, scalable web apps and APIs using Spring Boot, React, and Node.js.',
  },
  {
    icon: <FaUserGraduate className="text-5xl text-indigo-600 mb-6 " />,
    title: 'Continuous Learner',
    text: 'Currently mastering AWS Cloud through ALX Morocco Program and hands-on projects.',
  },
  {
    icon: <FaGlobe className="text-5xl text-indigo-600 mb-6" />,
    title: 'Global Mindset',
    text: 'Experienced in remote international teams with strong communication and cultural awareness.',
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function AboutMe() {
  return (
    <motion.div
      className="py-16 px-6 max-w-4xl mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Intro Section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-bold text-indigo-700 mb-4">Hi, I'm Amine 👋</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Passionate about crafting elegant software — from clean APIs to beautiful user interfaces, focusing on complete and user-friendly solutions.
        </p>
        <div className="flex justify-center gap-8 mt-6 text-indigo-600 text-3xl">
          <a
            href="https://github.com/AmineOuzane"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-indigo-800 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/amine-ouzane-955052271"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-indigo-800 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Info Cards */}
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">
        What I Do
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
        {items.map(({ icon, title, text }, i) => (
          <motion.div
            key={i}
            variants={item}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow cursor-default max-w-sm mx-auto"
          >
            {icon}
            <h3 className="text-2xl font-semibold mb-3 text-indigo-900">{title}</h3>
            <p className="text-gray-600 text-base leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack */}
      <section className="mt-20 max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Tech Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-center text-indigo-700">
          {[
            'React',
            'Spring Boot',
            'Node.js',
            'MySQL',
            'Docker',
            'Git',
            'TailwindCSS',
            'Redis',
          ].map((tech) => (
            <motion.div
              key={tech}
              variants={item}
              className="rounded-lg p-6 shadow-md bg-white cursor-default hover:shadow-xl transition"
            >
              <p className="text-2xl font-semibold">{tech}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
