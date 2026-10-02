import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts as initialBlogPosts } from '../data/blog';
import { BlogPost } from '../types/content';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { SEOHead } from '../components/common/SEOHead';
import { api } from '../services/api';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const posts = await api.getBlogPosts();
        const found = (posts && posts.length > 0 ? posts : initialBlogPosts).find((p) => p.slug === slug);
        setPost(found || null);
      } catch (e) {
        const fallback = initialBlogPosts.find((p) => p.slug === slug);
        setPost(fallback || null);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  if (loading) {
    return <div className="py-20 text-center text-[#475569]">Loading analysis...</div>;
  }

  if (!post) {
    return (
      <div className="py-12 sm:py-16 md:py-20 min-h-screen bg-[#FFFFFF] dark:bg-[#0B1220] w-full">
        <Container size="narrow" className="text-center py-12">
          <SectionHeading
            title="Analysis Not Found"
            description="The requested advisory publication could not be located."
            align="center"
          />
          <div className="pt-4 flex justify-center">
            <Button href="/blog" variant="primary">
              Return to Insights
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <article className="py-10 sm:py-14 md:py-20 bg-[#FFFFFF] dark:bg-[#0B1220] min-h-screen transition-colors w-full">
      <SEOHead
        title={`${post.title} – ApexLedger`}
        description={post.excerpt}
      />

      <Container size="narrow">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#06B6D4] hover:underline transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Articles</span>
          </Link>
        </div>

        {/* Post Header */}
        <header className="mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-[#172554]/10 dark:border-white/10 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#2563EB] dark:text-[#06B6D4] font-bold">
            <span>{post.category}</span>
            <span aria-hidden="true" className="text-[#475569]/40">·</span>
            <span className="text-[#475569] dark:text-white/60 font-semibold">{post.date}</span>
            <span aria-hidden="true" className="text-[#475569]/40">·</span>
            <span className="text-[#475569] dark:text-white/60 font-semibold">{post.readTime}</span>
          </div>

          <h1
            className="font-extrabold text-[#172554] dark:text-[#FFFFFF] tracking-tight break-words text-2xl sm:text-4xl"
            style={{
              lineHeight: 1.1,
              overflowWrap: 'break-word',
            }}
          >
            {post.title}
          </h1>

          <p
            className="text-[#475569] dark:text-[#FFFFFF]/80 font-medium break-words text-base sm:text-lg"
            style={{
              lineHeight: 1.6,
              overflowWrap: 'break-word',
            }}
          >
            {post.excerpt}
          </p>

          <div className="pt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#172554] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {(typeof post.author === 'object' && post.author !== null ? post.author.name : (post.author || 'A')).charAt(0)}
            </div>
            <div>
              <span className="text-sm font-bold text-[#172554] dark:text-white block">
                {typeof post.author === 'object' && post.author !== null ? post.author.name : (post.author || 'Senior Advisory Partner')}
              </span>
              <span className="text-xs text-[#475569] dark:text-white/60">
                {typeof post.author === 'object' && post.author !== null ? post.author.role : 'ApexLedger CPA'}
              </span>
            </div>
          </div>
        </header>

        {/* Post Content Blocks */}
        <div className="space-y-8 text-[#172554]/90 dark:text-[#FFFFFF]/85 leading-relaxed text-base sm:text-lg font-medium">
          {post.content.map((block, idx) => (
            <div key={idx} className="space-y-3">
              {block.heading && (
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#172554] dark:text-[#FFFFFF] pt-4">
                  {block.heading}
                </h2>
              )}
              <p>{block.paragraph}</p>
              {block.bullets && block.bullets.length > 0 && (
                <ul className="space-y-2.5 pt-2">
                  {block.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-[#172554]/80 dark:text-[#FFFFFF]/80">
                      <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Article Footer & Consultation Callout */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/15 dark:border-white/10 text-center space-y-4 shadow-md">
          <h3 className="text-2xl font-extrabold text-[#172554] dark:text-[#FFFFFF]">Have questions about this strategy?</h3>
          <p className="text-sm text-[#475569] dark:text-[#FFFFFF]/75 max-w-md mx-auto font-medium">
            Discuss implementation details directly with {typeof post.author === 'object' && post.author !== null ? post.author.name : (post.author || 'our senior partners')} or our senior advisory team.
          </p>
          <div className="pt-2 flex justify-center">
            <Button href="/book-consultation" variant="primary">
              Book Strategy Session
            </Button>
          </div>
        </div>
      </Container>
    </article>
  );
};
