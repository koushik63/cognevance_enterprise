import { Compass, Cpu, Eye, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function AboutPage() {
  useSEO({
    title: 'About Us',
    description:
      'Learn about NEXORA: our mission, vision, core values, and engineering-first technology philosophy.',
  });

  return (
    <div>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#0B0D12] border-b border-[#293241]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF]">
              About NEXORA
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white leading-tight">
              Precision Technology, Curated for Modern Work and Living.
            </h1>
            <p className="text-base sm:text-lg text-[#A5ADBA] leading-relaxed">
              NEXORA is a modern technology retailer and enterprise hardware advisor focused on bringing reliable, thoughtfully engineered devices, smart accessories, and workplace solutions together in one cohesive platform.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision (Light Contrast Section) */}
      <section className="py-16 lg:py-20 bg-[#F4F6F8] text-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#4F8CFF]/10 text-[#2563EB] flex items-center justify-center">
              <Compass className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold font-heading">Our Mission</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To simplify how individuals and organizations discover, evaluate, and deploy dependable technology—eliminating noise in favor of transparent specifications and lasting hardware value.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#4F8CFF]/10 text-[#2563EB] flex items-center justify-center">
              <Eye className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold font-heading">Our Vision</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              A seamless hardware ecosystem where personal computing, mobile telemetry, acoustic clarity, and enterprise procurement operate as one intuitive experience.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values & Technology Philosophy */}
      <section className="py-16 lg:py-20 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
              Principles
            </p>
            <h2 className="text-3xl font-bold font-heading text-white mb-3">
              Core Values & Technology Philosophy
            </h2>
            <p className="text-sm text-[#A5ADBA]">
              Illustrative company highlights reflecting how NEXORA approaches product curation and user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Cpu,
                title: 'Engineering Rigor',
                desc: 'We prioritize thermal efficiency, display accuracy, and durable materials over fleeting trends.',
              },
              {
                icon: ShieldCheck,
                title: 'Transparent Specs',
                desc: 'Clear, verifiable technical specifications and honest pricing without hidden surprises.',
              },
              {
                icon: Layers,
                title: 'Ecosystem Harmony',
                desc: 'Accessories, docks, and devices selected to interoperate smoothly across platforms.',
              },
              {
                icon: Sparkles,
                title: 'Human-Centered UI',
                desc: 'Every touchpoint—from catalog discovery to checkout—is built for speed and accessibility.',
              },
            ].map((val) => (
              <div
                key={val.title}
                className="p-6 rounded-2xl bg-[#151922] border border-[#293241] space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B0D12] border border-[#293241] flex items-center justify-center text-[#4F8CFF]">
                  <val.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold font-heading text-white">{val.title}</h3>
                <p className="text-sm text-[#A5ADBA] leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-[#151922] border border-[#293241] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold font-heading text-white">
                Explore Our Enterprise Capabilities
              </h3>
              <p className="text-sm text-[#A5ADBA] mt-1">
                See how NEXORA structures hardware procurement and technical advisory for teams.
              </p>
            </div>
            <Link
              to="/solutions"
              className="px-6 py-3 rounded-xl bg-[#4F8CFF] hover:bg-[#3B7BF2] text-white text-sm font-semibold whitespace-nowrap transition-colors"
            >
              View Business Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
