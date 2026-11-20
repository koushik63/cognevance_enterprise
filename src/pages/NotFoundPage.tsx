import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';
import { useSEO } from '../hooks/useSEO';

export default function NotFoundPage() {
  useSEO({
    title: 'Page Not Found',
    description: 'The requested page could not be found on NEXORA.',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <EmptyState
        icon={<Compass className="w-6 h-6" />}
        title="404 — Page Not Found"
        description="The page you requested does not exist or has been moved."
        action={
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-[#4F8CFF] text-white text-sm font-semibold hover:bg-[#3B7BF2] transition-colors"
          >
            Return Home
          </Link>
        }
      />
    </div>
  );
}
