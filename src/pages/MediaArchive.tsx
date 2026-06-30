import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DUMMY_MEDIA } from '../data/media';
import type { MediaPost } from '../data/media';
import { ArrowLeft, CheckCircle2, Calendar, FileText, BookOpen } from 'lucide-react';

export const MediaArchive: React.FC = () => {
  const navigate = useNavigate();
  const archivedMedia = DUMMY_MEDIA.filter(item => item.status === 'archived');

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getMediaLabel = (type: MediaPost['mediaType']) => {
    switch (type) {
      case 'report': return 'Laporan';
      case 'documentation': return 'Dokumentasi';
      case 'article': return 'Artikel';
      default: return 'Publikasi';
    }
  };

  return (
    <div className="min-h-screen bg-secondary-cream/50 pb-24">
      {/* Back to main media */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/media')}
          className="inline-flex items-center text-xs font-semibold text-charcoal/70 hover:text-primary transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Cerita & Jejak Kebaikan</span>
        </button>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-primary-dark text-secondary-beige rounded-3xl p-8 sm:p-12 border border-primary/20 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-light/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-primary/25 border border-primary/45 text-accent-amber text-[10px] font-bold tracking-wider uppercase">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Arsip Publikasi</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-secondary-cream">
              Arsip Dokumentasi & Laporan
            </h1>
            <p className="text-sm sm:text-base text-secondary-sand leading-relaxed">
              Kumpulan dokumentasi kegiatan lapangan dan laporan dampak program kemanusiaan terdahulu yang telah diselesaikan. Laporan arsip ini tetap kami sajikan secara terbuka sebagai wujud komitmen transparansi publik Gerakan Hasan Peduli.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Archived Media */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {archivedMedia.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archivedMedia.map((post) => (
              <div key={post.id} className="bg-secondary-cream rounded-3xl overflow-hidden border border-secondary-sand/35 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary-beige filter grayscale-20">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-secondary-sand/90 backdrop-blur-sm text-charcoal text-xs font-semibold shadow-sm">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    <span>{getMediaLabel(post.mediaType)}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-secondary-sand/80 text-charcoal text-[9px] font-bold tracking-wider uppercase border border-secondary-sand shadow-sm">
                    <span>Arsip</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] text-charcoal/50 font-semibold mb-2 block">
                    Terbit: {formatDate(post.publishedAt)} &bull; {post.readTime} min baca
                  </span>
                  <h3 className="font-display text-base font-bold text-primary mb-2 line-clamp-2 leading-snug group-hover:text-primary-light transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-charcoal/65 mb-6 line-clamp-2 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 border-t border-secondary-sand/20 flex items-center justify-between">
                    {post.programName ? (
                      <span className="text-[10px] font-semibold text-accent-terracotta">
                        Prog: {post.programName}
                      </span>
                    ) : (
                      <span className="text-[10px] text-charcoal/45">Gerakan Hasan Peduli</span>
                    )}
                    <Link
                      to={`/media/${post.slug}`}
                      className="inline-flex items-center text-xs font-bold text-primary group-hover:text-accent-terracotta transition-colors"
                    >
                      <span>Lihat Laporan Arsip</span>
                      <FileText className="ml-1.5 w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary-cream rounded-3xl border border-dashed border-secondary-sand/40">
            <BookOpen className="w-12 h-12 text-primary-light mx-auto mb-4" />
            <h3 className="font-display font-semibold text-primary text-lg">Belum Ada Arsip Publikasi</h3>
            <p className="text-xs text-charcoal/55 max-w-xs mx-auto mt-1">
              Saat ini seluruh dokumentasi dan laporan GHP masih aktif di halaman utama.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
