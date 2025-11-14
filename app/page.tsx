'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { fetchHomeContent, fetchPopularDestinations } from '@/store/slices/homeSlice';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { FeatureSection } from '@/components/sections/feature-section';
import { DestinationCard } from '@/components/cards/destination-card';
import { Loader } from '@/components/ui/loader';
import { Leaf, Users, Heart, Globe, ArrowRight } from 'lucide-react';

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

        <section className="py-20 px-4 bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance" style={{ color: '#7ac243' }}>Popular Destinations</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Handpicked adventures for every explorer. Discover unforgettable experiences in nature's most breathtaking locations.
              </p>
            </div>

            {loading ? (
              <div className="py-12">
                <Loader />
              </div>
            ) : error ? (
              <p className="text-center text-red-500 text-lg">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundColor: '#40e0d0' }}></div>
          <div className="mx-auto max-w-3xl text-center relative z-10">
            <div className="mb-6 inline-block px-4 py-2 rounded-full" style={{ backgroundColor: '#40e0d0', color: 'white' }}>
              <span className="text-sm font-semibold">Our Mission</span>
            </div>
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#7ac243' }}>Making Travel Meaningful</h2>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              At Radiata Explorer, we believe that travel should inspire, educate, and make a positive impact. We partner with local communities and conservation organizations to create meaningful experiences while protecting the natural world for future generations.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white transition-all hover:gap-3"
              style={{ backgroundColor: '#7ac243' }}
            >
              Get in Touch <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>

        <section className="py-16 px-4" style={{ backgroundColor: '#40e0d0', color: 'white' }}>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <p className="text-white/90">Destinations Explored</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <p className="text-white/90">Happy Travelers</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-white/90">Eco-Friendly Certified</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
