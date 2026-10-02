/**
 * Visual Page Editor (Website → Pages → [Page] → Edit)
 * 3-Panel Visual CMS: Structure Outline + Responsive Live Preview + Element/Section Properties Inspector
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Layers,
  Monitor,
  Tablet,
  Smartphone,
  Save,
  CheckCircle2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Trash2,
  Copy,
  Plus,
  RefreshCw,
  Sparkles,
  Sliders,
  Type,
  Image as ImageIcon,
  Palette,
  ExternalLink,
  History,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { PageRenderer } from '../../../components/PageRenderer';

export const VisualPageEditor: React.FC = () => {
  const { pageId = 'home' } = useParams<{ pageId: string }>();
  const [page, setPage] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('');
  const [selectedElementId, setSelectedElementId] = useState<string>('');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'animation' | 'layout' | 'visibility'>('content');
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    fetchPage();
  }, [pageId]);

  const fetchPage = async () => {
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch(`/api/admin/pages/${pageId}?view=draft`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setPage(json.page);
        const list = json.page.sections || [];
        setSections(list);
        if (list.length > 0 && !selectedSectionId) {
          setSelectedSectionId(list[0].sectionId);
        }
      }
    } catch (e) {
      console.error('Failed to load page:', e);
    }
  };

  const selectedSection = sections.find((s) => s.sectionId === selectedSectionId);

  // Update Section Content
  const updateContentField = (key: string, value: any) => {
    if (!selectedSectionId) return;
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.sectionId === selectedSectionId) {
          return {
            ...sec,
            content: {
              ...sec.content,
              [key]: value,
            },
          };
        }
        return sec;
      })
    );
    setHasUnsavedChanges(true);
  };

  // Update Media
  const updateMediaField = (mediaUpdates: any) => {
    if (!selectedSectionId || !selectedSection) return;
    const currentMedia = selectedSection.content?.media || { type: 'illustration' };
    updateContentField('media', { ...currentMedia, ...mediaUpdates });
  };

  // Update Animation
  const updateAnimationField = (key: string, value: any) => {
    if (!selectedSectionId) return;
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.sectionId === selectedSectionId) {
          return {
            ...sec,
            animation: {
              ...(sec.animation || {}),
              [key]: value,
            },
          };
        }
        return sec;
      })
    );
    setHasUnsavedChanges(true);
  };

  // Reorder Sections
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    updated.forEach((s, idx) => {
      s.order = idx + 1;
    });

    setSections(updated);
    setHasUnsavedChanges(true);
  };

  // Toggle Visibility
  const toggleSectionEnabled = (secId: string) => {
    setSections((prev) =>
      prev.map((sec) => (sec.sectionId === secId ? { ...sec, enabled: !sec.enabled } : sec))
    );
    setHasUnsavedChanges(true);
  };

  // Delete Section
  const deleteSection = (secId: string) => {
    if (!confirm('Remove this component from the page draft?')) return;
    const filtered = sections.filter((s) => s.sectionId !== secId);
    filtered.forEach((s, idx) => (s.order = idx + 1));
    setSections(filtered);
    if (selectedSectionId === secId && filtered.length > 0) {
      setSelectedSectionId(filtered[0].sectionId);
    }
    setHasUnsavedChanges(true);
  };

  // Add Component to Page
  const addSectionFromLibrary = (type: string, title: string) => {
    const newId = `${pageId}-${type}-${Date.now().toString(36)}`;
    const newSec: any = {
      pageId,
      sectionId: newId,
      type,
      enabled: true,
      order: sections.length + 1,
      content: {
        eyebrow: 'Strategy Module',
        title: title || 'Executive Financial Strategy',
        description: 'Empowering enterprise leaders with transparent reporting and senior partner guidance.',
      },
    };

    if (type === 'cta') {
      newSec.content.primaryButton = {
        id: `btn-${Date.now()}`,
        label: 'Schedule Strategy Session',
        href: '/book-consultation',
        variant: 'primary',
      };
    } else if (type === 'stats') {
      newSec.content.stats = [
        { id: 'st-1', value: 99.4, suffix: '%', label: 'Ledger Accuracy' },
        { id: 'st-2', value: 3.2, suffix: ' Days', label: 'Monthly Close' },
        { id: 'st-3', value: 140, prefix: '$', suffix: 'M+', label: 'Client Revenue Handled' },
      ];
    }

    setSections([...sections, newSec]);
    setSelectedSectionId(newId);
    setShowAddSectionModal(false);
    setHasUnsavedChanges(true);
  };

  // Save Draft
  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch(`/api/admin/pages/${pageId}/draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sections, seo: page?.seo }),
      });

      if (res.ok) {
        setHasUnsavedChanges(false);
        setNotification('Draft saved successfully.');
        setTimeout(() => setNotification(''), 3000);
      }
    } catch (e) {
      console.error('Error saving draft:', e);
    } finally {
      setSaving(false);
    }
  };

  // Publish to Live
  const handlePublish = async () => {
    setPublishing(true);
    try {
      const token = localStorage.getItem('apex_admin_token');
      const res = await fetch(`/api/admin/pages/${pageId}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ summary: 'Published updates from Visual Page Builder' }),
      });

      if (res.ok) {
        setHasUnsavedChanges(false);
        setPublishModalOpen(false);
        setNotification('Page successfully published to live website!');
        setTimeout(() => setNotification(''), 4000);
        fetchPage();
      } else {
        const errorData = await res.json().catch(() => ({}));
        setNotification(`Publish failed: ${errorData.error || res.statusText || 'Unable to publish page.'}`);
        setTimeout(() => setNotification(''), 5000);
      }
    } catch (e: any) {
      console.error('Publish error:', e);
      setNotification(`Network or server error while publishing: ${e.message || 'Unknown error'}`);
      setTimeout(() => setNotification(''), 5000);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0E1514] select-none overflow-hidden">
      {/* BUILDER ACTION BAR */}
      <div className="h-14 bg-[#111917] border-b border-zinc-800 px-4 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/pages"
            className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1"
          >
            <span>Pages</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-white">{page?.title || pageId}</span>
            {hasUnsavedChanges ? (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full animate-pulse">
                Unsaved Draft
              </span>
            ) : (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                Synced with Live
              </span>
            )}
          </div>
        </div>

        {/* Viewport Switcher */}
        <div className="hidden sm:flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl gap-1">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewport === 'desktop' ? 'bg-[#2563EB] text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewport === 'tablet' ? 'bg-[#2563EB] text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewport === 'mobile' ? 'bg-[#2563EB] text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {notification && (
            <span className="text-xs text-[#06B6D4] font-bold hidden lg:inline animate-fade-in">
              {notification}
            </span>
          )}

          <Link
            to={`/admin/pages/${pageId}/history`}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
            title="Version History & Diffs"
          >
            <History className="w-4 h-4" />
          </Link>

          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors border border-zinc-700 cursor-pointer"
          >
            {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => setPublishModalOpen(true)}
            className="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Publish to Live</span>
          </button>
        </div>
      </div>

      {/* 3-PANEL LAYOUT */}
      <div className="flex-1 flex overflow-hidden">
        {/* PANEL 1: SECTIONS STRUCTURE OUTLINE (Left) */}
        <aside className="w-64 bg-[#111917] border-r border-zinc-800 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-zinc-400">
                Page Structure
              </span>
              <button
                onClick={() => setShowAddSectionModal(true)}
                className="text-xs font-bold text-[#2FE4A6] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Module</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {sections.map((sec, idx) => {
                const isSelected = sec.sectionId === selectedSectionId;
                return (
                  <div
                    key={sec.sectionId}
                    onClick={() => {
                      setSelectedSectionId(sec.sectionId);
                      setSelectedElementId(`${sec.sectionId}-title`);
                    }}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#2563EB]/20 border-[#2563EB] text-white shadow-sm'
                        : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Layers className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#06B6D4]' : 'text-zinc-500'}`} />
                      <div className="truncate">
                        <div className="font-bold truncate capitalize">{sec.type}</div>
                        <div className="text-[10px] text-zinc-400 font-mono truncate">#{sec.sectionId}</div>
                      </div>
                    </div>

                    {/* Section controls */}
                    <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSection(idx, 'up');
                        }}
                        disabled={idx === 0}
                        className="p-1 hover:text-white disabled:opacity-20"
                        title="Move Up"
                      >
                        <MoveUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSection(idx, 'down');
                        }}
                        disabled={idx === sections.length - 1}
                        className="p-1 hover:text-white disabled:opacity-20"
                        title="Move Down"
                      >
                        <MoveDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSectionEnabled(sec.sectionId);
                        }}
                        className="p-1 hover:text-white"
                        title={sec.enabled ? 'Hide Section' : 'Show Section'}
                      >
                        {sec.enabled ? <Eye className="w-3 h-3 text-[#06B6D4]" /> : <EyeOff className="w-3 h-3 text-zinc-500" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSection(sec.sectionId);
                        }}
                        className="p-1 hover:text-red-400"
                        title="Delete Section"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* PANEL 2: LIVE RESPONSIVE PREVIEW WITH CLICK-TO-SELECT (Center) */}
        <div className="flex-1 bg-[#0B1220] overflow-y-auto p-4 sm:p-6 flex items-start justify-center">
          <div
            className={`transition-all duration-300 shadow-2xl bg-[#FFFFFF] dark:bg-[#0B1220] text-[#172554] dark:text-[#FFFFFF] rounded-2xl overflow-hidden border border-zinc-800 ${
              viewport === 'desktop'
                ? 'w-full'
                : viewport === 'tablet'
                ? 'w-[768px]'
                : 'w-[375px]'
            }`}
          >
            {/* Viewport Frame Header */}
            <div className="h-6 bg-zinc-800 flex items-center justify-between px-3 text-[10px] text-zinc-400 font-mono">
              <span>{viewport.toUpperCase()} PREVIEW ({viewport === 'desktop' ? '100%' : viewport === 'tablet' ? '768px' : '375px'})</span>
              <span>Click any section or heading to edit</span>
            </div>

            {/* Live rendered components with Click-To-Select wrapping */}
            <div className="relative">
              {sections.length === 0 ? (
                <div className="p-12 text-center text-sm text-zinc-500">No active sections in draft.</div>
              ) : (
                sections.map((section) => {
                  const isSelected = section.sectionId === selectedSectionId;
                  return (
                    <div
                      key={section.sectionId}
                      onClick={() => {
                        setSelectedSectionId(section.sectionId);
                        setSelectedElementId(`${section.sectionId}-title`);
                      }}
                      className={`relative cursor-pointer transition-all ${
                        isSelected
                          ? 'ring-4 ring-[#2563EB] ring-inset'
                          : 'hover:ring-2 hover:ring-zinc-400/30 hover:ring-inset'
                      }`}
                    >
                      {/* Selection Tag */}
                      {isSelected && (
                        <div className="absolute top-2 left-2 z-30 bg-[#2563EB] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
                          #{section.sectionId} ({section.type})
                        </div>
                      )}
                      <PageRenderer pageData={{ pageId, title: page?.title || '', seo: page?.seo, sections: [section] }} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* PANEL 3: ELEMENT & SECTION PROPERTIES INSPECTOR (Right) */}
        <aside className="w-80 sm:w-96 bg-[#111917] border-l border-zinc-800 flex flex-col justify-between shrink-0 overflow-y-auto">
          {selectedSection ? (
            <div>
              {/* Element Header */}
              <div className="p-4 border-b border-zinc-800 bg-[#131C1A]">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#2FE4A6]">
                  Properties Inspector
                </div>
                <div className="text-sm font-extrabold text-white mt-0.5 flex items-center justify-between">
                  <span>{selectedSection.type.toUpperCase()} MODULE</span>
                  <span className="text-[10px] font-mono text-zinc-400">ID: {selectedSection.sectionId}</span>
                </div>
              </div>

              {/* Inspector Tabs */}
              <div className="flex border-b border-zinc-800 bg-zinc-900/60 text-xs">
                {(['content', 'media', 'animation', 'layout', 'visibility'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 text-center font-bold capitalize transition-colors border-b-2 ${
                      activeTab === tab
                        ? 'border-[#2FE4A6] text-[#2FE4A6] bg-[#111917]'
                        : 'border-transparent text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* TAB 1: CONTENT FIELDS */}
              {activeTab === 'content' && (
                <div className="p-4 space-y-4 text-xs">
                  {selectedSection.content?.eyebrow !== undefined && (
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-300 mb-1">Eyebrow / Subheading</label>
                      <input
                        type="text"
                        value={selectedSection.content.eyebrow || ''}
                        onChange={(e) => updateContentField('eyebrow', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#2FE4A6]"
                      />
                    </div>
                  )}

                  {selectedSection.content?.title !== undefined && (
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-300 mb-1">Primary Heading / Title</label>
                      <textarea
                        rows={2}
                        value={selectedSection.content.title || ''}
                        onChange={(e) => updateContentField('title', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#2FE4A6]"
                      />
                    </div>
                  )}

                  {selectedSection.content?.description !== undefined && (
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-300 mb-1">Body Description</label>
                      <textarea
                        rows={3}
                        value={selectedSection.content.description || ''}
                        onChange={(e) => updateContentField('description', e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#2FE4A6]"
                      />
                    </div>
                  )}

                  {/* Primary CTA Button Config */}
                  {selectedSection.content?.primaryButton && (
                    <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-2">
                      <div className="font-bold text-white text-[11px]">Primary Button CTA</div>
                      <div>
                        <label className="block text-[10px] text-zinc-400">Button Label</label>
                        <input
                          type="text"
                          value={selectedSection.content.primaryButton.label}
                          onChange={(e) =>
                            updateContentField('primaryButton', {
                              ...selectedSection.content.primaryButton,
                              label: e.target.value,
                            })
                          }
                          className="w-full px-2.5 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-400">Target Link URL</label>
                        <input
                          type="text"
                          value={selectedSection.content.primaryButton.href}
                          onChange={(e) =>
                            updateContentField('primaryButton', {
                              ...selectedSection.content.primaryButton,
                              href: e.target.value,
                            })
                          }
                          className="w-full px-2.5 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: MEDIA REPLACEMENT */}
              {activeTab === 'media' && (
                <div className="p-4 space-y-4 text-xs">
                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Assigned Visual Asset</span>
                      <span className="text-[10px] font-mono text-[#2FE4A6] uppercase">
                        {selectedSection.content?.media?.type || 'Standard'}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1 truncate">
                      Component: {selectedSection.content?.media?.component || 'None'}
                    </div>
                  </div>

                  {/* Replace Media Slot Choice */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Replace Media Visual</label>
                    <select
                      value={selectedSection.content?.media?.component || ''}
                      onChange={(e) => updateMediaField({ component: e.target.value, type: 'illustration' })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none"
                    >
                      <option value="accountant-hero">Accountant Live Ledger Graphic</option>
                      <option value="outsourcing-team">Outsourcing Team Illustration</option>
                      <option value="tax-specialist">Tax Specialist Illustration</option>
                      <option value="accounting-workflow">Accounting Workflow Visual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Or Direct Media URL / Path</label>
                    <input
                      type="text"
                      value={selectedSection.content?.media?.src || ''}
                      onChange={(e) => updateMediaField({ src: e.target.value, type: 'image' })}
                      placeholder="/media/custom-visual.svg"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Accessibility Alt Text</label>
                    <input
                      type="text"
                      value={selectedSection.content?.media?.alt || ''}
                      onChange={(e) => updateMediaField({ alt: e.target.value })}
                      placeholder="Descriptive text for screen readers"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: ANIMATION PRESETS */}
              {activeTab === 'animation' && (
                <div className="p-4 space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Animation Preset</label>
                    <select
                      value={selectedSection.animation?.preset || 'fadeUp'}
                      onChange={(e) => updateAnimationField('preset', e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                    >
                      <option value="none">None (Instant Render)</option>
                      <option value="fade">Subtle Fade In</option>
                      <option value="fadeUp">Smooth Fade & Slide Up</option>
                      <option value="scale">Subtle Scale In</option>
                      <option value="slide">Horizontal Slide</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Trigger Event</label>
                    <select
                      value={selectedSection.animation?.trigger || 'viewport'}
                      onChange={(e) => updateAnimationField('trigger', e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                    >
                      <option value="viewport">When Scrolled Into Viewport</option>
                      <option value="load">On Page Initial Load</option>
                      <option value="hover">On User Hover</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Animation Duration</label>
                    <select
                      value={selectedSection.animation?.duration || 'normal'}
                      onChange={(e) => updateAnimationField('duration', e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                    >
                      <option value="fast">Fast (300ms)</option>
                      <option value="normal">Normal (600ms)</option>
                      <option value="slow">Slow & Cinematic (1000ms)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* TAB 4: LAYOUT & DESIGN TOKENS */}
              {activeTab === 'layout' && (
                <div className="p-4 space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Content Alignment</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['left', 'center', 'right'].map((align) => (
                        <button
                          key={align}
                          type="button"
                          onClick={() => updateContentField('alignment', align)}
                          className={`py-1.5 rounded-lg border text-center font-bold capitalize cursor-pointer ${
                            selectedSection.content?.alignment === align
                              ? 'bg-[#2563EB] border-[#2563EB] text-white'
                              : 'bg-zinc-900 border-zinc-700 text-zinc-300'
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Vertical Padding Spacing</label>
                    <select
                      value={selectedSection.styling?.spacing || 'normal'}
                      onChange={(e) => updateContentField('spacing', e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white cursor-pointer"
                    >
                      <option value="compact">Compact (py-8)</option>
                      <option value="normal">Standard (py-16)</option>
                      <option value="relaxed">Relaxed Spacious (py-24)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* TAB 5: DEVICE VISIBILITY */}
              {activeTab === 'visibility' && (
                <div className="p-4 space-y-3 text-xs">
                  <div className="text-[11px] text-zinc-400 mb-2">
                    Control device breakpoint visibility for this individual component:
                  </div>

                  {['Desktop', 'Tablet', 'Mobile'].map((device) => (
                    <label
                      key={device}
                      className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between cursor-pointer"
                    >
                      <span className="font-bold text-white">{device} Display</span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded bg-zinc-800 border-zinc-700 text-[#2563EB] focus:ring-0"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-zinc-500">
              Select any section on the left or click directly inside the page preview to inspect properties.
            </div>
          )}
        </aside>
      </div>

      {/* ADD SECTION MODAL */}
      {showAddSectionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#172554] border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-1">Component Registry: Add Module</h3>
            <p className="text-xs text-zinc-400 mb-4">Choose an approved design system module to insert into page draft:</p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => addSectionFromLibrary('cta', 'Schedule Executive Discovery')}
                className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#2563EB] text-left text-zinc-200 cursor-pointer"
              >
                <div className="font-bold text-white">Call to Action (CTA)</div>
                <div className="text-[10px] text-zinc-400">Executive button banner with Deep Navy tone</div>
              </button>
              <button
                onClick={() => addSectionFromLibrary('stats', 'Proven Financial Impact')}
                className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#2563EB] text-left text-zinc-200 cursor-pointer"
              >
                <div className="font-bold text-white">Key Statistics</div>
                <div className="text-[10px] text-zinc-400">KPI metrics with animated numeric counters</div>
              </button>
              <button
                onClick={() => addSectionFromLibrary('trustStrip', 'Industry Accreditations')}
                className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#2563EB] text-left text-zinc-200 cursor-pointer"
              >
                <div className="font-bold text-white">Trust & Security Strip</div>
                <div className="text-[10px] text-zinc-400">SOC-2 and Senior CPA certification badges</div>
              </button>
              <button
                onClick={() => addSectionFromLibrary('process', 'How We Onboard Your Books')}
                className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#2563EB] text-left text-zinc-200 cursor-pointer"
              >
                <div className="font-bold text-white">Workflow Timeline</div>
                <div className="text-[10px] text-zinc-400">4-step structured accounting process</div>
              </button>
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM PUBLISH MODAL */}
      {publishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#172554] border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-2">Publish Page to Production?</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              This will update the live public website for <span className="font-bold text-white">"{page?.title}"</span>.
              A new immutable version history entry and audit log will be created automatically.
            </p>

            <div className="mt-4 p-3 bg-[#2563EB]/15 border border-[#2563EB]/30 rounded-xl text-xs text-[#06B6D4]">
              ✓ Changes will be instantly visible to visitors across all devices.
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setPublishModalOpen(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-bold text-white rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                {publishing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Confirm & Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
