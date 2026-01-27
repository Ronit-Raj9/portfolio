"use client"

import { motion } from "framer-motion"
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { SiKaggle } from "react-icons/si"
import { cn } from "@/lib/utils"
import { contact } from "@/data"

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  SiKaggle,
}

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
          {contact.pageContent.title}
        </h1>
        <p className="text-muted-foreground max-w-[42rem] mx-auto">
          {contact.pageContent.description}
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {contact.methods.map((method, index) => {
          const IconComponent = iconMap[method.icon]
          return (
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
                {IconComponent && <IconComponent className="w-6 h-6" />}
              </div>
              <div className="text-center">
                <h3 className="font-semibold">{method.name}</h3>
                <p className="text-sm text-muted-foreground">{method.value}</p>
              </div>
            </motion.a>
          )
        })}
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
              {contact.formLabels.name}
            </label>
            <input
              id="name"
              type="text"
              placeholder={contact.formLabels.namePlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-accent/5 border border-accent/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {contact.formLabels.email}
            </label>
            <input
              id="email"
              type="email"
              placeholder={contact.formLabels.emailPlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-accent/5 border border-accent/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {contact.formLabels.message}
            </label>
            <textarea
              id="message"
              placeholder={contact.formLabels.messagePlaceholder}
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
            {contact.formLabels.submitButton}
          </button>
        </form>
      </motion.div>
    </div>
  )
} 