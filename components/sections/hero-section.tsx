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
      className="relative min-h-screen md:h-[750px] w-full overflow-hidden"
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
      <div className="relative flex h-full flex-col items-center justify-between gap-8 text-center text-white px-4 py-12 md:py-20">
        <div className="max-w-3xl mt-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-4">{title}</h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <a
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-bold transition-all hover:shadow-2xl hover:scale-105 text-lg"
            style={{ backgroundColor: "#7ac243", color: "white" }}
          >
            Tous les Circuits
            <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-bold transition-all hover:shadow-2xl hover:scale-105 text-lg border-2"
            style={{ backgroundColor: "#40e0d0", color: "#333", borderColor: "#40e0d0" }}
          >
            Nous Contacter
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>

        {searchBar && (
          <div className="w-full max-w-5xl mt-auto mb-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 text-left">Trouvez votre prochaine aventure</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search destination input */}
                <div className="relative">
                  <label className="text-xs font-bold text-slate-700 mb-2 block">DESTINATION</label>
                  <input
                    type="text"
                    placeholder="Où voulez-vous aller?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-[#40e0d0] focus:shadow-lg text-slate-900 font-medium transition-all"
                  />
                </div>

                {/* Difficulty select */}
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-2 block">DIFFICULTÉ</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-[#40e0d0] focus:shadow-lg text-slate-900 font-medium transition-all"
                  >
                    <option value="">Toutes les difficultés</option>
                    <option value="facile">Facile</option>
                    <option value="moyen">Moyen</option>
                    <option value="difficile">Difficile</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-2 block">BUDGET MAX</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full h-3 rounded-lg accent-[#40e0d0] cursor-pointer appearance-none bg-slate-200"
                      style={{
                        background: `linear-color(90deg, #40e0d0 0%, #40e0d0 ${((Number(price) || 0) / 5000) * 100}%, #e5e7eb ${((Number(price) || 0) / 5000) * 100}%, #e5e7eb 100%)`,
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">0€</span>
                      <p className="text-sm font-bold text-slate-900">
                        Jusqu'à <span style={{ color: "#7ac243" }}>{price || 5000}€</span>
                      </p>
                      <span className="text-xs text-slate-600">5000€</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search button */}
              <div className="flex gap-3">
                <button
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg hover:scale-105"
                  style={{ backgroundColor: "#7ac243" }}
                >
                  Rechercher les Destinations
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
