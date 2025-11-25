"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"

interface HeroSectionProps {
  title: string
  description: string
  backgroundImage?: string
  cta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  searchBar?: boolean
}

export function HeroSection({ title, description, backgroundImage, cta, secondaryCta, searchBar }: HeroSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [price, setPrice] = useState("")

  return (
    <section
      className="relative h-screen md:h-[650px] w-full overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative flex h-full flex-col items-center justify-center gap-8 text-center text-white px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-4">{title}</h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {cta && (
            <a
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold transition-all hover:shadow-xl"
              style={{ backgroundColor: "#7ac243", color: "white" }}
            >
              {cta.text}
              <ArrowRight className="h-5 w-5" />
            </a>
          )}
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold border-2 border-white text-white transition-all hover:bg-white/10"
            >
              {secondaryCta.text}
            </a>
          )}
        </div>

        {/* Search Bar */}
        {searchBar && (
          <div className="w-full max-w-4xl mt-8 bg-white rounded-xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Rechercher une destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7ac243] text-slate-900"
              />
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7ac243] text-slate-900"
              >
                <option value="">Difficulté</option>
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7ac243] text-slate-900"
              >
                <option value="">Budget Max</option>
                <option value="500">Jusqu'à 500€</option>
                <option value="1000">Jusqu'à 1000€</option>
                <option value="2000">Jusqu'à 2000€</option>
              </select>
              <button
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: "#40e0d0", color: "#333" }}
              >
                Rechercher
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
