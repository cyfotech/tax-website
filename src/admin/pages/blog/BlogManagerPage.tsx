/**
 * Blog CMS Manager
 * Create, edit, publish, schedule, and delete articles with SEO and categories.
 */

import React, { useState, useEffect } from 'react';
import { FileText, Plus, Search, Trash2, Edit3, CheckCircle2, X } from 'lucide-react';

export const BlogManagerPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch('/api/admin/blog', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setPosts(json.posts || []);
      }
    } catch (e) {
      console.error('Error fetching blog posts:', e);
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title || !editingPost?.slug) return;

    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingPost),
      });

      if (res.ok) {
        setEditingPost(null);
        setStatusMessage('Blog post saved successfully.');
        fetchPosts();
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (e) {
      console.error('Error saving post:', e);
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Delete article "${title}"?`)) return;
    try {
      const token = localStorage.getItem('apex_admin_token');
      await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (e) {
      console.error('Error deleting post:', e);
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-[#2FE4A6]" />
            <span>Blog CMS & Editorial</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Author and publish corporate advisory guides, tax updates, and thought leadership articles.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingPost({
              title: '',
              slug: '',
              category: 'Tax Strategy',
              excerpt: '',
              content: '',
              status: 'published',
            })
          }
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#2563EB]/20 border border-[#2563EB] text-[#06B6D4] rounded-xl text-xs font-bold">
          {statusMessage}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles by title or category..."
          className="w-full h-10 pl-10 pr-4 bg-[#172554] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#06B6D4]"
        />
      </div>

      {/* Posts Table */}
      <div className="bg-[#172554] border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1220] border-b border-zinc-800 text-zinc-400 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Title & Excerpt</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Author</th>
                <th className="py-3.5 px-6">Published</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filteredPosts.map((post) => (
                <tr key={post.id || post.slug} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-4 px-6 max-w-md">
                    <div className="font-bold text-white text-sm">{post.title}</div>
                    <div className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{post.excerpt}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#2563EB]/20 text-[#06B6D4] border border-[#2563EB]/30">
                      {post.category || 'Advisory'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-zinc-300 font-semibold">
                    {typeof post.author === 'object' && post.author !== null
                      ? post.author.name
                      : (post.author || 'Senior CPA Partner')}
                  </td>
                  <td className="py-4 px-6 text-zinc-400">{post.publishedAt || '2026-09-29'}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id || post.slug, post.title)}
                        className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT POST DRAWER */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSavePost}
            className="w-full max-w-2xl bg-[#131C1A] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-bold text-white">
                {editingPost.id ? 'Edit Article' : 'Compose New Advisory Article'}
              </h3>
              <button type="button" onClick={() => setEditingPost(null)} className="text-zinc-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Article Headline</label>
              <input
                type="text"
                value={editingPost.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setEditingPost({ ...editingPost, title, slug: editingPost.id ? editingPost.slug : slug });
                }}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Advisory Category</label>
                <input
                  type="text"
                  value={editingPost.category}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Author Name</label>
                <input
                  type="text"
                  value={
                    typeof editingPost.author === 'object' && editingPost.author !== null
                      ? editingPost.author.name
                      : (editingPost.author || '')
                  }
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      author:
                        typeof editingPost.author === 'object' && editingPost.author !== null
                          ? { ...editingPost.author, name: e.target.value }
                          : { name: e.target.value, role: 'Senior CPA Partner' },
                    })
                  }
                  placeholder="Marcus Vance, CPA"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Author Title / Role</label>
                <input
                  type="text"
                  value={
                    typeof editingPost.author === 'object' && editingPost.author !== null
                      ? editingPost.author.role
                      : 'Senior Tax Partner, CPA'
                  }
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      author:
                        typeof editingPost.author === 'object' && editingPost.author !== null
                          ? { ...editingPost.author, role: e.target.value }
                          : { name: editingPost.author || 'Senior CPA Partner', role: e.target.value },
                    })
                  }
                  placeholder="Senior Tax Partner, CPA"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Brief Excerpt</label>
              <textarea
                rows={2}
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Full Article Content (Markdown)</label>
              <textarea
                rows={8}
                value={editingPost.content || ''}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white font-mono"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 bg-zinc-800 text-xs font-bold text-zinc-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-bold text-white rounded-xl shadow-md cursor-pointer"
              >
                Save Article
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
