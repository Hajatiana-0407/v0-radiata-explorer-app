import Link from 'next/link';
import { Destination } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  link?: boolean;
}

export function DestinationCard({
  destination,
  link = true,
}: DestinationCardProps) {
  const content = (
    <div className="overflow-hidden rounded-xl border-2 border-slate-200 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      <div
        className="relative h-56 w-full bg-muted overflow-hidden"
        style={{
          backgroundImage: `url('${destination.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 group-hover:from-black/20 transition-all"></div>
        
        <div className="absolute top-4 right-4">
          <Badge label={destination.difficulty} variant="primary" />
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-1 text-yellow-400">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-semibold text-white">4.8</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-bold text-xl" style={{ color: '#7ac243' }}>{destination.name}</h3>
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {destination.description}
        </p>

        <div className="flex items-center gap-6 text-sm text-slate-600 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" style={{ color: '#40e0d0' }} />
            {destination.location}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" style={{ color: '#40e0d0' }} />
            {destination.duration}h
          </div>
        </div>

        <div className="flex items-end justify-between pt-2">
          <div>
            <p className="text-xs text-slate-500 font-medium">Starting from</p>
            <p className="text-2xl font-bold" style={{ color: '#7ac243' }}>${destination.price}</p>
          </div>
          <button
            className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: '#40e0d0', color: '#333' }}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={`/destinations/${destination.id}`}>
        {content}
      </Link>
    );
  }

  return content;
}
