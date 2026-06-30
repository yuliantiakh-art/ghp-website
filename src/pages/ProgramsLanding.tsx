import React from 'react';
import { Link } from 'react-router-dom';
import { DUMMY_PROGRAMS } from '../data/programs';
import type { Program } from '../data/programs';
import { Heart, Users, ArrowRight, BookOpen, Calendar, ShieldAlert } from 'lucide-react';

export const ProgramsLanding: React.FC = () => {
  const activePrograms = DUMMY_PROGRAMS.filter(p => p.status !== 'archived');
  
  const corePrograms = activePrograms.filter(p => p.programType === 'core');
  const seasonalPrograms = activePrograms.filter(p => p.programType === 'seasonal');
  const emergencyPrograms = activePrograms.filter(p => p.programType === 'emergency');
  const communityPrograms = activePrograms.filter(p => p.programType === 'community');

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

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'core': return <BookOpen className="w-4 h-4" />;
      case 'seasonal': return <Calendar className="w-4 h-4" />;
      case 'emergency': return <ShieldAlert className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const renderProgramCard = (program: Program) => {
    const { currentStr, targetStr, percentage, unitLabel } = formatProgress(
      program.currentAmount,
      program.targetAmount,
      program.targetUnit
    );

    return (
      <div key={program.id} className="bg-secondary-cream rounded-3xl overflow-hidden border border-secondary-sand/30 hover:border-primary/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
        {/* Banner Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary-beige">
          <img 
            src={program.bannerImage} 
            alt={program.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // fallback if image not found
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop';
            }}
          />
          {/* Badge Category */}
          <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-secondary-cream/90 backdrop-blur-sm text-primary text-xs font-semibold shadow-sm">
            {getCategoryIcon(program.programType)}
            <span>{program.displayCategory}</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 sm:p-8 flex flex-col flex-grow">
          <h3 className="font-display text-lg sm:text-xl font-bold text-primary mb-2 line-clamp-1 group-hover:text-primary-light transition-colors">
            {program.title}
          </h3>
          <p className="text-sm text-charcoal/70 mb-6 line-clamp-2 leading-relaxed flex-grow">
            {program.shortDescription}
          </p>

          {/* Progress Section */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-charcoal/75">
              <span>{currentStr}</span>
              <span className="text-primary font-bold text-sm">{percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-secondary-beige rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-charcoal/60">
              <span>Target: <span className="font-medium text-charcoal">{targetStr}</span></span>
              <span className="capitalize">{unitLabel}</span>
            </div>
          </div>

          {/* Card Footer Info */}
          <div className="pt-5 border-t border-secondary-sand/20 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-charcoal/70">
              <Users className="w-4 h-4 text-primary-light" />
              <span>
                <strong className="text-charcoal font-semibold">{program.beneficiariesCount}</strong> Penerima Manfaat
              </span>
            </div>
            <Link 
              to={`/programs/${program.slug}`}
              className="inline-flex items-center text-xs font-semibold text-primary group-hover:text-accent-terracotta transition-colors"
            >
              <span>Detail</span>
              <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-secondary-cream/50 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-primary-dark text-secondary-beige py-24 sm:py-32 px-4 sm:px-6 lg:px-8 shadow-inner">
        {/* Subtle organic bg graphics */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-amber/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-accent-amber text-xs font-semibold tracking-wider uppercase">
            <span>Gerakan Hasan Peduli</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-cream leading-tight">
            Program Kebaikan Kami
          </h1>
          <p className="text-base sm:text-lg text-secondary-sand max-w-2xl mx-auto leading-relaxed">
            Setiap program adalah ikhtiar bersama untuk menghadirkan manfaat nyata bagi masyarakat. Salurkan kepedulian Anda demi mendukung gerakan kemanusiaan berkelanjutan.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#program-utama"
              className="px-6 py-3 rounded-full bg-primary text-secondary-cream hover:bg-primary-hover font-medium text-sm transition-all duration-300 shadow-md"
            >
              Lihat Program Berjalan
            </a>
            <span className="font-display italic text-xs tracking-wider text-secondary-sand/60">
              "Satu Hati, Sejuta Aksi."
            </span>
          </div>
        </div>
      </section>

      {/* DYNAMIC PROGRAMS GRID CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 space-y-20">
        
        {/* EMERGENCY PROGRAMS SECTION (ONLY RENDER IF ACTIVE EXIST) */}
        {emergencyPrograms.length > 0 && (
          <section id="program-darurat" className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-secondary-sand/30 pb-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-red-50 text-red-700 text-xs font-semibold tracking-wider uppercase mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                  <span>Mendesak</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                  Program Tanggap Masyarakat
                </h2>
                <p className="text-sm text-charcoal/60 mt-1 max-w-xl">
                  Gerakan cepat untuk membantu masyarakat yang membutuhkan perhatian dan bantuan segera akibat musibah atau kondisi kritis.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {emergencyPrograms.map(renderProgramCard)}
            </div>
          </section>
        )}

        {/* CORE PROGRAMS SECTION */}
        {corePrograms.length > 0 && (
          <section id="program-utama" className="space-y-8">
            <div className="border-b border-secondary-sand/30 pb-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                Program Utama
              </h2>
              <p className="text-sm text-charcoal/60 mt-1 max-w-xl">
                Aksi sosial yang berjalan rutin dan berkelanjutan, berfokus pada pendidikan yatim, sarana ibadah, dan bantuan sosial rutin.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {corePrograms.map(renderProgramCard)}
            </div>
          </section>
        )}

        {/* SEASONAL PROGRAMS SECTION (ONLY RENDER IF ACTIVE EXIST) */}
        {seasonalPrograms.length > 0 && (
          <section id="program-musiman" className="space-y-8">
            <div className="border-b border-secondary-sand/30 pb-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                Program Musiman
              </h2>
              <p className="text-sm text-charcoal/60 mt-1 max-w-xl">
                Program kepedulian tematik yang diselenggarakan pada momentum-momentum khusus keagamaan atau hari besar sosial.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seasonalPrograms.map(renderProgramCard)}
            </div>
          </section>
        )}

        {/* COMMUNITY / RECURRING PROGRAMS SECTION (Sahabat Gerakan Hasan Peduli) */}
        {communityPrograms.length > 0 && (
          <section id="program-rutin" className="space-y-8">
            <div className="border-b border-secondary-sand/30 pb-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                Program Donatur Rutin
              </h2>
              <p className="text-sm text-charcoal/60 mt-1 max-w-xl">
                Bergabung dalam lingkaran donatur tetap untuk memperkuat fondasi gerakan kemanusiaan bulanan secara mandiri.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communityPrograms.map(renderProgramCard)}
            </div>
          </section>
        )}

        {/* ARCHIVE LINK FOOTNOTE */}
        <div className="pt-10 border-t border-secondary-sand/20 flex justify-center">
          <Link 
            to="/programs/archive" 
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-secondary-beige/60 text-primary hover:bg-secondary-beige font-semibold text-sm transition-all shadow-sm group"
          >
            <span>Lihat Arsip Program Selesai</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};
