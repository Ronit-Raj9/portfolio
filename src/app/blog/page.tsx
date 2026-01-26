"use client"

import { motion } from "framer-motion"

const blogPosts = [
  {
    id: 1,
    title: "Understanding Mathematical Concepts in Machine Learning",
    excerpt: "Exploring the fundamental mathematical concepts that power modern machine learning algorithms...",
    date: "2024-03-15",
    readTime: "5 min read",
    category: "Machine Learning",
  },
  {
    id: 2,
    title: "Scientific Computing with Python",
    excerpt: "A deep dive into scientific computing libraries and their applications in solving complex problems...",
    date: "2024-03-10",
    readTime: "8 min read",
    category: "Scientific Computing",
  },
  {
    id: 3,
    title: "Web Development Best Practices",
    excerpt: "Essential tips and tricks for building modern, performant web applications...",
    date: "2024-03-05",
    readTime: "6 min read",
    category: "Web Development",
  },
  // Add more blog posts as needed
]

export default function Blog() {
  return (
    <section className="mt-24">
      <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
      <div className="max-w-4xl mx-auto">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8 p-6 bg-white dark:bg-stone-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-teal-600 dark:text-teal-400">{post.category}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
            <button className="text-teal-600 dark:text-teal-400 font-medium hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
              Read More →
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  )
} 