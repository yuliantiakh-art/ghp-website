import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DUMMY_PROGRAMS } from '../data/programs';
import { 
  Heart, ArrowLeft, BookOpen, Calendar, ShieldAlert, 
  MessageCircle, ExternalLink, Award, CheckCircle2, UserCheck 
} from 'lucide-react';

export const ProgramDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find current program
  const program = DUMMY_PROGRAMS.find(p => p.slug === slug);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!program) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <ShieldAlert className="w-16 h-16 text-accent-terracotta" />
        <h2 className="font-display text-2xl font-bold text-primary">Program Tidak Ditemukan</h2>
        <p className="text-sm text-charcoal/70 max-w-sm">
          Maaf, program yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link to="/programs" className="px-5 py-2.5 rounded-full bg-primary text-secondary-cream hover:bg-primary-hover transition-colors text-sm font-semibold">
          Kembali ke Daftar Program
        </Link>
      </div>
    );
  }

  // Format progress
  const formatProgress = (current: number, target: number, unit: string) => {
    if (unit === 'IDR') {
      return {
        currentStr: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(current),
        targetStr: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(target),
        percentage: Math.min(Math.round((current / target) * 100), 100),
        unitLabel: 'dana terkumpul'
      };
    }
    return {
      currentStr: new Intl.NumberFormat('id-ID').format(current),
      targetStr: new Intl.NumberFormat('id-ID').format(target) + ' ' + unit,
      percentage: Math.min(Math.round((current / target) * 100), 100),
      unitLabel: unit
    };
  };

  const { currentStr, targetStr, percentage, unitLabel } = formatProgress(
    program.currentAmount,
    program.targetAmount,
    program.targetUnit
  );

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'core': return <BookOpen className="w-4 h-4" />;
      case 'seasonal': return <Calendar className="w-4 h-4" />;
      case 'emergency': return <ShieldAlert className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  // Filter Related Programs: same type or featured, excluding current program, active only
  const relatedPrograms = DUMMY_PROGRAMS
    .filter(p => p.id !== program.id && p.status !== 'archived')
    .sort((a, b) => {
      // Prioritize same type
      if (a.programType === program.programType && b.programType !== program.programType) return -1;
      if (a.programType !== program.programType && b.programType === program.programType) return 1;
      // Then prioritize featured
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    })
    .slice(0, 3);

  // Handle external redirect
  const handleDonateRedirect = () => {
    window.open(program.checkoutUrl, '_blank');
  };

  // WhatsApp prefilled query redirect
  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Halo Gerakan Hasan Peduli, saya ingin bertanya lebih lanjut mengenai program kebaikan: "${program.title}".`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-secondary-cream/50 pb-24">
      {/* Back Button Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/programs')}
          className="inline-flex items-center text-xs font-semibold text-charcoal/70 hover:text-primary transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Daftar Program</span>
        </button>
      </div>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT & CENTER PANEL: Banner, Story, Gallery, Donors */}
          <div className="lg:col-span-2 space-y-10">
            {/* Program Hero Container */}
            <div className="bg-secondary-cream rounded-3xl border border-secondary-sand/30 overflow-hidden shadow-sm">
              <div className="relative aspect-[21/9] w-full bg-secondary-beige">
                <img
                  src={program.bannerImage}
                  alt={program.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop';
                  }}
                />
                <div className="absolute top-6 left-6 inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-secondary-cream/95 backdrop-blur-sm text-primary text-xs font-bold shadow-md">
                  {getCategoryIcon(program.programType)}
                  <span>{program.displayCategory}</span>
                </div>
              </div>
              <div className="p-8 sm:p-10">
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4 leading-tight">
                  {program.title}
                </h1>
                <p className="text-base text-charcoal/80 leading-relaxed font-medium">
                  {program.shortDescription}
                </p>
              </div>
            </div>

            {/* Story & Background Section */}
            <div className="bg-secondary-cream rounded-3xl p-8 sm:p-10 border border-secondary-sand/30 shadow-sm space-y-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary flex items-center space-x-2">
                <Heart className="w-5 h-5 text-accent-terracotta fill-accent-terracotta" />
                <span>Cerita & Latar Belakang</span>
              </h2>
              <div 
                className="prose prose-green text-charcoal/80 leading-relaxed max-w-none text-sm sm:text-base space-y-4"
                dangerouslySetInnerHTML={{ __html: program.description }}
              />
            </div>

            {/* Impact Section */}
            {program.impactMetrics.length > 0 && (
              <div className="bg-secondary-cream rounded-3xl p-8 sm:p-10 border border-secondary-sand/30 shadow-sm space-y-8">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-primary flex items-center space-x-2">
                  <Award className="w-5 h-5 text-accent-amber" />
                  <span>Dampak Nyata Program</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {program.impactMetrics.map((metric, index) => (
                    <div key={index} className="p-6 rounded-2xl bg-secondary-beige/35 border border-secondary-sand/20 flex flex-col items-center text-center">
                      <span className="font-display text-3xl font-extrabold text-primary mb-1">
                        {new Intl.NumberFormat('id-ID').format(metric.value)}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-accent-terracotta font-bold mb-2">
                        {metric.unit || 'terbantu'}
                      </span>
                      <span className="text-xs text-charcoal/65 font-medium">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery / Documentation */}
            <div className="bg-secondary-cream rounded-3xl p-8 sm:p-10 border border-secondary-sand/30 shadow-sm space-y-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-primary-light" />
                <span>Dokumentasi Kegiatan</span>
              </h2>
              <p className="text-xs text-charcoal/60 leading-relaxed mb-4">
                Foto-foto berikut adalah dokumentasi penyaluran bantuan langsung dari tim Gerakan Hasan Peduli bersama relawan setempat kepada para penerima manfaat.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary-beige relative group">
                  <img
                    src={program.bannerImage}
                    alt="Dokumentasi 1"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold text-secondary-cream">Penyaluran bantuan langsung di lokasi</span>
                  </div>
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary-beige relative group">
                  <img
                    src={program.bannerImage}
                    alt="Dokumentasi 2"
                    className="w-full h-full object-cover filter brightness-95 contrast-95 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold text-secondary-cream font-sans">Senyuman bahagia dari penerima manfaat</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Donor List */}
            {program.showDonorList && (
              <div className="bg-secondary-cream rounded-3xl p-8 sm:p-10 border border-secondary-sand/30 shadow-sm space-y-6">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-primary flex items-center space-x-2">
                  <UserCheck className="w-5 h-5 text-accent-amber" />
                  <span>Donatur Tergabung</span>
                </h2>
                {program.donors.length > 0 ? (
                  <div className="space-y-4">
                    {program.donors.map((donor, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-secondary-beige/20 border border-secondary-sand/15">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                            {donor.isAnonymous ? 'A' : donor.name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-charcoal block">
                              {donor.isAnonymous ? 'Anonim (Hamba Allah)' : donor.name}
                            </span>
                            <span className="text-[10px] text-charcoal/50">
                              {new Date(donor.donatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-primary">
                            {program.targetUnit === 'mushaf' 
                              ? `${donor.amount} Mushaf`
                              : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(donor.amount)
                            }
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 text-center">
                      <p className="text-xs text-charcoal/55 italic">
                        Daftar donatur di atas diupdate secara manual oleh tim administrator setelah konfirmasi pembayaran dari sistem eksternal.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-sm text-charcoal/50 bg-secondary-beige/25 rounded-2xl border border-dashed border-secondary-sand/40">
                    Belum ada riwayat donatur tercantum. Mari menjadi donatur pertama!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT PANEL: Sticky Widget Progress & Checkout CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-secondary-cream rounded-3xl p-8 border border-secondary-sand/35 shadow-lg space-y-8">
              
              {/* Progress Summary */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-accent-terracotta bg-secondary-beige/60 px-3 py-1.5 rounded-full inline-block">
                  Status: {program.status === 'active' ? 'Sedang Berjalan' : 'Selesai'}
                </span>
                
                <div>
                  <span className="text-xs text-charcoal/60 block mb-1 uppercase tracking-wider">Perkembangan</span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-primary">
                      {currentStr}
                    </span>
                  </div>
                  <span className="text-[11px] text-charcoal/50 block mt-1">
                    Telah terkumpul dari target <strong className="text-charcoal font-semibold">{targetStr}</strong>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-3.5 bg-secondary-beige rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-charcoal/70">
                    <span>{percentage}% Tercapai</span>
                    <span className="capitalize">{unitLabel}</span>
                  </div>
                </div>
              </div>

              {/* Donation Widget CTA Box */}
              <div className="p-6 rounded-2xl bg-secondary-beige/45 border border-secondary-sand/30 text-center space-y-4">
                <p className="text-xs text-charcoal/85 leading-relaxed font-medium">
                  Mari menjadi bagian dari gerakan kebaikan ini. Setiap kontribusi menghadirkan harapan bagi sesama.
                </p>
                {program.status === 'active' ? (
                  <button
                    onClick={handleDonateRedirect}
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-primary text-secondary-cream hover:bg-primary-hover font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group cursor-pointer"
                  >
                    <span>Ikut Berdonasi</span>
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:scale-105" />
                  </button>
                ) : (
                  <div className="w-full py-3.5 px-4 rounded-xl bg-secondary-sand/50 text-charcoal/60 font-semibold text-sm cursor-not-allowed">
                    Donasi Ditutup
                  </div>
                )}
                <span className="text-[10px] text-charcoal/45 block">
                  Donasi akan diproses melalui halaman pembayaran aman Lynk.id / Mayar.
                </span>
              </div>

              {/* Secondary Help / WhatsApp Link */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl border border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>Tanya Program via WhatsApp</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* RELATED PROGRAMS SECTION */}
        {relatedPrograms.length > 0 && (
          <section className="mt-24 pt-16 border-t border-secondary-sand/30 space-y-8">
            <h2 className="font-display text-2xl font-bold text-primary">
              Program Kebaikan Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPrograms.map((related) => {
                const relPerc = Math.min(Math.round((related.currentAmount / related.targetAmount) * 100), 100);
                return (
                  <div key={related.id} className="bg-secondary-cream rounded-2xl border border-secondary-sand/35 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow group">
                    <div className="aspect-[16/10] bg-secondary-beige relative overflow-hidden">
                      <img
                        src={related.bannerImage}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop';
                        }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-[10px] uppercase font-bold text-accent-terracotta tracking-wider mb-1 block">
                        {related.displayCategory}
                      </span>
                      <h3 className="font-display font-bold text-primary text-base line-clamp-1 mb-2">
                        {related.title}
                      </h3>
                      <p className="text-xs text-charcoal/65 line-clamp-2 leading-relaxed mb-4 flex-grow">
                        {related.shortDescription}
                      </p>
                      
                      {/* Related progress bar */}
                      <div className="w-full h-1.5 bg-secondary-beige rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${relPerc}%` }}></div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-charcoal/50">
                        <span>{relPerc}% Terkumpul</span>
                        <Link to={`/programs/${related.slug}`} className="font-semibold text-primary hover:text-accent-terracotta transition-colors">
                          Lihat Program &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
