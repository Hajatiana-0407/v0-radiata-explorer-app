interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  title: string;
  description?: string;
  features: Feature[];
}

export function FeatureSection({
  title,
  description,
  features,
}: FeatureSectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#7ac243' }}>{title}</h2>
          {description && (
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-xl border-2 bg-white p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: idx % 2 === 0 ? '#7ac243' : '#40e0d0' }}
            >
              <div className="flex justify-center mb-4 text-3xl" style={{ color: idx % 2 === 0 ? '#7ac243' : '#40e0d0' }}>
                {feature.icon}
              </div>
              <h3 className="font-bold mb-3 text-lg">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
