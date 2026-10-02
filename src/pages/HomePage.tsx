import React, { useEffect, useState } from 'react';
import { PageData } from '../types/content';
import { contentService } from '../services/contentService';
import { PageRenderer } from '../components/PageRenderer';
import { PageSkeleton } from '../components/common/Skeleton';

export const HomePage: React.FC = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    contentService.getPage('home').then((data) => {
      if (isMounted) {
        setPageData(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || !pageData) {
    return <PageSkeleton />;
  }

  return <PageRenderer pageData={pageData} />;
};
