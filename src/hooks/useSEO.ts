import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description: string;
}

export function useSEO({ title, description }: SEOOptions): void {
  useEffect(() => {
    const fullTitle = title.includes('NEXORA') ? title : `${title} | NEXORA`;
    document.title = fullTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }
  }, [title, description]);
}
