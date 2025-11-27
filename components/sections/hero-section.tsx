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
          <a
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold transition-all hover:shadow-xl"
            style={{ backgroundColor: "#7ac243", color: "white" }}
          >
            Tous les Circuits
            <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold transition-all hover:shadow-xl"
            style={{ backgroundColor: "#40e0d0", color: "#333" }}
          >
            Nous Contacter
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>

        {searchBar && (
          <div className="w-full max-w-5xl mt-12 bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search destination input */}
                <div className="relative">
                  <label className="text-xs font-semibold text-slate-600 mb-2 block">DESTINATION</label>
                  <input
                    type="text"
                    placeholder="Où voulez-vous aller?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-[#40e0d0] text-slate-900 font-medium"
                  />
                </div>

                {/* Difficulty select */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-2 block">DIFFICULTÉ</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-[#40e0d0] text-slate-900 font-medium"
                  >
                    <option value="">Toutes les difficultés</option>
                    <option value="facile">Facile</option>
                    <option value="moyen">Moyen</option>
                    <option value="difficile">Difficile</option>
                  </select>
                </div>

                {/* Budget range with progress bar */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-2 block">BUDGET MAX</label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full h-2 rounded-lg accent-[#40e0d0] cursor-pointer"
                  />
                  <p className="text-sm font-semibold text-slate-900 mt-2">
                    Jusqu'à <span style={{ color: "#7ac243" }}>{price || 5000}€</span>
                  </p>
                </div>
              </div>

              {/* Search button */}
              <div className="flex gap-3">
                <button
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#7ac243" }}
                >
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
