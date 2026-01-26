"use client"

import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa"
import { BsArrowRight } from "react-icons/bs"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const PROJECTS = [
  {
    title: "GeneTrust AI Studio",
    description: "A CRISPR intelligence platform using Next.js, TypeScript, and DNABERT model for complex genetic sequence analysis and ranking.",
    image: "/projects/genetrust.png",
    tags: ["Next.js", "TypeScript", "Express.js", "FastAPI", "PyTorch"],
    demoLink: "https://genetrust.vercel.app/",
    codeLink: "https://github.com/Ronit-Raj9/hackhazard-project-genetrust",
    type: "AI / Bioinformatics"
  },
  {
    title: "Ionia Testing Platform",
    description: "Comprehensive end-to-end JEE testing system with robust authentication, admin panel, and detailed performance analytics.",
    image: "/projects/ionia.png",
    tags: ["Next.js", "JavaScript", "Express.js", "Cloudinary", "TailwindCSS"],
    demoLink: "https://www.ionia.sbs/",
    codeLink: "https://github.com/Ronit-Raj9/ionia-next",
    type: "EdTech"
  },
  
  {
    title: "E-Cell IIIT Gwalior",
    description: "Real-time analytics dashboard for e-commerce platforms with predictive inventory management and customer behavior insights.",
    image: "/projects/ecell.png",
    tags: ["Next.js", "MongoDB", "Chart.js", "Tailwind CSS"],
    demoLink: "https://ecell-puce.vercel.app/",
    codeLink: "https://github.com/Ronit-Raj9/Ecell",
    type: "Web Development"
  },
  {
    title: "Graph Neural Networks",
    description: "",
    image: "/projects/graphml.png",
    tags: ["PyTorch", "Python", "Graph Neural Networks", "Data Visualization"],
    demoLink: "https://graphml.example.com",
    codeLink: "https://github.com/Ronit-Raj9/graph-research",
    type: "Research"
  }
]


const categories = ["All", "Web Development", "AI / Bioinformatics", "Machine Learning", "Research", "EdTech"]

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }}
      layout
      className="group relative flex flex-col md:flex-row w-full gap-0 md:h-[380px] rounded-2xl overflow-hidden 
        bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-md border border-accent/5 
        hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-xl"
    >
      {/* Decorative elements */}
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
      
      {/* Project number indicator */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
        className="absolute -left-3 -top-3 z-20 w-12 h-12 flex items-center justify-center rounded-full 
          bg-gradient-to-br from-primary/90 to-purple-600/90 text-white font-bold text-xl shadow-lg opacity-0 md:opacity-80 
          group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
      >
        {index + 1}
      </motion.div>

      {/* Content - Left Side */}
      <div className="flex flex-col justify-between p-8 md:p-10 w-full md:w-1/2 md:max-w-[580px] relative z-10">
        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.1, duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <FaCode className="text-primary" />
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 
            text-primary text-xs font-medium tracking-wider"
          >
            {project.type}
          </span>
        </motion.div>
        
        {/* Title with animated underline effect */}
        <div className="group/title mb-4">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-foreground group-hover/title:text-primary transition-colors"
          >
            {project.title}
          </motion.h3>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            className="h-1 bg-gradient-to-r from-primary to-purple-600/80 rounded-full mt-2 
              group-hover:w-[120px] transition-all duration-300"
          />
        </div>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
          className="text-muted-foreground mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-500"
        >
          {project.description}
        </motion.p>
        
        {/* Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {project.tags.map((tag, tagIndex) => (
            <motion.span 
              key={tag} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.05 + (tagIndex * 0.05) + 0.5, 
                duration: 0.3
              }}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-accent/10 
                text-accent-foreground hover:bg-accent/20 hover:scale-105 transition-all duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Action Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
          className="flex gap-3 items-center mt-auto"
        >
          <motion.a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 py-2.5 px-5 rounded-lg font-medium 
              bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90 
              shadow-md hover:shadow-lg shadow-primary/5 hover:shadow-primary/20 transition-all duration-300"
          >
            <span>Live Demo</span> 
            <BsArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
          
          <motion.a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-background/80 
              text-foreground backdrop-blur-sm border border-accent/10 hover:border-accent/30 
              shadow-sm hover:shadow-md hover:text-primary transition-all duration-300"
          >
            <FaGithub className="w-5 h-5" />
          </motion.a>

          <div className="hidden md:block absolute -right-3 top-10 transform rotate-90 origin-top-right opacity-20 group-hover:opacity-100 transition-opacity duration-500">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 20C1 9.50659 9.50659 1 20 1H100C110.493 1 119 9.50659 119 20C119 30.4934 110.493 39 100 39H20C9.50659 39 1 30.4934 1 20Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4"/>
            </svg>
          </div>
        </motion.div>
      </div>
      
      {/* Image - Right Side */}
      <div className="relative w-full md:w-1/2 h-60 md:h-full overflow-hidden group-hover:brightness-110 transition-all duration-700">
        {/* Image Overlay Gradients */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 
          opacity-50 group-hover:opacity-30 transition-opacity duration-500"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-l from-transparent to-background z-10 
          opacity-0 md:opacity-40 group-hover:opacity-0 transition-opacity duration-500"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/40 to-purple-600/40 mix-blend-overlay 
          opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10"
        />
        
        {/* Project Image with parallax effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: index * 0.1, 
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="w-full h-full"
        >
          <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index < 2}
            />
          </div>
        </motion.div>
        
        {/* Image overlay icon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
          className="absolute bottom-4 right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full 
            bg-white/10 backdrop-blur-md border border-white/20 
            opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          <FaExternalLinkAlt className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <div className="container py-16 px-4 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-16"
      >
        {/* Heading with decorative elements */}
        <div className="relative inline-block mb-3">
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-primary/60 to-purple-600/60 rounded-full"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-sm uppercase tracking-wider text-primary font-medium"
          >
            My Work
          </motion.span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Latest Projects
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-muted-foreground max-w-[50rem] mx-auto text-lg"
        >
          Here are some of my featured projects. Each one is carefully crafted with attention to detail,
          focusing on modern design, performance, and user experience.
        </motion.p>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-3 mb-16"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              category === "All" 
                ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md shadow-primary/20" 
                : "bg-accent/10 text-foreground/80 hover:bg-accent/20 hover:shadow-md"
            )}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        layout
        className="flex flex-col space-y-16"
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </motion.div>
      
      {/* Back Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-20 text-center"
      >
        <Link href="/#projects">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full bg-accent/10 hover:bg-accent/20 transition-all duration-300 
              inline-flex items-center gap-3 border border-accent/10 hover:border-accent/30 shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
} 