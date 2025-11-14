interface HeroSectionProps {
  title: string;
  description: string;
  backgroundImage?: string;
  cta?: {
    text: string;
    href: string;
  };
}

export function HeroSection({
  title,
  description,
  backgroundImage,
  cta,
}: HeroSectionProps) {
  return (
    <section
      className="relative h-screen md:h-[600px] w-full overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      <div className="relative flex h-full flex-col items-center justify-center gap-6 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">{title}</h1>
        <p className="max-w-2xl text-lg md:text-xl text-white/95 leading-relaxed">{description}</p>
        {cta && (
          <a
            href={cta.href}
            className="mt-6 inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold transition-all hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: '#7ac243', color: 'white' }}
          >
            {cta.text}
            <ArrowRight className="h-5 w-5" />
          </a>
        )}
      </div>
    </section>
  );
}
