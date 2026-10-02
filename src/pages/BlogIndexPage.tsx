import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types/content';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { SEOHead } from '../components/common/SEOHead';
import { api } from '../services/api';
import { blogPosts as initialBlogPosts } from '../data/blog';
import { ArrowRight } from 'lucide-react';

export const BlogIndexPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetched = await api.getBlogPosts();
        if (fetched && fetched.length > 0) {
          setPosts(fetched);
        }
      } catch (e) {
        console.error('Failed to load dynamic blog posts:', e);
      }
    };
    loadPosts();
  }, []);

  const categories = ['All', 'Tax Advisory', 'Accounting', 'CPA Outsourcing', 'CFO Strategy'];

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-10 sm:py-14 md:py-20 bg-[#FFFFFF] dark:bg-[#0B1220] min-h-screen transition-colors w-full">
      <SEOHead
        title="Advisory Insights & Tax Guides – ApexLedger"
        description="Practical accounting analyses, CPA firm outsourcing strategies, and corporate tax regulations."
      />

      <Container size="wide">
        <SectionHeading
          eyebrow="ADVISORY INTELLIGENCE"
          title="Insights for CFOs, Founders & CPA Partners"
          description="Clear tactical guidance on tax filings, compliance changes, and outsourcing operations."
          align="center"
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                selectedCategory === cat
                  ? 'bg-[#172554] text-[#FFFFFF] shadow-md'
                  : 'bg-white dark:bg-[#172554] text-[#172554]/70 dark:text-white/70 hover:text-[#2563EB] border border-[#172554]/15 dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#172554] border-2 border-[#172554]/10 dark:border-white/10 hover:border-[#2563EB] transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-lg flex flex-col justify-between w-full min-w-0"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#2563EB] dark:text-[#06B6D4] font-bold mb-3">
                  <span>{post.category}</span>
                  <span aria-hidden="true" className="text-[#475569]/40">·</span>
                  <span className="text-[#475569] dark:text-white/60 font-semibold">{post.date}</span>
                  <span aria-hidden="true" className="text-[#475569]/40">·</span>
                  <span className="text-[#475569] dark:text-white/60 font-semibold">{post.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-2xl font-extrabold text-[#172554] dark:text-[#FFFFFF] mb-3 leading-snug break-words">
                  <Link to={`/blog/${post.slug}`} className="hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#FFFFFF]/75 leading-relaxed mb-6 font-medium break-words">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-5 sm:pt-6 border-t border-[#172554]/10 dark:border-white/10 flex items-center justify-between gap-3">
                <div className="text-xs min-w-0">
                  <span className="font-bold text-[#172554] dark:text-white block truncate">
                    {typeof post.author === 'object' && post.author !== null
                      ? post.author.name
                      : (post.author || 'Senior Advisory Partner')}
                  </span>
                  <span className="text-[#475569] dark:text-white/50 truncate block">
                    {typeof post.author === 'object' && post.author !== null
                      ? post.author.role
                      : 'ApexLedger CPA'}
                  </span>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#172554] dark:text-[#FFFFFF] hover:text-[#2563EB] shrink-0 min-h-[44px]"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 text-[#2563EB]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
};
