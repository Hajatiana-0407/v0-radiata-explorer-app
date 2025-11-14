'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-selector';
import { fetchHomeContent, fetchPopularDestinations } from '@/store/slices/homeSlice';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { FeatureSection } from '@/components/sections/feature-section';
import { DestinationCard } from '@/components/cards/destination-card';
import { Loader } from '@/components/ui/loader';
import { Leaf, Users, Heart, Globe } from 'lucide-react';

export default function Home() {
  const dispatch = useAppDispatch();
  const { content, popularDestinations, loading, error } = useAppSelector(
    (state) => state.home
  );

  useEffect(() => {
    dispatch(fetchHomeContent() as any);
    dispatch(fetchPopularDestinations() as any);
  }, [dispatch]);

  const features = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Eco-Friendly',
      description: 'Sustainable travel that respects nature and local communities',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Expert Guides',
      description: 'Experienced guides passionate about conservation',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Local Support',
      description: 'Direct support for local communities and wildlife',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Reach',
      description: 'Explore the most stunning natural destinations worldwide',
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          title={content?.heroTitle || 'Explore Nature with Purpose'}
          description={
            content?.heroDescription ||
            'Discover breathtaking destinations while supporting conservation efforts'
          }
          backgroundImage="/beautiful-nature-landscape.jpg"
          cta={{ text: 'Start Exploring', href: '/destinations' }}
        />

        <FeatureSection
          title="Why Choose Radiata"
          description="Experience travel that makes a difference"
          features={features}
        />

        <section className="py-16 px-4 bg-muted">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
              <p className="text-muted-foreground">
                Handpicked adventures for every explorer
              </p>
            </div>

            {loading ? (
              <div className="py-12">
                <Loader />
              </div>
            ) : error ? (
              <p className="text-center text-destructive">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At Radiata Explorer, we believe that travel should inspire, educate,
              and make a positive impact. We partner with local communities and
              conservation organizations to create meaningful experiences while
              protecting the natural world.
            </p>
            <a
              href="/contact"
              className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
