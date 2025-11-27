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
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

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
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-3" style={{ color: "#7ac243" }}>
              Nos Destinations
            </h1>
            <p className="text-lg text-slate-600">
              Découvrez nos circuits inoubliables et préparez votre prochaine aventure
            </p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 mb-12 shadow-lg">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#7ac243" }}>
              Filtrer & Rechercher
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block text-slate-700">Recherche</label>
                <div className="relative">
                  <CustomInput
                    placeholder="Destination..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5" style={{ color: "#40e0d0" }} />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block text-slate-700">Difficulté</label>
                <CustomSelect
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  options={[
                    { value: "", label: "Toutes les difficultés" },
                    { value: "easy", label: "Facile" },
                    { value: "moderate", label: "Moyen" },
                    { value: "hard", label: "Difficile" },
                  ]}
                />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block text-slate-700">Budget Max</label>
                <CustomInput
                  placeholder="ex: 5000"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className="flex items-end gap-2">
                <Button onClick={handleSearch} className="flex-1 text-white" style={{ backgroundColor: "#7ac243" }}>
                  Rechercher
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-2 bg-transparent"
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
              <p className="text-muted-foreground mb-4">No destinations found matching your criteria</p>
              <Button onClick={handleReset}>Clear Filters</Button>
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
