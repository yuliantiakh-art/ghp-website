import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DUMMY_MEDIA } from '../data/media';
import type { MediaPost } from '../data/media';
import { 
  ArrowLeft, BookOpen, Calendar, Film, FileText, UserCheck, 
  Heart, Share2, Award, Clock, ChevronRight 
} from 'lucide-react';

export const MediaDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find post
  const post = DUMMY_MEDIA.find(item => item.slug === slug);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <FileText className="w-16 h-16 text-accent-terracotta" />
        <h2 className="font-display text-2xl font-bold text-primary">Artikel Tidak Ditemukan</h2>
        <p className="text-sm text-charcoal/70 max-w-sm">
          Maaf, cerita atau laporan yang Anda cari tidak tersedia.
        </p>
        <Link to="/media" className="px-5 py-2.5 rounded-full bg-primary text-secondary-cream hover:bg-primary-hover transition-colors text-sm font-semibold">
          Kembali ke Cerita & Kabar GHP
        </Link>
      </div>
    );
  }

  const getMediaLabelAndIcon = (type: MediaPost['mediaType']) => {
    switch (type) {
      case 'documentation': return { label: 'Dokumentasi', icon: <BookOpen className="w-4 h-4" />, color: 'bg-emerald-50 text-emerald-800 border-emerald-250/20' };
      case 'article': return { label: 'Artikel', icon: <Heart className="w-4 h-4" />, color: 'bg-amber-50 text-amber-800 border-amber-250/20' };
      case 'volunteer_story': return { label: 'Cerita Relawan', icon: <UserCheck className="w-4 h-4" />, color: 'bg-sky-50 text-sky-800 border-sky-250/20' };
      case 'beneficiary_story': return { label: 'Kisah Penerima', icon: <Heart className="w-4 h-4" />, color: 'bg-rose-50 text-rose-800 border-rose-250/20' };
      case 'video': return { label: 'Video', icon: <Film className="w-4 h-4" />, color: 'bg-purple-50 text-purple-800 border-purple-250/20' };
      case 'report': return { label: 'Laporan', icon: <FileText className="w-4 h-4" />, color: 'bg-teal-50 text-teal-800 border-teal-250/20' };
      default: return { label: 'Media', icon: <BookOpen className="w-4 h-4" />, color: 'bg-secondary-beige/60 text-charcoal' };
    }
  };

  const { label, icon, color } = getMediaLabelAndIcon(post.mediaType);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Find 3 Related Stories: same type or same program, excluding the current one
  const relatedStories = DUMMY_MEDIA
    .filter(item => item.id !== post.id && item.status !== 'archived')
    .sort((a, b) => {
      if (a.mediaType === post.mediaType && b.mediaType !== post.mediaType) return -1;
      if (a.mediaType !== post.mediaType && b.mediaType === post.mediaType) return 1;
      if (a.programId === post.programId && b.programId !== post.programId) return -1;
      if (a.programId !== post.programId && b.programId === post.programId) return 1;
      return 0;
    })
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link cerita berhasil disalin ke papan klip!');
    }
  };

  return (
    <div className="min-h-screen bg-secondary-cream/50 pb-24">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <button
          onClick={() => navigate('/media')}
          className="inline-flex items-center text-xs font-semibold text-charcoal/70 hover:text-primary transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Cerita & Jejak Kebaikan</span>
        </button>
      </div>

      {/* Main Single Column Layout (Centered Blog Style) */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 mt-6">
        
        {/* Header Block */}
        <div className="bg-secondary-cream rounded-3xl border border-secondary-sand/30 overflow-hidden shadow-sm p-6 sm:p-10 mb-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${color}`}>
              {icon}
              <span>{label}</span>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-charcoal/50 font-semibold">
              <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {formatDate(post.publishedAt)}</span>
              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {post.readTime} min baca</span>
            </div>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary leading-tight">
            {post.title}
          </h1>

          <div className="pt-4 border-t border-secondary-sand/20 flex items-center justify-between gap-4">
            {/* Author */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm uppercase">
                {post.authorName.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-bold text-primary block leading-none">{post.authorName}</span>
                <span className="text-[10px] text-charcoal/50 mt-0.5 block">Kontributor GHP</span>
              </div>
            </div>

            {/* Share CTA */}
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-secondary-sand/40 hover:bg-secondary-beige/30 text-charcoal/70 hover:text-primary transition-all text-xs font-semibold cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan Cerita</span>
            </button>
          </div>
        </div>

        {/* Dynamic Cover Image Banner */}
        <div className="rounded-3xl overflow-hidden aspect-[21/9] w-full bg-secondary-beige border border-secondary-sand/35 mb-10 shadow-inner">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop';
            }}
          />
        </div>

        {/* Narrative / Rich Text Story Content */}
        <div className="bg-secondary-cream rounded-3xl p-8 sm:p-12 border border-secondary-sand/30 shadow-sm mb-10">
          <div 
            className="prose prose-green text-charcoal/85 leading-relaxed max-w-none text-sm sm:text-base space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Embedded YouTube video if type = video */}
          {post.mediaType === 'video' && post.videoUrl && (
            <div className="mt-10 aspect-video rounded-2xl overflow-hidden border border-secondary-sand/30 shadow-md">
              <iframe
                src={post.videoUrl}
                title={post.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Gallery images if present */}
          {post.galleryImages && post.galleryImages.length > 0 && (
            <div className="mt-10 space-y-4">
              <h3 className="font-display font-bold text-primary text-sm uppercase tracking-wider">Galeri Dokumentasi Lapangan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.galleryImages.map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-secondary-beige border border-secondary-sand/20">
                    <img 
                      src={img} 
                      alt={`Dokumentasi ${i+1}`} 
                      className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Impact Highlights Widget */}
        {post.impactMetrics && post.impactMetrics.length > 0 && (
          <div className="bg-secondary-cream rounded-3xl p-8 sm:p-10 border border-secondary-sand/30 shadow-sm mb-10 space-y-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-primary flex items-center space-x-2">
              <Award className="w-5 h-5 text-accent-amber" />
              <span>Dampak Penyaluran Aksi</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {post.impactMetrics.map((metric, index) => (
                <div key={index} className="p-5 rounded-2xl bg-secondary-beige/30 border border-secondary-sand/20 text-center">
                  <span className="font-display text-2xl font-extrabold text-primary block mb-0.5">
                    {new Intl.NumberFormat('id-ID').format(metric.value)}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-accent-terracotta tracking-wider block mb-1">
                    {metric.unit || 'orang'}
                  </span>
                  <span className="text-xs text-charcoal/65 font-medium leading-tight block">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Campaign Linkage Card */}
        {post.programId && post.programName && (
          <div className="bg-secondary-beige/40 rounded-3xl p-6 sm:p-8 border border-secondary-sand/30 flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-accent-terracotta">Rekomendasi Program Terkait</span>
              <h3 className="font-display text-lg font-bold text-primary">{post.programName}</h3>
              <p className="text-xs text-charcoal/65 max-w-sm">Salurkan kepedulian Anda langsung demi mendukung kelangsungan gerakan sosial ini.</p>
            </div>
            <Link
              to={`/programs/${post.programId}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-secondary-cream hover:bg-primary-hover font-semibold text-xs shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer"
            >
              <span>Lihat Program</span>
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        )}

        {/* RELATED STORIES LIST FOOTER */}
        {relatedStories.length > 0 && (
          <section className="border-t border-secondary-sand/30 pt-16 space-y-8">
            <h2 className="font-display text-2xl font-bold text-primary">
              Rekomendasi Cerita Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedStories.map((item) => {
                const { label } = getMediaLabelAndIcon(item.mediaType);
                return (
                  <div key={item.id} className="bg-secondary-cream rounded-2xl border border-secondary-sand/35 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow group">
                    <div className="aspect-[16/10] bg-secondary-beige relative overflow-hidden">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop';
                        }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-[10px] uppercase font-bold text-accent-terracotta tracking-wider mb-1 block">
                        {label}
                      </span>
                      <h3 className="font-display font-bold text-primary text-base line-clamp-2 leading-snug mb-2 flex-grow group-hover:text-primary-light transition-colors">
                        {item.title}
                      </h3>
                      <div className="pt-4 border-t border-secondary-sand/15 flex items-center justify-between text-[10px] text-charcoal/50">
                        <span>{formatDate(item.publishedAt)}</span>
                        <Link to={`/media/${item.slug}`} className="font-bold text-primary hover:text-accent-terracotta transition-colors">
                          Baca Cerita &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </article>
    </div>
  );
};
