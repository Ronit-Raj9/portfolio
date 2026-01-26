"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  id?: string
  className?: string
  children: React.ReactNode
  fullWidth?: boolean
  animate?: boolean
}

export function SectionContainer({
  id,
  className,
  children,
  fullWidth = false,
  animate = true,
}: SectionContainerProps) {
  const Container = animate ? motion.section : "section"

  return (
    <Container
      id={id}
      className={cn(
        "w-full py-20",
        className
      )}
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={animate ? { once: true, margin: "-100px" } : undefined}
      transition={animate ? { duration: 0.6 } : undefined}
    >
      <div className={cn(
        fullWidth ? "w-full" : "container px-4 mx-auto",
      )}>
          {children}
      </div>
    </Container>
  )
}

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionTitle({
  title,
  subtitle,
  centered = false,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn(
      "mb-10",
      centered && "text-center",
      className
    )}>
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}

interface CardProps {
  className?: string
  children: React.ReactNode
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn(
      "bg-accent/5 backdrop-blur-sm rounded-xl p-6 hover:bg-accent/10 transition-colors",
      className
    )}>
      {children}
    </div>
  )
}

// Simple wrapper for content sections
export default function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1">
      {children}
    </div>
  )
} 