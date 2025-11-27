import Link from "next/link"
import type { Destination } from "@/lib/types"
import { MapPin, Clock, Star } from "lucide-react"

interface DestinationCardProps {
  destination: Destination
  link?: boolean
}

export function DestinationCard({ destination, link = true }: DestinationCardProps) {
  const content = (
    <div className="overflow-hidden rounded-xl border-2 border-slate-200 bg-white hover:shadow-2xl hover:border-[#40e0d0] transition-all duration-300 group">
      <div
        className="relative h-56 w-full bg-muted overflow-hidden"
        style={{
          backgroundImage: `url('${destination.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-4 right-4">
          <div
            className="px-3 py-1 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: "#40e0d0", color: "#333" }}
          >
            {destination.difficulty}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-2 rounded-lg">
          <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
          <span className="text-sm font-semibold text-white">4.8/5</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-bold text-xl" style={{ color: "#7ac243" }}>
          {destination.name}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{destination.description}</p>

        <div className="flex items-center gap-4 text-sm text-slate-600 border-t border-slate-200 pt-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full" style={{ backgroundColor: "#40e0d0" }}>
              <MapPin className="h-4 w-4 text-slate-900 m-1" />
            </div>
            <span className="font-medium">{destination.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full" style={{ backgroundColor: "#7ac243" }}>
              <Clock className="h-4 w-4 text-white m-1" />
            </div>
            <span className="font-medium">{destination.duration}h</span>
          </div>
        </div>

        <div className="flex items-end justify-between pt-2">
          <div>
            <p className="text-xs text-slate-500 font-semibold">À partir de</p>
            <p className="text-2xl font-bold" style={{ color: "#7ac243" }}>
              {destination.price}€
            </p>
          </div>
          <button
            className="px-5 py-2 rounded-lg font-semibold transition-all hover:shadow-lg border-2"
            style={{ backgroundColor: "#40e0d0", color: "#333", borderColor: "#40e0d0" }}
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  )

  if (link) {
    return <Link href={`/destinations/${destination.id}`}>{content}</Link>
  }

  return content
}
