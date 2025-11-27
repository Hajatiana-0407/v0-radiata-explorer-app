"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/use-app-selector"
import { fetchDestinations, setFilters, setPage } from "@/store/slices/destinationsSlice"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { DestinationCard } from "@/components/cards/destination-card"
import { CustomInput } from "@/components/ui/custom-input"
import { CustomSelect } from "@/components/ui/custom-select"
import { SkeletonCard } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search, Gauge, DollarSign } from "lucide-react"

export default function DestinationsPage() {
  const dispatch = useAppDispatch()
  const { items, loading, error, page, totalPages, filters } = useAppSelector((state) => state.destinations)
  const [searchTerm, setSearchTerm] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  useEffect(() => {
    dispatch(
      fetchDestinations({
        page,
        search: filters.search,
        difficulty: filters.difficulty,
        maxPrice: filters.maxPrice,
      }) as any,
    )
  }, [dispatch, page, filters])

  const handleSearch = () => {
    dispatch(
      setFilters({ search: searchTerm, difficulty, maxPrice: maxPrice ? Number.parseFloat(maxPrice) : null }) as any,
    )
  }

  const handleReset = () => {
    setSearchTerm("")
    setDifficulty("")
    setMaxPrice("")
    dispatch(setFilters({ search: "", difficulty: null, maxPrice: null }) as any)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-3" style={{ color: "#7ac243" }}>
              Nos Destinations
            </h1>
            <p className="text-lg text-slate-600">
              Découvrez nos circuits inoubliables et préparez votre prochaine aventure
            </p>
          </div>

          <div className="bg-white border-t-4 rounded-2xl p-8 mb-12 shadow-lg" style={{ borderTopColor: "#7ac243" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-1 rounded-full" style={{ backgroundColor: "#40e0d0" }}></div>
              <h2 className="text-2xl font-bold" style={{ color: "#1a1a2e" }}>
                Filtrer & Rechercher
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "#7ac243" }}>
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#e8f5e0" }}
                  >
                    <Search className="h-4 w-4" style={{ color: "#7ac243" }} />
                  </div>
                  Destination
                </label>
                <div className="relative">
                  <CustomInput
                    placeholder="Où voulez-vous aller?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-4 border-2 focus:border-[#40e0d0] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "#7ac243" }}>
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#e0f7f4" }}
                  >
                    <Gauge className="h-4 w-4" style={{ color: "#40e0d0" }} />
                  </div>
                  Difficulté
                </label>
                <CustomSelect
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  options={[
                    { value: "", label: "Toutes les difficultés" },
                    { value: "easy", label: "🟢 Facile" },
                    { value: "moderate", label: "🟡 Moyen" },
                    { value: "hard", label: "🔴 Difficile" },
                  ]}
                  className="border-2 focus:border-[#40e0d0] transition-colors"
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "#7ac243" }}>
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#f0e8f5" }}
                  >
                    <DollarSign className="h-4 w-4" style={{ color: "#7ac243" }} />
                  </div>
                  Budget Max
                </label>
                <div>
                  <CustomInput
                    placeholder="ex: 5000"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border-2 focus:border-[#40e0d0] transition-colors"
                  />
                  {maxPrice && (
                    <div className="mt-2 h-1.5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          backgroundColor: "#7ac243",
                          width: `${Math.min((Number.parseFloat(maxPrice) / 10000) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  )}
                  {maxPrice && (
                    <p className="text-xs font-semibold mt-1" style={{ color: "#40e0d0" }}>
                      Budget : {Number.parseFloat(maxPrice).toLocaleString("fr-FR")} €
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-end gap-2">
                <Button
                  onClick={handleSearch}
                  className="flex-1 text-white font-semibold hover:shadow-lg transition-all"
                  style={{ backgroundColor: "#7ac243" }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
                <Button
                  onClick={handleReset}
                  className="border-2 bg-transparent font-semibold hover:bg-slate-50 transition-all"
                  style={{ borderColor: "#40e0d0", color: "#40e0d0" }}
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-destructive py-12">{error}</p>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Aucune destination trouvée selon vos critères</p>
              <Button onClick={handleReset}>Effacer les filtres</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {items.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    onClick={() => dispatch(setPage(page - 1) as any)}
                    disabled={page === 1}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    onClick={() => dispatch(setPage(page + 1) as any)}
                    disabled={page === totalPages}
                    variant="outline"
                    size="sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
