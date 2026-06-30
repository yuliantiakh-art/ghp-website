import React from 'react';
import { Link } from 'react-router-dom';
import { DUMMY_MEDIA } from '../data/media';
import type { MediaPost } from '../data/media';
import { BookOpen, Film, FileText, UserCheck, Heart, ArrowRight } from 'lucide-react';

export const MediaLanding: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = React.useState<string>('all');
  
  // Exclude archived media posts from main grid
  const activeMedia = DUMMY_MEDIA.filter(item => item.status !== 'archived');

  // Find Featured Post (priority: isFeatured = true)
  const featuredPost = activeMedia.find(item => item.isFeatured) || activeMedia[0];
  
  // Filter list for grid (excluding featured post if it's shown in hero)
  const gridPosts = activeMedia.filter(item => item.id !== featuredPost?.id);

  const filters = [
    { label: 'Semua Cerita', value: 'all' },
    { label: 'Dokumentasi Lapangan', value: 'documentation' },
    { label: 'Artikel Edukasi', value: 'article' },
    { label: 'Kisah Relawan', value: 'volunteer_story' },
    { label: 'Cerita Penerima Manfaat', value: 'beneficiary_story' },
    { label: 'Video Aksi', value: 'video' },
    { label: 'Laporan Publik', value: 'report' },
  ];

  const getFilteredPosts = () => {
    const posts = selectedFilter === 'all' 
      ? gridPosts 
      : gridPosts.filter(post => post.mediaType === selectedFilter);
    return posts;
  };

  const getMediaLabelAndIcon = (type: MediaPost['mediaType']) => {
    switch (type) {
      case 'documentation': return { label: 'Dokumentasi', icon: <BookOpen className="w-3.5 h-3.5" />, color: 'bg-emerald-50 text-emerald-800 border-emerald-250/20' };
      case 'article': return { label: 'Artikel', icon: <Heart className="w-3.5 h-3.5" />, color: 'bg-amber-50 text-amber-800 border-amber-250/20' };
      case 'volunteer_story': return { label: 'Cerita Relawan', icon: <UserCheck className="w-3.5 h-3.5" />, color: 'bg-sky-50 text-sky-800 border-sky-250/20' };
      case 'beneficiary_story': return { label: 'Kisah Penerima', icon: <Heart className="w-3.5 h-3.5" />, color: 'bg-rose-50 text-rose-800 border-rose-250/20' };
      case 'video': return { label: 'Video', icon: <Film className="w-3.5 h-3.5" />, color: 'bg-purple-50 text-purple-800 border-purple-250/20' };
      case 'report': return { label: 'Laporan', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-teal-50 text-teal-800 border-teal-250/20' };
      default: return { label: 'Media', icon: <BookOpen className="w-3.5 h-3.5" />, color: 'bg-secondary-beige/60 text-charcoal' };
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderCard = (post: MediaPost) => {
    const { label, icon, color } = getMediaLabelAndIcon(post.mediaType);
    return (
      <div key={post.id} className="bg-secondary-cream rounded-3xl overflow-hidden border border-secondary-sand/30 hover:border-primary/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary-beige">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop';
            }}
          />
          <div className={`absolute top-4 left-4 inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-sm ${color}`}>
            {icon}
            <span>{label}</span>
          </div>
        </div>
        <div className="p-6 sm:p-8 flex flex-col flex-grow">
          <span className="text-[10px] text-charcoal/50 font-semibold mb-2 block">
            {formatDate(post.publishedAt)} &bull; {post.readTime} min membaca
          </span>
          <h3 className="font-display text-lg font-bold text-primary mb-3 line-clamp-2 leading-snug group-hover:text-primary-light transition-colors">
            {post.title}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal/70 mb-6 line-clamp-2 leading-relaxed flex-grow">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-secondary-sand/20 flex items-center justify-between">
            {post.programId && post.programName ? (
              <Link 
                to={`/programs/${post.programId}`}
                className="text-[11px] font-semibold text-accent-terracotta hover:underline"
              >
                Program: {post.programName}
              </Link>
            ) : (
              <span className="text-[11px] text-charcoal/45">Gerakan Hasan Peduli</span>
            )}
            <Link
              to={`/media/${post.slug}`}
              className="inline-flex items-center text-xs font-bold text-primary group-hover:text-accent-terracotta transition-colors"
            >
              <span>Baca Selengkapnya</span>
              <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-secondary-cream/50 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary-dark text-secondary-beige py-20 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-accent-amber text-xs font-semibold tracking-wider uppercase">
            <span>Memory & Storytelling Center</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-secondary-cream leading-tight">
            Cerita & Jejak Kebaikan
          </h1>
          <p className="text-base text-secondary-sand max-w-xl mx-auto leading-relaxed">
            Setiap langkah kecil yang dilakukan bersama akan menjadi manfaat yang lebih besar bagi masyarakat. Ikuti dokumentasi perjalanan dan dampak gerakan sosial kami.
          </p>
          <span className="font-display italic text-xs tracking-wider text-secondary-sand/50 block">
            "Satu Hati, Sejuta Aksi."
          </span>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* FEATURED STORY SECTION */}
        {featuredPost && selectedFilter === 'all' && (
          <section className="mb-16">
            <h2 className="font-display text-xs font-extrabold uppercase tracking-widest text-accent-terracotta mb-6">
              Cerita Pilihan
            </h2>
            <div className="bg-secondary-cream rounded-3xl border border-secondary-sand/35 overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12 hover:shadow-xl transition-all duration-300 group">
              <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto overflow-hidden bg-secondary-beige relative">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop';
                  }}
                />
                <div className={`absolute top-6 left-6 inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold border backdrop-blur-sm ${getMediaLabelAndIcon(featuredPost.mediaType).color}`}>
                  {getMediaLabelAndIcon(featuredPost.mediaType).icon}
                  <span>{getMediaLabelAndIcon(featuredPost.mediaType).label}</span>
                </div>
              </div>
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center">
                <span className="text-xs text-charcoal/50 font-semibold mb-3 block">
                  {formatDate(featuredPost.publishedAt)} &bull; {featuredPost.readTime} min membaca
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-primary leading-tight mb-4 group-hover:text-primary-light transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="pt-6 border-t border-secondary-sand/20 flex items-center justify-between">
                  {featuredPost.programId && featuredPost.programName ? (
                    <Link 
                      to={`/programs/${featuredPost.programId}`}
                      className="text-xs font-semibold text-accent-terracotta hover:underline"
                    >
                      Program: {featuredPost.programName}
                    </Link>
                  ) : (
                    <span className="text-xs text-charcoal/45">Gerakan Hasan Peduli</span>
                  )}
                  <Link
                    to={`/media/${featuredPost.slug}`}
                    className="inline-flex items-center text-sm font-bold text-primary group-hover:text-accent-terracotta transition-all"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FILTER NAVIGATION BUTTONS */}
        <section className="mb-10 space-y-4">
          <h2 className="font-display text-xs font-extrabold uppercase tracking-widest text-accent-terracotta">
            Kategori Publikasi
          </h2>
          <div className="flex flex-wrap gap-2.5 pb-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  selectedFilter === filter.value
                    ? 'bg-primary text-secondary-cream border-primary shadow-sm'
                    : 'bg-secondary-cream text-charcoal/80 border-secondary-sand/40 hover:bg-secondary-beige/30 hover:border-primary/20'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* MEDIA LIST GRID */}
        <section className="space-y-12">
          {getFilteredPosts().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredPosts().map(renderCard)}
            </div>
          ) : (
            <div className="text-center py-20 bg-secondary-cream rounded-3xl border border-dashed border-secondary-sand/40">
              <BookOpen className="w-12 h-12 text-primary-light mx-auto mb-4" />
              <h3 className="font-display font-semibold text-primary text-lg">Belum Ada Cerita</h3>
              <p className="text-xs text-charcoal/55 max-w-xs mx-auto mt-1">
                Kategori publikasi ini belum memiliki konten terbitan. Kami akan segera memperbaruinya!
              </p>
            </div>
          )}
        </section>

        {/* ARCHIVE LINK */}
        <div className="mt-16 pt-8 border-t border-secondary-sand/20 flex justify-center">
          <Link 
            to="/media/archive" 
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-secondary-beige/60 text-primary hover:bg-secondary-beige font-semibold text-sm transition-all shadow-sm group"
          >
            <span>Lihat Arsip Dokumentasi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
