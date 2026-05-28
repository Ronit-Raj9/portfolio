"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaXTwitter } from "react-icons/fa6"
import { profile } from "@/data"

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 md:pb-16">
      <div className="container px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <h1 className="text-[32px] font-bold mb-4">Writing soon</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            I'm planning long-form posts on what I'm actually building - GRPO fine-tuning on AMD MI300X, vision-language RAG in production, x402 micropayments in CLI tools.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            In the meantime, I post threads and shorter takes on X.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              <FaXTwitter className="w-4 h-4" />
              Follow on X
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-border hover:bg-accent/50 transition-colors"
            >
              ← Back home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
