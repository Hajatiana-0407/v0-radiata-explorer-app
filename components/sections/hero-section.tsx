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
      className="relative h-96 w-full overflow-hidden rounded-lg bg-gradient-to-r from-primary to-accent"
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
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative flex h-full flex-col items-center justify-center gap-4 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-balance">{title}</h1>
        <p className="max-w-xl text-lg text-white/90">{description}</p>
        {cta && (
          <a
            href={cta.href}
            className="mt-4 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-primary hover:bg-white/90"
          >
            {cta.text}
          </a>
        )}
      </div>
    </section>
  );
}
