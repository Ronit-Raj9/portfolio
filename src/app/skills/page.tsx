"use client"

import React from "react";
import { motion } from "framer-motion";
import { SiTensorflow, SiPytorch, SiScikitlearn, SiNextdotjs, SiReact, 
  SiTypescript, SiNodedotjs, SiPython, SiTailwindcss, SiMongodb, 
  SiPostgresql, SiDocker, SiGit, SiAmazon, SiFirebase, SiKeras, 
  SiPandas, SiNumpy, SiJavascript, SiExpress, SiFastapi, SiDjango, 
  SiMysql, SiRedis, SiKubernetes } from "react-icons/si";
import { TbBrandOpenai } from "react-icons/tb";

export default function Skills() {
  const skillCategories = [
    {
      name: "AI & Machine Learning",
      skills: [
        {
          name: "TensorFlow",
          icon: <SiTensorflow className="text-orange-500" />,
          description: "Deep learning framework for building and training neural networks",
          proficiency: "Advanced",
        },
        {
          name: "PyTorch",
          icon: <SiPytorch className="text-red-500" />,
          description: "Deep learning library with strong GPU acceleration support",
          proficiency: "Advanced",
        },
        {
          name: "Scikit-Learn",
          icon: <SiScikitlearn className="text-blue-500" />,
          description: "Machine learning library for classical ML algorithms",
          proficiency: "Advanced",
        },
        {
          name: "Keras",
          icon: <SiKeras className="text-red-600" />,
          description: "High-level neural networks API that runs on top of TensorFlow",
          proficiency: "Advanced",
        },
        {
          name: "OpenAI",
          icon: <TbBrandOpenai className="text-green-500" />,
          description: "Building applications with GPT and other AI models",
          proficiency: "Advanced",
        },
        {
          name: "Pandas & NumPy",
          icon: <div className="flex gap-1"><SiPandas className="text-blue-400" /><SiNumpy className="text-blue-600" /></div>,
          description: "Data manipulation and numerical computing libraries",
          proficiency: "Advanced",
        },
      ]
    },
    {
      name: "Backend Development",
      skills: [
        {
          name: "Node.js",
          icon: <SiNodedotjs className="text-green-500" />,
          description: "JavaScript runtime for building scalable server-side applications",
          proficiency: "Advanced",
        },
        {
          name: "Python",
          icon: <SiPython className="text-yellow-500" />,
          description: "Versatile language for backend, data processing, and ML",
          proficiency: "Advanced",
        },
        {
          name: "Express.js",
          icon: <SiExpress className="text-gray-600" />,
          description: "Minimal and flexible Node.js web application framework",
          proficiency: "Advanced",
        },
        {
          name: "FastAPI",
          icon: <SiFastapi className="text-teal-500" />,
          description: "High-performance web framework for building APIs with Python",
          proficiency: "Intermediate",
        },
        {
          name: "Django",
          icon: <SiDjango className="text-green-700" />,
          description: "High-level Python web framework for rapid development",
          proficiency: "Intermediate",
        },
        {
          name: "TypeScript",
          icon: <SiTypescript className="text-blue-500" />,
          description: "Typed superset of JavaScript for large-scale applications",
          proficiency: "Advanced",
        },
      ]
    },
    {
      name: "Databases & Infrastructure",
      skills: [
        {
          name: "MongoDB",
          icon: <SiMongodb className="text-green-600" />,
          description: "NoSQL database for modern applications",
          proficiency: "Advanced",
        },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="text-blue-600" />,
          description: "Advanced open-source relational database",
          proficiency: "Advanced",
        },
        {
          name: "MySQL",
          icon: <SiMysql className="text-blue-500" />,
          description: "Popular open-source relational database management system",
          proficiency: "Intermediate",
        },
        {
          name: "Redis",
          icon: <SiRedis className="text-red-500" />,
          description: "In-memory data structure store used as database and cache",
          proficiency: "Intermediate",
        },
        {
          name: "Docker",
          icon: <SiDocker className="text-blue-500" />,
          description: "Platform for developing, shipping, and running applications in containers",
          proficiency: "Advanced",
        },
        {
          name: "AWS",
          icon: <SiAmazon className="text-yellow-500" />,
          description: "Comprehensive cloud computing platform",
          proficiency: "Advanced",
        },
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">My Technical Skills</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          As a developer passionate about AI and backend solutions, I continuously expand my
          expertise across these key technology areas.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16"
      >
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            variants={categoryVariants}
            className="mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="text-2xl font-bold mb-8 pb-2 border-b-2 border-gray-200 dark:border-gray-700"
            >
              {category.name}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.skills.map((skill, skillIdx) => (
                <motion.div
                  key={skillIdx}
                  variants={skillVariants}
                  whileHover="hover"
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{skill.icon}</div>
                    <h3 className="text-xl font-semibold">{skill.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{skill.description}</p>
                  <div className="flex items-center">
                    <div
                      className={`text-sm px-3 py-1 rounded-full ${
                        skill.proficiency === "Advanced"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {skill.proficiency}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
} 