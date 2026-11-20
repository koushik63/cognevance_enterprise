import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Gamepad2, Headphones, Laptop, Smartphone, Watch } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CategoryMeta } from '../../data/siteContent';

const ICON_MAP = {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Cpu,
  Gamepad2,
};

interface CategoryCardProps {
  category: CategoryMeta;
  productCount?: number;
  index?: number;
}

export function CategoryCard({ category, productCount, index = 0 }: CategoryCardProps) {
  const Icon = ICON_MAP[category.iconName];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
    >
      <Link
        to={`/products?category=${encodeURIComponent(category.name)}`}
        className="group relative flex flex-col justify-between rounded-2xl bg-[#151922] border border-[#293241] hover:border-[#4F8CFF]/60 p-6 overflow-hidden transition-all duration-300 h-full"
      >
        {/* Subtle background image overlay */}
        <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none">
          <img
            src={category.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151922] via-[#151922]/85 to-[#151922]/60" />
        </div>

        <div className="relative z-10 flex items-start justify-between mb-8">
          <div className="w-11 h-11 rounded-xl bg-[#0B0D12]/90 border border-[#293241] group-hover:border-[#4F8CFF]/50 flex items-center justify-center text-[#4F8CFF] transition-colors">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0B0D12]/80 border border-[#293241] text-[#A5ADBA] group-hover:text-white group-hover:bg-[#4F8CFF] group-hover:border-[#4F8CFF] transition-all">
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>

        <div className="relative z-10">
          <p className="text-xs font-medium uppercase tracking-wider text-[#8AB4FF] mb-1">
            {category.tagline}
          </p>
          <h3 className="text-xl font-semibold font-heading text-white mb-2">{category.name}</h3>
          <p className="text-xs text-[#A5ADBA] line-clamp-2 mb-3">{category.description}</p>
          {productCount !== undefined && (
            <span className="text-xs font-medium text-white/75">
              {productCount} {productCount === 1 ? 'device' : 'devices'} available
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
