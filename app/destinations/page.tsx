'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { fetchDestinations, setFilters, setPage } from '@/store/slices/destinationsSlice';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DestinationCard } from '@/components/cards/destination-card';
import { CustomInput } from '@/components/ui/custom-input';
import { CustomSelect } from '@/components/ui/custom-select';
import { Loader } from '@/components/ui/loader';
import { SkeletonCard } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function DestinationsPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error, page, totalPages, filters } = useAppSelector(
    (state) => state.destinations
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    dispatch(
      fetchDestinations({
        page,
        search: filters.search,
        difficulty: filters.difficulty,
        maxPrice: filters.maxPrice,
      }) as any
    );
  }, [dispatch, page, filters]);

  const handleSearch = () => {
    dispatch(setFilters({ search: searchTerm, difficulty, maxPrice: maxPrice ? parseFloat(maxPrice) : null }) as any);
  };

  const handleReset = () => {
    setSearchTerm('');
    setDifficulty('');
    setMaxPrice('');
    dispatch(setFilters({ search: '', difficulty: null, maxPrice: null }) as any);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Our Destinations</h1>

          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Search & Filter</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <CustomInput
                    placeholder="Destination name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Difficulty</label>
                <CustomSelect
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  options={[
                    { value: 'easy', label: 'Easy' },
                    { value: 'moderate', label: 'Moderate' },
                    { value: 'hard', label: 'Hard' },
                  ]}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Max Price</label>
                <CustomInput
                  placeholder="e.g., 5000"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className="flex items-end gap-2">
                <Button onClick={handleSearch} className="flex-1">
                  Search
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Reset
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
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                  />
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
  );
}
