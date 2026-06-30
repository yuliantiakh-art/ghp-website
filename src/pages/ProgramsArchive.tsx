import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DUMMY_PROGRAMS } from '../data/programs';
import { ArrowLeft, CheckCircle2, Users, Calendar, Award } from 'lucide-react';

export const ProgramsArchive: React.FC = () => {
  const navigate = useNavigate();
  const archivedPrograms = DUMMY_PROGRAMS.filter(p => p.status === 'archived');

  const formatProgress = (current: number, target: number, unit: string) => {
    if (unit === 'IDR') {
      return {
        currentStr: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(current),
        targetStr: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(target),
        unitLabel: 'dana disalurkan'
      };
    }
    return {
      currentStr: new Intl.NumberFormat('id-ID').format(current),
      targetStr: new Intl.NumberFormat('id-ID').format(target) + ' ' + unit,
      unitLabel: unit
    };
  };

  return (
    <div className="min-h-screen bg-secondary-cream/50 pb-24">
      {/* Header Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/programs')}
          className="inline-flex items-center text-xs font-semibold text-charcoal/70 hover:text-primary transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Program Berjalan</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-primary-dark text-secondary-beige rounded-3xl p-8 sm:p-12 border border-primary/20 relative overflow-hidden shadow-md">
          {/* Decorative blur elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-light/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-primary/25 border border-primary/45 text-accent-amber text-[10px] font-bold tracking-wider uppercase">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Program Selesai</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-secondary-cream">
              Arsip Kebaikan
            </h1>
            <p className="text-sm sm:text-base text-secondary-sand leading-relaxed">
              Daftar aksi kemanusiaan dan program kepedulian Gerakan Hasan Peduli yang telah selesai disalurkan secara amanah. Laporan transparansi dan penyaluran dapat diakses secara terbuka di masing-masing detail program.
            </p>
          </div>
        </div>
      </section>

      {/* Archived Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {archivedPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archivedPrograms.map((program) => {
              const { currentStr, targetStr, unitLabel } = formatProgress(
                program.currentAmount,
                program.targetAmount,
                program.targetUnit
              );

              return (
                <div key={program.id} className="bg-secondary-cream rounded-3xl overflow-hidden border border-secondary-sand/35 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                  {/* Banner Image with Badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary-beige filter grayscale-30 contrast-95">
                    <img
                      src={program.bannerImage}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-secondary-sand/90 backdrop-blur-sm text-charcoal text-xs font-semibold shadow-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{program.displayCategory}</span>
                    </div>
                    {/* Status Completed Stamp */}
                    <div className="absolute bottom-4 right-4 inline-flex items-center space-x-1 px-3 py-1 rounded-md bg-emerald-150 text-emerald-800 text-[10px] font-bold tracking-wider uppercase border border-emerald-300/20 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-100" />
                      <span>Terpenuhi</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <h3 className="font-display text-lg font-bold text-primary mb-2 line-clamp-1 group-hover:text-primary-light transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-xs text-charcoal/65 mb-6 line-clamp-2 leading-relaxed flex-grow">
                      {program.shortDescription}
                    </p>

                    {/* Summary Metrics */}
                    <div className="p-4 rounded-2xl bg-secondary-beige/30 border border-secondary-sand/20 space-y-2 mb-6">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-charcoal/55 font-medium">Total Dana:</span>
                        <span className="font-bold text-primary">{currentStr}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-charcoal/55 font-medium">Distribusi:</span>
                        <span className="font-bold text-primary text-xs capitalize">{targetStr} ({unitLabel})</span>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="pt-5 border-t border-secondary-sand/20 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-charcoal/70">
                        <Users className="w-4 h-4 text-primary-light" />
                        <span>
                          <strong className="text-charcoal font-semibold">{program.beneficiariesCount}</strong> Jiwa Terbantu
                        </span>
                      </div>
                      <Link
                        to={`/programs/${program.slug}`}
                        className="inline-flex items-center text-xs font-semibold text-primary group-hover:text-accent-terracotta transition-colors"
                      >
                        <span>Lihat Laporan</span>
                        <Award className="ml-1.5 w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary-cream rounded-3xl border border-dashed border-secondary-sand/40">
            <CheckCircle2 className="w-12 h-12 text-primary-light mx-auto mb-4" />
            <h3 className="font-display font-semibold text-primary text-lg">Belum Ada Program Arsip</h3>
            <p className="text-xs text-charcoal/55 max-w-xs mx-auto mt-1">
              Saat ini semua program kebaikan yang terdaftar masih aktif berjalan.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
