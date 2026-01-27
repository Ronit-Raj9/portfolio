"use client"

import { motion } from "framer-motion"
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { cn } from "@/lib/utils"

const CONTACT_METHODS = [
  {
    name: "Email",
    value: "ronitk964@gmail.com",
    icon: FaEnvelope,
    href: "mailto:ronitk964@gmail.com",
  },
  {
    name: "GitHub",
    value: "@Ronit-Raj9",
    icon: FaGithub,
    href: "https://github.com/Ronit-Raj9",
  },
  {
    name: "LinkedIn",
    value: "Ronit Raj",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/ronitrajai/",
  },
  {
    name: "Twitter",
    value: "@ronit__raj",
    icon: FaTwitter,
    href: "https://x.com/ronit__raj",
  },
]

export default function Contact() {
  return (
    <div className="container py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center mb-12"
      >
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          Get in Touch
        </h1>
        <p className="text-muted-foreground max-w-[42rem] mx-auto">
          I'm always open to new opportunities and collaborations.
          Feel free to reach out through any of these channels.
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {CONTACT_METHODS.map((method, index) => (
          <motion.a
            key={method.name}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "group flex flex-col items-center gap-4 p-6 rounded-lg",
              "border shadow-sm hover:shadow-md transition-all duration-200",
              "bg-background"
            )}
          >
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <method.icon className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold">{method.name}</h3>
              <p className="text-sm text-muted-foreground">{method.value}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 max-w-2xl mx-auto"
      >
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg bg-accent/5 border border-accent/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded-lg bg-accent/5 border border-accent/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message"
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-accent/5 border border-accent/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            type="submit"
            className={cn(
              "w-full px-6 py-3 rounded-md font-semibold",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 transition-colors"
            )}
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  )
} 